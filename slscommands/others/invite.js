const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Shows bot invite link",
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
      .setTitle("Invite Symphony")
      .setDescription(`**Advanced Music Bot**`)
      .setTimestamp()
      .setColor('#3498db');
      const row = new MessageActionRow()
      .addComponents(
       new MessageButton()
       .setEmoji('890851994321948672')
       .setLabel('Add Me')
       .setStyle('LINK')
       .setURL('https://discord.com/api/oauth2/authorize?client_id=797393693673652224&permissions=2184531009&scope=bot%20applications.commands')
      )
      
        interaction.followUp({ embeds: [invembed], ephemeral: true, components: [row] })
    },
};