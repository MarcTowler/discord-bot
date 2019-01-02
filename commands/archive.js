const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {
    if(message.member.roles.find("name", "test rank"))
    {
        https.get('https://api.itslit.uk/G4G/archive/' + args[0] + '/' + args[1] + '/' + args[2] + '/' + message.author.username, (resp) => {
            let data = '';

            //a chunk of data has been received
            resp.on('data', (chunk) => {
                data += chunk;
            });

            //the whole response is here
            resp.on('end', () => {
                if(data.includes('The event'))
                {
                    message.delete().catch(O_o=>{});
                }
                message.channel.send(data);
            });
        }).on("error", (err) => {
            message.channel.send(`It seems that something has gone wrong, <@131526937364529152> has been notified and is looking into it.`);
            message.guild.fetchMember('131526937364529152').then(user => {user.send(`A new error has occured in ${message.channel.name} caused by ${message.author.username}` +
                ` using !${this.help.triggers} ${args}.\n The Error was ${err.message}`)});
        });
    } else {
        return message.channel.send("You do not have the correct role to archive");
    }
}

module.exports.help = {
    name: "archive",
    triggers: "archive",
    description: "An event archive command for G4G"
}