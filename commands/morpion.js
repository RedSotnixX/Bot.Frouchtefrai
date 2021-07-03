const Discord = require('discord.js');
const { tictactoe } = require("reconlx");

module.exports = {
    name: "morpion",
    description: "This is a template",

    async run (bot, message, args) {
        const member = message.mentions.members.first()
        if(!member) message.reply('Merci de mettre un ami avec qui jouer')
            new tictactoe({
                message: message,
                player_two: message.mentions.members.first(),
            });
    }
}



