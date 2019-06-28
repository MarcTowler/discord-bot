const Command = require("../base/Command.js");
const http = require('https');
const Discord = require('discord.js');

class getwarn extends Command {
    constructor(client) {
        super(client, {
            name: "getwarn",
            description: "Retrieves information on a warning",
            category: "Clan",
            usage: "getwarn <id>",
            guildOnly: true,
            aliases: [],
            permLevel: "Officer"
        });
    }

    async run(message, args, level) {
        if(args.length < 1) return message.reply('Remember, `!getwarn <id>` is the command, use it!');
      
        http.get(`https://api.itslit.uk/G4G/get_warn/${args[0]}`, (resp) => {

            let data = '';

            //a chunk of data has been received
            resp.on('data', (chunk) => {
                data += chunk;
            });

            //the whole response is here
            resp.on('end', () => {
                let jData = JSON.parse(data);

                if(jData['response'] == false)
                {
                    return essage.reply(`Warning #${args[0]} was pardoned`);
                }

                let embed = new Discord.RichEmbed()
                    .setTitle(`Warning #${args[0]}`)
                    .setColor('#7ec0ee')
                    .addField(`Warned by ${jData['response']['sender']}`, `Reason: ${jData['response']['reason']}`);
                
                message.reply(embed);
            });
        });
    }
}

module.exports = getwarn;