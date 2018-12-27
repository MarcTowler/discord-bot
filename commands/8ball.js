const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {
    https.get('https://api.itslit.uk/games/eightball/' + message.author.tag, (resp) => {
        let data = '';

        //a chunk of data has been received
        resp.on('data', (chunk) => {
            data += chunk;
        });

        //the whole response is here
        resp.on('end', () => {
            message.channel.send(':8ball: ' + data + ' :8ball:');
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

module.exports.help = {
    name: "8ball",
    triggers: "8ball",
    description: "Get a prediction for your yes or no question"
}