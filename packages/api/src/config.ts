export const HOSTNAME = process.env.HOSTNAME?.toLowerCase() ?? "api.pxseu.com";
export const DEV = process.env.NODE_ENV !== "production";
export const PORT = parseInt(process.env.PORT ?? "80", 10);
export const ANILIST_ENDPOINT = "https://graphql.anilist.co";
export const ANILIST_ID = parseInt(process.env.ANILIST_ID ?? "0", 10);
