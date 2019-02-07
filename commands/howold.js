const Command = require("../base/Command.js");
const { version } = require("discord.js");
const dateformat = require('dateformat');

class howOld extends Command {
    constructor(client) {
        super(client, {
            name: "How old",
            usage: "howold",
            description: "See how long you have been in the clan's discord for",
            role: "everyone"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        //get timestamp for joining discord server
        console.log(message.author.id);
        let discTime = message.guild.member(message.author.id).joinedTimestamp;
        //let fullDate = new Date(message.guild.member(message.author.id).joinedTimestamp).toISOString().replace(/T/, " at ").replace(/\..+/,'');
        let fullDate = new Date(message.guild.member(message.author.id).joinedTimestamp).toISOString();
        fullDate = dateformat(fullDate, "mediumDate");

        //Get current timestamp
        let now = new Date().getTime();

        //Convert the time difference and move to seconds
        let difference = (now - discTime) / 1000;

        //Convert into readable string
        years = Math.floor(difference / ((3600 * 24) * 365));
        difference -= years * 3600 * 24 * 365;

        days = Math.floor(difference / (3600 * 24));
        difference -= days * 3600 * 24;

        hours = Math.floor(difference / 3600);
        difference -= hours * 3600;

        mins = Math.floor(difference / 60);
        difference -= mins * 60;

        return message.channel.send(`<@${message.author.id}> you joined our discord on ${fullDate}. Which means you have been a member for ${years} years, ${days} days, ${hours} hours, ${mins} minutes and ${Math.round(difference)} seconds`);
    }
}

module.exports = howOld;
