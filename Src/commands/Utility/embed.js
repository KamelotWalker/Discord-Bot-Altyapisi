import { ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import DiscordBot from "../../client/DiscordBot.js";
import ApplicationCommand from "../../structure/ApplicationCommand.js";

export default new ApplicationCommand({
    command: {
        name: 'puhahaha',
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

        try {
            let embed = new EmbedBuilder()
            .setTitle('Embed Title')
            .setDescription('Embed Description')
            .setColor('Aqua')
            .setTimestamp();
    
            let button = new ButtonBuilder()
            .setCustomId('example-button-id')
            .setLabel('Example Button')
            .setStyle(ButtonStyle.Primary);
    
            let actionRow = new ActionRowBuilder().addComponents(button);
    
            await interaction.reply({
                embeds: [embed],
                components: [actionRow]
            });
        } catch (error) {
            console.error(error);
        }

    }
}).toJSON();