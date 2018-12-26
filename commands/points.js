const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {
    if (args[0] === 'pve' && args[1] === 'top10') {
        const embed = new Discord.RichEmbed()
        // Set the title of the field
            .setTitle('Top 10 PvE Points')
            // Set the color of the embed
            .setColor(0xFF0000)
            // Set the main content of the embed
            .setDescription('1) TestName (1,000)\n2) King Diddy (800)');

        // Send the embed to the same channel as the message
        message.channel.send(embed);
    } else if(args[0] === "pve") {
        console.log(message.author.tag);
        https.get('https://api.itslit.uk/G4G/getList/1/' + args[0] + '/null/' + message.author.tag + '/plain/true', (resp) => {
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
            console.log("Error: " + err.message);
        });
    }
}

module.exports.help = {
    name: "roulette"
}