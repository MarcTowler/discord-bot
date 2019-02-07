const Command = require("../base/Command.js");
const { version } = require("discord.js");
const https = require('https');

class eightBall extends Command {
    constructor(client) {
        super(client, {
            name: "8ball",
            usage: "8ball",
            description: "Get a prediction for your yes or no question",
            role: "everyone"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        if (args.length === 0) {
            return message.channel.send(":8ball: You need to actually ask me a question! :8ball:")
        }
        console.log(args);
        https.get('https://api.itslit.uk/games/eightball/' + message.author.tag, (resp) => {
            let data = '';

            //a chunk of data has been received
            resp.on('data', (chunk) => {
                data += chunk;
            });

            //the whole response is here
            resp.on('end', () => {
                message.channel.send(':8ball: ' + data + ' :8ball:');
            });
        }).on("error", (err) => {
            message.channel.send(`It seems that something has gone wrong, <@131526937364529152> has been notified and is looking into it.`);
            message.guild.fetchMember('131526937364529152').then(user => {
                user.send(`A new error has occured in ${message.channel.name} caused by ${message.author.username}` +
                    ` using !${this.help.triggers} ${args}.\n The Error was ${err.message}`)
            });
        });
    }
}

module.exports = eightBall;