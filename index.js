const Discord = require('discord.js')
const config = require('./config.json');
const { prefix } = require('./config.json');
const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("Space Engineers", {type: ""});
})

 bot.on('message', message => {
     if (message.content === `${prefix}1`) {
       message.channel.send('et 2 et 3')
     }
   })

// Message de réponse //

 bot.on('message', message => {
     if (!message.content.startsWith(prefix) || message.author.bot) return;
   })

const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();

 bot.on('message', message => {
     if (command === 'args-info') {
	    if (!args.length) {
		    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	message.channel.send(`Command name: ${command}\nArguments: ${args}`);
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
     if (message.content === `${prefix}serveur`) {
       message.channel.send(`Nom du serveur: ${message.guild.name}\nNombre total de membres: ${message.guild.memberCount}`);
     }
   })

 bot.on('message', message => {
     if (message.content === `${prefix}moi`) {
       message.channel.send(`Nom d'utilisateur: ${message.author.username}\nTon ID: ${message.author.id}`);
     }
   })

bot.login(process.env.BOT_TOKEN)
