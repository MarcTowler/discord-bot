const Command = require("../base/Command.js");
const app = require("express");
const https = require("https");

class Upcoming extends Command {
    constructor(client) {
        super(client, {
            name: "upcoming",
            description: "Upcoming Events",
            category: "Moderation",
            usage: "upcoming <platform>",
            guildOnly: true,
            aliases: [],
            permLevel: "Web Team"
        });
    }

    async run(message, args, level) {
    if (args[0] === 'all') {
            https.get('https://marctowler-discord-bot.glitch.me/ps4-events');
            https.get('https://marctowler-discord-bot.glitch.me/xbox-events');
            https.get('https://marctowler-discord-bot.glitch.me/pc-events');
    }
		if (args[0] === 'ps4') {
            https.get('https://marctowler-discord-bot.glitch.me/ps4-events');
		}
    if (args[0] === 'xbox') {
            https.get('https://marctowler-discord-bot.glitch.me/xbox-events');
		}
    if (args[0] === 'pc') {
            https.get('https://marctowler-discord-bot.glitch.me/pc-events');
		}
    }  //End Async
} //End Class

module.exports = Upcoming;