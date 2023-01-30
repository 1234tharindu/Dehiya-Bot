const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dmembed')
        .setDescription('dm embed to a guild user')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR'))
            return message.reply("You can't you that command!");
        let dUser =
            message.guild.member(message.mentions.users.first()) ||
            message.guild.members.get(args[0]);
        try {

            const filter = msg => msg.author.id == message.author.id;
            const options = {
                max: 1
            };
            //===============================================================================================
            // Getting Started
            const dembed = new Discord.EmbedBuilder();
            message.channel.send("Reply `skip` or `no` for next question, Reply `cancel` to stop the command.");


            //===============================================================================================
            // Getting Title
            message.channel.send("So, Do you want your embed to have any title?");
            let title = await message.channel.awaitMessages(filter, options);
            if (title.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
            if (title.first().content !== 'skip' && title.first().content !== 'cancel') dembed.setTitle(title.first().content);

            //===============================================================================================
            // Getting Description
            message.channel.send("great, now o you want your embed to have any Description?");
            let Description = await message.channel.awaitMessages(filter, options);
            if (Description.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
            if (Description.first().content !== 'skip' && Description.first().content !== 'cancel') dembed.setDescription(Description.first().content);

            //===============================================================================================
            // Getting Footer
            message.channel.send("So, Do you want your embed to have any Footer? or default or cancel");
            let Footer = await message.channel.awaitMessages(filter, options);
            if (Footer.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled. ')
            if (Footer.first().content == 'default') dembed.setFooter(`${client.user.username}`, client.user.displayAvatarURL());
            if (Footer.first().content !== 'skip' && Footer.first().content !== 'cancel' && Footer.first().content !== 'default') dembed.setFooter(Footer.first().content);

            //===============================================================================================
            // Getting URL


            //===============================================================================================
            // Getting Color
            message.channel.send("So, Do you want your embed to have any specifci color? Default is Black");
            let Color = await message.channel.awaitMessages(filter, options);
            if (Color.first().content == 'cancel') return message.channel.send('dembed Generator Cancelled.')
            if (Color.first().content !== 'skip' && Color.first().content !== 'cancel') dembed.setColor(Color.first().content.toUpperCase() || "2f3136")

            //===============================================================================================
            // Getting Author Field
            message.channel.send("So, Do you want your embed to have any Author Field?");
            let Author = await message.channel.awaitMessages(filter, options);
            if (Author.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
            if (Author.first().content !== 'skip' && Author.first().content !== 'cancel') dembed.setAuthor(Author.first().content);

            //===============================================================================================
            // Getting TimeStamp
            message.channel.send("So, Do you want your embed to have any TimeStamp? Reply `yes` or `no`");
            let TimeStamp = await message.channel.awaitMessages(filter, options);
            if (TimeStamp.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled.')
            if (TimeStamp.first().content == 'yes') dembed.setTimestamp();




            dUser.send(dembed);

            message.channel.send(
                `${message.author} You have sent your message to ${dUser}`
            );



        } catch (error) {
            console.error(error);
        }
    }
}