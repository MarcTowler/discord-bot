const Command = require("../base/Command.js");
const { version } = require("discord.js");
const https = require('https');

class removePoints extends Command {
    constructor(client) {
        super(client, {
            name: "Remove Points",
            usage: "removepoints",
            description: "Remove points from a user in either the PvP or PvE ladders, the syntax is !removepoints <Ladder Name> <Username> <amount>",
            role: "Clan Council"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        if (args.length < 3) {
            return message.channel.send(this.help.description);
        }

        let allowedAccess = message.guild.roles.find("name", "Clan Council");

        if (allowedAccess === null) {
            return message.channel.send(`Sorry ${message.member.displayName} but you do not have sufficient permissions to remove points`);
        }

        if (!message.member.roles.has(allowedAccess.id)) {
            return message.channel.send(`Sorry ${message.member.displayName} but you do not have sufficient permissions to remove points`);
        }

        args[1] = (args[1].substr(0, 2) === '<@') ? message.mentions.members.first().user.username : args[1];

        https.get(`https://api.itslit.uk/G4G/remove/${args[0]}/${args[1]}/${args[2]}/${message.member.displayName}`, (resp) => {
            let data = '';

            //a chunk of data has been received
            resp.on('data', (chunk) => {
                data += chunk;
            });

            //the whole response is here
            resp.on('end', () => {
                return message.channel.send(`${args[0]} points have been removed from ${args[1]}'s ${args[2]} score`);
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

module.exports = removePoints;