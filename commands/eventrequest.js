const Discord = require("discord.js");
let applicationQuestions = require("../application-questions.js");

module.exports.dm = async(bot, message) => {
    console.log("yay");
}
module.exports.run = async(bot, message, args) => {

}

module.exports.help = {
    name: "Request an Event",
    triggers: "eventrequest",
    description: `Request an event to be run for you by the Officers`,
    role: "everyone"
}
