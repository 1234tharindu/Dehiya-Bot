const { EmbedBuilder } = require("discord.js")
const moment = require('moment')
const db = require("quick.db")

module.exports = {
    name: "kick",
    category: "moderation",
    description: "kick a user",
    cooldown: 5,
    userPerms: ["KICK_MEMBERS"],
    clientPerms: ["KICK_MEMBERS"],
    run: async (client, message, args) => {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ")
        if (!args[0]) return message.channel.send(":x: | **Specify someone to kick.**")
        if (!mentionedMember) return message.channel.send(":x: | **I can't find that member.**")
        if (mentionedMember.id === message.author.id) return message.channel.send(":x: | You can't kick yourself.")
        if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
            return message.channel.send(":x: | **You can\'t kick this member due to your role being lower than that member role.**")
        }
        if (mentionedMember.kickable) {
            const embed = new EmbedBuilder()
                .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
                .setColor(`RANDOM`)
                .setDescription(`
**Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
**Reason:** ${reason || "None"}
            `)
            message.channel.send(embed)
            mentionedMember.kick()

            const embed1 = new EmbedBuilder()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "kick")
                .addField("**User Kicked**", mentionedMember.user.username)
                .addField("**Kicked By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();


            message.guild.channels.cache.get(db.get(`modlog_${message.guild.id}`)).send(embed1)
        } else {
            return
            message.channel.send(':x: | **I can\'t kick this user make sure that the users role is lower than my role.**')

        }
    }
}