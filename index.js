const Discord = require('discord.js')
const config = require('./config.json');
const bdd = require("./bdd.json");
const fs = require("fs");
const { prefix } = require('./config.json');
const bot = new Discord.Client({disableEveryone: true})

//  DEMARAGE  //

bot.on("ready", async () => {
    console.log(`${bot.user.username} est connecté`)
    bot.user.setStatus("dnd")
    setTimeout(() => {
        bot.user.setActivity("f/help", {type: "WATCHING"});
    }, 1000)
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
            name: 'Membres connéctés : ',
            value: onlines,
            inline: true
        }, {
            name: 'Nombre de serveurs auquel le bot appartient : ',
            value: totalservers,
            inline: true
        }, {
            name: 'Nombres de bots sur le serveur : ',
            value: totalbots,
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

//  MESSAGE DE REPONSE  //

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

bot.on('message', message => {
    if(message.content === `${prefix}2` && message.author.id === '491312416098091028'){
      message.channel.send('YEET')}
    }
  )

bot.on('message', message => {
    if (message.content === `${prefix}moi`) {
      message.channel.send(`Nom d'utilisateur: ${message.author.username}\nTon ID: ${message.author.id}`);
    }
  })

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

//  MESSAGE DE BIENVENUE  //

/* bot.on("guildMemberAdd", member => {
  if (bdd["message-bienvenue"]) {
      bot.channels.cache.get('ID_CHANNEL_DE_BIENVENUE').send(bdd["message-bienvenue"] + `${member.user.username}`);
  } else {
      bot.channels.cache.get('ID_CHANNEL_DE_BIENVENUE').send("Bienvenue sur le serveur");
  }
  member.roles.add('ID_ROLE_DE_BIENVENUE');

}) */

bot.on('message', message => {
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
})

//test

bot.on('message', message => {
  if(message.content === `${prefix}test` && message.author.id === '491312416098091028'){
    message.reply(bdd["message-bienvenue"])}
  }
)

//  MUSIQUE MARCHE PAS SUR HEROKU //

const ytdl = require("ytdl-core");

const queue = new Map();
   
bot.once("ready", () => {
  console.log("Ready!");
});
   
bot.once("reconnecting", () => {
  console.log("Reconnecting!");
});
   
bot.once("disconnect", () => {
  console.log("Disconnect!");
});
   
bot.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
   
  const serverQueue = queue.get(message.guild.id);
   
  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else {
    return;
  }
});
   
async function execute(message, serverQueue) {
  const args = message.content.split(" ");
   
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "Tu n'est pas dans un salon vocal !"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "Je n'est pas la permission de rejoindre et de jouer la musique :("
    );
  }
   
  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
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
    return message.channel.send(`${song.title} ajouté à la file d'attente !`);
  }
}
   
function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Tu doit être dans un salon vocal pour passer la musique !"
    );
  if (!serverQueue)
    return message.channel.send("Il n'y a pas de musique que je peux skip !");
  serverQueue.connection.dispatcher.end();
}
   
function stop(message, serverQueue) {
  if (!message.member.voice.channel)
   return message.channel.send(
      "Tu doit être dans un salon vocal pour arreter la musique !"
    );
       
  if (!serverQueue)
    return message.channel.send("Il n'y a pas de musique que je peux arreter !");
       
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
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
  serverQueue.textChannel.send(`Musique en cours : **${song.title}**`);
}

function Savebdd() {
  fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
      if (err) message.channel.send("Une erreur est survenue.");
  });
}

bot.login(process.env.BOT_TOKEN)
//bot.login('TOKEN')
