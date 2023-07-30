const { MessageEmbed }= require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports = {
        name: "botinfo",
        aliases: ['stats'],
        description: "Shows Bot Statistics",
        run: async (client, message, args, prefix) => {
                 const ch = message.channel;
     if(!ch.permissionsFor(message.guild.me).has("EMBED_LINKS")) {
       message.reply({content: 'I do not have `EMBED_LINKS` Permission for this channel.'})
       return;
     }
        
        const d = moment.duration(message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const clientStats = stripIndent`
          Servers   :: ${message.client.guilds.cache.size}
          Users     :: ${message.client.users.cache.size}
          Channels  :: ${message.client.channels.cache.size}
          WS Ping   :: ${Math.round(message.client.ws.ping)}ms
          Uptime    :: ${days} and ${hours}
          Prefix    :: ${prefix}
       `;
        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS        :: ${await os.oos()}
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
        `;
    
        const embed = new MessageEmbed()
        .setAuthor('Bot Stats', client.user.displayAvatarURL({dynamic: true}))
        .addField('Commands', `\`${message.client.commands.size}\` commands`, true)
        .addField('Aliases', `\`${message.client.aliases.size}\` aliases`, true)
        .addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('#3498db');
        message.channel.send({ embeds: [embed] });
     }
}