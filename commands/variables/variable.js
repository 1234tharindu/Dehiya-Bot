const db = require("quick.db");
const Discord = require("discord.js")
const { version: discordjsVersion } = require('discord.js');
module.exports = {

  name: "variable",

  category: "variables",
  aliases: ['variable'],
  description: 'Shows bot variables',
  run: async (client, message, args) => {
    message.delete();
    message.channel.send(new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Variables`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addField('Greet Variables', `"s!variables-greet"`, true)
      .addField('Invites Tracker Variables(coming soon)', `"s!variables-invites"`, true)
      .addField('Giveaway Variables', `"s!variables-giveaway(coming soon)"`, true)
      .setFooter(
        `${client.user.username} Bot`,
        client.user.displayAvatarURL(),
        message.delete()
      )
    );

  }
}
