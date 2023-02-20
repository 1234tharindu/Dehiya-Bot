const fs = require('fs');
let commandsArray = [];

module.exports = (client) => {
    client.handleComponents = async () => {
        const componentFolders = fs.readdirSync('./src/components');
        for (const folder of componentFolders) {
            const componentFiles = fs.readdirSync(`./src/components/${folder}`)
                .filter(file => file.endsWith('.js'));
            for (const file of componentFiles) {
                const component = require(`../../components/${folder}/${file}`);

                switch (folder) {
                    case "buttons":
                        client.buttons.set(component.data.name, component);
                        break;

                    case "selectMenus":
                        client.selectMenus.set(component.data.name, component);
                        break;

                    case "modals":
                        client.modals.set(component.data.name, component);
                        break;

                    default:
                        break;
                }
            }

        }
    };
};