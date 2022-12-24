const db = require("quick.db");
const Discord = require ("discord.js")
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
module.exports = {

  name: "developer",

  category: "info",
    aliases: ['developers', 'developer'],
    description: 'Check\'s bot\'s status',
  run: async (client, message, args, del, member) => {
   message.delete();
      message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${message.author.tag}`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addField(
              "**• Developers**",
              "! Chirath#5959"
            )
          
            .addField('Important Links ','**• [Support](https://discord.gg/kB7ecN53u5)**  • **[Website](https://saturnbot.npgop.repl.co/)** ** • [Invite Me](https://discord.com/oauth2/authorize?client_id=906899294815145995&permissions=8&scope=bot%20applications.commands)**')

            .setTimestamp()
           .setFooter(
           `CT Bot`,
            client.user.displayAvatarURL()  
      ))
         }
};
