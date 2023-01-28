const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["icon", "pfp"],
  category: "fun",
  description: "Show Member Avatar!",
  usage: "Avatar | <Mention Member>",
  accessableby: "everyone",
  run: async (client, message) => {

    let Member = message.mentions.users.first();
    if (!Member) {
      Member = message.author;
    }

    let embed = new EmbedBuilder()
      .setColor("00FFFF")
      .addFields([
        {
          name: "Links",
          value: `[Png](${Member.displayAvatarURL({ format: "png", dynamic: true })}) |
         [Jpg](${Member.displayAvatarURL({ format: "jpg", dynamic: true })}) |
          [Webp](${Member.displayAvatarURL({ format: "webp", dynamic: true })})`
        }
      ])
      .setImage(Member.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send({ embeds: [embed] });

  }
};