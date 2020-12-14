const Discord = require('discord.js')
const config = require('./config.json');
const { prefix } = require('./config.json');
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
     if (message.content === `${prefix}1`) {
       message.channel.send('et 2 et 3')
     }
   })

 bot.on('message', message => {
     if (message.content === `${prefix}bot`) {
       message.reply('je suis là :D')
     }
   })

 // Commence avec le préfix //

// bot.on('message', message => {
//     if (message.content.startsWith(`${prefix}ping`)) {
//       message.channel.send('je suis là :D')
//     }
//   })

 bot.on('message', message => {
     if (message.content === `${prefix}help`) {
       message.channel.send('Les commandes disponibles sont ```f/1``` et ```f/help``` Pour Amoug us la commande help est ```f/au help```')
     }
   })
  
 bot.on('message', message => {
     if(message.content === `${prefix}clear`){
        if (message.deletable) {
            message.delete();
        }

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Missing Permissions!").then(m => m.delete(5000));
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("This is not a number").then(m => m.delete(5000));
        }

        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
        .catch(err => message.reply(`Something went wrong... ${err}`));
    
    }
 })

bot.login(process.env.BOT_TOKEN)
