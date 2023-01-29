const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const db = require("quick.db");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-suggest')
        .setDescription('set suggest')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild),
    run: async (client, message, args) => {
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