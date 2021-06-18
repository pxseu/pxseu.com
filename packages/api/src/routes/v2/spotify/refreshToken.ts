import fetch from "node-fetch";
import querystring from "querystring";

export const getAccessToken = async (): Promise<string> => {
	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: querystring.stringify({
			grant_type: "refresh_token",
			refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
			client_id: process.env.SPOTIFY_CLIENT_ID,
			client_secret: process.env.SPOTIFY_CLIENT_SECRET,
		}),
	});

	const data = await response.json();

	return data.access_token;
};
