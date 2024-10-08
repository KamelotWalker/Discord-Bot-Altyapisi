import DiscordBot from "../client/DiscordBot.js";

/**
 * @template {keyof import('discord.js').ClientEvents} K
 */
class Event {
    data;

    /**
     * @param {{event: K, once?: boolean, run: import("discord.js").Awaitable<(client: DiscordBot, ...args: import('discord.js').ClientEvents[K]) => void> }} structure 
     */
    constructor(structure) {
        this.data = {
            __type__: 5, 
            ...structure
        }
    }

    toJSON = () => {
        return { ...this.data }
    }
}

export default Event;