const Command = require("../base/Command.js");
const http = require('https');
const Discord = require('discord.js');

class warn extends Command {
    constructor(client) {
        super(client, {
            name: "warn",
            description: "Add a warning to a user",
            category: "Clan",
            usage: "warn <username> <reason>",
            guildOnly: true,
            aliases: [],
            permLevel: "Officer"
        });
    }

    async run(message, args, level) {
        if(args.length < 2) return message.reply('Remember, `!warn <user> <reason>` is the command, use it!');
      
        let mentioned = message.mentions.users.first().username || message.guild.member(args[0]);
      
        let shifted = args.slice(1).join(" ");

        let payload = JSON.stringify({
            'user': mentioned,
            'sender': message.author.username,
            'reason': shifted
        });

        let data = '';

        const options = {
            hostname: 'api.itslit.uk',
            path: '/G4G/add_warn',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length
            }
        };

        const req = http.request(options, (res) => {
            res.on('data', (d) => {
                data += d;
            });

            res.on('end', () => {
                if(res.statusCode === 200) {
                    let jData = JSON.parse(data);
                    let embed = Discord.RichEmbed()
                        .setColor('#ffae42')
                        .setTitle(`New Warning`)
                        .addField(`Warning #${jData['response']}`, `${mentioned} was warned by ${message.author.username}`)
                        .addField('Reason', $shifted);

                    message.member.guild.channels.get('483670512111976448').send(embed);
                } else {
                    message.reply('The server is currently unavailable, ping ItsLittany for assistance');
                }
            });

            resp.on('error', () => {
                message.reply('Currently unable to access the warning database, if this persists please ping ItsLittany');
            });
        });

        req.write(payload);
        req.end();
      
        //post it to the API for storage
    }
}

module.exports = warn;