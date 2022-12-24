const db = require('quick.db');
const Canvas = require('@napi-rs/canvas');
const moment = require("moment");
const { AttachmentBuilder, EmbedBuilder, Events, createChannel } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member, client) {

        try {
            let chx = db.get(`welchannel_${member.guild.id}`);

            if (chx === null) {
                return;
            }

            const canvas = Canvas.createCanvas(600, 500);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/946774339380989962/1040223122982441010/photo.jpg");
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#C0C0C0';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 75, 0, Math.PI * 2, true);
            ctx.fillStyle = "#48025c";
            ctx.fill();

            const avatar = await Canvas.loadImage(member.user.displayAvatarURL());
            ctx.drawImage(avatar, canvas.width / 2 - avatar.width / 2, canvas.height / 2 - avatar.height / 2, 130, 130);
            ctx.arc(canvas.width / 2, canvas.height / 2, 72, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'welcome-image.png' })

            client.channels.cache.get(chx).send({ content: `Hey ${member.user},\nWelcome to **${member.guild.name}**,plz go through our <#946727189498437693> 🙂`, files: [attachment] });

            // Auto Role
            if (member.user.bot) {
                const role = member.guild.roles.cache.find(role => role.name == "Bot");
                member.roles.add(role);
            }
            else {
                const role = member.guild.roles.cache.find(role => role.name == "Member");
                member.roles.add(role);
            };

        } catch (e) {
            console.log(e);
        }



        let LoggingChannel = await db.get(`LoggingChannel_${member.guild.id}`);
        if (!LoggingChannel)
            return console.log(
                `Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} Guild (channel not found)`
            );

        //getting notify role
        let notifyRole = await db.get(`notifyRole_${member.guild.id}`);
        if (!notifyRole)
            return console.log(
                `Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} Guild (role not found)`
            );

        //to get created date in days format
        let x = Date.now() - member.user.createdAt;
        let created = Math.floor(x / 86400000);

        //creation date
        let creationDate = moment
            .utc(member.user.createdAt)
            .format("dddd, MMMM Do YYYY, HH:mm:ss");

        //joindate
        let joiningDate = moment
            .utc(member.joinedAt)
            .format("dddd, MMMM Do YYYY, HH:mm:ss");

        //joinposition
        let joinPosition = member.guild.memberCount;
        {
            //embed
            let altEmbed = //main alt message
                new EmbedBuilder()
                    .setTitle("Alt Found!")
                    .setColor("Random")
                    .setFooter({ text: "Bot Made By ! Chirath#5959" })
                    .setDescription(`
**__ID__**: ${member.user.id}
**__Account Created__**: ${created} days ago
**__Account Creation Date__**: ${creationDate}
**__Join Position__**: ${joinPosition}
**__Join Date__**: ${joiningDate}
`);

            member.guild.channels.cache
                .get(LoggingChannel)
                .send({ content: `__Notification:__ <@&${notifyRole}>`, embeds: [altEmbed] });

            let AutoKick = await db.fetch(`AutoKick_${member.guild.id}`);
            if (!AutoKick)
                return console.log(
                    `Setup Is Not Done in ${member.guild.id} AKA ${member.guild.name} Guild (AutoKick Isn't Enabled)`
                );

            let AutoKickAge = await db.get(`AutokickAge_${member.guild.id}`);
            if (!AutoKickAge) return db.set(`AutokickAge_${member.guild.id}`, 8);

            if (AutoKick === true) {
                let checking = await db.get(`WhiteListed_${member.guild.id}`);

                if (checking === member.user.id) {
                    let embed = new EmbedBuilder()
                        .setTitle(`Auto Kick System Stucked On`)
                        .setDescription(
                            `
**__NAME__** - ${member.user} (${member.user.username})
**__KICKED__** - NO
**__REASON__** - WhiteListed User`
                        )
                        .setColor("Random");
                    member.guild.channels.cache.get(LoggingChannel).send({ embeds: [embed] });
                } else {
                    if (created < AutoKickAge) {
                        let embed = new EmbedBuilder()
                            .setTitle(`Auto Kick System Kicked SomeOne`)
                            .setDescription(
                                `
**__NAME__** - ${member.user} (${member.user.username})
**__ID__** - ${member.user.id}
**__KICKED FROM GUILD NAME__** - ${member.guild.name}
**__KICKED REASON__** - ALT ( Created ${created} Days Ago)
`
                            )
                            .setColor("Random");
                        member.kick();
                        console.log(`kicked`);
                        member.guild.channels.cache.get(LoggingChannel).send({ embeds: [embed] });
                    }
                }
            } else {
                console.log(`Autokick Isnt Disabled in ${memeber.guild.name}`);
            }
        }
    }
}