const { EmbedBuilder } = require("discord.js");

module.exports = {

  name: "dashboard",

  category: "info",
  aliases: ['dash', 'dashboard', 'dashboards'],
  description: 'Check\'s bot\'s dashboard',
  run: async (client, message) => {

    message.channel.send({
      embeds:
        [
          new EmbedBuilder()
            .setColor('Random')
            .setTitle(`${message.author.tag}`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields([
              { name: '**• Discord**', value: `**[Dash](https://discord.gg/n5tpK32xdf)**`, inline: true }
            ])

            .setTimestamp()
            .setFooter({
              text: `${client.user.username} Bot`,
              iconURL: client.user.displayAvatarURL()
            })
        ]
    })
  }
};
