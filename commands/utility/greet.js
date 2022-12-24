const discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const guildDB = require("../../mongo/guildDB");
module.exports = {
  name: "greet",
  description: "Toogles greet system",
  usage: ``,
  category: "utility",
  aliases: ["greet"],
  run: async (client, message, args) => {
    message.delete().catch(() => { });

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(`:x: Missing Permission`);

    let channel = message.mentions.channels.first() || message.channel;

    let data = await guildDB.find({ guild: message.guild.id })
    if (!data?.length) {
      await guildDB.create({
        guild: message.guild.id,
        channel: channel.id,
      })
      message.reply({
        content: `Enabled greet for ${channel}.`
      })
    } else {
      var ch = data.map((guildDB) => {
        return [`${guildDB.channel}`]
      })
      guildDB.updateOne({ guild: message.guild.id }, { channel: ch + channel.id }, function (err, res) { });
      message.reply({
        content: `Enabled greet for ${channel}.`
      })
    }
  }
}