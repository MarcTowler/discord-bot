const Command = require("../base/Command.js");
const applicationQuestions = require("../base/application-questions.js");

class eventrequest extends Command {
    constructor(client) {
        super(client, {
            name: "eventrequest",
            description: "Request an event to be run for you by the Officers",
            category: "Clan",
            usage: "eventrequest",
            guildOnly: false,
            aliases: [],
            permLevel: "User"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars

    }
}

module.exports = eventrequest;