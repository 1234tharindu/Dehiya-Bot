const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("bot online yay boy!!"));

app.listen(port, () =>
  console.log(`Your app is listening a http://localhost:${port}`)
);
require("dotenv").config();

("$TOEKN");
// if you need help ask in the help channel dont dm me
const guildDB = require("./mongo/guildDB");
const { default_prefix } = require("./config.json");
const fetch = require("node-fetch");
const db = require("quick.db");
const moment = require("moment");
const { CanvasSenpai } = require("canvas-senpai");
const canva = new CanvasSenpai();
const { emotes, emoji } = require("./config.json");
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
const DiscordButtons = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: false,
});
const { MessageButton, MessageActionRow } = require("discord-buttons");
const button = require("discord-buttons");
const disbut = require("discord-buttons");
const colors = require("./colors.json");
const yts = require("yt-search");
const fs = require("fs");
const enmap = require("enmap");

client.queue = new Map();
client.vote = new Map();
const { ready } = require("./handlers/ready.js");

require("./database.js");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
client.queue = new Map();
process.on("unhandledRejection", console.error);

client.on("message", async (message) => {
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix is \`${default_prefix}\``);
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(default_prefix)) return;

  if (!message.member) message.member = message.guild.fetchMember(message);

  const args = message.content.slice(default_prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

client.on("guildMemberAdd", async (member) => {
  try {
    let chx = db.get(`welchannel_${member.guild.id}`);

    if (chx === null) {
      return;
    }

    const embed = new discord.MessageEmbed()
      .setColor("#0000FF")
      .setTitle(`Hey ${member.user.username} :)`)
      .setDescription(
        `Welcome to **${member.guild.name}**\nYou are our ${member.guild.memberCount}th Member. Enjoy <3`
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setImage(
        "https://media.discordapp.net/attachments/1020462166521937980/1023663687233454261/kirito-sword-art-online.gif"
      )

      .setFooter(`CT bot`, client.user.displayAvatarURL());

    client.channels.cache.get(chx).send(`||${member.user}||`, embed);
  } catch (e) {
    console.log(e);
  }
});

/*client.on("guildMemberAdd", async (member) => {
  try {
     console.log('test')
    let data = await guildDB.find({ guild: member.guild.id });
    var channel = data.map((guildDB) => {
        return [ `${guildDB.channel}` ]})
        console.log(channel)
    if (!channel) return console.log('no channel')
    // i think i almost got it right
    console.log('test')
    let message = data.map((guilDB) => { return [ `${guildDB.message}` ]});
    console.log('test')
    if (!message) message = "[member:mention] Welcome to [guild:name]";
    console.log(channel)
    console.log(message)
    //let mes = message.replace(/`?\[member:mention]`?/g, member.user).replace(/`?\[guild:name]`?/g, member.guild.name).replace(/`?\[guild:membercount]`?/g, member.guild.members.cache.size)
    let guildCh = client.guilds.cache.get(member.guild.id)
    let f = await guildCh.channels.cache.get(channel).send(message);
    console.log(f)
    setTimeout(async () => {
      await f.delete();
    }, 1000);
  client.channels.cache.get(chx).send("Welcome to our Server " + member.user.username, attachment);
  } catch (e) {
    console.log(e)
  }
});*/

client.on("guildMemberAdd", async (member) => {
  let LoggingChannel = await db.get(`LoggingChannel_${member.guild.id}`);
  if (!LoggingChannel)
    return console.log(
      `Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} Guild (channel not found)`
    );

  //getting notify role
  let notifyRole = await db.get(`notifyRole_${member.guild.id}`);
  if (!notifyRole)
    return console.log(
      `Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} Guild (role not found)`
    );

  //to get created date in days format
  let x = Date.now() - member.user.createdAt;
  let created = Math.floor(x / 86400000);

  //creation date
  let creationDate = moment
    .utc(member.user.createdAt)
    .format("dddd, MMMM Do YYYY, HH:mm:ss");

  //joindate
  let joiningDate = moment
    .utc(member.joinedAt)
    .format("dddd, MMMM Do YYYY, HH:mm:ss");

  //joinposition
  let joinPosition = member.guild.memberCount;
  {
    //embed
    let altEmbed = //main alt message
      new discord.MessageEmbed()
        .setTitle("Alt Found!")
        .setColor("RANDOM")
        .setFooter("Bot Made By ! Chirath#5959").setDescription(`

**__ID__**: ${member.user.id}
**__Account Created__**: ${created} days ago
**__Account Creation Date__**: ${creationDate}
**__Join Position__**: ${joinPosition}
**__Join Date__**: ${joiningDate}
`);

    member.guild.channels.cache
      .get(LoggingChannel)
      .send(`__Notification:__ <@&${notifyRole}>`, altEmbed);

    let AutoKick = await db.fetch(`AutoKick_${member.guild.id}`);
    if (!AutoKick)
      return console.log(
        `Setup Is Not Done in ${member.guild.id} aka ${member.guild.name} Guild (AutoKick Isn't Enabled)`
      );

    let AutoKickAge = await db.get(`AutokickAge_${member.guild.id}`);
    if (!AutoKickAge) return db.set(`AutokickAge_${member.guild.id}`, 8);

    if (AutoKick === true) {
      let checking = await db.get(`WhiteListed_${member.guild.id}`);

      if (checking === member.user.id) {
        let embed = new Discord.MessageEmbed()
          .setTitle(`Auto Kick System Stucked On`)
          .setDescription(
            `
**__NAME__** - ${member.user} (${member.user.username})
**__KICKED__** - NO
**__REASON__** - WhiteListed User`
          )
          .setColor("RANDM");
        member.guild.channels.cache.get(LoggingChannel).send(embed);
      } else {
        if (created < AutoKickAge) {
          let embed = new Discord.MessageEmbed()
            .setTitle(`Auto Kick System Kicked SomeOne`)
            .setDescription(
              `
**__NAME__** - ${member.user} (${member.user.username})
**__ID__** - ${member.user.id}
**__KICKED FROM GUILD NAME__** - ${member.guild.name}
**__KICKED REASON__** - ALT ( Created ${created} Days Ago)
`
            )
            .setColor("RANDOM");
          member.kick();
          console.log(`kicked`);
          member.guild.channels.cache.get(LoggingChannel).send(embed);
        }
      }
    } else {
      console.log(`Autokick Isnt Disabled in ${memeber.guild.name}`);
    }
  }
});

client.on("message", async (message) => {
  if (message.channel.name === "general-chat")
    if (message.content === "hi") {
      message.reply(`https://tenor.com/view/bad-teeth-breath-hot-gif-23600638`);
    }
});

client.snipes = new Map();
client.on("messageDelete", function (message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null,
  });
});

