const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const discord = require('discord.js')
const fetch = require("node-fetch")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('findemoji')
    .setDescription('Steals Emoji from Other Servers to ur Server.')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageEmojisAndStickers),

  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
      return message.channel.send(`You Don't Have Permission To Use This Command! Manage Emojis`)
    }
    let emojis = await fetch("https://emoji.gg/api/").then(res => res.json());
    const q = args.join(" ").toLowerCase().trim().split(" ").join("_");
    let matches = emojis.filter(s => s.title == q || s.title.includes(q));

    let noResult = new discord.EmbedBuilder()
      .setDescription(`| :x: No Results found for ${args.join(" ")}!`)
      .setColor("FF2052")

    if (!matches.length) return message.channel.send(noResult)
    let page = 0;
    let embed = new discord.EmbedBuilder()
      .setTitle(matches[page].title)
      .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
      .setColor("00FFFF")
      .setImage(matches[page].image)
      .setFooter(`Emoji ${page + 1}/${matches.length}`);
    const msg = await message.channel.send(embed);
    emojis = ["◀️", "▶️", "✅", "❌"];
    msg.react(emojis[0]);
    msg.react(emojis[1]);
    msg.react(emojis[2]);
    msg.react(emojis[3]);
    const filter = (r, u) => emojis.includes(r.emoji.name.trim()) && u.id == message.author.id;
    let doing = true;
    while (doing) {
      let reaction;
      try { reaction = await msg.awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] }) }
      catch { message.channel.send(message.author.toString() + ", You took too long."); msg.reactions.removeAll(); doing = false; return; };
      reaction = reaction.first();
      const rmsg = reaction.message;
      if (reaction.emoji.name == emojis[0]) {
        page--;
        if (!matches[page]) {
          page++;
          rmsg.reactions.resolve(reaction.emoji.name).users.remove(message.author.id).catch(err => { })
        } else {
          let newembed = new discord.EmbedBuilder()
            .setTitle(matches[page].title)
            .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
            .setColor("00FFFF")
            .setImage(matches[page].image)
            .setFooter(`Emoji ${page + 1}/${matches.length}`);
          msg.edit(newembed);
          rmsg.reactions.resolve(reaction.emoji.name).users.remove(message.author.id).catch(err => { })
        }
      } else if (reaction.emoji.name == emojis[1]) {
        page++;
        if (!matches[page]) {
          page--;
          rmsg.reactions.resolve(reaction.emoji.name).users.remove(message.author.id).catch(err => { })
        } else {
          let newembed = new discord.EmbedBuilder()
            .setTitle(matches[page].title)
            .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
            .setColor("00FFFF")
            .setImage(matches[page].image)
            .setFooter(`Emoji ${page + 1}/${matches.length}`);
          msg.edit(newembed);
          rmsg.reactions.resolve(reaction.emoji.name).users.remove(message.author.id).catch(err => { })
        }
      } else if (reaction.emoji.name == emojis[2]) {
        const res = matches[page];
        let created;
        message.channel.startTyping();
        try {
          created = await message.guild.emojis.create(res.image, res.title);
          message.channel.stopTyping();
        } catch {
          message.channel.stopTyping();
          message.channel.send(`Unable to add ${res.title}.`);
          rmsg.reactions.resolve(reaction.emoji.name).users.remove(message.author.id).catch(err => { })
          doing = false;
          break;
        }
        message.channel.send(`Successfully added ${created}!`);
        rmsg.reactions.resolve(reaction.emoji.name).users.remove(message.author.id).catch(err => { })
        doing = false;
        break;

      } else if (reaction.emoji.name == emojis[3]) {
        message.channel.send("Cancelled command.");
        msg.reactions.removeAll();
        return;
      }
    };

  }
}