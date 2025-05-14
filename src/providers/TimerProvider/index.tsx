import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGlobalTimer } from "../../hooks/useGlobalTimer";

export interface TimerState {
  id: string;
  ticks: number;
  isActive: boolean;
}

interface TimerContextType {
  registerCallback: (id: string, callback?: (_: number) => void) => void;
  getTimerState: (id: string) => TimerState | undefined;
  getAllTimers: () => TimerState[];
  resetTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resumeTimer: (id: string) => void;
  removeTimer: (id: string) => void;
}

export const TimerContext = createContext<TimerContextType | null>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const callbacks = useRef<Record<string, (_: number) => void>>({});
  const [timerStates, setTimerStates] = useState<Record<string, TimerState>>(
    {}
  );

  const timerStatesRef = useRef(timerStates);
  useEffect(() => {
    timerStatesRef.current = timerStates;
  }, [timerStates]);

  const onTick = useCallback((ticks: number) => {
    Object.entries(callbacks.current).forEach(([id, callback]) => {
      if (timerStatesRef.current[id]?.isActive !== false) {
        callback(ticks);
        setTimerStates(prev => ({
          ...prev,
          [id]: {
            ...prev[id],
            ticks: prev[id]?.ticks !== undefined ? prev[id].ticks + 1 : 1,
            isActive: true,
          },
        }));
      }
    });
  }, []);

  const registerCallback = useCallback(
    (id: string, callback?: (_: number) => void) => {
      if (callback) {
        callbacks.current[id] = callback;
        setTimerStates((prev) => ({
          ...prev,
          [id]: {
            id,
            ticks: prev[id]?.ticks || 0,
            isActive: true,
          },
        }));
      } else {
        delete callbacks.current[id];
        setTimerStates((prev) => {
          const newStates = { ...prev };
          delete newStates[id];
          return newStates;
        });
      }
    },
    []
  );

  useEffect(() => {
    registerCallback("global-timer", () => {});
  }, [registerCallback]);

  const getTimerState = useCallback(
    (id: string) => {
      return timerStates[id];
    },
    [timerStates]
  );

  const getAllTimers = useCallback(() => {
    return Object.values(timerStates);
  }, [timerStates]);

  const resetTimer = useCallback((id: string) => {
    setTimerStates((prev) =>
      prev[id]
        ? {
            ...prev,
            [id]: {
              ...prev[id],
              ticks: 0,
            },
          }
        : prev
    );
  }, []);

  const pauseTimer = useCallback((id: string) => {
    setTimerStates((prev) =>
      prev[id]
        ? {
            ...prev,
            [id]: {
              ...prev[id],
              isActive: false,
            },
          }
        : prev
    );
  }, []);

  const resumeTimer = useCallback((id: string) => {
    setTimerStates((prev) =>
      prev[id]
        ? {
            ...prev,
            [id]: {
              ...prev[id],
              isActive: true,
            },
          }
        : prev
    );
  }, []);

  const removeTimer = useCallback((id: string) => {
    delete callbacks.current[id];
    setTimerStates((prev) => {
      const newStates = { ...prev };
      delete newStates[id];
      return newStates;
    });
  }, []);

  useGlobalTimer(onTick);

  return (
    <TimerContext.Provider
      value={{
        registerCallback,
        getTimerState,
        getAllTimers,
        resetTimer,
        pauseTimer,
        resumeTimer,
        removeTimer,
      }}
      data-timer-consumer
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
};
