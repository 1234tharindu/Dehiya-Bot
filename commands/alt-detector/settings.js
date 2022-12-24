const discord = require('discord.js')
const db = require("quick.db")
const chalk = require('chalk')

module.exports = {
    name: "settings",
    aliases: ['setting'],
    description: "shows settings",
    category: "alt-detector",
    run: async (client, message, member) => {

        let logChannel = await db.get(`LoggingChannel_${message.guild.id}`)
        let NotifyRole = await db.get(`notifyRole_${message.guild.id}`)
        let AltAge = await db.get(`altAge_${message.guild.id}`)
        let AltData = await db.get(`AutoKick_${message.guild.id}`)
        let AutoKickAge = await db.get(`AutokickAge_${message.guild.id}`)
        let WhiteListed = await db.get(`WhiteListed_${message.guild.id}`)
        let modlog = await db.get(`modlog_${message.guild.id}`)
        let welchannel = await db.get(`welchannel_${message.guild.id}`)
        let errorchannel = await db.get(`ErrorLoggingChannel_${message.guild.id}`)
        let ticketchannel = await db.get(`TicketChannel_${message.guild.id}`)

        let channel = `<#${logChannel}>`
        let role = `<@&${NotifyRole}>`
        let age = `${AltAge} Days`
        let WhiteListedUser = `${WhiteListed}`
        let date = `${AutoKickAge} Days`
        let modchannel = `<#${modlog}>`
        let welcome = `<#${welchannel}>`
        let errorlog = `<#${errorchannel}>`
        let ticket = `<#${ticketchannel}>`

        if (WhiteListed === null) {
            WhiteListedUser = "NO USER ID IS WHITELISTED"
        }

        if (AutoKickAge === null) {
            date = "**8 [BY DEFAULT]**"
        }

        if (AltData === true) {
            AltData = "ENABLED"
        } else {
            date = "DISABLED"
        }

        if (logChannel === null) {
            channel = "NO CHANNEL FOUND"
        }

        if (NotifyRole === null) {
            role = "NO ROLE FOUND"
        }

        if (AltAge === null) {
            age = "**31 Days [BY DEFAULT]**"
        }

        if (welchannel === null) {
            welchannel = "NO CHANNEL FOUND"
        }

        if (modlog === null) {
            modlog = "NO CHANNEL FOUND"
        }

        if (errorchannel === null) {
            errorchannel = "NO CHANNEL FOUND"
        }
        if (ticketchannel === null) {
            ticketchannel = "NO CHANNEL FOUND"
        }

        let embed = new discord.EmbedBuilder()
            .setTitle(`CONFIG SETTINGS`)
            .setDescription(`
__**ALT LOG CHANNEL**__ 
➡ ${channel}
__**WELCOME CHANNEL**__ 
➡ ${welcome}
__**MOD LOG CHANNEL**__ 
➡ ${modchannel}
__**ERROR    LOG CHANNEL**__ 
➡ ${errorlog}
__**TICKET CHANNEL**__
➡ ${ticket}
__**ALT NOTIFY ROLE**__ 
➡ ${role}
__**ALT ACCOUNT AGE**__ 
➡ ${age}
__**AUTO KICK CMD STATUS**__ 
➡ ${AltData || 'DISABLED'}
__**AUTOKICK AGE**__
➡ ${date}
__**WHITE LISTED USER**__
➡ <@${WhiteListedUser}>
`)



        message.channel.send(embed)
    }


}