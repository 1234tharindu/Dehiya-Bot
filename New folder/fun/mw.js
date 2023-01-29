const { EmbedBuilder } = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "mwallpapers",
  aliases: ["mw", "mobilewallpapers", "mwall"],
  category: "nsfw",
  description: "Get some wallpapers",
  run: async (client, message) => {

    let akanekoSan = new EmbedBuilder()
      .setColor("Random")
      .setImage(await akaneko.mobileWallpapers());
    return message.channel.send({ embeds: [akanekoSan] });
  }
}