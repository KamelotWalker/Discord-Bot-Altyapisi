import Event from '../../structure/Event.js';
import { custom } from '../../utils/Console.js';

export default new Event({
    event: 'messageCreate',
    once: false, // true if you want to listen once only
    run: (__client__, message) => {

        custom('Message', message.content);

    }
}).toJSON();