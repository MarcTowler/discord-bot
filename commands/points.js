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
                    //TBC
                    console.log('top10 called');
                } else {
                    //It should be calling another user's stats
                    https.get(`https://api.itslit.uk/G4G/getList/1/${args[0].toLowerCase()}/${args[1].toLowerCase()}/${message.author.username}/plain/true`, (resp) => {
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