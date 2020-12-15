const figlet = require('figlet');

module.exports = {
    name: "ascii",
    description: "Converts text to ascii",

    async run (bot, message, args){
        if(!args[0]) return message.channel.send('Merci de mettre un text');

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Il y a une erreur');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Merci de mettre un texte plus petit que 2000 characters')

            message.channel.send('```' + data + '```')
        })
    }
}
