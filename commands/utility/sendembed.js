const Discord = require("discord.js")
module.exports = {
    name: "sendembed",

    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR'))
            return message.reply("You can't you that command!");
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel)
            return message.reply("You must provide a valid channel.")
        try {

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




            channel.send(embed)

        } catch (error) {
            console.error(error);
        }
    }
}