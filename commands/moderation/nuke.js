const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: "nuke",
    aliases: ["nuke", "nukes"],
    category: "moderation",
    description: "nuke",
    run: async (client, message) => {
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.channel.send('I don\'t have the right permissions.')
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            return message.channel.send("You Don't Have Permission!")
        }
        const channel = message.mentions.channels.first();
        channel.clone().then
            ((ch) => {
                ch.setParent(channel.parent);
                ch.setPosition(channel.position);
                ch.permissionOverwrites.set(channel.permissionOverwrites.cache);
                channel.delete().then(() => {
                    ch.send({ content: "**Channel Has Been Nuked**", files: ['https://tenor.com/view/bh187-explosion-explode-gif-19166724.gif'] })
                })

            });
    }
}