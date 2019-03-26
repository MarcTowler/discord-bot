const Command = require("../base/Command.js");
const answers = require('../base/EightballAnswers.js');

class EightBall extends Command {
    constructor(client) {
        super(client, {
            name: "eightBall",
            description: "A virtual magic 8 ball.",
            category: "Games",
            usage: "8ball <question>",
            guildOnly: true,
            aliases: ["lexa8ball", "8ball"],
            permLevel: "User"
        });
    }

    async run(message, [action, key, ...value], level) { // eslint-disable-line no-unused-vars
        if(message.content.endsWith('?'))
        {
            message.reply(`🎱 ${answers[Math.floor(Math.random() * answers.length)]}`);
        } else {
            message.reply(`🎱 That doesn't look like a question, try again please.`);
        }
    }
}

module.exports = EightBall;
