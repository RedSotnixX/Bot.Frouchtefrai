const Discord = require('discord.js');

module.exports = {
    name: "sondage",
    description: "Sondages personalisés",

    async run (bot, message, args) {



        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Sondage')
            .addField()
            .setTimestamp()

        message.channel.send(embed);
    }
}
