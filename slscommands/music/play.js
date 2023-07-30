const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    description: "play the music in voice channel",
    permissions : [""],
    options: [
     {
      name: 'query',
      required: true,
      description: 'the music/song to play',
      type: 'STRING'
     }
    ],
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

     const ch = interaction.channel;
      if(!ch.permissionsFor(interaction.guild.me).has("EMBED_LINKS") || !ch.permissionsFor(interaction.guild.me).has("SEND_MESSAGES")) {
        interaction.followUp({content: 'I do not have `EMBED_LINKS` Permission for this channel.'})
        return;
      }
      const bh = interaction.member.voice.channel;
      if(!bh.permissionsFor(interaction.guild.me).has("CONNECT") || !bh.permissionsFor(interaction.guild.me).has("SPEAK")) {
        return interaction.followUp({content: 'I do not have `CONNECT & SPEAK` permissions in the voice channel.'})
      }
      let voice_channel = interaction.member.voice.channel;
      if (!interaction.member.voice.channelId) return message.channel.send({embeds: [noChannel]});
      if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return interaction.followUp({embeds: [sameChannel]});
      if(!query) return interaction.followUp({embeds: [noSong]});

      try {
          client.distube.playVoiceChannel(voice_channel, query, {
            member: interaction.member,
            textChannel: interaction.channel,
          })
          interaction.followUp({content: '<:symphony_logo:818428637719822337> **Looking for the query!**', ephemeral: true})
      } catch (error) {
        let errorEm = new MessageEmbed()
        .setTitle('Error Occured in Play Command')
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
