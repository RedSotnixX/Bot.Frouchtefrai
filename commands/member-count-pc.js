module.exports = (bot, member, guild) => {

  if (member.guild.id == "806209941660106762"){

    const channelId = '808625325856391199'
  
    const updateMembers = (guild) => {
      const channel = guild.channels.cache.get(channelId)
      channel.setName(`On est : ${guild.members.cache.filter(member => !member.user.bot).size}`);
    }
  
    bot.on('guildMemberAdd', (member) => updateMembers(member.guild))
    bot.on('guildMemberRemove', (member) => updateMembers(member.guild))
  
    //const guild = bot.guilds.cache.get('806209941660106762')
    updateMembers(guild)
  }else{
    return;
  }
}