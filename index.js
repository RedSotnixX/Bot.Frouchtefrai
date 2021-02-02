const Discord = require('discord.js')
const config = require('./config.json');
const bdd = require("./bdd.json");

const roleClaim = require('./commands/role-claim')
//const poll = require('./commands/poll')
const memberCount = require('./commands/member-count')

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

    //memberCount(bot)
    //poll(bot)
    roleClaim(bot)
})

//  RICH PRENSENCE  //

/* const client = require('discord-rich-presence')('778283566651146270');
 
client.updatePresence({
  state: 'Ne joue pas',
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


//  COMMANDE DE STATS  //

bot.on('message', message => {
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
})

//  ELIRION ADD MODO  //

/* bot.on('message', message => {
  if(message.content === `${prefix}modo` && message.author.id === '491312416098091028'){
    member = message.guild.members.cache.get(String(message.author.id))
    member.roles.add("536246625631338496");
  }
  }
) */

//  Test aide //

bot.on("message", async message => {
  if(message.content === `${prefix}stest`) {
    message.channel.send(new Discord.MessageEmbed()
            .addField('Nom', message.guild.name, true)
            .addField('Région', message.guild.region, true)
            .addField('Membres', `${message.guild.memberCount} membres\n${message.guild.members.cache.filter(member => !member.user.bot).size} humains\n${message.guild.members.cache.filter(member => member.user.bot).size} bots`, true)
            .addField('Salons', `${message.guild.channels.cache.size} salons\n${message.guild.channels.cache.filter(channel => channel.type === 'text').size} salons textuels\n${message.guild.channels.cache.filter(channel => channel.type === 'voice').size} salons vocaux\n${message.guild.channels.cache.filter(channel => channel.type === 'category').size} catégories`, true)
            .addField('Emojis', `${message.guild.emojis.cache.size} emojis\n${message.guild.emojis.cache.filter(emoji => !emoji.animated).size} emojis statiques\n${message.guild.emojis.cache.filter(emoji => emoji.animated).size} emojis animés`, true)
            .addField('Rôles', message.guild.roles.cache.size, true)
            .addField('Propriétaire', message.guild.owner, true)
            .addField('Date de création', moment(message.guild.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
            .addField('Nitro boost', `Tier : ${message.guild.premiumTier}\nNombre de boosts : ${message.guild.premiumSubscriptionCount}`, true)
            .setFooter(`ID : ${message.guild.id}`)
            .setThumbnail(message.guild.iconURL())
            .setImage(message.guild.bannerURL()))
  }
});

//  LIEN INVITATION //

bot.on('message', message => {
  if (message.content === `${prefix}invite`) {
    message.channel.send('https://discord.com/api/oauth2/authorize?client_id=743182536150089860&permissions=8&scope=bot')
  }
})

//  SKYPE PHYSIQUE  //

bot.on('message', message => {
  if(message.content === `${prefix}physique` && message.author.id === '695314219016519701'){
    message.channel.send('https://join.skype.com/pIwnF5fYtYHP')}
  }
)

//  MESSAGE DE REPONSE  //

/* bot.on('message', message => {
    if (message.content === `${prefix}1`) {
      message.channel.send('et 2 et 3')
    }
  }) */

bot.on('message', message => {
    if (message.mentions.users.first() == bot.user.id) {
      message.reply('il y a un problème ?')
    }
  })

/* bot.on('message', message => {
    if(message.content === `${prefix}2` && message.author.id === '491312416098091028'){
      message.channel.send('YEET')}
    }
  ) */

/* bot.on('message', message => {
    if (message.content === `${prefix}moi`) {
      message.channel.send(`Nom d'utilisateur: ${message.author.username}\nTon ID: ${message.author.id}`);
    }
  }) */

bot.on('message', message => {
    if (message.content === `${prefix}serveur`) {
      message.channel.send(`Nom du serveur: ${message.guild.name}\nNombre total de membres: ${message.guild.memberCount}`);
    }
  })

// COMMENCE AVEC LE PREFIX  //

// bot.on('message', message => {
//     if (message.content.startsWith(`${prefix}ping`)) {
//       message.channel.send('je suis là :D')
//     }
//   })

//  INFO  //

bot.on('message', message => {
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
})

//  MESSAGE DE BIENVENUE  //

/* bot.on("guildMemberAdd", member => {
  if (bdd["message-bienvenue"]) {
      bot.channels.cache.get('ID_CHANNEL_DE_BIENVENUE').send(bdd["message-bienvenue"] + `${member.user.username}`);
  } else {
      bot.channels.cache.get('ID_CHANNEL_DE_BIENVENUE').send("Bienvenue sur le serveur");
  }
  member.roles.add('ID_ROLE_DE_BIENVENUE');

}) */

/* bot.on('message', message => {
  if(message.content.startsWith(`f/b`)){
    message.delete()
    if(message.member.hasPermission('MANAGE_MESSAGES')){
      if(message.content.length > 5){
        message_bienvenue = message.content.slice(4)
        bdd["message-bienvenue"] = message_bienvenue
        Savebdd()
      }
    }
  }
}) */

//test

bot.on('message', message => {
  if(message.content === `${prefix}test` && message.author.id === '491312416098091028'){
    message.reply(bdd["message-bienvenue"])}
  }
)

//  PING   //

bot.on('message', message => {
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

//  MUSIQUE MARCHE PAS SUR HEROKU //

/* const ytdl = require("ytdl-core");

bot.on('message', message => {
  const serverQueue = queue.get(message.guild.id);
  if (message.content.startsWith(`${prefix}play`)) {
      execute(message, serverQueue, args);
      return;
  } 
  if (message.content.startsWith(`${prefix}skip`)) {
      skip(message, serverQueue, args);
      return;
  } 
  if (message.content.startsWith(`${prefix}stop`)) {
      stop(message, serverQueue, args);
      return;
  } 
  if (message.content.startsWith(`${prefix}pause`)) {
      pause(message, serverQueue, args);
      return;
  } 
})

async function execute(message, serverQueue, args) {
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
      return message.channel.send(
          "You need to be in a voice channel to play music!"
      );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
          "I need the permissions to join and speak in your voice channel!"
      );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
      title: songInfo.title,
      url: songInfo.video_url
  };

  if (!serverQueue) {
      const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
          var connection = await voiceChannel.join();
          queueContruct.connection = connection;
          play(message.guild, queueContruct.songs[0]);
      } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
      }
  } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue, args) {
  if (!message.member.voice.channel)
      return message.channel.send(
          "You have to be in a voice channel to stop the music!"
      );
  if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue, args) {
  if (!message.member.voice.channel)
      return message.channel.send(
          "You have to be in a voice channel to stop the music!"
      );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function pause(message, serverQueue, args) {
  if (!message.member.voice.channel)
      return message.channel.send(
          "You have to be in a voice channel to stop the music!"
      );
  if (serverQueue.connection.dispatcher.paused) {
      serverQueue.connection.dispatcher.resume();
  } else {
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.pause();
  }
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
  }

  const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
} */

//bot.login(process.env.BOT_TOKEN)
bot.login('NzQzMTgyNTM2MTUwMDg5ODYw.XzQ8rA.QS-gw2jcZ2Xv0lmaARZrJj7ugV8')