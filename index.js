const config = require('./botconfig.json');
const Discord = require('discord.js');
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")

    if(jsfile.length <= 0)
    {
        console.log("Couldn't find any commands");

        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);

        bot.commands.set(props.help.triggers, props);
    });
});

const activity_list = [
    "with the !help command.",
    "with the developers console",
    "with some code",
    "with your lives"
];


bot.on("ready", async () => {
    console.log(`${bot.user.username} is now online!`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activity_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        bot.user.setActivity(activity_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 60000);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args    = messageArray.slice(1); //takes the first item off the list aka the command

    let commandfile = bot.commands.get(command.slice(prefix.length));

    if(commandfile)
    {
        commandfile.run(bot, message, args);
    }
});

bot.login(config.token);