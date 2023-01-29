const Discord = require("discord.js");
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setsuggest",
    category: "suggestion",
    usage: "setsuggest <#channel>",
    authorPermission: ["MANAGE_GUILD"],
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('Send a dm to a guild user')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send(`You Don't Have Permission To Use This Command! Manage server`)
        }
        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "voice") return message.channel.send(`Please Mention A Text Channel!`);

        await db.set(`suggestion_${message.guild.id}`, Channel.id);

        let Embed = new EmbedBuilder()
            .setColor("00FFFF")
            .setDescription(`Suggestion Channel is setted as <#${Channel.id}>`)

        return message.channel.send(Embed);

    }
};