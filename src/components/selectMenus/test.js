module.exports = {
    data: {
        name: 'test-menu'
    },
    async execute(interaction, client) {
        interaction.reply({ content: `You select: ${interaction.values[0]}`, ephemeral: true })
    }
}