module.exports = {
  name: 'giverole',
  minArgs: 2,
  expectedArgs: "<Target user's @> <The role name>",
  permissions: 'ADMINISTRATOR',
  async run (bot, message, args) {
    const targetUser = message.mentions.users.first()

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'avez pas les permissions");

    if (!targetUser) {
        message.reply('Merci de mettre un utilisateur')
        return
      }
  
      args.shift()
  
      const roleName = args.join(' ')
      const { guild } = message
  
      const role = guild.roles.cache.find((role) => {
        return role.name === roleName
      })
      if (!role) {
        message.reply(`Il n'y a pas de role avec ce nom "${roleName}"`)
        return
      }
  
      const member = guild.members.cache.get(targetUser.id)
      member.roles.add(role)
  
      message.reply(`L'utilisateur a maintenant le role "${roleName}"`)
    },
  }