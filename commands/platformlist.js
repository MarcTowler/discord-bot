const Command = require("../base/Command.js");
const { version } = require("discord.js");

class platformList extends Command {
	constructor(client) {
		super(client, {
			name: "Platform List",
			usage: "platformlist",
			description: `Request a list of members with @Role`,
			role: "everyone"
		});
	}

	async run(message, args, level) { // eslint-disable-line no-unused-vars

		let playstation = "370195805610573824";
		let playstationmembers = message.guild.roles.get(playstation).members;

		let xbox = "365412296945565706";
		let xboxmembers = message.guild.roles.get(xbox).members;

		let pc = "375993110846636033";
		let pcmembers = message.guild.roles.get(pc).members;

		message.channel.send({
			embed: {
				color: 0x00ff00,
				author: {
					name: `Player Platforms Information`,
					icon_url: "https://cdn2.iconfinder.com/data/icons/free-basic-icon-set-2/300/6-128.png",
				},

				description: `We have ${playstationmembers.size} with the @PS4 role.\n` +
					`We have ${xboxmembers.size} with the @XBOX role.\n` +
					`We have ${pcmembers.size} with the @PC role.\n`
			}
		});

	}
}

//@mention needs to be enabled for this to work.

module.exports = platformList;