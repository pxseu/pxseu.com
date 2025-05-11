"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { RealtimeContextType, RealtimeData } from "../types/realtime";
import { API_ROUTE } from "@/config";

const RealtimeContext = createContext<RealtimeContextType>({
	data: null,
	isConnected: false,
});

export const useRealtime = () => useContext(RealtimeContext);

export const RealtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [data, setData] = useState<RealtimeData | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		const eventSource = new EventSource(`${API_ROUTE}/v2/realtime`);

		eventSource.onopen = () => {
			setIsConnected(true);
		};

		eventSource.onerror = (event) => {
			console.error("EventSource error:", event);
			setIsConnected(false);
		};

		eventSource.addEventListener("init", (event) => {
			try {
				const parsedData = JSON.parse(event.data) as RealtimeData;
				setData(parsedData);
			} catch (err) {
				console.error("Error parsing init event:", err);
			}
		});

		eventSource.addEventListener("location", (event) => {
			try {
				const parsedData = JSON.parse(event.data) as RealtimeData["location"];

				setData((prevData) => {
					if (!prevData) return null;

					return {
						...prevData,
						location: parsedData,
					};
				});
			} catch (err) {
				console.error("Error parsing location event:", err);
			}
		});

		eventSource.addEventListener("playing", (event) => {
			try {
				const parsedData = JSON.parse(event.data) as RealtimeData["playing"];

				setData((prevData) => {
					if (!prevData) return null;

					return {
						...prevData,
						playing: parsedData,
					};
				});
			} catch (err) {
				console.error("Error parsing playing event:", err);
			}
		});

		return () => {
			eventSource.close();
			setIsConnected(false);
		};
	}, []);

	return <RealtimeContext.Provider value={{ data, isConnected }}>{children}</RealtimeContext.Provider>;
};
