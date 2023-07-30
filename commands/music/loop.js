const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
    aliases: ['repeat'],
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
       let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
        let loopEm = new MessageEmbed()
          .setAuthor('Loop', client.user.displayAvatarURL({dynamic: true}))
          .setColor('#4ae7ff')
          .setDescription(`Loop is now set to ${mode} mode!`)
          .setTimestamp();
        message.channel.send({embeds: [loopEm]});
      } catch (e) {
        let errorEm = new MessageEmbed()
        .setTitle('Error Occured in Loop Command')
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