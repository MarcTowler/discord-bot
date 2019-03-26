const Command = require("../base/Command.js");
const { version } = require("discord.js");
const bootTime = new Date();

class uptime extends Command {
    constructor(client) {
        super(client, {
            name: "uptime",
            usage: "uptime",
            description: "Know how long the bot has been working without a break",
            role: "everyone"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        return message.channel.send(`I have been up since ${bootTime.toUTCString()} for a total of: ${countdown(bootTime)}`);
    }
}

module.exports = uptime;