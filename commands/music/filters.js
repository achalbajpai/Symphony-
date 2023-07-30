const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "filters",
    aliases: ['filter'],
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
       if (args[0] === "off" && queue.filters?.length) queue.setFilter(false)
       else if (Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0])
       else if (args[0]) return message.channel.send(`Not a valid filter`)
       let filterEm = new MessageEmbed()
          .setAuthor('Filters', client.user.displayAvatarURL({dynamic: true}))
          .setColor('#4ae7ff')
          .addField("Current Queue Filter:", `\`${queue.filters.join(", ") || "Off"}\``, true)
          .setDescription(`Available Filters: \`clear, bassboost, 8D, vaporwave, nightcore, phaser, tremolo, vibrato, reverse, treble, normalizer, surrounding, pulsator, subboost, karaoke, flanger, gate, haas, mcompand, double, half, cursed, rickroll, purebass, 3D, earwax, mono, echo, sofalizer, aphaser, apulsator, asetrate, speed, superspeed, slow, superslow, deesser, earrape, lightbass, heavybass\``)
          .setFooter("Applying Filter takes some time, depends on song lenght.")
          .setTimestamp();
       message.channel.send({embeds: [filterEm]});
      } catch (e) {
        let errorEm = new MessageEmbed()
        .setTitle('Error Occured in Filters Command')
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