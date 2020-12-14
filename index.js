const Discord = require('discord.js');
const botsettings = require('./botsettings.json');

const bot = new Discord.Client({disableEveryone: true});

// bot.on('ready', function () {
//   console.log("Le bot est connecté !")
// })

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("Space Engineers", {type: ""});
})

// Message de réponse //

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}1`){
        return message.channel.send("et 2 et 3")
    }

    if(cmd === `${prefix}help`){
        return message.reply("Les commandes disponibles sont ```f/1``` et ```f/help``` Pour Amoug us la commande help est ```f/au help```")
    }
    
// bot.on('message', message => {
//     if (message.content === 'f/1') {
//       message.channel.send('et 2 et 3')
//     }
//   })

// bot.on('message', message => {
//     if (message.content === 'f/help') {
//       message.channel.send('Les commandes disponibles sont ```f/1``` et ```f/help``` Pour Amoug us la commande help est ```f/au help```')
//     }
//   })
  
bot.login(process.env.BOT_TOKEN)
