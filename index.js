const Discord = require('discord.js')
const config = require('./config.json');
const bot = new Discord.Client({disableEveryone: true})

// bot.on('ready', function () {
//   console.log("Le bot est connecté !")
// })

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("Space Engineers", {type: ""});
})

// Message de réponse //

 bot.on('message', message => {
     if (message.content === 'f/1') {
       message.channel.send('et 2 et 3')
     }
   })

// bot.on('message', message => {
//     if (message.content === 'f/help') {
//       message.channel.send('Les commandes disponibles sont ```f/1``` et ```f/help``` Pour Amoug us la commande help est ```f/au help```')
//     }
//   })
  
bot.login(process.env.BOT_TOKEN)
