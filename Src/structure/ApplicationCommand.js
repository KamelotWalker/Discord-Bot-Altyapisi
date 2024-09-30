import DiscordBot from "../client/DiscordBot.js";

class ApplicationCommand {
    data;

    /**
     *
     * @param {{command: import("discord.js").APIApplicationCommand, options?: Partial<{ cooldown: number, botOwner: boolean, guildOwner: boolean, botDevelopers: boolean }>, run: import("discord.js").Awaitable<(client: DiscordBot, interaction: import('discord.js').Interaction) => void> }} structure 
     */
    constructor(structure) {
        this.data = {
            __type__: 1, 
            ...structure
        }
    }

    toJSON = () => {
        return { ...this.data }
    }
}

export default ApplicationCommand;