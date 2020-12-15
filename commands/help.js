const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "The help command, what do you expect?",

    async run (bot, message, args){

        //Sort your commands into categories, and make seperate embeds for each category

        const moderation = new Discord.MessageEmbed()
        .setTitle('Moderation')
        .addField('`f/kick`', 'Kicks un membre du serveur')
        .addField('`f/ban`', 'Bans un membre du serveur')
        .addField('`f/clear`', 'Clear les messages')
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('Fun')
        .addField('`f/ascii`', 'Convertir un text en ascii')
        .addField('`f/meme`', 'Afficher un meme aléatoire')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setTitle('Pas encore défini')
        .addField('`f/`', 'Pas encore défini')
        .addField('`f/`', 'Pas encore défini')
        .addField('`f/`', 'Pas encore défini')
        .addField('`f/`', 'Pas encore défini')
        .setTimestamp()

        const pages = [
                moderation,
                fun,
                utility
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}
