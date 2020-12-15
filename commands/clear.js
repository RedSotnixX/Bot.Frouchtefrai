module.exports = {
    name: "clear",
    description: "Clears messages",

    async run (bot, message, args) {

        const amount = args.join(" ");

        if(!amount) return message.reply('Merci de mettre un nombre de message à supprimer')

        if(amount > 100) return message.reply(`Tu ne peux pas supprimer plus de 100 messages d'un coup`)

        if(amount < 1) return message.reply(`Tu doit supprimer au moins un message`)

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages
    )});


    message.channel.send("C'est bon c'est fait !")

    }
}
