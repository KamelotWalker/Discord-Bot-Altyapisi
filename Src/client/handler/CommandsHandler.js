import { REST, Routes } from "discord.js";
import { info, error, success, custom } from "../../utils/Console.js";
import { readdirSync } from "fs";
import DiscordBot from "../DiscordBot.js";
import ApplicationCommand from "../../structure/ApplicationCommand.js";
import MessageCommand from "../../structure/MessageCommand.js";

class CommandsHandler {
    client;

    /**
     *
     * @param {DiscordBot} client 
     */
    constructor(client) {
        this.client = client;
    }

    load = async () => {

        for (const directory of readdirSync('./src/commands/')) {
            for (const file of readdirSync('./src/commands/' + directory).filter((f) => f.endsWith('.js') && !f.startsWith('-'))) {
                try {
                    /**
                     * @type {ApplicationCommand['data'] | MessageCommand['data']}
                     */

                    // if file starts with - it will be ignored by the handler

                    if (file.startsWith('-')) continue;

                    const { default: module } = await import(`../../commands/${directory}/${file}`);

                    if (!module) continue;

                    if (module.__type__ === 2) {
                        if (!module.command || !module.run) {
                            error('Unable to load the message command ' + file);
                            continue;
                        }

                        this.client.collection.message_commands.set(module.command.name, module);

                        if (module.command.aliases && Array.isArray(module.command.aliases)) {
                            module.command.aliases.forEach((alias) => {
                                this.client.collection.message_commands_aliases.set(alias, module.command.name);
                            });
                        }

                        info('Loaded new message command: ' + file);
                    } else if (module.__type__ === 1) {
                        if (!module.command || !module.run) {
                            error('Unable to load the application command ' + file);
                            continue;
                        }

                        this.client.collection.application_commands.set(module.command.name, module);
                        this.client.rest_application_commands_array.push(module.command);

                        info('Loaded new application command: ' + file);
                    } else {
                        error('Invalid command type ' + module.__type__ + ' from command file ' + file);
                    }
                } catch (err) {
                    error('Unable to load a command from the path: ' + 'src/commands/' + directory + '/' + file);
                    console.error(err);
                }
            }
        }
    }

    /**
     * @param {{ enabled: boolean, guildId: string }} development
     * @param {Partial<import('discord.js').RESTOptions>} restOptions 
     */
    registerApplicationCommands = async (development, restOptions = null) => {
        const rest = new REST(restOptions ? restOptions : { version: '10' }).setToken(this.client.token);

        try {
            if (development.enabled) {
                await rest.put(Routes.applicationGuildCommands(this.client.user.id, development.guildId), { body: this.client.rest_application_commands_array });
            } else {
                await rest.put(Routes.applicationCommands(this.client.user.id), { body: this.client.rest_application_commands_array });
            }
        } catch (error) {
            console.error('Error registering commands:', error);
        }
    }
}

export default CommandsHandler;