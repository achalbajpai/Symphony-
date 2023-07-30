const { Message, Client, MessageEmbed } = require("discord.js");
const lyri = require('lyrics-finder');

module.exports = {
    name: "lyrics",
    aliases: ['ly'],
    description: "Shows music lyrics",
    permissions : [""],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

      const ch = message.channel;
      if(!ch.permissionsFor(message.guild.me).has("EMBED_LINKS")) {
        message.channel.send({content: 'I do not have `EMBED_LINKS` Permission for this channel.'})
        return;
      }

      const voice_channel = message.member.voice.channel;
      const embed = new MessageEmbed()
      .setColor('#FF5757')
      .setDescription(`You need to be in a vc to execute this command!`)
      if (!voice_channel) return message.channel.send({embeds: [embed]});
      if(!voice_channel.permissionsFor(message.guild.me).has("CONNECT")) {
        const eR = new MessageEmbed()
        .setAuthor('Missing Permissions', client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`Make sure I have \`CONNECT\` Permission for the ${voice_channel}`)
        .setColor('#85b0d2')
        .setTimestamp();

        message.channel.send({embeds: [eR]})
        return;
      }
      if(!voice_channel.permissionsFor(message.guild.me).has("SPEAK")) {
        const eR = new MessageEmbed()
        .setAuthor('Missing Permissions', client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`Make sure I have \`SPEAK\` Permission for the ${voice_channel}`)
        .setColor('#85b0d2')
        .setTimestamp();

        message.channel.send({embeds: [eR]})
        return;
      }
      if(!voice_channel.permissionsFor(message.guild.me).has("VIEW_CHANNEL")) {
        const eR = new MessageEmbed()
        .setAuthor('Missing Permissions', client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`I cannot see your voice channel. Make sure I've permissions to do so.`)
        .setColor('#85b0d2')
        .setTimestamp();

        message.channel.send({embeds: [eR]})
        return;
      }

              let queue = client.distube.getQueue(message);
            if(!queue) {
             const bembed = new MessageEmbed()
             .setColor('#FF5757')
             .setDescription(`There is no song playing right now!`)
             return message.reply({embeds: [bembed]})
            }
            let song = args.slice(0).join(" ");
            if(!song) {
             const cembed = new MessageEmbed()
             .setColor('#FF5757')
             .setDescription(`Provide a music name to search lyrics for!`)
             return message.reply({embeds: [cembed]})
            }
            let gotLyrics = await lyri(song, "")
            // console.log(gotLyrics)
            if(!gotLyrics) {
             const dembed = new MessageEmbed()
             .setColor('#FF5757')
             .setDescription(`Lyrics not found !`)
             return message.reply({embeds: [dembed]})
            }

           const lyembed = new MessageEmbed()
           .setAuthor('Lyrics', client.user.displayAvatarURL({dynamic: true}))
           .setDescription(`
           Lyrics: \`\`\`${gotLyrics}\`\`\`
           `)
           .setFooter('Lyrics powered by Lyrics-finder!')
           .setColor('#85b0d2')
           .setTimestamp();

           await message.channel.send({embeds: [lyembed]})
    }
}