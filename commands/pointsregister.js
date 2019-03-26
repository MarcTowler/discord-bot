const Command = require("../base/Command.js");
const https = require('https');

class PointsRegister extends Command {
    constructor(client) {
        super(client, {
            name: "pointsregister",
            description: "Register your Discord account with the PvE and PvP points system.",
            category: "Clan",
            usage: "pointsregister <BUNGIE NAME>",
            guildOnly: true,
            aliases: [],
            permLevel: "User"
        });
    }

    async run(message, args, level) {
        if (args.length !== 1) {
            return message.channel.send(`Something did not look right there ${message.member.displayName}, please read the description:\n ${this.help.usage}`);
        }
        https.get(`https://api.itslit.uk/G4G/register/${message.member.id}/${args[0]}`, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                message.channel.send(data);
            });
        }).on("error", (err) => {
            message.channel.send(`It seems that something has gone wrong, <@131526937364529152> has been notified and is looking into it.`);cd
            message.guild.fetchMember('131526937364529152').then(user => {
                user.send(`A new error has occured in ${message.channel.name} caused by ${message.author.username}` +
                    ` using !${this.conf.name} ${args}.\n The Error was ${err.message}`)
            });
        });
    }
}

module.exports = PointsRegister;