const fs = require("fs");
const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    let command = [];
    let sCommand;

    fs.readdir("./commands", (err, files) => {

        if(err) console.log(err);

        let jsfile = files.filter(f => f.split(".").pop() === "js")

        if(jsfile.length <= 0)
        {
            console.log("Couldn't find any commands");

            return;
        }

        jsfile.forEach((f, i) => {
                let props = require(`./${f}`);

                if (typeof props.help === "undefined") {
                    console.log("undefined");

                } else {
                    //console.log(`${props.help.name} - ${props.help.description}`);
                    sCommand = sCommand + `**${props.help.name}** - ${props.help.description}\n`;
                    command[props.help.name] = props.help.description;
                }
        });
    });
    //console.log(command);
console.log(sCommand);
    let oEmbed = new Discord.RichEmbed()
        .setAuthor("TheSpeakerBot")
        .setTitle("Help File")
        .setColor(0x00ff00)
        .setDescription(sCommand);
    return message.author.send(oEmbed);
    /*return message.author.send(
        {
            embed:
                {
                    color: 0x00ff00,
                    author:
                        {
                            name: `Let Me Help You!`,
                            icon_url: message.author.avatarURL
                            //icon_url: "https://cdn2.iconfinder.com/data/icons/free-basic-icon-set-2/300/6-128.png",
                        },

                    description: desc
                }
        });*/
}

module.exports.help = {
    name: "Halp",
    triggers: "helpme",
    description: `Lets help the user out`
}
