const Command = require("../base/Command.js");
const { version } = require("discord.js");
const https = require('http');
const applicationQuestions = require("../application-questions.js");

class eventRequest extends Command {
    constructor(client) {
        super(client, {
            name: "Request an Event",
            usage: "eventrequest",
            description: `Request an event to be run for you by the Officers`,
            role: "everyone"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
    }
}

module.exports = eventRequest;