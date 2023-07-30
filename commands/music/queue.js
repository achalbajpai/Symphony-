const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    aliases: ['q'],
    permissions : [""],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      
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

     const ch = message.channel;
      if(!ch.permissionsFor(message.guild.me).has("EMBED_LINKS")) {
        message.channel.send({content: 'I do not have `EMBED_LINKS` Permission for this channel.'})
        return;
      }
      
      if (!message.member.voice.channelId) return message.channel.send({embeds: [noChannel]});
      if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return message.channel.send({embeds: [sameChannel]});

      let noTrack = new MessageEmbed()
     .setAuthor('No Queue Found', client.user.displayAvatarURL({dynamic: true}))
     .setColor('#4aff56')
     .setDescription('``` There is nothing in queue right now! ```')
     .setTimestamp();


     try {
      let queue = client.distube.getQueue(message);
       if(!queue) return message.channel.send({embeds: [noTrack]});
       const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
       const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
       let qemebd = new MessageEmbed()
        .setAuthor('Server Queue', client.user.displayAvatarURL({dynamic: true}))
        .setColor('#4ae7ff')
        .setDescription(q)
        .addField('Queue Status', `${status(queue)}`, true)
        .setTimestamp();

        queue.textChannel.send({embeds: [qemebd]});    
     } catch (e) {
      let errorEm = new MessageEmbed()
      .setTitle('Error Occured in Queue Command')
      .setDescription(e)
      .addField('Guild Id:', message.guild.id, true)
      .addField('Message Content:', message.content, true)
      .setTimestamp();
      let ch = "901048331919327272";
      let cha = client.channels.cache.get(ch);
      cha.send({embeds: [errorEm]})
      message.channel.send({content: 'Error Occured'})
     }
    }
   }