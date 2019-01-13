const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    //!poll QUESTION OPT1 OPT2 OPT3 etc up to 20
    //!poll "question" "option" "option"
    let options = message.content.match(/"(.+?)"/g);

    //Did we get anything?
    if(options) {
        //spam protection maybe?
        //are we having a yes/no poll?
        if(options.length === 1) {
            const question = options[0].replace(/"/g, '');
            //const question = args[0];

            return message
                .channel
                .send(`${message.author} asks: ${question}`)
                .then(async (pollMessage) => {
                    await pollMessage.react('✅');
                    await pollMessage.react('❎');
                });
        }
    }
    //return message.channel.send(`Poll command is in development`);
    //return message.channel.send(`Poll command is in development`);
}

module.exports.help = {
    name: "poll",
    triggers: "poll",
    description: "Create a poll! Votes handled via emoji reaction",
    role: "everyone"
}