import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AppState, PanResponder, View } from "react-native";
import { useTimerContext } from "../TimerProvider";

interface IdleContextType {
  isIdle: boolean;
  idleTime: number;
  resetIdle: () => void;
}

const IdleContext = createContext<IdleContextType | undefined>(undefined);

interface IdleProviderProps {
  children: React.ReactNode;
  timeout?: number;
}

export const IdleProvider: React.FC<IdleProviderProps> = ({
  children,
  timeout = 5000,
}) => {
  const [isIdle, setIsIdle] = useState(false);
  const [idleTime, setIdleTime] = useState(0);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [appState, setAppState] = useState(AppState.currentState);
  const { registerTimer } = useTimerContext();

  const resetIdle = useCallback(() => {
    if (isIdle) setIsIdle(false);
    setIdleTime(0);
    setLastActivity(Date.now());
  }, [isIdle]);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => {
          resetIdle();
          return false;
        },
        onMoveShouldSetPanResponder: () => {
          resetIdle();
          return false;
        },
        onPanResponderGrant: resetIdle,
        onPanResponderMove: resetIdle,
      }),
    [resetIdle]
  );

  useEffect(() => {
    const unregister = registerTimer({
      id: "idle-check",
      tag: "idle",
      callback: () => {
        if (appState !== "active") return;

        const now = Date.now();
        const timeSinceLastActivity = now - lastActivity;

        if (timeSinceLastActivity >= timeout) {
          if (!isIdle) setIsIdle(true);
          setIdleTime(Math.floor(timeSinceLastActivity / 1000));
        }
      },
    });

    return () => {
      unregister();
    };
  }, [appState, timeout, lastActivity, isIdle, registerTimer]);

  return (
    <IdleContext.Provider value={{ isIdle, idleTime, resetIdle }}>
      <View {...panResponder.panHandlers} style={{ flex: 1 }}>
        {children}
      </View>
    </IdleContext.Provider>
  );
};

export const useIdle = () => {
  const context = useContext(IdleContext);
  if (context === undefined) {
    throw new Error("useIdle must be used within an IdleProvider");
  }
  return context;
};
