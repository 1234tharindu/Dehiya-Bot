module.exports = {
    name: "send",

    run: async (client, message, args) => {

     if (!message.member.hasPermission('ADMINISTRATOR'))
     return message.reply("You can't you that command!");
    
     let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
     if (!channel)
     return message.reply("You must provide a valid channel")

     channel.send(args.slice(1).join(" "))
    } 
}