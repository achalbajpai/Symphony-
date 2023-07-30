const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const mongoose = require("mongoose");
const DisTube = require('distube');
const filters = require('./settings/filters.json')
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require("@distube/soundcloud");
const fs = require("fs");
const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: "auto",
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: true,
    },
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: 32767,
});
module.exports = client;

client.distube = new DisTube.default(client, {
    customFilters: filters,
    emptyCooldown: 120,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    searchSongs: 0,
    plugins: [new SoundCloudPlugin(), new SpotifyPlugin()],
    });
const config = require("./settings/config.json");
const ee = require("./settings/embed.json");
const prefix = config.prefix;
const token = config.token;
// Global Variables
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync("./commands/");

// Initializing the project
//Loading files, with the client variable like Command Handler, Event Handler, ...
["command_handler", "event_handler", "slash_handler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
});


mongoose.connect(config.url).then(console.log("Connected to the database!"))

const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => {

        let embed = new MessageEmbed()
        .setAuthor('Started Playing', client.user.displayAvatarURL({dynamic: true}))
        .setColor('#4ae7ff')
        .setDescription(`Title: [${song.name}](${song.url}) \n Author: ${song.uploader.name} \n Requested By: ${song.user} \n Duration: ${song.formattedDuration} \n\`\`\`Views: ${song.views} \nLikes: ${song.likes} \nDislikes: ${song.dislikes}\`\`\` `)
        .addField('Queue Status', `${status(queue)}`, true)
        .setThumbnail(song.thumbnail)
        .setTimestamp();

        queue.textChannel.send({embeds: [embed]});

    })
    .on("addSong", (queue, song) => {
        let embed = new MessageEmbed()
        .setAuthor('Added to Queue', client.user.displayAvatarURL({dynamic: true}))
        .setColor('#4ae7ff')
        .setDescription(`Title: [${song.name}](${song.url}) \n Author: ${song.uploader.name} \n Requested By: ${song.user} \n Duration: ${song.formattedDuration} \n\`\`\`Views: ${song.views} \nLikes: ${song.likes} \nDislikes: ${song.dislikes}\`\`\` `)
        .addField('Queue Status', `${status(queue)}`, true)
        .setThumbnail(song.thumbnail)
        .setTimestamp();

        queue.textChannel.send({embeds: [embed]});    
    })
    .on("finish", (queue) => {
        let embed = new MessageEmbed()
        .setAuthor('Queue Finished', client.user.displayAvatarURL({dynamic: true}))
        .setColor('#4ae7ff')
        .setDescription(`Queue ended, as there are no more songs to play. Add some songs to continue!`)
        .setTimestamp();

        queue.textChannel.send({embeds: [embed]});    
    })
    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 100;
    })
    .on("error", (channel, error) => {
        channel.send({content: 'An error occured.'})
        console.log(error)
        let errorEm = new MessageEmbed()
        .setTitle('Error Occured.')
        .setDescription(`${error}`)
        .addField('Guild Id:', message.guild.id, true)
        .addField('Message Content:', message.content, true)
        .setTimestamp();
        let ch = "901048331919327272";
        let cha = client.channels.cache.get(ch);
        cha.send({embeds: [errorEm]})
    })
    .on("empty", (queue) => {
        let embed = new MessageEmbed()
        .setAuthor('Channel Empty', client.user.displayAvatarURL({dynamic: true}))
        .setColor('#4ae7ff')
        .setDescription(`Queue ended, as there are no more users to listen to music.`)
        .setTimestamp();  
        
        queue.textChannel.send({embeds: [embed]});
    })
    .on("disconnect", (queue) => {
        let embed = new MessageEmbed()
        .setAuthor('Disconnected', client.user.displayAvatarURL({dynamic: true}))
        .setColor('#4ae7ff')
        .setDescription(`Queue ended, as I have been disconnected from the voice channel.`)
        .setTimestamp();  

        queue.textChannel.send({embeds: [embed]});
    })
    .on("addList", (queue, playlist) => {
        let embed = new MessageEmbed()
        .setAuthor('Playlist Added!', client.user.displayAvatarURL({dynamic: true}))
        .setColor('#4ae7ff')
        .setDescription(`Title: [${playlist.name}](${playlist.url}) \n Requested By: ${playlist.user} \n Duration: ${playlist.formattedDuration}`)
        .setTimestamp();

        queue.textChannel.send({embeds: [embed]});
    })

client.login(token);
