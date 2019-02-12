const Command = require("../base/Command.js");
const https = require('https');

class Flip extends Command {
    constructor(client) {
        super(client, {
            name: "Flip",
            description: "A simple Coin Toss game",
            category: "Games",
            usage: "flip <Heads/Tails>",
            guildOnly: true,
            aliases: [],
            permLevel: "User"
        });
    }

    async run(message, args, level) {
        https.get(`https://api.itslit.uk/games/cointoss/${message.member.displayName}/${args[0]}`, (resp) => {

            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                message.channel.send(data);
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

module.exports = Flip;