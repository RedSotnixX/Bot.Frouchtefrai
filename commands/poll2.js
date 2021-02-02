module.exports = (bot) => {
    const channelIds = [
      // '723819742502191165', // testing
    ]
  
    const addReactions = (message) => {
      message.react('1️⃣')
  
      setTimeout(() => {
        message.react('2️⃣')
      }, 750)
    }
  
    bot.on('message', async (message) => {
      if (channelIds.includes(message.channel.id)) {
        addReactions(message)
      } else if (message.content.toLowerCase() === 'f/poll2') {
        await message.delete()
  
        const fetched = await message.channel.messages.fetch({ limit: 1 })
        if (fetched && fetched.first()) {
          addReactions(fetched.first())
        }
      }
    })
  }