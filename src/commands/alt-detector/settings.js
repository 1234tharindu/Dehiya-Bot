
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription("shows settings"),

    async execute(interaction, client) {
        const db = client;
        let logChannel = await db.get(`LoggingChannel_${interaction.guild.id}`)
        let NotifyRole = await db.get(`notifyRole_${interaction.guild.id}`)
        let memberole = await db.get(`memberole_${interaction.guild.id}`)
        let verifiedRole = await db.get(`verifiedRole_${interaction.guild.id}`)
        let AltData = await db.get(`AutoKick_${interaction.guild.id}`)
        let AutoKickAge = await db.get(`AutokickAge_${interaction.guild.id}`)
        let WhiteListed = await db.get(`WhiteListed_${interaction.guild.id}`)
        let modlog = await db.get(`modlog_${interaction.guild.id}`)
        let welchannel = await db.get(`welchannel_${interaction.guild.id}`)
        let errorchannel = await db.get(`ErrorLoggingChannel_${interaction.guild.id}`)
        let ticketchannel = await db.get(`TicketChannel_${interaction.guild.id}`)

        let channel = `<#${logChannel}>`
        let membRole = `<@&${memberole}>`
        let role = `<@&${NotifyRole}>`
        let verifiRole = `<@&${verifiedRole}>`
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
        if (membRole === null) {
            membRole = "NO ROLE FOUND"
        }
        if (verifiRole === null) {
            verifiRole = "NO ROLE FOUND"
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

        let embed = new EmbedBuilder()
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
__**MEMBER ROLE**__ 
➡ ${membRole}
__**VERIFIED ROLE**__ 
➡ ${verifiRole}
__**AUTO KICK CMD STATUS**__ 
➡ ${AltData || 'DISABLED'}
__**AUTOKICK AGE**__
➡ ${date}
__**WHITE LISTED USER**__
➡ <@${WhiteListedUser}>
`)



        interaction.reply({ embeds: [embed], ephemeral: true, allowedMentions: { repliedUser: false } })
    }


}