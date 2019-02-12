const Command = require("../base/Command.js");
const https = require('https');

class Howfar extends Command {
    constructor(client) {
        super(client, {
            name: "howfar",
            description: "Shows you how far you are from levelling up on the points ladder specified.",
            category: "Clan",
            usage: "howfar <PvP/PvE>",
            guildOnly: true,
            aliases: [],
            permLevel: "Web Team"
        });
    }

    async run(message, args, level) {
        //pull in the points from the db
        let points;
        let difference = 0;
        let rank;

        if (args.length === 0) {
            return message
                .channel
                .send(`Something didn't quite go right, try !${this.help.usage}`);
        }

        https.get(`https://api.itslit.uk/G4G/getList/1/${args[0].toLowerCase()}/null/${message.author.username}/json/false`, (resp) => {
            let data = '';
            args[0] = (args[0] === "pve") ? "PvE" : "PvP";

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                //points = parseInt(data.split(",")[2].replace(`${args[0]} Points`, '')) || 0;
                points = (typeof data.split(",")[2] === 'undefined') ? 0 : parseInt(data.split(",")[2].replace(`${args[0]} Points`, ''));

                //TODO replace with https://pastebin.com/Xg14CKF8
                /*
                const calculate = (input) => {

        objIntervals.map((interval)=> {
            if(input >= interval.min && input < interval.max) {
                return interval.max - input;
            }
        }
    }

    difference = calculate(points);

    const objIntervals = {
        {
        min: 0,
        max: 1500
        },

        {
        min: 1500,
        max: 3500
        }
    //
    more objects

    }
                 */
                if (points < 1500) {
                    difference = 1500 - points;
                    //rank = "Harbinger";
                } else if (points >= 1500 && points < 3000) {
                    difference = 3000 - points;
                } else if (points >= 3000 && points < 4500) {
                    difference = 4500 - points;
                } else if (points >= 4500 && points < 6000) {
                    difference = 6000 - points;
                } else if (points >= 6000 && points < 7500) {
                    difference = 7500 - points;
                } else {
                    difference = 0;
                }

                return message.channel.send(`<@${message.author.id}> You have ${difference} points left until your next rank up in ${args[0]}`);
            });
        }).on("error", (err) => {
            message.channel.send(`It seems that something has gone wrong, <@131526937364529152> has been notified and is looking into it.`);
            message.guild.fetchMember('131526937364529152').then(user => {
                user.send(`A new error has occured in ${message.channel.name} caused by ${message.author.username}` +
                    ` using !${this.conf.name} ${args}.\n The Error was ${err.message}`)
            });
        });
        //compare against rank up lists
        //Calc the difference
        //Return
    }
}

module.exports = Howfar;