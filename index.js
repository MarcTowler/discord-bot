const config = require('./botconfig.json');
const { Client, RichEmbed } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();
const https = require('https');

const bot = new Client();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is now online!`);
    bot.user.setGame("on G4G");
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args    = messageArray.slice(1); //takes the first item off the list aka the command

    // If the message is "how to embed"
    if (command === `${prefix}points`) {
        if (args[0] === 'pve' && args[1] === 'top10') {
            // We can create embeds using the MessageEmbed constructor
            // Read more about all that you can do with the constructor
            // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
            const embed = new RichEmbed()
            // Set the title of the field
                .setTitle('Top 10 PvE Points')
                // Set the color of the embed
                .setColor(0xFF0000)
                // Set the main content of the embed
                .setDescription('1) TestName (1,000)\n2) King Diddy (800)');
            // Send the embed to the same channel as the message
            message.channel.send(embed);
        } else if(args[0] === "pve") {
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

    //check for !hi
    if(command === `${prefix}roulette`)
    {
        https.get('https://api.itslit.uk/games/roulette/' + message.author.tag, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                message.channel.send(data);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }

    if(command === `${prefix}8ball`)
    {
        https.get('https://api.itslit.uk/games/eightball/' + message.author.tag, (resp) => {
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

    if(command === `${prefix}archive`)
    {
        https.get('https://api.itslit.uk/G4G/archive/' + args[0] + '/' + args[1] + '/' + args[2] + '/' + message.author.tag, (resp) => {
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
});

bot.login(config.token);