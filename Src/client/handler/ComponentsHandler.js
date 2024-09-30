import { info, error, success } from '../../utils/Console.js';
import { readdirSync } from 'fs';
import DiscordBot from '../DiscordBot.js';
import Component from '../../structure/Component.js';
import AutocompleteComponent from '../../structure/AutocompleteComponent.js';

class ComponentsHandler {
    client;

    /**
     *
     * @param {DiscordBot} client 
     */
    constructor(client) {
        this.client = client;
    }

    load = async () => {
        for (const directory of readdirSync('./src/components/')) {
            for (const file of readdirSync('./src/components/' + directory).filter((f) => f.endsWith('.js') && !f.startsWith('-'))) {
                try {
                    /**
                     * @type {Component['data'] | AutocompleteComponent['data']}
                     */

                    // if file starts with - it will be ignored by the handler

                    if (file.startsWith('-')) continue;
                    
                    const { default: module } = await import(`../../components/${directory}/${file}`);

                    if (!module) continue;

                    if (module.__type__ === 3) {
                        if (!module.customId || !module.type || !module.run) {
                            error('Unable to load the button/select/modal component ' + file);
                            continue;
                        }

                        switch (module.type) {
                            case 'modal': {
                                this.client.collection.components.modals.set(module.customId, module);
                                break;
                            }
                            case 'select': {
                                this.client.collection.components.selects.set(module.customId, module);
                                break;
                            }
                            case 'button': {
                                this.client.collection.components.buttons.set(module.customId, module);
                                break;
                            }
                            default: {
                                error('Invalid component type (not: button, select, or modal): ' + file);
                                continue;
                            }
                        }

                        info(`Loaded new component (type: ${module.type}) : ` + file);
                    } else if (module.__type__ === 4) {
                        if (!module.commandName || !module.run) {
                            error('Unable to load the autocomplete component ' + file);
                            continue;
                        }

                        this.client.collection.components.autocomplete.set(module.commandName, module);

                        info(`Loaded new component (type: autocomplete) : ` + file);
                    } else {
                        error('Invalid component type ' + module.__type__ + ' from component file ' + file);
                    }
                } catch {
                    error('Unable to load a component from the path: ' + 'src/component/' + directory + '/' + file);
                }
            }
        }

        const componentsCollection = this.client.collection.components;

        success(`Successfully loaded ${componentsCollection.autocomplete.size + componentsCollection.buttons.size + componentsCollection.selects.size + componentsCollection.modals.size} components.`);
    }

    reload = async () => {
        this.client.collection.components.autocomplete.clear();
        this.client.collection.components.buttons.clear();
        this.client.collection.components.modals.clear();
        this.client.collection.components.selects.clear();

        await this.load();
    }
}

export default ComponentsHandler;