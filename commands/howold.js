const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    //get timestamp for joining discord server
    let discTime = message.guild.member(message.author.id).joinedTimestamp;

    //Get current timestamp
    let now = new Date().getTime();

    //Convert the time difference and move to seconds
    let difference = (now - discTime) / 1000;

    //Convert into readable string
    years = Math.floor(difference / ((3600*24)*365));
    difference -= years*3600*24*365;

    days = Math.floor(difference / (3600*24));
    difference -= days*3600*24;

    hours = Math.floor(difference/3600);
    difference -= hours*3600;

    mins = Math.floor(difference / 60);
    difference -= mins * 60;

    return message.channel.send(`<@${message.author.id}> you have been a part of our discord for ${years} years, ${days} days, ${hours} hours, ${mins} minutes and ${difference} seconds`);
}

module.exports.help = {
    name: "How old in Discord",
    triggers: "howold",
    description: `See how long you have been in the Clan's Discord for`
}