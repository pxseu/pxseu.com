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
	const eventSourceRef = useRef<EventSource | null>(null);
	const reconnectTimeoutRef = useRef<number | null>(null);
	const retryCount = useRef(0);
	const maxRetries = 5;

	const clearReconnectTimeout = useCallback(() => {
		if (reconnectTimeoutRef.current !== null) {
			window.clearTimeout(reconnectTimeoutRef.current);
			reconnectTimeoutRef.current = null;
		}
	}, []);

	const closeEventSource = useCallback(() => {
		if (!eventSourceRef.current) return;
		eventSourceRef.current.close();
		eventSourceRef.current = null;
	}, []);

	const connect = useCallback(() => {
		clearReconnectTimeout();
		closeEventSource();

		const eventSource = new EventSource(`${API_ROUTE}/v2/realtime`);
		eventSourceRef.current = eventSource;

		eventSource.onopen = () => {
			setIsConnected(true);
			retryCount.current = 0;
		};

		const handleEvent = (event: MessageEvent) => {
			let parsedData: unknown;
			try {
				parsedData = JSON.parse(event.data);
			} catch {
				return;
			}

			switch (event.type) {
				case "init":
					setData(parsedData as RealtimeData);
					break;
				case "location":
					setData((prevData) => {
						if (!prevData) return null;

						return {
							...prevData,
							location: parsedData as RealtimeData["location"],
						};
					});
					break;
				case "playing":
					setData((prevData) => {
						if (!prevData) return null;

						return {
							...prevData,
							playing: parsedData as RealtimeData["playing"],
						};
					});
					break;
			}
		};

		eventSource.addEventListener("init", handleEvent);
		eventSource.addEventListener("location", handleEvent);
		eventSource.addEventListener("playing", handleEvent);

		eventSource.onerror = () => {
			setIsConnected(false);
			eventSource.removeEventListener("init", handleEvent);
			eventSource.removeEventListener("location", handleEvent);
			eventSource.removeEventListener("playing", handleEvent);
			eventSource.close();

			if (eventSourceRef.current === eventSource) {
				eventSourceRef.current = null;
			}

			if (retryCount.current < maxRetries) {
				const timeout = Math.min(1000 * 2 ** retryCount.current, 30000);
				reconnectTimeoutRef.current = window.setTimeout(() => {
					retryCount.current++;
					connect();
				}, timeout);
			}
		};
	}, [clearReconnectTimeout, closeEventSource]);

	useEffect(() => {
		connect();

		return () => {
			clearReconnectTimeout();
			closeEventSource();
			setIsConnected(false);
		};
	}, [clearReconnectTimeout, closeEventSource, connect]);

	return (
		<RealtimeContext.Provider value={{ data, isConnected }}>
			{children}
		</RealtimeContext.Provider>
	);
};
