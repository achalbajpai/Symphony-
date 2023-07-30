const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    aliases: ['p'],
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
     const bh = message.member.voice.channel;
      if(!bh.permissionsFor(message.guild.me).has("CONNECT") || !bh.permissionsFor(message.guild.me).has("SPEAK")) {
        return message.channel.send({content: 'I do not have `CONNECT & SPEAK` permissions in the voice channel.'})
      }
      let query = args.slice(0).join(" ");
      if (!message.member.voice.channelId) return message.channel.send({embeds: [noChannel]});
      if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return message.channel.send({embeds: [sameChannel]});
      if(!query) return message.channel.send({embeds: [noSong]});
    
      let failedConnect = new MessageEmbed()
     .setAuthor('Failed to connect', client.user.displayAvatarURL({dynamic: true}))
     .setColor('#4aff56')
     .setDescription('``` Make sure I\'ve enough permissions (Connect, Speak) for the voice channel. ```')
     .setTimestamp();

      let noTrack = new MessageEmbed()
     .setAuthor('Not Found!', client.user.displayAvatarURL({dynamic: true}))
     .setColor('#4aff56')
     .setDescription('``` Try to do detailed search or provide a link ```')
     .setTimestamp();
      try {
   client.distube.play(message, query)
      } catch (e) {
        let errorEm = new MessageEmbed()
        .setTitle('Error Occured in Play Command')
        .setDescription(e)
        .addField('Guild Id:', message.guild.id, true)
        .addField('Message Content:', message.content, true)
        .setTimestamp();
        let ch = "901048331919327272";
        let cha = client.channels.cache.get(ch);
        cha.send({embeds: [errorEm]})
        message.channel.send({content: 'Error Occured'})
      }
    },
};
