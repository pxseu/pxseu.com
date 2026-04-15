import type { RealtimeData } from "@pxseu/shared";

export type {
	Song,
	Album,
	Progress,
	Playing,
	Location,
	RealtimeData,
} from "@pxseu/shared";

export interface RealtimeContextType {
	data: RealtimeData | null;
	isConnected: boolean;
}
