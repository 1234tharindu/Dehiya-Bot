const Discord = require("discord.js");

module.exports = {
    name: "nuke",
    aliases: ["nuke", "nukes"],
    category: "moderation",
    description: "nuke",
    run: async (client, message, args) => {
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I don\'t have the right permissions.')
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send("You Don't Have Permission!")
        }
        const channel = message.mentions.channels.first();
        channel.clone().then
            ((ch) => {
                ch.setParent(channel.parent);
                ch.setPosition(channel.position);
                channel.delete().then(() => {
                    ch.send("**Channel Has Been Nuked** \n https://imgur.com/LIyGeCR")
                })

            });
    }
}