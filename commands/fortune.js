const Command = require("../base/Command.js");
const { version } = require("discord.js");
const fortuneCookie = require('fortune-tweetable');

class fortune extends Command {
    constructor(client) {
        super(client, {
            name: "Fortune Cookie",
            usage: "fortune",
            description: "Read a fortune cookie!",
            role: "everyone"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        return message.channel.send(fortuneCookie.fortune());
    }
}

module.exports = fortune;