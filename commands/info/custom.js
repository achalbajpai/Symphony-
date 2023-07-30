const customPlaylist = require('../../schema/customPlaylist');
const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "custom",
    aliases: [''],
    permissions : [""],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

     let customEmbed = new MessageEmbed()
     .setAuthor('Custom Playlist Help', client.user.displayAvatarURL({dynamic: true}))
     .setColor('#4ae7ff')
     .setDescription(`Custom Playlist: \n1.) s!custom add <url>\n \`Add songs to your custom playlist!\` \n2.) s!custom play\n \`Play your custom playlist!\` \n3.) s!custom reset\n \`Reset Your playlist!\` `)
     .setTimestamp();


     if(!args[0]) return message.channel.send({embeds: [customEmbed]});
     if(args[0] === "add")  {
       let data = await customPlaylist.findOne({userID: message.member.id})
       if(!data) new customPlaylist({
        userID: message.member.id,
       }).save();
       if(!args[1]) return message.channel.send({content: 'Give music url to add'})
       if (!args[1].includes("http")) return message.reply("Oh no! That is not a Link for example: https://www.youtube.com/watch?v=dQw4w9WgXcQ")
      let hello = { songs: `${args[1]}` };
      let dataaa = await customPlaylist.findOneAndUpdate({userID: message.member.id}, {$push: hello})

      message.channel.send({content: 'Done'})
     }
     if(args[0] === "play"){
      let dataa = await customPlaylist.findOne({userID: message.member.id})
      if(!dataa) return message.channel.send({content: 'No custom playlist found!'});

      let songs = dataa.songs;
      const playlist = await client.distube.handler.createCustomPlaylist(message.member, songs, { name: `${message.member.displayName}'s Saved Playlist` }, true);
      if(!songs) return message.channel.send({content: 'No custom playlist found!'})

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

      let voice_channel = message.member.voice.channel;
      if(!voice_channel) return message.channel.send({embeds: [noChannel]});
      if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return message.channel.send({embeds: [sameChannel]});
      try {
       client.distube.playVoiceChannel(voice_channel, playlist, {
        member: message.member,
        textChannel: message.channel,
      })
      } catch (error) {
       let errorEm = new MessageEmbed()
        .setTitle('Error Occured in Play Command')
        .setDescription(`${error}`)
        .addField('Guild Id:', interaction.guild.id, true)
        .setTimestamp();
        let ch = "901048331919327272";
        let cha = client.channels.cache.get(ch);
        cha.send({embeds: [errorEm]})
        console.log(error);
        message.channel.send({content: 'An Error Occured!'})
      }
     }
     if(args[0] === "reset") {
      let dat = await customPlaylist.findOne({userID: message.member.id})
      if(!dat) return message.channel.send({content: 'No Data Found!'})

      if(dat) dat.delete();
      return message.channel.send({content: 'Done!'})
     }
    },
}