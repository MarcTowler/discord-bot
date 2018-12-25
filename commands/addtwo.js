const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {
    function addtwo(x, y) {
        return x + y;
    }
    module.exports = addtwo;
}

module.exports.help = {
    name: "addtwo"
}