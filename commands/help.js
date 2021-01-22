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
        .addField('`f/giveaway`', 'Organiser un giveaway (Admin)')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setTitle('Utile')
        .addField('`f/avatar`', 'Pourvoir voir son avatar')
        .addField('`f/calcul`', 'Effectuer un calcul')
        .addField('`f/covid`', 'Voir des infos sur le covid-19')
        .addField('`f/météo`', 'Voir la météo')
        .addField('`f/say`', 'Faire parler le bot (Admin)')
        .addField('`f/stats`', 'Voir les stats du serveur et du bot')
        .addField('`f/info`', 'Voir des infos sur soi')
        .addField('`f/serveur`', 'Voir peu d\'infos sur le serveur')
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
