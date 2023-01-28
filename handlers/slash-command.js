const { readdirSync } = require("node:fs");
const discord = require('discord.js');
const fs = require('node:fs');
const ascii = require("ascii-table");

let table = new ascii("Slash Commands");
table.setHeading("Slash Command", "Load status");

module.exports = (client) => {
    client.slashCommands = new discord.Collection();

    readdirSync("./commands-slash/").forEach(dir => {
        const commands = readdirSync(`./commands-slash/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../commands-slash/${dir}/${file}`);

            if (pull.data.name && pull.data.description) {
                client.slashCommands.set(pull.data.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name or help.description !!.`);
                continue;
            }
        }
    });

    console.log(table.toString());
}
