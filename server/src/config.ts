import { envsafe, str, url, port } from "envsafe";

export const config = envsafe({
	SPOTIFY_CLIENT_ID: str(),
	SPOTIFY_CLIENT_SECRET: str(),
	SPOTIFY_REDIRECT_URI: str(),
	SPOTIFY_AUTH_USER_ID: str({
		default: "1evum6fq9klvekqjbz4cu5v79",
		allowEmpty: true,
	}),
	REDIS_URL: url(),
	PORT: port({
		default: 3000,
	}),
});
