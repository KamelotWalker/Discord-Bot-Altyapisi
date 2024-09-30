import Event from '../../structure/Event.js';
import { custom } from '../../utils/Console.js';

export default new Event({
    event: 'guildMemberAdd',
    once: false,
    run: (__client__, member) => {
        const { user } = member;
        const { tag, createdAt, bot } = user;

        if (bot) return;

        const oneWeekInMillis = 1000 * 60 * 60 * 24 * 7;
        const isNewAccount = createdAt > Date.now() - oneWeekInMillis;
        
        custom('Guild Member Add', tag);
        if (isNewAccount) {
            custom('New Account', tag);
        }
    }
}).toJSON();