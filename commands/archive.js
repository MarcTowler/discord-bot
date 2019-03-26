const Command = require("../base/Command.js");
const https = require('https');

class Archive extends Command {
    constructor(client) {
        super(client, {
            name: "archive",
            description: "Officer Archiving command",
            category: "Clan",
            usage: "archive <Guilded ID> <DTR ID> <Finished/DNF/Cancelled> <Notes>",
            guildOnly: true,
            aliases: [],
            permLevel: "Officer"
        });
    }

    async run(message, args, level) {
        //Lets check to see if we have enough arguments
        if (args.length < 3) {
            //Missing parameters
            return message.channel.send(`Something wasn't quite right with your submission, you need a minimum of 3 arguments, you supplied ${args.length}.` +
                ` The correct format is \`!${this.conf.usage}\``);
        }

        let dirtyString = message.member.displayName;
        let clean = dirtyString.replace(/[^a-zA-Z0-9_-]/g, "");
      
        if (args.length < 4) {
            https.get(`https://api.itslit.uk/G4G/archive/${args[0]}/${args[1]}/${args[2]}/${clean}/true`, (resp) => {

                let data = '';

                //a chunk of data has been received
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                //the whole response is here
                resp.on('end', () => {
                    message.channel.send(data);
                });
            }).on("error", (err) => {
                message.guild.fetchMember('131526937364529152').then(user => {
                    user.send(`A new error has occured in ${message.channel.name} caused by ${message.author.username}` +
                        ` using !${this.help.triggers} ${args}.\n The Error was ${err.message}`).then(
                        message.channel.send(`It seems that something has gone wrong, <@131526937364529152> has been notified and is looking into it.`)
                    )
                });
            });
        } else {
            let shifted = args.slice(3).join(" ");

            https.get(`https://api.itslit.uk/G4G/archive/${args[0]}/${args[1]}/${args[2]}/${clean}/true/${encodeURIComponent(shifted)}`, (resp) => {
                let data = '';

                //a chunk of data has been received
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                //the whole response is here
                resp.on('end', () => {
                    message.channel.send(data);
                });
            }).on("error", (err) => {
                message.guild.fetchMember('131526937364529152').then(user => {
                    user.send(`A new error has occured in ${message.channel.name} caused by ${message.author.username}` +
                        ` using !${this.help.triggers} ${args}.\n The Error was ${err.message}`).then(
                        message.channel.send(`It seems that something has gone wrong, <@131526937364529152> has been notified and is looking into it.`)
                    )
                });
            });
        }
    }
}

module.exports = Archive;