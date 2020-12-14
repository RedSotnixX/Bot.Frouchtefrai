const Discord = require('discord.js')
const bot = new Discord.Client()
const botsettings = require('./botsettings.json')

bot.on('ready', function () {
  console.log("Le bot est connecté !")
})


// Message de réponse //

 bot.on('message', message => {
     if (message.content === 'f/1') {
       message.channel.send('et 2 et 3')
     }
   })

bot.on('message', message => {
     if (message.content === '1-G2') {
       message.channel.send("Les 1-G1 c'est mieux")
     }
   })

 bot.on('message', message => {
     if (message.content === 'f/help') {
       message.channel.send('Les commandes disponibles sont ```f/1``` et ```f/help``` Pour Amoug us la commande help est ```f/au help```')
     }
   })
  
bot.login(process.env.BOT_TOKEN)
