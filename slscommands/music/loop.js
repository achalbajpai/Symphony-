const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
    description: "Change loop settings!",
    permissions : [""],
    options: [
     {
      name: 'mode',
      type: 'STRING',
      description: 'choose a new loop mode!',
      required: true,
      choices: [
       {
        name: 'Off',
        value: 'Off',
       },
       {
        name: 'Song',
        value: 'Song',
       },
       {
        name: 'Queue',
        value: 'Queue',
       },
      ],
     },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
     let query = interaction.options.getString('query', false);
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
       const arg = interaction.options.getString("mode", false);
       let queue = client.distube.getQueue(interaction);
       if(!queue) return interaction.followUp({embeds: [noTrack]});
       let mode = null;
    switch (arg) {
      case "Off":
        
        mode = 0
        queue.setRepeatMode(mode)
        mode = "Off";
        let loopEm = new MessageEmbed()
          .setAuthor('Loop', client.user.displayAvatarURL({dynamic: true}))
          .setColor('#4ae7ff')
          .setDescription(`Loop is now disabled!`)
          .setTimestamp();
          interaction.followUp({embeds: [loopEm]});
        break;
      case "Song":
        
        mode = 1
        queue.setRepeatMode(mode)
        mode = "This Song";
        let loopEmb = new MessageEmbed()
          .setAuthor('Loop', client.user.displayAvatarURL({dynamic: true}))
          .setColor('#4ae7ff')
          .setDescription(`Loop is now set to ${mode} mode!`)
          .setTimestamp();
          interaction.followUp({embeds: [loopEmb]});
        break;
      case "Queue":
        
        mode = 2
        queue.setRepeatMode(mode)
        mode = "Queue";
        let loopEmbe = new MessageEmbed()
          .setAuthor('Loop', client.user.displayAvatarURL({dynamic: true}))
          .setColor('#4ae7ff')
          .setDescription(`Loop is now set to ${mode} mode!`)
          .setTimestamp();
          interaction.followUp({embeds: [loopEmbe]});
        break;
    }
      } catch (error) {
       let errorEm = new MessageEmbed()
        .setTitle('Error Occured in Loop Command')
        .setDescription(`${error}`)
        .addField('Guild Id:', interaction.guild.id, true)
        .setTimestamp();
        let ch = "901048331919327272";
        let cha = client.channels.cache.get(ch);
        cha.send({embeds: [errorEm]})
        interaction.followUp({content: 'An Error Occured!'})
      }
     }
    }