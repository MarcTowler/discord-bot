const Command = require("../base/Command.js");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/users');
const http = require('http');

class check extends Command {
    constructor(client) {
        super(client, {
            name: "check",
            description: "Check to make sure you are fully registered",
            category: "System",
            usage: "check",
            guildOnly: true,
            aliases: [],
            permLevel: "User"
        });
    }

    async run(message, args, level) {
        //if(message.channel.id !== '543718193093672960') return;

        http.get(`http://api/G4G/verifyUser/${message.author.id}`, (resp) => {

            let data = '';

            //a chunk of data has been received
            resp.on('data', (chunk) => {
                data += chunk;
            });

            //the whole response is here
            resp.on('end', () => {
                let jsonData = JSON.parse(data);

                if(jsonData['response']['success'])
                {
                    let memberType = (jsonData['response']['memberType'] == 'Member') ? "have joined" : "are pending acceptance into";
                    var clans = '';

                    if(Array.isArray(jsonData['response']['Clan']))
                    {
                        jsonData['response']['Clan'].forEach(function(value){

                        //for(i = 0; i < jsonData['response']['Clan'].length; i++)
                        //{
                            clans = clans + value + " and ";
                        });

                        clans = clans.substring(0, clans.length - 5);
                    } else {
                        clans = jsonData['response']['Clan'];
                    }

                    message.react('✅');
                    message.member.guild.channels.get('538644586394812416').send(`<@${message.author.id}> has verified on Clan Events. They ${memberType} ${clans}. Please verify their age in #pending_pool and add roles!`);

                    db.run('UPDATE users SET division = ? WHERE id = ?', [clans, message.author.id], (err) => {
                        if(err) {
                            message.member.guild.channels.get('544812700459335680').send(`Error updating <@${message.author.id}>'s divisions into the SQLite DB`);
                        }
                    });
                } else {
                    message.react('❎');
                    message.reply(`It seems you still have not fully registered on Clan Events (https://clanevents.net) please do so then re-run `!check`. The message from the site is: \`${jsonData['response']['message']}\``);
                }
            });
        });
    }
}

module.exports = check;