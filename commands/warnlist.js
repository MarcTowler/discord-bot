const Command = require("../base/Command.js");
const http = require('https');
const Discord = require('discord.js');

class warnlist extends Command {
    constructor(client) {
        super(client, {
            name: "warnlist",
            description: "Pulls a list of warnings",
            category: "Clan",
            usage: "warnlist <username>",
            guildOnly: true,
            aliases: [],
            permLevel: "Clan Council"
        });
    }

    async run(message, args, level) {
        if(args.length < 1) return message.reply('Remember, `!warnlist <user>` is the command, use it!');
      
        let mentioned = message.mentions.users.first().username || message.guild.member(args[0]);

        http.get(`https://api.itslit.uk/G4G/get_users_warn/${mentioned}`, (resp) => {

            let data = '';

            //a chunk of data has been received
            resp.on('data', (chunk) => {
                data += chunk;
            });

            //the whole response is here
            resp.on('end', () => {
                let jData = JSON.parse(data);
              
                let warnings = jData['response'];
                var content = `\`\`\`Warning history for ${mentioned}\n==========\n\n`;
              
                if(warnings == '')
                {
                    content = content + "No warnings issued";
                } else {
                    var j = 1;
                    
                    for(var i=0; i < warnings.length; i++)
                    {
                        if(warnings[i]['active'] == 0)
                        {
                            content = content + `${j}: PARDONED: (#${warnings[i]['id']}) Issued by ${warnings[i]['sender']} - Reason: ${warnings[i]['reason']}\n`;
                        } else {
                            content = content + `${j}: (#${warnings[i]['id']}) Issued by ${warnings[i]['sender']} - Reason: ${warnings[i]['reason']}\n`;
                        }
                    
                        j++;
                    }
                }
              
                message.channel.send(content + '```');
            });
        });

        //post it to the API for storage
    }
}

module.exports = warnlist;