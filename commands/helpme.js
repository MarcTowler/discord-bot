const Command = require("../base/Command.js");
const { version } = require("discord.js");

class helpMe extends Command {
    constructor(client) {
        super(client, {
            name: "Halp",
            usage: "helpme",
            description: `Lets help the user out`,
            role: "everyone"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        fs.readdir("./commands", (err, files) => {

            let command = [];
            let sCommand = '\n';

            if (err) console.log(err);

            let jsfile = files.filter(f => f.split(".").pop() === "js")

            if (jsfile.length <= 0) {
                console.log("Couldn't find any commands");

                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./${f}`);

                if (typeof props.help === "undefined") {
                    console.log("undefined");

                } else {
                    // NEED TO NOW LOOK FOR PROPS.HELP.ROLE AND IF IT IS NONE, PROCEED, IF IT IS A ROLE THEN CHECK AGAINST USER ROLE BEFORE ADDING
                    if (props.help.role === "none") {
                    } else if (props.help.role !== 'everyone') {
                        if (props.help.role == "Clan Council") {
                            let councilRole = message.guild.roles.find(role => role.name === "Clan Council");
                            if (message.member.roles.has(councilRole.id)) {
                                sCommand = sCommand + `**${props.help.name}** - ${props.help.description}\n`;
                                command[props.help.name] = props.help.description;
                            }
                        } else if (props.help.role == "Officer") {
                            let officerRole = message.guild.roles.find(role => role.name === "Officer");

                            if (message.member.roles.has(officerRole.id)) {
                                sCommand = sCommand + `**${props.help.name}** - ${props.help.description}\n`;
                                command[props.help.name] = props.help.description;
                            }
                        }
                    } else {
                        //console.log(props.help.name);
                        //console.log(`${props.help.name} - ${props.help.description}`);
                        sCommand = sCommand + `**${props.help.name}** - ${props.help.description}\n`;
                        command[props.help.name] = props.help.description;
                    }
                }
            });

            let oEmbed = new Discord.RichEmbed()
                .setAuthor("TheSpeakerBot")
                .setTitle("Help File")
                .setColor(0x00ff00)
                .setDescription(sCommand);
            return message.author.send(oEmbed);
        });
    }
}

module.exports = helpMe;
