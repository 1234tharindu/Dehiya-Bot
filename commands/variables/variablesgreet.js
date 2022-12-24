const db = require("quick.db");
const Discord = require("discord.js")
const { version: discordjsVersion } = require('discord.js');
module.exports = {

  name: "variable-greet",

  category: "variables",
  aliases: ['variable'],
  description: 'Shows bot variables',
  run: async (client, message, args) => {
    message.delete();
    message.channel.send(new Discord.EmbedBuilder()
      .setColor('RANDOM')
      .setTitle(`**${message.author.tag}**`)
      .addField(
        "__**❯ Greet custom message**__",
        "The custom message variables you can use when someone joins. NOTE: These variables can also be used in alert join message"
      )
      .addField(
        "**❯ Example**",
        "[member:mention] Welcome to [guild:name]"
      )
      .addField(
        "**❯ Variables**",
        "`[member:mention] => pings member`"
      )
      .addField(
        "`[guild:name] => displays guild name`",
        "`[guild:membercount] => displays guild membercount`"
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setFooter(
        `${client.user.username} Bot`,
        client.user.displayAvatarURL()
      )
    );

  }
}
