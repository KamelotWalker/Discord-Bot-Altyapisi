import DiscordBot from "../client/DiscordBot.js";

class Component {
    data;

    /**
     *
     * @param {{customId: string, type: 'modal' | 'select' | 'button', options?: Partial<{ public: boolean }>, run: import("discord.js").Awaitable<(client: DiscordBot, interaction: import('discord.js').Interaction) => void> }} structure 
     */
    constructor(structure) {
        this.data = {
            __type__: 3,
            ...structure
        }
    }

    toJSON = () => {
        return { ...this.data }
    }
}

export default Component;
