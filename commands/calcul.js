const math = require('mathjs');

const Discord = require('discord.js');

module.exports = {
    name: "calcul",
    description: "Get the answer to a math problem",


    async run (bot, message, args){

        if(!args[0]) return message.channel.send('Merci de mettre un calcul');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Merci de mettre un vrai calcul')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(0x808080)
        .setTitle('Calculateur')
        .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Réponse', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

    }
}