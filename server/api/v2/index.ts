import { Router, Response, NextFunction } from "express";
import { NOTE, DEV_MODE, sendMessageLimiter, isBlacklisted } from "..";
import AuthKeyDb, { apiUser } from "../../db/models/auth_key";
import { RequestWithUser } from "../../../express";
import { Webhook, MessageBuilder } from "webhook-discord";

const AVATAR = "https://cdn.pxseu.com/assets/pfp.gif";
const router = Router();

const methodCheck = {
	post: (req: RequestWithUser, res: Response, next: NextFunction) => {
		const method = req.method;

		if (method != "POST") {
			return res.status(400).json({
				status: 400,
				message: "Method not allowed!",
			});
		}
		next();
	},
	get: (req: RequestWithUser, res: Response, next: NextFunction) => {
		const method = req.method;

		if (method != "GET") {
			return res.status(400).json({
				status: 400,
				message: "Method not allowed!",
			});
		}
		next();
	},
};

router.use(
	"/sendMessage",
	methodCheck.post,
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const body: { message: string } = await req.body;

		const AuthKey = req.headers.authorization;

		const apiKeyFound = (await AuthKeyDb.findOne({
			auth_key: AuthKey,
		})) as apiUser;

		if (body.message == undefined || body.message.trim() == "") {
			const message = "Cannot send empty message!";
			return res.status(400).json({
				status: 400,
				message,
				error: `${message} (please update your API to read the 'message' filed and not 'content')`,
				note: NOTE,
			});
		}

		if (body.message.trim().length > 2048) {
			const message = "Message is too large!";
			return res.status(400).json({
				status: 400,
				message,
				error: `${message} (please update your API to read the message filed)`,
				note: NOTE,
			});
		}

		if (apiKeyFound) {
			req.user = apiKeyFound.user;
			next();
		}

		if (DEV_MODE) {
			next();
			return;
		}

		sendMessageLimiter(req, res, next);
	},
	async (req: RequestWithUser, res: Response) => {
		const user = req.user;
		const message: string = await req.body.message.trim();

		if (isBlacklisted(message)) {
			return res.json({
				status: 400,
				error: "You said a word from the blacklist!",
			});
		}

		const Hook = new Webhook(process.env.WEBHOOK ?? "");
		const embed = new MessageBuilder();

		embed.setName("pxseu messenger");
		embed.setAvatar(AVATAR);
		embed.setAuthor("Anonymous", AVATAR, "https://www.pxseu.com/other/message");
		embed.setURL("https://www.pxseu.com/other/message");
		embed.setTitle("New Message!");
		embed.setDescription(`Content: \n${message}`);
		embed.setColor("#3399ff");
		embed.setFooter("pls no api abjus, thank!", AVATAR);
		embed.setTime();
		Hook.send(embed);

		res.json({
			status: 200,
			message,
			note: NOTE,
			user,
		});
	}
);

router.use("/bajo-jajo", methodCheck.get, (req, res) => {
	const query = req.query.repeat as string;
	const repeats = query ? parseInt(query) : getRandomInt(1, 2000);
	console.log(repeats > 1);
	if (isNaN(repeats)) {
		res.status(400).json({
			status: 400,
			message: '"repeat" is not a number',
		});
		return;
	}

	if (repeats < 1 || repeats > 1000000) {
		res.status(400).json({
			status: 400,
			message: '"repeat" is too large or too small (should be between 1 and 1,000,000)',
		});
		return;
	}

	const string = "bajo jajo ";
	res.json({
		status: 200,
		message: string.repeat(repeats).trim(),
	});
});

export default router;

/**
 *
 * @param min Minimalna liczba
 * @param max Maksymalna liczba
 */
function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
