const { ButtonBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, AttachmentBuilder } = require("discord.js")
const createCaptcha = require('../../functions/tools/createCaptcha.js');

module.exports = {
    data: {
        name: 'verify'
    },
    async execute(interaction, client) {
        const myCaptcha = await createCaptcha(8, "");
        const text = myCaptcha.text;
        module.exports = { text }
        const attachment = new AttachmentBuilder(await myCaptcha.image, { name: 'captcha-image.png' })
        let x = 60;

        let embed = new EmbedBuilder()
            .setTitle(`Welcome to ${interaction.guild.name}!`)
            .setDescription(`${interaction.user}, to gain access to **${interaction.guild.name}**, please solve the CAPTCHA below!\n\nThis is done to protect the server from raids consisting of spam bots.\n\n**NOTE:** The captcha is CaSe SenSiTivE and do not include spaces`)
            .setColor('Blue')
            .setImage('attachment://captcha-image.png')
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Answer')
                    .setCustomId('verify-answer')
                    .setStyle(ButtonStyle.Primary)
            )
        await interaction.reply({ embeds: [embed], components: [button], files: [attachment], ephemeral: true });

        let timeout = setInterval(async () => {
            embed.setFooter({ text: `Time Left: ${x--}s`, iconURL: client.user.displayAvatarURL() });
            await interaction.editReply({ embeds: [embed] });
            if (x === 0) {
                clearInterval(timeout);
                if (interaction.fetchReply())
                    await interaction.deleteReply();
            }
        }, 1000);
    }
};