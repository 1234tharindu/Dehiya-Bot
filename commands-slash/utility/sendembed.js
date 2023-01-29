const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('send-embed')
        .setDescription('send embed to a specific channel')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .addChannelOption(option =>
            option.setName('Channel')
                .setDescription('The channel which wants to send the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('Title')
                .setDescription('Title of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('Description')
                .setDescription('Description of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('Footer')
                .setDescription('Footer of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('Color')
                .setDescription('Color of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('Author')
                .setDescription('Author of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('Image')
                .setDescription('Image of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('Thumbnail')
                .setDescription('Thumbnail of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('TimeStamp')
                .setDescription('TimeStamp of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('Field1')
                .setDescription('1st Field of the embed'))
        .addStringOption(option =>
            option.setName('Field2')
                .setDescription('2nd Field of the embed'))
        .addStringOption(option =>
            option.setName('Field3')
                .setDescription('3rd Field of the embed'))
        .addStringOption(option =>
            option.setName('Field4')
                .setDescription('4th Field of the embed')),

    async execute(interaction) {

        const channel = interaction.options.getChannel('Channel');

        const filter = msg => msg.author.id == message.author.id;
        const options = {
            max: 1
        };
        //===============================================================================================
        // Getting Started
        const embed = new Discord.EmbedBuilder();
        message.channel.send("Reply `skip` or `no` for next question, Reply `cancel` to stop the command.");


        //===============================================================================================
        // Getting Title
        message.channel.send("So, Do you want your embed to have any title?");
        let title = await message.channel.awaitMessages(filter, options);
        if (title.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
        if (title.first().content !== 'skip' && title.first().content !== 'cancel') embed.setTitle(title.first().content);

        //===============================================================================================
        // Getting Description
        message.channel.send("great, now o you want your embed to have any Description?");
        let Description = await message.channel.awaitMessages(filter, options);
        if (Description.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
        if (Description.first().content !== 'skip' && Description.first().content !== 'cancel') embed.setDescription(Description.first().content);

        //===============================================================================================
        // Getting Footer
        message.channel.send("So, Do you want your embed to have any Footer? or default or cancel");
        let Footer = await message.channel.awaitMessages(filter, options);
        if (Footer.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled. ')
        if (Footer.first().content == 'default') embed.setFooter(`${client.user.username}`, client.user.displayAvatarURL());
        if (Footer.first().content !== 'skip' && Footer.first().content !== 'cancel' && Footer.first().content !== 'default') embed.setFooter(Footer.first().content);

        //===============================================================================================
        // Getting URL


        //===============================================================================================
        // Getting Color
        message.channel.send("So, Do you want your embed to have any specifci color? Default is Black");
        let Color = await message.channel.awaitMessages(filter, options);
        if (Color.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
        if (Color.first().content !== 'skip' && Color.first().content !== 'cancel') embed.setColor(Color.first().content.toUpperCase() || "2f3136")

        //===============================================================================================
        // Getting Author Field
        message.channel.send("So, Do you want your embed to have any Author Field?");
        let Author = await message.channel.awaitMessages(filter, options);
        if (Author.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
        if (Author.first().content !== 'skip' && Author.first().content !== 'cancel') embed.setAuthor(Author.first().content);

        //===============================================================================================
        // Getting Image
        message.channel.send("So, Do you want your embed to have any Image?");
        let Image = await message.channel.awaitMessages(filter, options);
        if (Image.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
        if (Image.first().content !== 'skip' && Image.first().content !== 'cancel') embed.setImage(Image.first().content);

        //===============================================================================================
        // Getting Thumbnail
        message.channel.send("So, Do you want your embed to have any Thumbnail?");
        let Thumbnail = await message.channel.awaitMessages(filter, options);
        if (Thumbnail.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
        if (Thumbnail.first().content !== 'skip' && Thumbnail.first().content !== 'cancel') embed.setThumbnail(Thumbnail.first().content);

        //===============================================================================================
        // Getting TimeStamp
        message.channel.send("So, Do you want your embed to have any TimeStamp? Reply `yes` or `no`");
        let TimeStamp = await message.channel.awaitMessages(filter, options);
        if (TimeStamp.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
        if (TimeStamp.first().content == 'yes') embed.setTimestamp();

        channel.send({ embeds: [embed] })
    }
}