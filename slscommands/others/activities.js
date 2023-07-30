const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
 name: 'activity',
 description: 'Play discord activities',
 options: [{
         name: 'channel',
         type: 'CHANNEL',
         channelTypes: ["GUILD_VOICE"],
         description: 'Channel to use the activity',
         required: true,
     },
     {
         name: 'activity',
         type: 'STRING',
         description: 'The activity you wanna use',
         required: true,
         choices: [{
                 name: 'youtube',
                 value: 'youtube',
             },
             {
                 name: 'poker',
                 value: 'poker',
             },
             {
                 name: 'fishington',
                 value: 'fishington',
             },
             {
                 name: 'betrayal',
                 value: 'betrayal',
             },
             {
                 name: 'chess',
                 value: 'chess',
             },
         ],
     }
 ],
 run: async (client, interaction, options) => {
         const channel = interaction.options.getChannel('channel', true)
         
     if (interaction.options.getString('activity', true) === 'youtube') {
         client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async invite => {
             return interaction.followUp({content: `[**Click here to join YouTube Together**](${invite.code} "Join YouTube Together")`});
         })
     } else if (interaction.options.getString('activity', true) === 'poker') {
         client.discordTogether.createTogetherCode(channel.id, 'poker').then(async invite => {
             return interaction.followUp(`[**Click here to join Poker Night**](${invite.code} "Join Poker Night")`);
         })
     } else if (interaction.options.getString('activity', true) === 'fishington') {
         client.discordTogether.createTogetherCode(channel.id, 'fishing').then(async invite => {
             return interaction.followUp(`[**Click here to join Fishington.io**](${invite.code} "Join fishington.io")`);
         })
     } else if (interaction.options.getString('activity', true) === 'betrayal') {
         client.discordTogether.createTogetherCode(channel.id, 'betrayal').then(async invite => {
             return interaction.followUp(`[**Click here to join Betrayal.io**](${invite.code} "Join betrayal.io")`);
         })
     } else if (interaction.options.getString('activity', true) === 'chess') {
         client.discordTogether.createTogetherCode(channel.id, 'chess').then(async invite => {
             return interaction.followUp(`[**Click here to join Chess**](${invite.code} "Join A game of Chess")`);
         })
     }
 }
}