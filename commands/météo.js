const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "météo",
    description: "Checks a weather forecast",

    async run (bot, message, args){

    weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Merci de spécifier une ville')

        if(result === undefined || result.length === 0) return message.channel.send('Ville **Invalide**');

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Voici la météo de ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0x111111)
        .addField('Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', 'Celsius', true)
        .addField('Temperature', `${current.temperature}°`, true)
        .addField('Vent', current.winddisplay, true)
        .addField('Ressenti', `${current.feelslike}°`, true)
        .addField('Humidité', `${current.humidity}%`, true)


        message.channel.send(weatherinfo)
        })        
    }
}