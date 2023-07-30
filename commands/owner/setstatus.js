const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "setstatus",
    aliases: [''],
    permissions : [""],
    description: "",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        
        if(!message.author.id === "785931167357599804") {
            const ownerOp = new MessageEmbed()
            .setAuthor('Owner Only', client.user.displayAvatarURL({dynamic: true}))
            .setDescription('The command can only be used by owner.')
            .setTimestamp();
            
            return message.channel.send({embeds: [ownerOp]})
        }
        const ch = message.channel;
      if(!ch.permissionsFor(message.guild.me).has("EMBED_LINKS")) {
        message.reply({content: 'I do not have `EMBED_LINKS` Permission for this channel.'})
        return;
      }
        let type = args[0];
        let status = args.slice(1).join(" ");
        
        client.user.setActivity(status, {type: type})
    
    	const succ = new MessageEmbed()
            .setAuthor('Status has been changed', client.user.displayAvatarURL({dynamic: true}))
            .setDescription('New status can be checked by looking on my profile.')
            .setTimestamp();
            
            return message.channel.send({embeds: [succ]})
       
    },
};