const Command = require("../base/Command.js");
const { version } = require("discord.js");
const https = require('http');

class addpoints extends Command {
    constructor(client) {
        super(client, {
            name: "Add Points",
            description: "Gives some useful bot statistics.",
            usage: "addpoints",
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        if (args.length < 3) {
            return message.channel.send("Add points to a user in either the PvP or PvE ladders, the syntax is !$addpoints <Ladder Name> <Username> <amount>");
        }

        let allowedAccess = message.guild.roles.find("name", "Clan Council");

        if (allowedAccess === null) {
            return message.channel.send(`Sorry ${message.member.displayName} but you do not have sufficient permissions to add points`);
        }

        if (!message.member.roles.has(allowedAccess.id)) {
            return message.channel.send(`Sorry ${message.member.displayName} but you do not have sufficient permissions to add points`);
        }

        args[1] = (args[1].substr(0, 2) === '<@') ? message.mentions.members.first().user.username : args[1];

        https.get(`https://api.itslit.uk/G4G/add/${args[0]}/${args[1]}/${args[2]}/${message.member.displayName}`, (resp) => {
            let data = '';

            //a chunk of data has been received
            resp.on('data', (chunk) => {
                data += chunk;
            });

            //the whole response is here
            resp.on('end', () => {
                return message.channel.send(`${args[0]} points have been added to ${args[1]}'s ${args[2]} score`);
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

module.exports = addpoints;