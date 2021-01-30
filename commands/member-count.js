/* module.exports = (bot) => {
    const channelId = '805168671781027872'
  
    const updateMembers = (guild) => {
      const channel = guild.channels.cache.get(channelId)
      channel.setName(`Membres : ${guild.members.cache.filter(member => !member.user.bot).size}`);
    }
  
    bot.on('guildMemberAdd', (member) => updateMembers(member.guild))
    bot.on('guildMemberRemove', (member) => updateMembers(member.guild))
  
    const guild = bot.guilds.cache.get('717351839963545639')
    updateMembers(guild)
} */