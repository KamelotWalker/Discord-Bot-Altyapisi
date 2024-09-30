import { info, error, success } from "../../utils/Console.js";
import { readdirSync } from "fs";
import DiscordBot from "../DiscordBot.js";
import Event from "../../structure/Event.js";

class EventsHandler {
    client;

    /**
     *
     * @param {DiscordBot} client 
     */
    constructor(client) {
        this.client = client;
    }

    load = async () => {
        let total = 0;

        for (const directory of readdirSync('./src/events/')) {
            for (const file of readdirSync('./src/events/' + directory).filter((f) => f.endsWith('.js') && !f.startsWith('-'))) {
                try {
                    /**
                     * @type {Event['data']}
                     */

                    // if file starts with - it will be ignored by the handler

                    if (file.startsWith('-')) continue;

                    const module = await import(`../../events/${directory}/${file}`);

                    if (!module.default) continue;

                    const eventModule = module.default;

                    if (eventModule.__type__ === 5) {
                        if (!eventModule.event || !eventModule.run) {
                            error('Unable to load the event ' + file);
                            continue;
                        }

                        if (eventModule.once) {
                            this.client.once(eventModule.event, (...args) => eventModule.run(this.client, ...args));
                        } else {
                            this.client.on(eventModule.event, (...args) => eventModule.run(this.client, ...args));
                        }

                        info(`Loaded new event: ` + file);

                        total++;
                    } else {
                        error('Invalid event type ' + eventModule.__type__ + ' from event file ' + file);
                    }
                } catch (err) {
                    error('Unable to load a event from the path: ' + 'src/events/' + directory + '/' + file + '\n' + err.stack);
                }
            }
        }

        success(`Successfully loaded ${total} events.`);
    }
}

export default EventsHandler;