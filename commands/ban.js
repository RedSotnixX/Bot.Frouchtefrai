const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Banned a member from the server",

    async run (bot, message, args) {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Tu ne peux pas utiliser ça')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Tu n\'as pas la permission')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Merci de spécifier un utilisateur');

        if(!member) return message.channel.send('Je n\'arrive pas à trouver cette utilisateur');
        if(!member.bannable) return message.channel.send('Désolé mais tu ne peux pas ban cette utilisateur');

        if(member.id === message.author.id) return message.channel.send('Tu ne peux pas te ban !');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Unspecified';

        member.ban(reason)
        .catch(err => {
            if(err) return message.channel.send('Il y a une erreur')
        })

        const banembed = new Discord.MessageEmbed()
        .setTitle('Membre ban')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Utilisateur banni', member)
        .addField('Ban par', message.author)
        .addField('Raison', reason)
        .setFooter('Ban comfirmé', bot.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(banembed);


    }
}
