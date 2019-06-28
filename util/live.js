const Discord = require('discord.js');
const https = require('https');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/streamers');

module.exports = async (client) => {
    db.serialize(function() {
        db.each("SELECT name FROM streamers", function(error, row) {
            https.get(`https://api.itslit.uk/Twitch/status/${row.name}/`, (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });
    
                resp.on('end', () => {
                    var jsonData = JSON.parse(data);
                    if(jsonData['response']['username'] == row.name)
                    {
                        if(checklive(row.name) == 0)
                        { 
                            client.channels.get('474495887259729920').send(`Hey @here ${row.name} is now live! Go check them out and give a little support!`);
                            let embed = new Discord.RichEmbed()
                            .setThumbnail(jsonData['response']['image'])
                            .setTitle(`${row.name} is now live`)
                            .setDescription(`${jsonData['response']['title']}`)
                            .setURL(`https://twitch.tv/${jsonData['response']['username']}`);

                            client.channels.get('474495887259729920').send(embed);

                            togglelive(row.name, 1);
                        } else {
                          console.log("something went wrong")
                        }                    
                    } else {
                        //they are no longer live, update the DB
                        togglelive(row.name, 0);
                    }
                })
            })
        })
    })
}

function checklive(name)
{
    let sql = "SELECT live FROM streamers WHERE name = ?";
  
    db.get(sql, [name], (err, row) => {
        return row.live;
    })

}

function togglelive(name, value)
{
    db.run("UPDATE STREAMERS SET live=? WHERE name = ?", [value, name], (err, row) => {
        if (err) {
            return console.error(err.message);
          }
    })

}