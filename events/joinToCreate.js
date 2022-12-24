const { ChannelType, Events } = require("discord.js");
const {
    mainVoiceCategory,
    mainVoiceChannel, } = require("../config.json");
let temporary = []

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(oldState, newState) {
        if (newState.channelId == mainVoiceChannel) {
            let channel = await newState.guild.channels.create({ name: `${newState.member.user.username}'s Lounge`, type: ChannelType.GuildVoice, userLimit: 5, bitrate: 96000, parent: mainVoiceCategory })
            temporary.push({ newID: channel.id, guild: channel.guild })
            // A new element has been added to temporary array!
            await newState.setChannel(channel.id)
        }

        for (let i of temporary) {
            // Finding...
            let ch = i.guild.channels.cache.get(i.newID);
            // Channel Found! 
            if (ch.members.size == 0) {
                ch.delete()
                // Channel has been deleted!
                return temporary.splice(i, 1)
            }
        }
    }
}
