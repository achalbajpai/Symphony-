const { Message, Client, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { pagination } = require('reconlx');
module.exports = {
    name: "help",
    aliases: ['cmds'],
    permissions : [""],
    description: "",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

     const home = new MessageEmbed()
     .setAuthor(`Help Menu`, client.user.displayAvatarURL())
     .setColor('#3498db')
     .setDescription(`Hello 👋\nI'm Symphony, an advanced music bot playing music with about 40+ filters and giving custom playlist feature as well.\nThe prefix for this guild is \`s!\`\nTo see all of my commands use the buttons below!`)
     .setThumbnail(client.user.displayAvatarURL())
     .setImage('https://media.discordapp.net/attachments/862016314046152794/908457532182376500/standard.gif');

      let btnrow = new MessageActionRow().addComponents(

       new MessageButton()
       .setCustomId("home")
       .setLabel("Home Page")
       .setEmoji('908631866721071105')
       .setStyle("PRIMARY"),

       new MessageButton()
       .setCustomId("music")
       .setLabel("Music Commands!")
       .setEmoji('819095028110458881')
       .setStyle("PRIMARY"),

       new MessageButton()
       .setCustomId("custom")
       .setLabel("Custom Playlist")
       .setEmoji('862029411377610803')
       .setStyle("PRIMARY"),

       new MessageButton()
       .setCustomId("filters")
       .setLabel("Music Filters")
       .setEmoji('818744010109222922')
       .setStyle("PRIMARY"),

       )

       let buttrow = new MessageActionRow().addComponents(
        new MessageButton()
        .setStyle("LINK")
        .setLabel("Invite Me")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=797393693673652224&permissions=2184531009&scope=bot%20applications.commands")
        .setEmoji('890851994321948672'),
 
        new MessageButton()
        .setStyle("LINK")
        .setLabel("Support Server")
        .setURL("https://discord.gg/ehvNmRe5qc")
        .setEmoji("908633477367332875"),

        new MessageButton()
        .setStyle("LINK")
        .setLabel("Vote Me")
        .setURL("https://top.gg/bot/797393693673652224/vote")
        .setEmoji("890563540367319080"),
       )

       let d_btnrow = new MessageActionRow().addComponents(

        new MessageButton()
       .setCustomId("d_home")
       .setLabel("Home Page")
       .setDisabled(true)
       .setEmoji('908631866721071105')
       .setStyle("PRIMARY"),

        new MessageButton()
        .setCustomId("d_music")
        .setLabel("Music Commands!")
        .setEmoji('819095028110458881')
        .setDisabled(true)
        .setStyle("PRIMARY"),
 
        new MessageButton()
        .setCustomId("d_custom")
        .setLabel("Custom Playlist")
        .setDisabled(true)
        .setEmoji('862029411377610803')
        .setStyle("PRIMARY"),
 
        new MessageButton()
        .setCustomId("d_filters")
        .setLabel("Music Filters")
        .setDisabled(true)
        .setEmoji('818744010109222922')
        .setStyle("PRIMARY"),

        )

       let musicEmbed = new MessageEmbed()
       .setAuthor('Music Commands!', client.user.displayAvatarURL())
       .setColor('#3498db')
       .setDescription(`All music commands are listed below: \n\`Play [Query]\` - \`Play the music from youtube or spotify.\` \n\`Pause\` - \`Pause Music Playback\` \n\`Resume\` - \`Resume Music Playback\` \n\`Skip\` - \`Skip Current Track\` \n\`Previous\` - \`Switch back to previous track\` \n\`Stop\` - \`Stop Music & Disconnect bot\` \n\`Autoplay\` - \`Automatically add similar music to queue\` \n\`Loop off/song/queue\` - \`Toggle loop mode\` \n\`Queue\` - \`Shows the music queue\` \n\`Shuffle\` - \`Shuffle the queue\` \n\`Volume [Volume]\` - \`Change the music volume\` \n\`Lyrics\` - \`Get the music lyrics\` `)
       .setFooter('Use buttons to navigate!', client.user.displayAvatarURL({dynamic: true}));

       let filtersEmbed = new MessageEmbed()
       .setAuthor('Music Filters!', client.user.displayAvatarURL())
       .setColor('#3498db')
       .setFooter('Use buttons to navigate!', client.user.displayAvatarURL({dynamic: true}))
       .setDescription(`\`To use filters, use the command s!filters [FilterName] \` \nAll music filters are listed below: \n \`clear, bassboost, 8D, vaporwave, nightcore, phaser, tremolo, vibrato, reverse, treble, normalizer, surrounding, pulsator, subboost, karaoke, flanger, gate, haas, mcompand, double, half, cursed, rickroll, purebass, 3D, earwax, mono, echo, sofalizer, aphaser, apulsator, asetrate, speed, superspeed, slow, superslow, deesser, earrape, lightbass, heavybass\``);

       let customEmbed = new MessageEmbed()
       .setAuthor('Custom Playlist', client.user.displayAvatarURL())
       .setColor('#3498db')
       .setFooter('Use buttons to navigate!', client.user.displayAvatarURL({dynamic: true}))
       .setDescription(`All Custom Playlist commands are listed below: \n\`custom add [URL]\` - \`Add a song to custom playlist\` \n\`custom play\` - \`Play your custom playlist!\` \n\`custom reset\` - \`Reset your playlist to 0 songs\` `);


       await message.channel.send({embeds: [home], components: [btnrow, buttrow]}).then(async (msg) => {
        let filter = i => i.user.id === message.author.id;
        let collector = await msg.createMessageComponentCollector({filter: filter, time: 1000 * 60})
        collector.on('collect', async (btn) => {
         if(btn.isButton()) {
          if(btn.customId === "music") {
          await btn.deferUpdate().catch(e => {})
           await msg.edit({embeds: [musicEmbed]});
          }
          if(btn.customId === "filters") {
           await btn.deferUpdate().catch(e => {})
           await msg.edit({embeds: [filtersEmbed]});
          }
          if(btn.customId === "custom") {
           await btn.deferUpdate().catch(e => {})
           await msg.edit({embeds: [customEmbed]});
          }
          if(btn.customId === "home") {
           await btn.deferUpdate().catch(e => {})
           await msg.edit({embeds: [home]});
          }
         }
        })
        collector.on('end', () => {
         msg.edit({embeds: [home], components: [d_btnrow, buttrow]});
        })
       })

    }
   }
