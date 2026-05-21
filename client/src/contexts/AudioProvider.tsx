"use client";

import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const AUDIO_SOURCES = {
	// bleep: "/assets/audio/bleep.wav",
	bleepReverb: "/assets/audio/bleep-reverb.wav",
	// expand: "/assets/audio/expand.wav",
	// sciConfirm: "/assets/audio/sci-confirm.wav",
	// zoom: "/assets/audio/zoom.wav",
} as const;

export type AudioName = keyof typeof AUDIO_SOURCES;
// strict + loose type to allow both predefined and custom audio sources
export type AudioSource = AudioName | (string & {});

type AudioContextType = {
	playAudio: (source: AudioSource) => Promise<void>;
};

const AudioContext = createContext<AudioContextType | null>(null);
const AUDIO_VOLUME = 0.1;

const resolveAudioSource = (source: AudioSource) => {
	if (source in AUDIO_SOURCES) {
		return AUDIO_SOURCES[source as AudioName];
	}

	return source;
};

export const useAudio = () => {
	const context = useContext(AudioContext);

	if (!context) {
		throw new Error("useAudio must be used within an AudioProvider");
	}

	return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const audioElementsRef = useRef(new Map<string, HTMLAudioElement>());
	const prefersReducedMotion = usePrefersReducedMotion();

	const getAudioElement = useCallback((source: AudioSource) => {
		const src = resolveAudioSource(source);
		const currentAudioElement = audioElementsRef.current.get(src);

		if (currentAudioElement) {
			return currentAudioElement;
		}

		const audioElement = new Audio(src);
		audioElement.preload = "auto";
		audioElement.volume = AUDIO_VOLUME;
		audioElementsRef.current.set(src, audioElement);

		return audioElement;
	}, []);

	const playAudio = useCallback(
		async (source: AudioSource) => {
			if (prefersReducedMotion) {
				return;
			}

			const audioElement = getAudioElement(source);
			audioElement.currentTime = 0;
			await audioElement.play();
		},
		[getAudioElement, prefersReducedMotion],
	);

	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}

		for (const source of Object.values(AUDIO_SOURCES)) {
			getAudioElement(source);
		}
	}, [getAudioElement, prefersReducedMotion]);

	return (
		<AudioContext.Provider value={{ playAudio }}>
			{children}
		</AudioContext.Provider>
	);
};
