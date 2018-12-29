const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {
    if (args[0] === 'pvp') {
      if (args[1] === undefined) {
          console.log(message.author.tag);
          https.get('https://api.itslit.uk/G4G/getList/all/' + args[0] + '/null/' + message.author.username + '/', (resp) => {
              console.log('https://api.itslit.uk/G4G/all/' + args[0] + '/null/' + message.author.username + '/')
              let data = '';

              //a chunk of data has been received
              resp.on('data', (chunk) => {
                  data += chunk;
              });

              //the whole response is here
              resp.on('end', () => {
                  message.channel.send({embed: {
                    color: 0x00ff00,
                    author: {
                      name: message.author.username,
                      icon_url: bot.user.avatarURL
                    },
                    fields: [{
                      name: "PVP - "+ message.author.username,
                      value: data
                    }]
                  }
                });
              });
          }).on("error", (err) => {
              console.log("Error: " + err.message);
          });
        } else if (args[1] != null) {
              console.log(message.author.tag);
              https.get('https://api.itslit.uk/G4G/getList/all/' + args[0] + '/null/' + args[1] + '/', (resp) => {
                  console.log('https://api.itslit.uk/G4G/all/' + args[0] + '/null/' + args[1] + '/')
                  let data = '';

                  //a chunk of data has been received
                  resp.on('data', (chunk) => {
                      data += chunk;
                  });

                  //the whole response is here
                  resp.on('end', () => {
                      message.channel.send({embed: {
                        color: 0x00ff00,
                        author: {
                          name: message.author.username,
                          icon_url: bot.user.avatarURL
                        },
                        fields: [{
                          name: "PVP - "+ args[1],
                          value: data
                        }]
                      }
                    });
                  });
              }).on("error", (err) => {
                  console.log("Error: " + err.message);
              });
            }
          }
    if (args[0] === 'pve') {
      if (args[1] === undefined) {
          console.log(message.author.tag);
          https.get('https://api.itslit.uk/G4G/getList/all/' + args[0] + '/null/' + message.author.username + '/', (resp) => {
              console.log('https://api.itslit.uk/G4G/all/' + args[0] + '/null/' + message.author.username + '/')
              let data = '';

              //a chunk of data has been received
              resp.on('data', (chunk) => {
                  data += chunk;
              });

              //the whole response is here
              resp.on('end', () => {
                  message.channel.send({embed: {
                    color: 0x00ff00,
                    author: {
                      name: message.author.username,
                      icon_url: bot.user.avatarURL
                    },
                    fields: [{
                      name: "PVE",
                      value: data
                    }]
                  }
                });
              });
            }).on("error", (err) => {
              console.log("Error: " + err.message);
          });
        } else if (args[1] != null) {
          console.log(message.author.tag);
          https.get('https://api.itslit.uk/G4G/getList/all/' + args[0] + '/null/' + args[1] + '/', (resp) => {
              console.log('https://api.itslit.uk/G4G/all/' + args[0] + '/null/' + args[1] + '/')
              let data = '';

              //a chunk of data has been received
              resp.on('data', (chunk) => {
                  data += chunk;
              });

              //the whole response is here
              resp.on('end', () => {
                  message.channel.send({embed: {
                    color: 0x00ff00,
                    author: {
                      name: message.author.username,
                      icon_url: bot.user.avatarURL
                    },
                    fields: [{
                      name: "PVE - "+ message.author.username,
                      value: data
                    }]
                  }
                });
              });
            }).on("error", (err) => {
              console.log("Error: " + err.message);
          });
        }
      }
    if (args[0] === 'top10') {
      if (args[1] === 'pve') {
          console.log(message.author.tag);
          https.get('https://api.itslit.uk/G4G/getList/' + args[0] + '/' + args[1] + '/', (resp) => {
              console.log('https://api.itslit.uk/G4G/' + args[0] + '/' + args[1] + '/')
              let data = '';

              //a chunk of data has been received
              resp.on('data', (chunk) => {
                  data += chunk;
              });

              //the whole response is here
              resp.on('end', () => {
                var jsonData = JSON.parse(data);
                var values = Object.values(jsonData)
                var newvalues = values.find(function(element) {
                  return element > message.author.username
                });

                  message.channel.send({embed: {
                    color: 0x00ff00,
                    author: {
                      name: "PVE Top 10 Ranked Players",
                      /*icon_url: "https://cdn2.iconfinder.com/data/icons/free-basic-icon-set-2/300/6-128.png",*/
                    },
                    description:'01) ' + newvalues[0].name + ' - ' + newvalues[0].points + '\n' +
                                '02) ' + newvalues[1].name + ' - ' + newvalues[1].points + '\n' +
                                '03) ' + newvalues[2].name + ' - ' + newvalues[2].points + '\n' +
                                '04) ' + newvalues[3].name + ' - ' + newvalues[3].points + '\n' +
                                '05) ' + newvalues[4].name + ' - ' + newvalues[4].points + '\n' +
                                '06) ' + newvalues[5].name + ' - ' + newvalues[5].points + '\n' +
                                '07) ' + newvalues[6].name + ' - ' + newvalues[6].points + '\n' +
                                '08) ' + newvalues[7].name + ' - ' + newvalues[7].points + '\n' +
                                '09) ' + newvalues[8].name + ' - ' + newvalues[8].points + '\n' +
                                '10) ' + newvalues[9].name + ' - ' + newvalues[9].points + '\n'
                              }
                            });  //close embed & send channel
                          });  //close resp.on
                      }).on("error", (err) => {
              console.log("Error: " + err.message);
          }); // close on error

      } else if (args[1] === 'pvp') {
          console.log(message.author.tag);
          https.get('https://api.itslit.uk/G4G/getList/' + args[0] + '/' + args[1] + '/', (resp) => {
              console.log('https://api.itslit.uk/G4G/' + args[0] + '/' + args[1] + '/')
              let data = '';

              //a chunk of data has been received
              resp.on('data', (chunk) => {
                  data += chunk;
              });

              //the whole response is here
              resp.on('end', () => {
                var jsonData = JSON.parse(data);
                var values = Object.values(jsonData)
                var newvalues = values.find(function(element) {
                  return element > message.author.username
                });

                  message.channel.send({embed: {
                    color: 0x00ff00,
                    author: {
                      name: "PVE Top 10 Ranked Players",
                      /*icon_url: "https://cdn2.iconfinder.com/data/icons/free-basic-icon-set-2/300/6-128.png",*/
                    },
                    description:'01) ' + newvalues[0].name + ' - ' + newvalues[0].points + '\n' +
                                '02) ' + newvalues[1].name + ' - ' + newvalues[1].points + '\n' +
                                '03) ' + newvalues[2].name + ' - ' + newvalues[2].points + '\n' +
                                '04) ' + newvalues[3].name + ' - ' + newvalues[3].points + '\n' +
                                '05) ' + newvalues[4].name + ' - ' + newvalues[4].points + '\n' +
                                '06) ' + newvalues[5].name + ' - ' + newvalues[5].points + '\n' +
                                '07) ' + newvalues[6].name + ' - ' + newvalues[6].points + '\n' +
                                '08) ' + newvalues[7].name + ' - ' + newvalues[7].points + '\n' +
                                '09) ' + newvalues[8].name + ' - ' + newvalues[8].points + '\n' +
                                '10) ' + newvalues[9].name + ' - ' + newvalues[9].points + '\n'
                  }
                });
          }).on("error", (err) => {
              console.log("Error: " + err.message);
          });
        })
        }
      }  //working do not touch.....
}  // End of module.export.run

module.exports.help = {
    name: "points"
}
