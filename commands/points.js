const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {
    if(args.length <= 0)
    {
        return message
            .channel
            .send(`Something didn't quite go right, !${this.help.triggers} requires PvE or PvP as a minimum argument. Try again with !${this.help.triggers} PvE or !${this.help.triggers} PvP`);
    }
    
    //Lets make sure they used pve or pvp for the right leaderboards...
    if(args[0].toLowerCase() === "pvp" || args[0].toLowerCase() === "pve" || args[0].toLowerCase() === "gambit")
    {
        switch (args.length)
        {
            //can either be a top 10 call OR a user calling someone else's stats
            case 2:
                //lets check for top10
                if(args[1].toLowerCase() === 'top10')
                {
                    console.log(message.author.tag);
                    //https.get(`https://api.itslit.uk/G4G/getList/${args[1]}/${args[0]}/`, (resp) => {
                    https.get(`https://api.itslit.uk/G4G/getList/all/${args[1]}/${args[0]}`, (resp) => {

                        args[0] = (args[0].toLowerCase() === 'pve') ? 'PvE' : 'PvP';

                        let data = '';

                        //a chunk of data has been received
                        resp.on('data', (chunk) => {
                            data += chunk;
                        });

                        //the whole response is here
                        resp.on('end', () => {
                            let jsonData = JSON.parse(data);
                            let values = Object.values(jsonData);
                            let newvalues = values.find(function(element) {
                                return element > message.member.displayName
                            });

                            let pos = newvalues.findIndex(name => name.Name === message.author.username);

                            if((pos + 1) > 10) {
                                message.channel.send({
                                    embed: {
                                        color: 0x00ff00,
                                        author: {
                                            name: `${args[0]} Top 10 Ranked Players`,
                                            icon_url: "https://cdn2.iconfinder.com/data/icons/free-basic-icon-set-2/300/6-128.png",
                                        },

                                        description: `01) ${newvalues[0].Name} - ${newvalues[0].points}\n` +
                                            `02) ${newvalues[1].Name} - ${newvalues[1].points}\n` +
                                            `03) ${newvalues[2].Name} -  ${newvalues[2].points}\n` +
                                            `04) ${newvalues[3].Name} -  ${newvalues[3].points}\n` +
                                            `05) ${newvalues[4].Name} -  ${newvalues[4].points}\n` +
                                            `06) ${newvalues[5].Name} -  ${newvalues[5].points}\n` +
                                            `07) ${newvalues[6].Name} -  ${newvalues[6].points}\n` +
                                            `08) ${newvalues[7].Name} -  ${newvalues[7].points}\n` +
                                            `09) ${newvalues[8].Name} -  ${newvalues[8].points}\n` +
                                            `10) ${newvalues[9].Name} -  ${newvalues[9].points}\n` +
                                            `...\n`+
                                            `**${pos+1}) ${newvalues[pos].Name} - ${newvalues[pos].points}**\n`
                                    }
                                });
                            } else {
                                let desc = '';

                                for(let i = 0; i < 10; i++)
                                {
                                    desc += (i === pos) ? `**[0${i+1}) ${newvalues[i].Name} - ${newvalues[i].points}]**\n` : `0${i+1}) ${newvalues[i].Name} - ${newvalues[i].points}\n`;
                                }

                                message.channel.send({
                                    embed: {
                                        color: 0x00ff00,
                                        author: {
                                            name: `${args[0]} Top 10 Ranked Players`,
                                            icon_url: "https://cdn2.iconfinder.com/data/icons/free-basic-icon-set-2/300/6-128.png",
                                        },

                                        description: desc
                                    }
                                });
                            }
                        }).on("error", (err) => {
                            message.channel.send(`It seems that something has gone wrong, <@131526937364529152> has been notified and is looking into it.`);
                            message.guild.fetchMember('131526937364529152').then(user => {user.send(`A new error has occured in ${message.channel.name} caused by ${message.author.username}` +
                                ` using !${this.help.triggers} ${args}. ${err.message}`)});
                        });

                    });
                } else {
                    //It should be calling another user's stats

                    //lets check to see if @ has been used to tag someone
                    args[1] = (args[1].substr(0,2) === '<@') ? message.mentions.members.first().user.username : args[1];

                    https.get(`https://api.itslit.uk/G4G/getList/1/${args[0].toLowerCase()}/null/${args[1].toLowerCase()}/plain/true`, (resp) => {
                    let data = '';

                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    resp.on('end', () => {
                        var REmbed;

                        args[0] = (args[0] === "pve") ? "PvE" : "PvP";

                        if(data.startsWith("Sorry but", data))
                        {
                            REmbed = new Discord.RichEmbed()
                                .setColor(0x00ff00)
                                .setTitle(`${args[1]}'s ${args[0]} stats`)
                                .setDescription(data);
                        } else {
                            let dataArr = data.split(', ');
                            let rank = dataArr[1].split(': ')[1];
                            let points = dataArr[2].split(' ')[0];
                            let badge = `https://clanevents.net/images/G4G/rank${Math.floor(points / 1500)}.png`;
                            let prestige = dataArr[0].split(': ')[1];

                            REmbed = new Discord.RichEmbed()
                                .setThumbnail(badge)
                                .setColor(0x00ff00)
                                .setTitle(`${args[1]}'s ${args[0]} stats`)
                                .addField(`${args[0]} Rank`, rank)
                                .addField(`${args[0]} points`, points)
                                .addField(`Number of ${args[0]} Prestiges`, prestige);
                        }
                        message.channel.send(REmbed);

                    });
                    }).on("error", (err) => {
                        message.channel.send(`It seems that something has gone wrong, <@131526937364529152> has been notified and is looking into it.`);
                        message.guild.fetchMember('131526937364529152').then(user => {user.send(`A new error has occured in ${message.channel.name} caused by ${message.author.username}` +
                            ` using !${this.help.triggers} ${args}. ${err.message}`)});
                    });
                }

                break;
            //Calling their own stats
            case 1:
                //Quick check to make sure that PvE or PvP is set
                https.get(`https://api.itslit.uk/G4G/getList/1/${args[0].toLowerCase()}/null/${message.author.username}/plain/true`, (resp) => {
                    let data = '';
                    args[0] = (args[0] === "pve") ? "PvE" : "PvP";

                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    resp.on('end', () => {
                        var REmbed;

                        if(data.startsWith("Sorry but", data))
                        {
                            REmbed = new Discord.RichEmbed()
                                .setColor(0x00ff00)
                                .setTitle(`${message.member.displayName}'s ${args[0]} stats`)
                                .setDescription(data);
                        } else {
                            let dataArr = data.split(', ');
                            let rank = dataArr[1].split(': ')[1];
                            let points = dataArr[2].split(' ')[0];
                            let badge = `https://clanevents.net/images/G4G/rank${Math.floor(points / 1500)}.png`;
                            let prestige = dataArr[0].split(': ')[1];

                            REmbed = new Discord.RichEmbed()
                                .setThumbnail(badge)
                                .setColor(0x00ff00)
                                .setTitle(`${message.member.displayName}'s ${args[0]} stats`)
                                .addField(`${args[0]} Rank`, rank)
                                .addField(`${args[0]} points`, points)
                                .addField(`Number of ${args[0]} Prestiges`, prestige);
                        }
                        message.channel.send(REmbed);
                    });
                }).on("error", (err) => {
                    message.channel.send(`It seems that something has gone wrong, <@131526937364529152> has been notified and is looking into it.`);
                    message.guild.fetchMember('131526937364529152').then(user => {user.send(`A new error has occured in ${message.channel.name} caused by ${message.author.username}` +
                        ` using !${this.help.triggers} ${args}.\n The Error was ${err.message}`)});
                });

                break;
            default: //Something went wrong
                return message
                    .channel
                    .send(`Something didn't quite go right, !${this.help.triggers} requires PvE or PvP as a minimum argument. Try again with !${this.help.triggers} PvE or !${this.help.triggers} PvP`);
        }
    } else {
        return message
            .channel
            .send(`Something didn't quite go right, !${this.help.triggers} requires PvE or PvP as a minimum argument. Try again with !${this.help.triggers} PvE or !${this.help.triggers} PvP`);
    }
}

module.exports.help = {
    name: "Points",
    triggers: "points",
    description: "See where you stand in G4G's PvE or PvP clan leaderboards!",
    role: "everyone"
}