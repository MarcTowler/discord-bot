const Command = require("../base/Command.js");

class officerinterest extends Command {
    constructor(client) {
        super(client, {
            name: "officerinterest",
            description: "Show the Officer Interest form",
            category: "Games",
            usage: "officerinterest",
            guildOnly: true,
            aliases: ["interest"],
            permLevel: "User"
        });
    }

    async run(message, [action, key, ...value], level) { // eslint-disable-line no-unused-vars
        message.reply('Here you go: <https://docs.google.com/forms/d/e/1FAIpQLSc3XpYOBITH7VEVzBO_7PwbkMXg3WKZICVaX3ScIywIKlHtxw/viewform>');
    }
}

module.exports = officerinterest;