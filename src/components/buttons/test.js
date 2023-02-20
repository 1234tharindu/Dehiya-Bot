module.exports = {
    data: {
        name: 'test-button'
    },
    async execute(interaction, client) {
        await interaction.reply({ content: "test", ephemeral: true })
    }
}