const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Show the music queue!",
    permissions : [""],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
     
     let noChannel = new MessageEmbed()
     .setAuthor('No Voice Channel', client.user.displayAvatarURL({dynamic: true}))
     .setColor('#4aff56')
     .setDescription('``` You need to be in a voice channel to use this command! ```')
     .setTimestamp();

     let sameChannel = new MessageEmbed()
     .setAuthor('Different Voice Channels', client.user.displayAvatarURL({dynamic: true}))
     .setColor('#4aff56')
     .setDescription('``` You need to be in same voice channel as me to use this command! ```')
     .setTimestamp();

     let noSong = new MessageEmbed()
     .setAuthor('No Query', client.user.displayAvatarURL({dynamic: true}))
     .setColor('#4aff56')
     .setDescription('``` Provide a song query to look for!! ```')
     .setTimestamp();

     let noTrack = new MessageEmbed()
     .setAuthor('No Queue Found', client.user.displayAvatarURL({dynamic: true}))
     .setColor('#4aff56')
     .setDescription('``` There is nothing in queue right now! ```')
     .setTimestamp();

     const ch = interaction.channel;
      if(!ch.permissionsFor(interaction.guild.me).has("EMBED_LINKS")) {
        interaction.followUp({content: 'I do not have `EMBED_LINKS` Permission for this channel.'})
        return;
      }
      // let voice_channel = interaction.member.voice.channel;
      if (!interaction.member.voice.channelId) return message.channel.send({embeds: [noChannel]});
      if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return interaction.followUp({embeds: [sameChannel]});
      

      try {
       let queue = client.distube.getQueue(interaction);
       if(!queue) return interaction.followUp({embeds: [noTrack]});
       const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
       const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
       let qemebd = new MessageEmbed()
        .setAuthor('Server Queue', client.user.displayAvatarURL({dynamic: true}))
        .setColor('#4ae7ff')
        .setDescription(q)
        .addField('Queue Status', `${status(queue)}`, true)
        .setTimestamp();
        interaction.followUp({embeds: [qemebd]});

      } catch (error) {
        let errorEm = new MessageEmbed()
        .setTitle('Error Occured in Queue Command')
        .setDescription(`${error}`)
        .addField('Guild Id:', interaction.guild.id, true)
        .setTimestamp();
        let ch = "901048331919327272";
        let cha = client.channels.cache.get(ch);
        cha.send({embeds: [errorEm]})
        interaction.followUp({content: 'An Error Occured!'})
      }
    },
};