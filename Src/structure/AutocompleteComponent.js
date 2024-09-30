import DiscordBot from "../client/DiscordBot.js";

class AutocompleteComponent {
    data;

    /**
     *
     * @param {{commandName: string, run: import("discord.js").Awaitable<(client: DiscordBot, interaction: import('discord.js').AutocompleteInteraction) => void> }} structure 
     */
    constructor(structure) {
        this.data = {
            __type__: 4, 
            ...structure
        }
    }

    toJSON = () => {
        return { ...this.data }
    }
}

export default AutocompleteComponent;