const { GiveawaysManager } = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
  storage: "./handlers/giveaways.json",
  updateCountdownEvery: 10000,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#FF0000",
    reaction: "🎉",
  },
});

client.giveawaysManager = manager;

client.on("message", async (message) => {
  if (!message.guild) return;
  let prefix = db.get(`default_prefix${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(default_prefix)) return;
});

client.on("ready", async (message) => {
  client.user.setStatus("online");
  console.log("Bot is working!!");

  const Discord = require("discord.js");
  client.channels.cache
    .get("1020462166521937980")
    .send(
      new Discord.MessageEmbed()
        .setColor("0x00ff00")
        .setTitle("`CT-Bot is online` ||@Admin||")
        .setTimestamp()
        .setFooter(`CT bot`, client.user.displayAvatarURL())
    )
    .then((msg) => {
      setTimeout(() => msg.delete(), 180000);
    });

  // ACTIVITY STATUS
  const activities_list = [
    { type: "PLAYING", message: "with CT-BOT" },
    { type: "WATCHING", message: "My Test Server ;)" },
    { type: "LISTENING", message: "chirath.mp3" },
  ];

  setInterval(() => {
    const index = Math.floor(Math.random() * activities_list.length);

    client.user.setActivity(activities_list[index].message, {
      type: activities_list[index].type,
    });
  }, 2000);

  // TICKET SYSTEM
  const channel = client.channels.cache.get("1027570892760428564");
  if (channel) {
    try {
      await channel.bulkDelete(1).then(async (m) => {
        let sent = await channel.send(
          new discord.MessageEmbed()
            .setTitle("**Ticket Bot**")
            .setDescription("**React With 📩 To Create a Ticket**")
            .setFooter("CT Bot", client.user.displayAvatarURL())
            .setColor("WHITE")
        );
        sent.react("📩");
        //let sent = channel.fetchMessage("1028075581977411675");
        const collector = sent.createReactionCollector(
          (reaction, user) =>
            sent.guild.members.cache.find((member) => member.id === user.id),
          {
            dispose: true,
          }
        );
        collector.on("collect", (reaction, user) => {
          if (user.bot) return;
          switch (reaction.emoji.name) {
            case "📩":
              let channelname = `ticket-${user.username}-${user.discriminator}`;
              channelname = channelname.replace(/\s/g, "-").toLowerCase();
              if (
                sent.guild.channels.cache.find(
                  (channel) => channel.name === channelname
                ) &&
                false
              ) {
                user
                  .send(`You already have an ongoing ticket.`)
                  .catch(console.error);
                reaction.users.remove(user.id);
                return;
              } else {
                contining(user);
                reaction.users.remove(user.id);
              }
              break;
          }
        });
        async function contining(user) {
          const channel = await sent.guild.channels.create(
            `ticket: ${user.username + "-" + user.discriminator}`,
            {
              parent: "958677720278114304",
              type: "GUILD_TEXT",
              permissionOverwrites: [
                {
                  id: sent.guild.id,
                  allow: [],
                  deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                },
                {
                  id: user.id,
                  allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                  deny: [],
                },
              ],
            }
          );

          const reactionMessageEmbed = new discord.MessageEmbed()
            .setColor("#FFF000")
            .setDescription(
              "Support will be with you shortly.\n To close this ticket react with 🔒"
            )
            .setFooter("CT Bot", client.user.avatarURL());

          const reactionMessage = await channel.send(
            `||${user}||`,
            reactionMessageEmbed
          );
          await reactionMessage.react("🔒");
          await reactionMessage.react("⛔");

          const collector1 = reactionMessage.createReactionCollector(
            (reaction, user) =>
              sent.guild.members.cache
                .find((member) => member.id === user.id)
                .permissions.has("ADMINISTRATOR") ||
              sent.guild.members.cache
                .find((member) => member.id === user.id)
                .roles.cache.find((r) => r.id === Jsonfile.Channelrole),
            {
              dispose: true,
            }
          );

          collector1.on("collect", (reaction, user) => {
            if (user.bot) return;
            switch (reaction.emoji.name) {
              case "🔒":
                if (
                  sent.guild.members.cache
                    .find((member) => member.id === user.id)
                    .permissions.has("ADMINISTRATOR") ||
                  sent.guild.members.cache
                    .find((member) => member.id === user.id)
                    .roles.cache.find((r) => r.id === Jsonfile.Channelrole)
                ) {
                  channel.edit({
                    permissionOverwrites: [
                      {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"],
                        deny: ["SEND_MESSAGES"],
                      },
                    ],
                  });
                  channel.send("Channel Locked 🔒");
                  break;
                } else {
                  user.send("Only Staff can lock the channels");
                  reaction.users.remove(user.id);
                  break;
                }
              case "⛔":
                if (
                  sent.guild.channels.cache.find(
                    (c) => c.name.toLowerCase() === channel.name
                  )
                ) {
                  if (
                    sent.guild.members.cache
                      .find((member) => member.id === user.id)
                      .permissions.has("ADMINISTRATOR") ||
                    sent.guild.members.cache
                      .find((member) => member.id === user.id)
                      .roles.cache.find((r) => r.id === Jsonfile.Channelrole)
                  ) {
                    setTimeout(() => channel.delete(), 5000);
                    channel.send("Deleting this channel in 5 seconds!");
                    return;
                  } else {
                    user.send("Only Staff can delete the channels");
                    reaction.users.remove(user.id);
                    break;
                  }
                }
                break;
            }
          });
        }
      });
    } catch (e) {
      console.log(e);
      channel.send(
        `You can only delete the messages which are not older than 14 days.`
      );
    }
  }
});

const { Player } = require("discord-music-player");
const player = new Player(client, {
  leaveOnEmpty: false,
});

// Error Handling

process.on("uncaughtException", (err) => {
  let guild = 885791620878983220; //guild id
  let ErrorLoggingChannel = db.get(`ErrorLoggingChannel_885791620878983220`);
  if (!ErrorLoggingChannel)
    return console.log(
      `Setup Is Not Done in ${guild} aka ${guild} Guild (channel not found)`
    );

  console.log("Uncaught Exception: " + err);

  const exceptionembed = new MessageEmbed()
    .setTitle("Uncaught Exception")
    .setDescription(`${err}`)
    .setColor("RED");
  client.channels.cache.get(ErrorLoggingChannel).send(exceptionembed);
});

process.on("unhandledRejection", (reason, promise) => {
  let guild = 885791620878983220;
  let ErrorLoggingChannel = db.get(`ErrorLoggingChannel_885791620878983220`);
  if (!ErrorLoggingChannel)
    return console.log(
      `Setup Is Not Done in ${guild} aka ${guild} Guild (channel not found)`
    );

  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason.message
  );

  const rejectionembed = new MessageEmbed()
    .setTitle("Unhandled Promise Rejection")
    .addField("Promise", `${promise}`)
    .addField("Reason", `${reason.message}`)
    .setColor("RED");
  client.channels.cache.get(ErrorLoggingChannel).send(rejectionembed);
});

client.player = player;

new Player(client, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  timeout: 10,
  volume: 150,
  quality: "high",
});

client.on("guildCreate", (guild) => {
  const channelId = "1024711402012815412"; //put your channel ID here

  const channel = client.channels.cache.get(channelId);

  if (!channel) return; //If the channel is invalid it returns
  const embed = new discord.MessageEmbed()
    .setTitle("I Joined A Guild!")
    .setDescription(
      `**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
  channel.send(embed);
});

client.on("guildDelete", (guild) => {
  const channelId = "841994754399928341"; //add your channel ID
  const channel = client.channels.cache.get(channelId); //This Gets That Channel

  if (!channel) return; //If the channel is invalid it returns
  const embed = new discord.MessageEmbed()
    .setTitle("I Left A Guild!")
    .setDescription(
      `**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`
    )
    .setTimestamp()
    .setColor("RED")
    .setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
  channel.send(embed);
});

const smartestchatbot = require("smartestchatbot");
const scb = new smartestchatbot.Client();

client.on("message", async (message) => {
  if (message.channel.name == "abotchat") {
    if (message.author.bot) return;
    message.content = message.content
      .replace(/@(everyone)/gi, "everyone")
      .replace(/@(here)/gi, "here");
    if (message.content.includes(`@`)) {
      return message.channel.send(`**:x: Please dont mention anyone**`);
    }
    message.channel.startTyping();
    if (!message.content) return message.channel.send("Please say something.");
    scb
      .chat({
        message: message.content,
        name: client.user.username,
        owner: "cwkhan",
        user: message.author.id,
        language: "auto",
      })
      .then((reply) => {
        message.inlineReply(`${reply}`);
      });
    message.channel.stopTyping();
  }
});

require("./ExtendedMessage");

allowedMentions: {
  // set repliedUser value to `false` to turn off the mention by default
  repliedUser: true;
}

let firstbutton = new disbut.MessageButton()
  .setLabel("𝕊𝕥𝕖𝕡 𝟙")
  .setStyle("blurple")
  .setID("firstbutton");
let secondbutton = new disbut.MessageButton()
  .setLabel("𝕊𝕥𝕖𝕡 𝟚")
  .setStyle("blurple")
  .setID("secondbutton");
let thirdbutton = new disbut.MessageButton()
  .setLabel("𝕊𝕥𝕖𝕡 𝟛")
  .setStyle("blurple")
  .setID("thirdbutton");
let row1 = new disbut.MessageActionRow()
  .addComponent(firstbutton)
  .addComponent(secondbutton)
  .addComponent(thirdbutton);
const step1 = new MessageEmbed()
  .setColor("cccfff")
  .setTitle("<a:YellowArrow:870193892492980236> How to Use Uptimer!")
  .addField(
    "<:857122481088495629:873454677231034368> Get the link",
    "Our first step is to get the webpage link. You can find the code in the bottom or side of you repl.it(see screenshot below)! If you do not have this link, copy paste this code at the top of your `index.js` and run it again.\n ```https://pastebin.com/HJGhAUZf```"
  )
  .setImage(
    "https://media.discordapp.net/attachments/870077234780725281/873324807444365413/Screen_Shot_2021-08-06_at_2.57.52_PM.png?width=1017&height=534"
  );
const step3 = new MessageEmbed()
  .setColor("cccfff")
  .setTitle("<a:YellowArrow:870193892492980236> How to Use Uptimer!")
  .addField(
    "<:5286_three_emj_png:873453086981636127> Other Commands",
    "Now that we have added your project, you can use other command such as `projects` `remove` `stats` and `total`. Below Is an image of the remove command!  "
  )
  .setImage(
    "https://media.discordapp.net/attachments/870077234780725281/873663248510107688/Screen_Shot_2021-08-07_at_1.25.22_PM.png"
  );
const step2 = new MessageEmbed()
  .setColor("cccfff")
  .setTitle("<a:YellowArrow:870193892492980236> How to Use Uptimer!")
  .addField(
    "<:4751_two_emj_png:873364919259627551> Run the command",
    "Our next step is to runn the command. The syntax of this command is `*add <repl_url>`. If done correcty the bot should give embed saying: ```:white_check_mark: Added Succesfully!``` See Screenshot Below For More details."
  )
  .setImage(
    "https://media.discordapp.net/attachments/870077234780725281/873366580522782820/Screen_Shot_2021-08-06_at_5.46.41_PM.png"
  );
// Button Handler
client.on("clickButton", async (button) => {
  if (button.id === "firstbutton") {
    button.message.edit({
      embed: step1,
      component: row1,
    });
  } else if (button.id === "secondbutton") {
    button.message.edit({
      embed: step2,
      component: row1,
    });
  } else if (button.id === "thirdbutton") {
    button.message.edit({
      embed: step3,
      component: row1,
    });
  }
});

client.login(process.env.TOKEN);
