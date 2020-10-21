const router = require("express").Router();
const webhook = require("webhook-discord");
const rateLimit = require("express-rate-limit");

const sendMessageLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 1,
	message: {
		error: `Only one message per 10 minutes!`,
	},
});

router.use(require("express").json());

router.post("/v1/sendMessage", sendMessageLimiter, async (req, res) => {
	const body = await req.body;

	if (body.content == "" || body.content.trim() == "") {
		return res.status(400).json({
			error: "Cannot send emtpy message!",
		});
	}

	const Hook = new webhook.Webhook(process.env.WEBHOOK);

	const embed = new webhook.MessageBuilder();
	embed.setName("pxseu messenger");
	embed.setAvatar(
		"https://cdn.discordapp.com/avatars/645330135527981069/3440c4def2a42777de2ccafba45adf02.webp?size=512"
	);
	embed.setAuthor(
		"pxseu",
		"https://cdn.discordapp.com/avatars/645330135527981069/3440c4def2a42777de2ccafba45adf02.webp?size=512",
		"https://www.pxseu.com/other/messages"
	);
	embed.setURL("https://pxseu.cc");
	embed.setTitle("New Message!");
	embed.setDescription(`Content: \n\n${body.content.trim()}`);
	embed.setColor("#3399ff");
	embed.setTime();
	await Hook.send(embed);

	res.json({
		content: body.content.trim(),
	});
});

module.exports = router;
