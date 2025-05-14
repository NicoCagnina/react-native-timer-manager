import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Timer = TimerSubscription;

type TimerOptions = {
  id: string;
  tag?: string;
  callback: () => void;
};

export type TimerSubscription = {
  id: string;
  tag?: string;
  callback: () => void;
  tickCount: number;
  active: boolean;
};

export type TimerContextValue = {
  registerTimer: (options: TimerOptions) => () => void;
  getTimers: () => TimerSubscription[];
  getActiveTimers: () => TimerSubscription[];
  pauseAll: () => void;
  resumeAll: () => void;
  subscribe: (callback: () => void) => { id: string };
  unsubscribe: (id: string) => void;
};

const TimerContext = createContext<TimerContextValue | null>(null);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const timersRef = useRef<Map<string, Timer>>(new Map());
  const subscribersRef = useRef<Map<string, () => void>>(new Map());
  const [paused, setPaused] = useState(false);

  // master interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) return;

      timersRef.current.forEach((timer) => {
        if (timer.active) {
          timer.tickCount++;
          timer.callback();
        }
      });

      subscribersRef.current.forEach((callback) => {
        callback();
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paused]);

  const registerTimer = ({ id, tag, callback }: TimerOptions) => {
    const timer: Timer = {
      id,
      tag,
      callback,
      tickCount: 0,
      active: true,
    };

    timersRef.current.set(id, timer);

    return () => {
      timersRef.current.delete(id);
    };
  };

  const pauseAll = () => {
    setPaused(true);
    timersRef.current.forEach((t) => (t.active = false));
  };

  const resumeAll = () => {
    setPaused(false);
    timersRef.current.forEach((t) => (t.active = true));
  };

  const getTimers = () => Array.from(timersRef.current.values());
  const getActiveTimers = () => getTimers().filter((t) => t.active);

  const subscribe = (callback: () => void) => {
    const id = Math.random().toString(36).substring(2, 9);
    subscribersRef.current.set(id, callback);
    return { id };
  };

  const unsubscribe = (id: string) => {
    subscribersRef.current.delete(id);
  };

  return (
    <TimerContext.Provider
      value={{
        registerTimer,
        getTimers,
        getActiveTimers,
        pauseAll,
        resumeAll,
        subscribe,
        unsubscribe,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = (): TimerContextValue => {
  const context = useContext(TimerContext);
  if (!context) throw new Error("TimerContext not found");
  return context;
};
