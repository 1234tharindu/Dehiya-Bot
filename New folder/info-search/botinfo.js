const { EmbedBuilder } = require("discord.js")
module.exports = {

  name: "botinfo",

  category: "info",
  aliases: ['uptime', 'botstats', 'stats'],
  description: 'Check\'s bot\'s status',
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor('Random')
          .setTitle(`${message.author.tag}`)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: false }))
          .addFields([
            { name: '**• Version**', value: `2.0.0`, inline: true },
            { name: `**• Users**`, value: `${client.users.cache.size} users`, inline: true },
            { name: '**• Servers**', value: `${client.guilds.cache.size} guilds`, inline: true },
            { name: '**• Discord.js**', value: `14.7.1`, inline: true },
            { name: '**• Ping**', value: `${client.ws.ping}ms`, inline: true },
            { name: '**• Commands**', value: `${client.commands.size} cmds`, inline: true },
            { name: 'Important Links ', value: '**• [Support](https://discord.gg/kB7ecN53u5)**  • **[Discord](https://discord.gg/n5tpK32xdf)** ** • [Invite Me](https://discord.com/api/oauth2/authorize?client_id=903837785612484609&permissions=8&scope=bot%20applications.commands)**' },
          ])
          .setTimestamp()
          .setFooter({
            text: `${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
          })
      ]
    }
    )
  }
};
