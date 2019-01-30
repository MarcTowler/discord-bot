const Discord = require("discord.js");
/**
 * TODO
 * - Add restriction flag for 1 react per user
 */
const options = [
    '🇦',
    '🇧',
    '🇨',
    '🇩',
    '🇪',
    '🇫',
    '🇬',
    '🇭',
    '🇮',
    '🇯',
    '🇰',
    '🇱',
    '🇲',
    '🇳',
    '🇴',
    '🇵',
    '🇶',
    '🇷',
    '🇸',
    '🇹',
    '🇺',
    '🇻',
    '🇼',
    '🇽',
    '🇾',
    '🇿',
];

const pollLog = {};

function canSendPoll(user_id) {
    if(pollLog[user_id]) {
        const timeSince = Date.now() - pollLog[user_id].lastPoll;

        if(timeSince < 60000)
        {
            return false;
        }
    }
    return true;
}

module.exports.run = async(bot, message, args) => {
    //!poll QUESTION OPT1 OPT2 OPT3 etc up to 20
    //!poll "question" "option" "option"
    let choices = message.content.match(/"(.+?)"/g);

    //Did we get anything?
    if(choices) {
        //spam protection maybe?
        if(!canSendPoll(message.author.id))
        {
            return message.channel.send(`${message.author} please wait before building another poll`);
        }
        //are we having a yes/no poll?
        if(choices.length === 1) {
            pollLog[message.author.id] = {
                lastPoll: Date.now()
            }
            const question = choices[0].replace(/"/g, '');
            //const question = args[0];

            return message
                .channel
                .send(`${message.author} asks: ${question}`)
                .then(async (pollMessage) => {
                    await pollMessage.react('✅');
                    await pollMessage.react('❎');
                });
        } else {
            choices = choices.map(a => a.replace(/"/g, ''));
            const question = choices[0];
            const questionOptions = [...new Set(choices.slice(1))];
            if (questionOptions.length > 20) {
                return message.channel.send(`${message.author} Polls are limited to 20 options.`);
            } else {
                pollLog[message.author.id] = {
                    lastPoll: Date.now()
                };
                //console.log(questionOptions);
                return message
                    .channel
                    .send(`${message.author} asks: ${question}
${questionOptions
                        .map((option, i) => `${options[i]} - ${option}`).join('\n')}
`)
                    .then(async (pollMessage) => {
                        for (let i = 0; i < questionOptions.length; i++) {
                            await pollMessage.react(options[i]);
                        }
                    });
            }
        }
    }
}

module.exports.help = {
    name: "poll",
    triggers: "poll",
    description: "Create a poll! Votes handled via emoji reaction",
    role: "everyone"
}