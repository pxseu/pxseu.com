const router = require("express").Router();
const webhook = require("webhook-discord");
const rateLimit = require("express-rate-limit");

const DEV_MODE = process.env.NODE_ENV == "development";

const methodCheck = {
	post: (req, res, next) => {
		const method = req.method;

		if (method != "POST") {
			return res.json({
				error: "Method not allowed!",
			});
		}
		next();
	},
};

const sendMessageLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 1,
	message: {
		error: `Only one message per 10 minutes!`,
	},
});

router.use(require("express").json());

router.use(
	"/v1/sendMessage",
	methodCheck.post,
	async (req, res, next) => {
		const body = await req.body;

		if (body.content == undefined || body.content.trim() == "") {
			return res.status(400).json({
				error: "Cannot send emtpy message!",
			});
		}

		if (body.content.trim().length > 2048) {
			return res.status(400).json({
				error: "Message is too large!",
			});
		}

		if (DEV_MODE) {
			next();
			return;
		}
		sendMessageLimiter(req, res, next);
	},
	async (req, res) => {
		const message = await req.body.content.trim();
		const Hook = new webhook.Webhook(process.env.WEBHOOK);
		const embed = new webhook.MessageBuilder();

		embed.setName("pxseu messenger");
		embed.setAvatar(
			"https://cdn.discordapp.com/avatars/645330135527981069/3440c4def2a42777de2ccafba45adf02.webp?size=512"
		);
		embed.setAuthor(
			"Anonymous",
			"https://cdn.discordapp.com/avatars/645330135527981069/3440c4def2a42777de2ccafba45adf02.webp?size=512",
			"https://www.pxseu.com/other/message"
		);
		embed.setURL("https://www.pxseu.com/other/message");
		embed.setTitle("New Message!");
		embed.setDescription(`Content: \n${message}`);
		embed.setColor("#3399ff");
		embed.setFooter("pls no api abjus, thank!");
		embed.setTime();
		Hook.send(embed);

		res.json({
			content: message,
		});
	}
);

module.exports = router;
