const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "",
  category: "moderation",
  description: "",
  usage: "ban <@user> <reason>",
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban anyone with one shot without knowing anyone xD')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  run: async (client, message, args) => {

    const target = message.mentions.members.first()

    const reason = args.slice(1).join(" ")

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`You don't have enough powers to ban someone`)

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(`I don't have powers to ban someone`)

    if (!args[0]) return message.reply(`Please mention someone to ban`)

    if (!target) return message.reply(`I can't find that member`)

    if (target.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.owner.id) {
      return message.reply(`They have more power than you`)
    }

    if (target.id === message.author.id) return message.reply(`I can't ban you as you are the Boss`)

    if (target.bannable) {
      let embed = new discord.EmbedBuilder()
        .setColor("RANDOM")
        .setDescription(`Banned \`${target}\` for \`${reason || "No Reason Provided"}\``)

      message.channel.send(embed)

      target.ban()

      message.delete()

    } else {
      return message.reply(`I can't ban them, make sure that my role is above of theirs`)
    }
    return undefined
  }
};