const db = require("quick.db");
const Discord = require("discord.js")
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
module.exports = {

  name: "botinfo",

  category: "info",
  aliases: ['uptime', 'botstats', 'stats'],
  description: 'Check\'s bot\'s status',
  run: async (client, message, args, del, member) => {
    message.delete();
    message.channel.send(new Discord.EmbedBuilder()
      .setColor('RANDOM')
      .setTitle(`${message.author.tag}`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: false }))
      .addField('**• Version**', `1.0.0`, false)
      .addField(`**• Users**`, `${client.users.cache.size} users`, false)
      .addField('**• Servers**', `${client.guilds.cache.size} guilds`, false)
      .addField('**• Discord.js**', `13.2.0`, false)
      .addField('**• Ping**', `${client.ws.ping}ms`, false)
      .addField('**• Commands**', `${client.commands.size} cmds`, false)
      .addField('Important Links ', '**• [Support](https://discord.gg/kB7ecN53u5)**  • **[Discord](https://discord.gg/n5tpK32xdf)** ** • [Invite Me](https://discord.com/api/oauth2/authorize?client_id=903837785612484609&permissions=8&scope=bot%20applications.commands)**')

      .setTimestamp()
      .setFooter(
        `${client.user.username}`,
        client.user.displayAvatarURL()
      ))
  }
};
