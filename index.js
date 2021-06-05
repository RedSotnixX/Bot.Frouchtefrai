const Discord = require('discord.js')
const config = require('./config.json');
const bdd = require("./bdd.json");

const roleClaim = require('./commands/role-claim')
//const PCrole = require('./commands/pc-role-auto-give')
const poll = require('./commands/poll')
//const memberCount = require('./commands/member-count')
//const memberCountPc = require('./commands/member-count-pc')

const fs = require("fs");
const moment = require('moment');
const { prefix } = require('./config.json');
const bot = new Discord.Client({disableEveryone: true})

//  DEMARAGE  //

bot.on("ready", async () => {
    console.log(`${bot.user.username} est connecté`)
    bot.user.setStatus("dnd")
    setTimeout(() => {
      bot.user.setActivity("f/help", {type: "WATCHING"});
    }, 1000)

    var ChannelReady = bot.channels.cache.get('717351840550879275');
    ChannelReady.send('Je suis lancé');

    //memberCountPc(bot)
    //memberCount(bot)
    //PCrole(bot)
    poll(bot)
    roleClaim(bot)

})

//  RICH PRENSENCE  //

/* const client = require('discord-rich-presence')('778283566651146270');
 
client.updatePresence({
  state: 'Sur Visual Studio Code',
  details: 'Actuellement en ligne',
  largeImageKey: 'premier',
  smallImageKey: 'deuxieme',
  instance: true,
}); */

//  COMMANDS DOSSIER  //

const { readdirSync } = require('fs');

const { join } = require('path');
const { createConnection } = require('net');
const { rightArithShift, re } = require('mathjs');

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

//  GIVEAWAY  //

const { GiveawaysManager } = require('discord-giveaways');

bot.giveawaysManager = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});


//  BIENVENUE 1-G1 Spé PC ///

bot.on("guildMemberAdd", (member) => {
  if (member.guild.id !== "717351839963545639") return;
  
  var channel = bot.channels.cache.get('717351840550879275');
  channel.send('message');
});

/* bot.on("guildMemberAdd", (member, guild) => {
  if (member.guild.id == "717351839963545639"){
  
  const channelId = '805168671781027872'
  
    const updateMembers = (guild) => {
      const channel = guild.channels.cache.get(channelId)
      channel.setName(`On est : ${guild.members.cache.filter(member => !member.user.bot).size}`);
    }
  
    bot.on('guildMemberAdd', (member) => updateMembers(member.guild))
    bot.on('guildMemberRemove', (member) => updateMembers(member.guild))
  
    //const guild = bot.guilds.cache.get('806209941660106762')
    updateMembers(guild)
  }
}); */


/* bot.on('message', (message, member) => {
  const users = '491312416098091028'
  if (message.mentions.users.first() == users.id && !member.user.bot && member.presence.status !== "offline") {
    message.channel.send("Salut")
  }
}) */

///     COMMANDE MESSAGE      ///

