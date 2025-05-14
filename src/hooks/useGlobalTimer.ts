import { useEffect } from 'react';

const ONE_SECOND = 1000;

let globalTimer: ReturnType<typeof setInterval> | null = null;
let globalTicks = 0;

export const useGlobalTimer = (onTick: (ticks: number) => void) => {
	useEffect(() => {
		if (!globalTimer) {
			globalTimer = setInterval(() => {
				globalTicks += 1;
				onTick(globalTicks);
			}, ONE_SECOND);
		}

		return () => {
			if (globalTimer) {
				clearInterval(globalTimer);
				globalTimer = null;
				globalTicks = 0;
			}
		};
	}, [onTick]);
};