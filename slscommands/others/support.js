const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");

module.exports = {
    name: "support",
    description: "Sends a link to bot support server!",
    permissions : [""],
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
      const invembed = new MessageEmbed()
      .setTitle("Support Server")
      .setDescription(`**Advanced Music Bot**`)
      .setTimestamp()
      .setColor('#3498db');
      const row = new MessageActionRow()
      .addComponents(
       new MessageButton()
       .setEmoji('890854147623125003')
       .setLabel('Join here for Support')
       .setStyle('LINK')
       .setURL('https://discord.gg/ehvNmRe5qc')
      )
      
        interaction.followUp({ embeds: [invembed], ephemeral: true, components: [row] })
    },
};