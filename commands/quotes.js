const Command = require("../base/Command.js");
const { version } = require("discord.js");
const https = require('https');

class quotes extends Command {
    constructor(client) {
        super(client, {
            name: "Random Quote",
            usage: "quotes",
            description: `Pulls a random quote from the database, add a quote with !quotes add <quote>`,
            role: "everyone"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars

        if (args.length === 0) {
            https.get('https://api.itslit.uk/Lists/randItem/G4G/quotes/true/plain', (resp) => {
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
                message.channel.send(`It seems that something has gone wrong, <@131526937364529152> has been notified and is looking into it.`);
                message.guild.fetchMember('131526937364529152').then(user => {
                    user.send(`A new error has occured in ${message.channel.name} caused by ${message.author.username}` +
                        ` using !${this.help.triggers} ${args}.\n The Error was ${err.message}`)
                });
            });
        } else {
            if (args[0] === 'add') {
                let toSend = args.join(" ").replace('add ', '');

                https.get(`https://api.itslit.uk/Lists/add/addentry/G4G/quotes/${toSend}/nothing/true`, (resp) => {
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

            } else if (args[0] === 'remove') {
                let toSend = args.join(" ").replace('remove ', '');

                https.get(`https://api.itslit.uk/Lists/remove/item/G4G/quotes/${toSend}/true`, (resp) => {
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
}

module.exports = quotes;
