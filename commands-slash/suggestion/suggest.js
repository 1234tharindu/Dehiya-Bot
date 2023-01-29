const Discord = require("discord.js");
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "suggest",
  category: "suggestion",
  data: new SlashCommandBuilder()
    .setName('dm')
    .setDescription('Send a dm to a guild user')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  run: async (client, message, args) => {

    let channel = await db.fetch(`suggestion_${message.guild.id}`);
    if (channel === null) return;

    const suggestionQuery = args.join(" ");
    if (!suggestionQuery) return message.reply("Please Suggest Something.");

    const embed = new EmbedBuilder()

      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${suggestionQuery}`)
      .setColor("00FFFF")
      .setFooter("Status: Pending")
      .setTimestamp();

    const done = new EmbedBuilder()
      .setDescription(`<:bfdyes:832931453892558848>  | Your suggestion is Submitted here, <#${channel}>\n\nNote: You agreed to get a DM on a reply over your Suggestion!`)
      .setColor("00FFFF")

    message.channel.send(done)

    let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)

    await msgEmbed.react('<:upvote:832931955556745236>')
    await msgEmbed.react('<:downvote:832931677294428161> ')
  }
}