bot.on('message', message => {



// COMMANDE DE STATS  //


if (message.content.startsWith(`${prefix}stats`)) {
  let onlines = message.guild.members.cache.filter(member => !member.user.bot && member.presence.status !== "offline").size;
  let totalmembers = message.guild.members.cache.filter(member => !member.user.bot).size;
  let totalservers = bot.guilds.cache.size;
  let totalbots = message.guild.members.cache.filter(member => member.user.bot).size;
  /* let total_news = message.guild.roles.cache.get('ID_ROLE_DES_NOUVEAUX_MEMBRES').members.size; */

  const EmbedStats = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Code source')
      .setURL('https://github.com/RedStonixX')
      .setAuthor('Bot Frouchtefrai', 'https://cdn.manomano.com/images/sheets/legrand-prise-de-courant-avec-terre-neptune-blanc-P-521680-1684965_1.jpg', 'https://discord.js.org')
      .setDescription('Voici les statistiques')
      //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
      .addFields({
          name: 'Nombre de membres sur le serveur',
          value: totalmembers,
          inline: true
      }, {
          name: 'Nombres de bots sur le serveur : ',
          value: totalbots,
          inline: true
      }, {
          name: 'Membres connéctés : ',
          value: onlines,
          inline: true
      }, {
          name: 'Nombre de serveurs auquel le bot appartient : ',
          value: totalservers,
          inline: true
      }, /* {
          name: 'Nombre d\'arrivants : ',
          value: total_news,
          inline: true
      },  */)
      //.setImage('https://i.imgur.com/wSTFkRM.png')
      .setTimestamp()
      .setFooter('Red_StonixX', 'https://cdn.discordapp.com/avatars/491312416098091028/093d164ecfc547ab88f12d93e93ac48f.webp?size=1024');

  message.channel.send(EmbedStats);
}


if(message.content === `${prefix}Nadmin` && message.author.id === '546326293957050369'){
  member = message.guild.members.cache.get(String(message.author.id))
  member.roles.add("756570552906547302");
}

//  ELIRION ADD MODO  //


if(message.content === `${prefix}modo` && message.author.id === '491312416098091028'){
  member = message.guild.members.cache.get(String(message.author.id))
  member.roles.add("536246625631338496");
}


//  LIEN INVITATION //


if (message.content === `${prefix}invite`) {
  message.channel.send('https://discord.com/api/oauth2/authorize?client_id=743182536150089860&permissions=8&scope=bot')
}


//  Channel private  //


if (message.content === `secret` && message.member.hasPermission('ADMINISTRATOR')) {
  const member = message.guild.member(message.author);
  const channel = bot.channels.cache.find(chan => chan.id === "845344125301162014")
  member.voice.setChannel(channel);
  message.delete();
}


//  SKYPE PHYSIQUE  //


if(message.content === `${prefix}physique` && message.author.id === '695314219016519701'){
  message.channel.send('https://join.skype.com/pIwnF5fYtYHP')
}

//  MUSIQUE LYCEE //

if(message.content === `${prefix}musique`){
  message.channel.send("!play https://www.youtube.com/watch?v=1j-eEYjv980")
}


//  MESSAGE SIMPLE  //


if (message.content === `${prefix}1`) {
  message.channel.send('et 2 et 3')
}


//  Réponse à @Frouchtefrai //


if (message.mentions.users.first() == bot.user.id) {
  user = message.author;
  message.channel.send(`${user.username}, il y a un problème ?`)
}


//  MESSAGE SIMPLE  //


if(message.content === `${prefix}2` && message.author.id === '491312416098091028'){
  message.channel.send('YEET')
}


//  INFO SERV SIMPLE  //


if (message.content === `${prefix}serveur`) {
  message.channel.send(`Nom du serveur: ${message.guild.name}\nNombre total de membres: ${message.guild.memberCount}`);
}


//  COMMENCE AVEC LE PREFIX //


if (message.content.startsWith(`${prefix}pingpong`)) {
  message.channel.send('je suis là :D')
}


//  INFO UTILISATEUR  //


if (message.content.startsWith(`${prefix}info`)) {
  if(message.mentions.users.first()) {
      user = message.mentions.users.first();
 } else{
      user = message.author;
  }
  const member = message.guild.member(user);
  console.log(user);
  const embed = new Discord.MessageEmbed() 
  .setColor('#ff5555')
  .setThumbnail(user.avatarURL)
  .setTitle(`Information sur ${user.username}#${user.discriminator} :`)
  .addField('ID du compte:', `${user.id}`, true)
  .addField('Pseudo sur le serveur :', `${member.nickname ? member.nickname : 'Aucun'}`, true)
  .addField('A crée son compte le :', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
  .addField('A rejoint le serveur le :', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
  .addField('Status:', `${user.presence.status}`, true)
  .addField('Joue a :', `${user.presence.activities[0] ? user.presence.activities[0].name : 'Rien'}`, true)
  .addField('Roles :', member.roles.cache.map(roles => `${roles.name}`).join(', '), true)
  .addField(`En réponse a :`,`${message.author.username}#${message.author.discriminator}`)
message.channel.send(embed).then(message => message.delete({ timeout: 30000 }));
}


//  MESSAGE DE BIENVENUE  //


/* if (bdd["message-bienvenue"]) {
  bot.channels.cache.get('ID_CHANNEL_DE_BIENVENUE').send(bdd["message-bienvenue"] + `${member.user.username}`);
} else {
  bot.channels.cache.get('ID_CHANNEL_DE_BIENVENUE').send("Bienvenue sur le serveur");
}
member.roles.add('ID_ROLE_DE_BIENVENUE'); */


/* if(message.content.startsWith(`f/b`)){
  message.delete()
  if(message.member.hasPermission('MANAGE_MESSAGES')){
    if(message.content.length > 5){
      message_bienvenue = message.content.slice(4)
      bdd["message-bienvenue"] = message_bienvenue
      Savebdd()
    }
  }
} */


/* if(message.content === `${prefix}test` && message.author.id === '491312416098091028'){
  message.reply(bdd["message-bienvenue"]
  )
} */


//  PING  //


if(message.content === `${prefix}ping`) {
  
  // It sends the user "Pinging"
        message.channel.send("Pinging...").then(m =>{
          // The math thingy to calculate the user's ping
            var ping = m.createdTimestamp - message.createdTimestamp;

          // Basic embed
            var embed = new Discord.MessageEmbed()
            .setAuthor(`Your ping is ${ping} ms`)
            .setColor("Your Color")
            
            // Then It Edits the message with the ping variable embed that you created
            m.edit(embed)
        });
    }


})

bot.login(process.env.BOT_TOKEN)
//bot.login('')