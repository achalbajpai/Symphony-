const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "bug-report",
    description: "directly send bug reports to devs!",
    permissions : [""],
    options: [
     {
      name: 'type',
      description: 'Type of bug encountered',
      type: "STRING",
      required: true,
      choices: [
       {
        name: 'Poor Music Playback',
        value: 'Poor Music Playback.'
       },
       {
        name: 'No voice coming',
        value: 'No voice coming.'
       },
       {
        name: 'Voice cracking',
        value: 'Voice cracking.'
       },
       {
        name: 'others',
        value: 'other.'
       }
      ]
     },
     {
      name: 'bugreport',
      description: 'Bug description',
      type: "STRING",
      required: true,
     },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      const ch = interaction.channel;
      if(!ch.permissionsFor(interaction.guild.me).has("EMBED_LINKS")) {
        interaction.followUp({content: 'I do not have `EMBED_LINKS` Permission for this channel.'})
        return;
      }

     const [ typeOfBug, bug ] = args;
     const embed = new MessageEmbed()
     .setAuthor('New Bug Found', client.user.displayAvatarURL({dynamic: true}))
     .setDescription(bug)
     .addField('Bug type', typeOfBug, true)
     .addField('Guild ID', interaction.guildId, true)
     .addField('Member Reported', interaction.member.id, true)
     .setTimestamp()
     .setColor('#85b0d2')

     const cha = "892315571956371507";
     let chaa = client.channels.cache.get(cha)

     chaa.send({embeds: [embed]})
      
     const bumbed = new MessageEmbed()
     .setAuthor('Bug has been reported!', client.user.displayAvatarURL({dynamic: true}))
     .setDescription('Join Support server to get resolution on your bug.')
     .setTimestamp()
     .setColor('#85b0d2');
     const row = new MessageActionRow()
     .addComponents(
      new MessageButton()
      .setEmoji('890854147623125003')
       .setLabel('Join here for Support')
       .setStyle('LINK')
       .setURL('https://discord.gg/ehvNmRe5qc')
     );

     await interaction.followUp({embeds: [bumbed], components: [row]})

        
    },
};
