module.exports = {
    data: {
        name: 'verify-captcha'
    },
    async execute(interaction, client) {
        await interaction.reply({ content: `Your input is ${interaction.fields.getTextInputValue('captcha')}`, ephemeral: true });
    }
};