const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: false
});

module.exports = {
    name: "restart1",
    run: async (client, message, args) => {

      if(message.author.id != "771639970854731808") return message.channel.send("You're not bot the owner! https://i.imgur.com/8ep8YbI.gif")
  
      try {
          message.channel.send("<a:arrows_clockwise:575715719103381506> Attempting a restart...").then(msg => {
            //msg.react('🆗');
            setTimeout(function(){
               msg.edit("<:white_check_mark:550460857625346066> I should be back up now!");
            }, 10000);
          })
          
          client.destroy()
        
          
  
            } catch(e) {
              message.channel.send(`ERROR: ${e.message}`)
  
      }
    }
  }   