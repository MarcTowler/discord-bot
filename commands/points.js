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
    if(args[0].toLowerCase() === "pvp" || args[0].toLowerCase() === "pve")
    {
        switch (args.length)
        {
            //can either be a top 10 call OR a user calling someone else's stats
            case 2:
                //lets check for top10
                if(args[1].toLowerCase() === 'top10')
                {
                    console.log(message.author.tag);
                    https.get(`https://api.itslit.uk/G4G/getList/${args[1]}/${args[0]}/`, (resp) => {

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
                                return element > message.author.username
                            });

                            message.channel.send({embed: {
                                color: 0x00ff00,
                                author: {
                                    name: `${args[0]} Top 10 Ranked Players`,
                                    /*icon_url: "https://cdn2.iconfinder.com/data/icons/free-basic-icon-set-2/300/6-128.png",*/
                                },
                                description: `01) ${newvalues[0].name} - ${newvalues[0].points}\n` +
                                    `02) ${newvalues[1].name} - ${newvalues[1].points}\n` +
                                    `03) ${newvalues[2].name} - ${newvalues[2].points}\n` +
                                    `04) ${newvalues[3].name} - ${newvalues[3].points}\n` +
                                    `05) ${newvalues[4].name} - ${newvalues[4].points}\n` +
                                    `06) ${newvalues[5].name} - ${newvalues[5].points}\n` +
                                    `07) ${newvalues[6].name} - ${newvalues[6].points}\n` +
                                    `08) ${newvalues[7].name} - ${newvalues[7].points}\n` +
                                    `09) ${newvalues[8].name} - ${newvalues[8].points}\n` +
                                    `10) ${newvalues[9].name} - ${newvalues[9].points}\n`
                            }
                            });
                        }).on("error", (err) => {
                            console.log("Error: " + err.message);
                        });

                    });
                } else {
                    //It should be calling another user's stats
                    https.get(`https://api.itslit.uk/G4G/getList/1/${args[0].toLowerCase()}/${args[1].toLowerCase()}/${message.author.username}/plain/true`, (resp) => {
                    let data = '';

                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    resp.on('end', () => {
                        message.channel.send({embed: {
                                color: 0x00ff00,
                                author: {
                                    name: message.author.username,
                                    icon_url: message.author.avatarURL
                                },
                                fields: [{
                                    name: `${args[1]} - ${message.author.username}`,
                                    value: data
                                }]
                            }
                        });
                    });
                    }).on("error", (err) => {
                        console.log(`Error: ${err.message}`);
                    });
                }

                break;
            //Calling their own stats
            case 1:
                //Quick check to make sure that PvE or PvP is set
                https.get(`https://api.itslit.uk/G4G/getList/1/${args[0].toLowerCase()}/null/${message.author.username}/plain/true`, (resp) => {
                    let data = '';

                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    resp.on('end', () => {
                        return message.channel.send(data.toString());
                    });
                }).on("error", (err) => {
                    console.log(`Error: ${err.message}`);
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
    name: "points",
    triggers: "points",
    description: "See where you stand in G4G's PvE or PvP clan leaderboards!"
}