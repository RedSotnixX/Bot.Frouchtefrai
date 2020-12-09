const Discord = require('discord.js')
const bot = new Discord.Client()
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");


bot.on('ready', function () {
  console.log("Le bot est connecté !")
})

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
    message.channel.send("You need to enter a valid command!");
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

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
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
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
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

//bot.on('message', (message) => {
  //if (message.content == '/muteAll') {
      //let channel = message.member.voiceChannel;
      //for (let member of channel) {
        //  member[1].setMute(true)
     // }
  // }
//});

//bot.on('message', (message) => {
  //if (message.content == '/muteAll') {
    //  let channel = message.member.voiceChannel;
    //  if(!channel){
     //   return;
     // }
     // for (let member of channel.members) {
     //     member.setMute(true);
    //  }
 //  }
//});


// KICK //

//bot.on('message', message => {
  //if (!message.guild) return;
 // if (message.content.startsWith('fkick')) {
   // const user = message.mentions.users.first();
  //  if (user) {
 //     const member = message.guild.member(user);
 //     if (member) {
     //   member
 //         .voice.kick('Optional reason that will display in the audit logs')
  //        .then(() => {
  //          message.reply(`Successfully kicked ${user.tag}`);
   //       })
  //        .catch(err => {
  //          message.reply('I was unable to kick the member');
  //          console.error(err);
  //        });
  //    } else {
   //     message.reply("That user isn't in this guild!");
  //    }
  //  } else {
  //    message.reply("You didn't mention the user to kick!");
 //   }
 // }
//});



// Message de réponse //

 bot.on('message', message => {
     if (message.content === 'f/1') {
       message.channel.send('et 2 et 3')
     }
   })

 bot.on('message', message => {
     if (message.content === 'f/help') {
       message.channel.send('Les commandes disponibles sont ```f/1``` et ```f/help``` Pour Amoug us la commande help est ```f/au help```')
     }
   })

//bot.on('message', message => {
//     if (message.content === 'f/help') {
//       message.channel.send('
//Toute les commandes disponible son :
//
//***f/1*** dit et 2 et 3
//***f/help*** Liste les commandes disponibles
//
// ')
//     }
//   })

  
bot.login(process.env.BOT_TOKEN)
