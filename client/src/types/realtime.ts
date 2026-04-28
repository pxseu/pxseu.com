import type { RealtimeData } from "@pxseu/shared";

export type {
	Album,
	Location,
	Playing,
	Progress,
	RealtimeData,
	Song,
} from "@pxseu/shared";

export interface RealtimeContextType {
	data: RealtimeData | null;
	isConnected: boolean;
}
