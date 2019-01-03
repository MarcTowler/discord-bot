const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {


    return message
        .author
        .send(
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

                    description: `
**8 Ball** - !8ball <question> \n
**Add Points (Council Only)** - !addpoints <Points> <Username> <PvE/PvP>\n
**Archive (Officers Only)** - !archive <Guilded ID> <D2 ID> <status>\n
**Clear (Council Only)** - !clear <amount>\n
**Event Request** - !eventrequest \n
**Flip** - !flip <heads/tails>\n
**Fortune** - !fortune \n
**How Old** - !howold <(optional) Username> \n
**Points** - !points <PvE/PvP> <(optional) Username> \n
**Points Register** - !pointsregister <D2 name> \n
**Remove Points (Council Only)** - !removepoints <amount> <Username> <PvE/PvP> \n
**Roulette** - !roulette \n
**Rock Paper Scissors** - !rps <Rock/Paper/Scissors>`
                    }
            }
        );
}

module.exports.help = {
    name: "Halp",
    triggers: "helpme",
    description: `Lets help the user out`
}
