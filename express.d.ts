/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Response as IResponse } from "express";
import type { ApiUser } from "./server/db/models/auth_key";
declare global {
	namespace Express {
		interface Response {
			api: (status: number, body: Record<string, any>) => IResponse<any, Record<string, any>>;
		}

		interface Request {
			user: ApiUser;
		}
	}
}
