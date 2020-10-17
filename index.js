const Discord = require('discord.js')
const bot = new Discord.Client()

const CLEAR_MESSAGES = 'f/clear';

bot.on('ready', function () {
  console.log("Le bot est connecté !")
})

bot.on('ready', function () {
    bot.user.setActivity('rien').catch(console.error)
})

bot.on('ready', () => {
  console.log('ClearMessagesBot is Ready!');
  bot.on('message', message => {
    if (message.content == CLEAR_MESSAGES) {

      // Check the following permissions before deleting messages:
      //    1. Check if the user has enough permissions
      //    2. Check if I have the permission to execute the command

      if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
        console.log("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
        return;
      } else if (!message.channel.permissionsFor(bot.user).hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage("Sorry, I don't have the permission to execute the command \""+message.content+"\"");
        console.log("Sorry, I don't have the permission to execute the command \""+message.content+"\"");
        return;
      }

      // Only delete messages if the channel type is TextChannel
      // DO NOT delete messages in DM Channel or Group DM Channel
      if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            message.channel.sendMessage("Deletion of messages successful. Total messages deleted: "+messagesDeleted);
            console.log('Deletion of messages successful. Total messages deleted: '+messagesDeleted)
          })
          .catch(err => {
            console.log('Error while doing Bulk Delete');
            console.log(err);
          });
      }
    }
  });
});


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
