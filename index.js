const Discord = require('discord.js')
const bot = new Discord.Client()

bot.commandPrefix = "f/"

bot.on('ready', function () {
  console.log("Le bot est connecté !")
})

client.on('guildMemberAdd', member => {
    const welcomechanel = member.guild.channels.find((x) => x.id === '707996311894491246' );
    let b_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`hey ${member.user.username} il nous a rejoin`)
    return welcomechanel.send(b_embed)
})


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
     if (message.content === '/1') {
       message.channel.send('et 2 et 3')
     }
   })



  
bot.login(process.env.BOT_TOKEN)
