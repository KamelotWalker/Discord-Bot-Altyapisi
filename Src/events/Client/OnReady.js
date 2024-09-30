import Event from '../../structure/Event.js';
import { custom, success } from '../../utils/Console.js';

export default new Event({
    event: 'ready',
    once: true,
    run: (__client__, client) => {
        success('Logged in as ' + client.user.displayName + ', took ' + ((Date.now() - __client__.login_timestamp) / 1000) + "s.");

        let guilds = client.guilds.cache.map(guild => guild.name).join(", ");
        custom('Sunucular', guilds);
    }
}).toJSON();