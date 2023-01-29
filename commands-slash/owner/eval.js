const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('eval')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    run: async (message, args) => {
        if (message.author.id !== '771639970854731808') return message.channel.send("You do not have permission to use this command!");
        const embed = new EmbedBuilder()
            .setTitle('Evaluating...')
        const msg = await message.channel.send(embed);
        try {
            const data = eval(args.join(' ').replace(/```/g, ''));
            const embed = new EmbedBuilder()
                .setTitle('output:')
                .setDescription(await data)
                .setColor('Green')
            await msg.edit({ embeds: [embed] })
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll();
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })
        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle('error')
                .setDescription(e)
                .setColor("#FF0000")
            return await msg.edit({ embeds: [embed] });
        }
    }
}