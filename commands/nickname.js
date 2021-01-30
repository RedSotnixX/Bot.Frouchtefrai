module.exports = {
    name: "nickname",
    description: "Changer le nickname",

    async run (bot, message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'avez pas les permissions");

        user = message.mentions.users.first();
        const member = message.guild.member(user);
    
        args.shift()
        const nickname = args.join(' ');
    
        message.member.setNickname(nickname);
    
        message.reply('Vous avez changé son nom !');
    }
}