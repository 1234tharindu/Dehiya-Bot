const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "sreply",
  category: "suggestion",
  run: async (client, message, args) => {

    let channel = await db.fetch(`suggestion_${message.guild.id}`);
    if (channel === null) return;

    if (!message.member.hasPermission('MANAGE_GUILD')) return;

    const rgx = /^(?:<@!?)?(\d+)>?$/;

    const messageID = args[0];
    const replyQuery = args.slice(1).join(' ');

    const number = new EmbedBuilder()
      .setDescription(`<:bfdno:832931445991276584>    | I don't think that was a Message ID!`)
      .setColor("FF2052")

    const id = new EmbedBuilder()
      .setDescription(`<:bfdno:832931445991276584>  |You forgot to specify Message ID!`)
      .setColor("FF2052")

    const query = new EmbedBuilder()
      .setDescription(`<:bfdno:832931445991276584>   | You forgot to specify the Reply!`)
      .setColor("FF2052")

    const reply = new EmbedBuilder()
      .setDescription(`<:bfdyes:832931453892558848>  | Successfully Replied the Suggestion.`)
      .setColor("00FFFF")

    const noChannel = new EmbedBuilder()
      .setDescription(`<:bfdno:832931445991276584>   | No Suggestion Channel found!`)
      .setColor("FF2052")

    const noMessage = new EmbedBuilder()
      .setDescription(`<:bfdno:832931445991276584>   | Didn't find any Message with that ID!`)
      .setColor("FF2052")

    if (!messageID) return message.channel.send(id);

    if (!rgx.test(messageID)) return message.channel.send(number);

    if (!replyQuery) return message.channel.send(query)

    try {
      const suggestionChannel = message.guild.channels.cache.get(channel)

      if (!suggestionChannel) return message.channel.send(noChannel)

      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
        const noMessage = new EmbedBuilder()
          .setDescription(`<:bfdno:832931445991276584>   | Didn't find any Message with that ID!`)
          .setColor("FF2052")
        return message.channel.send(noMessage);
      })

      const data = suggestedEmbed.embeds[0];

      const replyEmbed = new EmbedBuilder()
        .setAuthor(`${data.author.name}`, data.author.iconURL)
        .setDescription(data.description)
        .setColor("BLUE")
        .addField(`Reply from ${message.author.tag}`, replyQuery)
        .setFooter("Status: Replied")
        .setTimestamp();

      suggestedEmbed.edit(replyEmbed)

      message.channel.send(reply)

      const user = await client.users.cache.find((u) => u.tag === data.author.name)

      const embed = new EmbedBuilder()
        .setDescription(`You have got a Reply over your Suggestion <:bfdyes:832931453892558848> . **[Message Link](https://discord.com/channels/${message.guild.id}/${channel}/${messageID})**`)
        .setColor("BLUE")
      user.send(embed)

    } catch (err) {
      return;
    }
  }
}