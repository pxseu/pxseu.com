/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Request, Response as IResponse } from "express";
import type { apiUser } from "./server/db/models/auth_key";

export interface RequestWithUser extends Request {
	user?: apiUser;
}

declare global {
	namespace Express {
		interface Response {
			api: (status: number, body: Record<string, any>) => IResponse<any, Record<string, any>>;
		}
	}
}
