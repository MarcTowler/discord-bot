const Command = require("../base/Command.js");
const fortuneCookie = require('fortune-tweetable');

class Fortune extends Command {
    constructor(client) {
        super(client, {
            name: "Fortune",
            description: "Fortune Cookie!",
            category: "Games",
            usage: "fortune",
            guildOnly: true,
            aliases: [],
            permLevel: "User"
        });
    }

    async run(message, args, level) {
        return message.channel.send(fortuneCookie.fortune());
    }
}

module.exports = Fortune;