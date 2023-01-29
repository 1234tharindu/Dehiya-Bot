const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send-embed')
        .setDescription('send embed to a specific channel')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel which wants to send the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Title of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Description of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('footer')
                .setDescription('Footer of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Color of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('author')
                .setDescription('Author of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('image')
                .setDescription('Image of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('thumbnail')
                .setDescription('Thumbnail of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('timestamp')
                .setDescription('TimeStamp of the embed')
                .setAutocomplete(true)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('field1')
                .setDescription('1st Field of the embed'))
        .addStringOption(option =>
            option.setName('field2')
                .setDescription('2nd Field of the embed'))
        .addStringOption(option =>
            option.setName('field3')
                .setDescription('3rd Field of the embed'))
        .addStringOption(option =>
            option.setName('field4')
                .setDescription('4th Field of the embed')),

    async autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices;

        if (focusedOption.name === 'timestamp') {
            choices = ['yes', 'no'];
        }

        const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },

    async execute(interaction) {

        const channel = interaction.options.getChannel('channel');
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const footer = interaction.options.getString('footer');
        const thumbnail = interaction.options.getString('thumbnail');
        const timestamp = interaction.options.getString('timestamp');
        const field_name_1 = interaction.options.getString('field_name_1');
        const field_value_1 = interaction.options.getString('field_value_1');
        const field_name_2 = interaction.options.getString('field_name_2');
        const field_value_2 = interaction.options.getString('field_value_2');
        const field_name_3 = interaction.options.getString('field_name_3');
        const field_value_3 = interaction.options.getString('field_value_3');
        const field_name_4 = interaction.options.getString('field_name_4');
        const field_value_4 = interaction.options.getString('field_value_4');
        let field;

        const embed = new EmbedBuilder();

        if (title) {
            embed.setTitle(title);
        }
        if (description) {
            embed.setDescription(description);
        }
        if (footer) {
            embed.setFooter({ text: footer, iconURL: client.user.displayAvatarURL() });
        }
        if (thumbnail) {
            embed.setThumbnail(thumbnail);
        }
        if (timestamp == 'yes') {
            embed.setTimestamp();
        }
        if (field_name_1 && field_value_1) {
            field.push({ name: field_name_1, value: field_value_1 });
        }
        if (field_name_2 && field_value_2) {
            field.push({ name: field_name_2, value: field_value_2 });
        }
        if (field_name_3 && field_value_3) {
            field.push({ name: field_name_3, value: field_value_3 });
        }
        if (field_name_4 && field_value_4) {
            field.push({ name: field_name_4, value: field_value_4 });
        }
        if (field.length > 0) {
            embed.addFields(field);
        }

        channel.send({ embeds: [embed] })
    }
}