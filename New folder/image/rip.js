const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "rip",
  aliases: ["died", ""],
  category: "Image",
  description: "Shows RIP create with user avatar",
  usage: "rip <user>",
  run: async (message, args) => {

    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const Embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Rest In Peace")
      .setImage(encodeURI
        (`https://api.devs-hub.xyz/rip?image=${Member.user.displayAvatarURL({ format: "png" })}`))
      .setTimestamp();

    return message.channel.send({ embeds: [Embed] });
  }
};