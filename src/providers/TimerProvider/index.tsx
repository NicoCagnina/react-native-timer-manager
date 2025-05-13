import React, { createContext, useCallback, useContext, useRef } from 'react';
import { useGlobalTimer } from '../../hooks/useGlobalTimer';

export const TimerContext = createContext<
	((id: string, callback?: (_: number) => void) => void) | null
>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
	const callbacks = useRef<Record<string, (_: number) => void>>({});

	const onTick = useCallback((ticks: number) => {
		Object.values(callbacks.current).forEach((callback) => callback(ticks));
	}, []);

	const registerCallback = useCallback(
		(id: string, callback?: (_: number) => void) => {
			if (callback) {
				callbacks.current[id] = callback;
			} else {
				delete callbacks.current[id];
			}
		},
		[],
	);

	useGlobalTimer(onTick);

	return (
		<TimerContext.Provider value={registerCallback} data-timer-consumer>
			{children}
		</TimerContext.Provider>
	);
};

export const useTimerContext = () => {
	const context = useContext(TimerContext);
	if (!context) {
		throw new Error('useTimerContext must be used within a TimerProvider');
	}
	return context;
}; 