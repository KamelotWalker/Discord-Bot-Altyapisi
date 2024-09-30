import { Client, Collection, Partials } from 'discord.js';
import { error, success, warn } from '../utils/Console.js';
import mongoose from 'mongoose';
import config from '../config.js';
import CommandsHandler from './handler/CommandsHandler.js';
import ComponentsHandler from './handler/ComponentsHandler.js';
import EventsHandler from './handler/EventsHandler.js';
import CommandsListener from './handler/CommandsListener.js';
import ComponentsListener from './handler/ComponentsListener.js';

class DiscordBot extends Client {
    collection = {
      application_commands: new Collection(),
      message_commands: new Collection(),
      message_commands_aliases: new Collection(),
      components: {
        buttons: new Collection(),
        selects: new Collection(),
        modals: new Collection(),
        autocomplete: new Collection(),
      },
    };
    rest_application_commands_array = [];
    login_attempts = 0;
    login_timestamp = 0;
    statusMessages = [
      { name: "123", type: 4 },
      { name: "1234", type: 4 },
      { name: "12345", type: 4 },
      { name: "123456", type: 4 },
      { name: "1234567", type: 4 },
      { name: "12345678", type: 4 },
    ];
  
    commands_handler = new CommandsHandler(this);
    components_handler = new ComponentsHandler(this);
    events_handler = new EventsHandler(this);
  
    constructor() {
      super({
        intents: 3276799, // şu anki tüm intentler yani 3276799 (ALL_INTENTS)
        partials: [
          Partials.Channel, // Partial types
          Partials.GuildMember,
          Partials.Message,
          Partials.Reaction,
          Partials.User,
          Partials.GuildScheduledEvent,
          Partials.ThreadMember,
        ],
        presence: {
          activities: [
            {
              name: "keep this empty",
              type: 4,
              state: "Zarttiri Zort",
            },
          ],
        },
      });
  
      new CommandsListener(this);
      new ComponentsListener(this);
    }
  
    startStatusRotation = () => {
      let index = 0;
      setInterval(() => {
        this.user.setPresence({ activities: [this.statusMessages[index]] });
        index = (index + 1) % this.statusMessages.length;
      }, 5000);
    };
  
    connect = async () => {
      warn(
        `Attempting to connect to the Discord bot... (${this.login_attempts + 1})`
      );
  
      this.login_timestamp = Date.now();
  
      try {
        await this.login(process.env.CLIENT_TOKEN);
        await this.commands_handler.load(); 
        this.components_handler.load(); 
        await this.events_handler.load(); 
        this.startStatusRotation();
  
        warn(
          "Attempting to register application commands..."
        );
        await this.commands_handler.registerApplicationCommands(
          config.development
        );
        success(
          "Successfully registered application commands. For specific guild? " +
            (config.development.enabled ? "Yes" : "No")
        );
      } catch (err) {
        error("Failed to connect to the Discord bot, retrying...");
        error(err);
        this.login_attempts++;
        setTimeout(this.connect, 5000);
      }
    };
  }
  
  mongoose.connect(config.database.uri, {});
  
  globalThis.Underline = { // Global variable. You can access it from anywhere. without root folder.
    config,
  };

export default DiscordBot;