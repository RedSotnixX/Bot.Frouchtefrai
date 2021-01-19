const Discord = require('discord.js')
const config = require('./config.json');
const { prefix } = require('./config.json');
const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("Rocket League", {type: ""});
})

const client = require('discord-rich-presence')('778283566651146270');
 
client.updatePresence({
  state: 'Ne joue pas',
  details: 'Actuellement en ligne',
  largeImageKey: 'premier',
  smallImageKey: 'deuxieme',
  instance: true,
});

const { readdirSync } = require('fs');

const { join } = require('path');

bot.commands= new Discord.Collection();

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    bot.commands.set(command.name, command);
}

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!bot.commands.has(command)) return;


        try {
            bot.commands.get(command).run(bot, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

bot.on('message', message => {
  if(message.content === `${prefix}2` && message.author.id === '491312416098091028'){
    message.channel.send('YEET')}
  }
)

// Message de réponse //

 bot.on('message', message => {
     if (message.content === `${prefix}1`) {
       message.channel.send('et 2 et 3')
     }
   })

 bot.on('message', message => {
     if (message.mentions.users.first() == bot.user.id) {
       message.reply('il y a un problème ?')
     }
   })

 // Commence avec le préfix //

// bot.on('message', message => {
//     if (message.content.startsWith(`${prefix}ping`)) {
//       message.channel.send('je suis là :D')
//     }
//   })
  
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
//bot.login('TOKEN')
