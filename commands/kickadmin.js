const Discord = require('discord.js');

module.exports = {
    name: "kickadmin",
    description: "Kicks a member from the server",

    async run (bot, message, args) {

        if(message.author.id !== '491312416098091028') return message.channel.send('Tu ne peux pas');

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Merci de spécifier un utilisateur');

        if(!member) return message.channel.send('Je n\'arrive pas à trouver cette utilisateur');
        if(!member.kickable) return message.channel.send('Désolé mais tu ne peux pas kick cette utilisateur');

        if(member.id === message.author.id) return message.channel.send('Tu ne peux pas te kick !');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Unspecified';

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send('Il y a une erreur')
        })

        const kickembed = new Discord.MessageEmbed()
        .setTitle('Membre kick')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Utilisateur kick', member)
        .addField('Kick par', message.author)
        .addField('Raison', reason)
        .setFooter('Kick confirmé', bot.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(kickembed);


    }
}
