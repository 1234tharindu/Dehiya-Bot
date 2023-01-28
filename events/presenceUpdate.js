const { Events } = require("discord.js");

module.exports = {
    name: Events.PresenceUpdate,
    once: false,
    async execute(oldPresence, newPresence) {
        const role = newPresence.guild.roles.cache.find(role => role.name == "LIVE NOW")
        if (newPresence.status === "idle") {
            if (newPresence.user.bot) return;
            if (newPresence.member.roles.highest.rawPosition > role.rawPosition) return;
            if (!newPresence.member.roles.cache.find(r => r.name === "Content Creator")) return;
            newPresence.member.roles.add(role);
        }
        else if (oldPresence.status === "idle") {
            newPresence.member.roles.remove(role);
        }
    }
}