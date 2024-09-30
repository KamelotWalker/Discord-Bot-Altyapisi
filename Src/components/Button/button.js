import { ButtonInteraction } from "discord.js";
import DiscordBot from "../../client/DiscordBot.js";
import Component from "../../structure/Component.js";

export default new Component({
    customId: 'example-button-id',
    type: 'button',
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.reply({
            content: 'Replied from a Button interaction!',
            ephemeral: true
        });
    }
}).toJSON();