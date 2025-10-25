import { envsafe, port, str, url } from "envsafe";

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
		default: 3001,
	}),
	LOCATION_SECRET: str({
		default: "sigmaSigmaSigma",
	}),
	WEBHOOK_MESSAGE_ID: str(),
	WEBHOOK_MESSAGE_TOKEN: str(),
	WEBHOOK_AVATAR: url({
		default: "https://cdn.pxseu.com/Nc4z2WvoV.png",
	}),
	REDIS_PREFIX: str({
		default: "pxseu:2:",
	}),
});

if (config.LOCATION_SECRET.length < 10) {
	throw new TypeError("LOCATION_SECRET must be at least 10 character long");
}
