const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "Track a country or worldwide COVID-19 cases",

    async run (bot, message, args){

        let countries = args.join(" ");

        //Credit to Sarastro#7725 for the command :)

        const noArgs = new Discord.MessageEmbed()
        .setTitle('Arguments manquant')
        .setColor(0xFF0000)
        .setDescription('Tu as oublié des arguments (ex: f/covid all ou f/covid France)')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Stats du COVID-19 dans le monde 🌎`)
                .addField('Cas', confirmed)
                .addField('Guérisons', recovered)
                .addField('Décès', deaths)

                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Stats COVID-19 **${countries}**`)
                .addField('Cas', confirmed)
                .addField('Guérisons', recovered)
                .addField('Décès', deaths)

                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send('Pays invalide')
            })
        }
    }
}