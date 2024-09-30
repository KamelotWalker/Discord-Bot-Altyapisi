import { ChatInputCommandInteraction } from "discord.js";
import DiscordBot from "../../client/DiscordBot.js";
import ApplicationCommand from "../../structure/ApplicationCommand.js";

export default new ApplicationCommand({
    command: {
        name: 'ping',
        description: 'Replies with Pong!',
        type: 1,
    },
    options: {
        cooldown: 5000,
        botOwner: true
    },
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.reply({
            content: '**Pong!** ' + client.ws.ping + 'ms'
        });
    }
}).toJSON();