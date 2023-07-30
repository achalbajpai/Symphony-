const { Message, Client, MessageEmbed, MessageActionRow, MessageButton  } = require("discord.js");

module.exports = {
    name: "support",
    aliases: [''],
    permissions : [""],
    description: "shows support server link!",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
     const ch = message.channel;
     if(!ch.permissionsFor(message.guild.me).has("EMBED_LINKS")) {
       message.reply({content: 'I do not have `EMBED_LINKS` Permission for this channel.'})
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
      
        message.channel.send({ embeds: [invembed], ephemeral: true, components: [row] })
    },
};