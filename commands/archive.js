const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {
    if(message.member.roles.find("name", "Officer"))
    {
        //Lets check to see if we have enough arguments
        if(args.length < 3)
        {
            //Missing parameters
            return message.channel.send(`Something wasn't quite right with your submission, you need a minimum of 3 arguments, you supplied ${args.length}.` +
                ` The correct format is \`!${this.help.triggers} <Guilded ID> <DTR ID> <Status>\``);
        }

        if(args.length < 4) {
            https.get(`https://api.itslit.uk/G4G/archive/${args[0]}/${args[1]}/${args[2]}/${message.author.username}/true`, (resp) => {
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

            https.get(`https://api.itslit.uk/G4G/archive/${args[0]}/${args[1]}/${args[2]}/${message.author.username}/true/${shifted}`, (resp) => {
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
    } else {
        return message.channel.send("You do not have the correct role to archive");
    }
}

module.exports.help = {
    name: "archive",
    triggers: "archive",
    description: "An event archive command for G4G",
    role: "officer"
}