"use client";

import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { API_ROUTE } from "@/config";
import type { RealtimeContextType, RealtimeData } from "../types/realtime";

const RealtimeContext = createContext<RealtimeContextType>({
	data: null,
	isConnected: false,
});

export const useRealtime = () => useContext(RealtimeContext);

export const RealtimeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [data, setData] = useState<RealtimeData | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const retryCount = useRef(0);
	const maxRetries = 5;

	const connect = useCallback(() => {
		const eventSource = new EventSource(`${API_ROUTE}/v2/realtime`);

		eventSource.onopen = () => {
			setIsConnected(true);
			retryCount.current = 0; // Reset retry count on successful connection
		};

		const handleEvent = (event: MessageEvent) => {
			const parsedData = JSON.parse(event.data);

			switch (event.type) {
				case "init":
					setData(parsedData);
					break;
				case "location":
					setData((prevData) => {
						if (!prevData) return null;

						return {
							...prevData,
							location: parsedData,
						};
					});
					break;
				case "playing":
					setData((prevData) => {
						if (!prevData) return null;

						return {
							...prevData,
							playing: parsedData,
						};
					});
					break;
			}
		};

		eventSource.addEventListener("init", handleEvent);
		eventSource.addEventListener("location", handleEvent);
		eventSource.addEventListener("playing", handleEvent);

		const close = () => {
			eventSource.close();
			eventSource.removeEventListener("init", handleEvent);
			eventSource.removeEventListener("location", handleEvent);
			eventSource.removeEventListener("playing", handleEvent);
		};

		eventSource.onerror = () => {
			setIsConnected(false);
			close();

			// Implement exponential backoff
			if (retryCount.current < maxRetries) {
				const timeout = Math.min(1000 * 2 ** retryCount.current, 30000); // Max 30 seconds
				setTimeout(() => {
					retryCount.current++;
					connect();
				}, timeout);
			}
		};

		return () => {
			close();

			setIsConnected(false);
		};
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(connect, []);

	return (
		<RealtimeContext.Provider value={{ data, isConnected }}>
			{children}
		</RealtimeContext.Provider>
	);
};
