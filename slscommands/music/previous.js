const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "previous",
    description: "Move to last played music",
    permissions : [""],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
     let query = interaction.options.getString('query');
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
       let song = queue.previous();
       let pauseEm = new MessageEmbed()
       .setAuthor('Changing to previous music!', client.user.displayAvatarURL({dynamic: true}))
       .setColor('#4ae7ff')
       .setDescription(`Now playing the previous song!`)
       .setTimestamp();
       interaction.followUp({embeds: [pauseEm]});

      } catch (error) {
        let errorEm = new MessageEmbed()
        .setTitle('Error Occured in Previous Command')
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