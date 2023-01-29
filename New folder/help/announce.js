const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "announce",
  aliases: ["", "a"],
  category: "moderation",
  usage: "embed <text to say>",
  description: "Returns provided text in Embed form.",
  run: async (message) => {
    if (!message.member.hasPermission("ADMINISTRATION")) return message.channel.send(`YOU DO NOT HAVE PERMISSION `)
    await message.delete()
    let say = message.content.split(" ").slice(1).join(" ")
    if (!say) return message.channel.send(`❌ | ` + "I Cannot Repeat Blank Message")
    let embed = new EmbedBuilder()
      .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
      .setDescription(`${say}`)
      .setColor("Random")
      .setFooter({ text: ` ${message.guild}` })
      .setTimestamp()
    message.channel.send({ embeds: [embed] })
  }
}