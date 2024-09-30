# DiscordBot Readme

Discord.js v14 tabanlı ve tamamen JavaScript ile yazılmış bir Discord bot komutları, bileşenleri ve olayları yöneticisi. 

## İçindekiler
- [Kurulum](#kurulum)
- [Gereksinimler](#gereksinimler)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Örnek Komut Dosyası](#örnek-komut-dosyası)
- [Örnek Event Dosyası](#örnek-event-dosyası)
- [Örnek Component Dosyası](#örnek-component-dosyası)
- [Örnek AutoComplate Component Dosyası](#örnek-autocomplate-component-dosyası)
- [Message Command](#message-command)

## Özellikler
- Mümkün olan tüm komut türlerini destekler.
  - [x] Message Command
  - [x] Slash Command
    - [x] Chat Input Command
    - [x] User context Menu
    - [x] Message context Menu

- Mümkün olan tüm bileşen türlerini destekler.
  - [x] Button Component
  - [x] Select Menu Component
  - [x] Modal Component
  - [x] Autocomplete Component

- Mümkün olan tüm olay türlerini destekler.
- Basit ve anlaşılır bir yapıya sahiptir.
- Gelişmiş komut seçenekleri.


## Kurulum
Bu botu kurmak için aşağıdaki adımları izleyiniz:

```bash
npm install
```

## Gereksinimler

Bu modülün çalışması için aşağıdaki gereksinimlere ihtiyaç vardır:

- Node.js v16.11.0 veya daha üst sürümü
- npm (Node Package Manager)
- İnternet bağlantısı

Lütfen bu gereksinimlerin karşılandığından emin olun.



## Katkıda Bulunma
Katkıda bulunmak isterseniz, lütfen bir pull request gönderin.

## Örnek Komut Dosyası
```js
import { ChatInputCommandInteraction } from "discord.js";
import DiscordBot from "../../client/DiscordBot.js";
import ApplicationCommand from "../../structure/ApplicationCommand.js";

export default new ApplicationCommand({
    command: {
        name: 'ping', // Komutun adı
        description: 'Replies with Pong!', // Komutun açıklaması
        type: 1, // Komutun türü
    },
    options: {
        cooldown: 5000, // Komutun cooldown süresi
        botOwner: true // Bot sahibi olma zorunluluğu ekler
    },
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.reply({
            content: '**Pong!** ' + client.ws.ping + 'ms'
        });
    }
}).toJSON();
```

## Örnek Event Dosyası
```js
import Event from '../../structure/Event.js';
import { custom } from '../../utils/Console.js';

export default new Event({
    event: 'messageCreate', // Event adı
    once: false, // Eventin bir kere mi çalışacağı
    run: (__client__, message) => {

        custom('Message', message.content); // Console log

    }
}).toJSON();
```

## Örnek Component Dosyası
```js
import { ButtonInteraction } from "discord.js";
import DiscordBot from "../../client/DiscordBot.js";
import Component from "../../structure/Component.js";

export default new Component({
    customId: 'example-button-id',
    type: 'button', // 'modal' | 'select' | 'button',
    options: {
        public: true, // Diğer kullanıcılar ana etkileşim sahibinin düğmesini/seçimini kullanabilir mi? (true = evet, false = hayır)
    }
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.reply({
            content: 'Replied from a Button interaction!',
            ephemeral: true
        });
    }
}).toJSON();
```

## Örnek AutoComplate Component
```js
new AutocompleteComponent({
    commandName: string,
    run: Awaitable<(client: DiscordBot, interaction: AutocompleteInteraction) => void>
});
```

## Message Command
```js
new MessageCommand({
    command: {
        name: string, // Komut adı
        description?: string, //  Komut açıklaması (optional)
        aliases?: string[], // Komutun alternatif adları (optional)
        permissions?: PermissionResolvable[], // Komutu çalıştırmak için gereken izinler (optional)
    },
    options?: Partial<{
        cooldown: number, // Komutun cooldown süresi
        botOwner: boolean, // Bot sahibi olma zorunluluğu ekler (true = evet, false = hayır)
        guildOwner: boolean, // Sunucu sahibi olma zorunluluğu ekler (true = evet, false = hayır)
        botDevelopers: boolean, // Bot geliştiricisi olma zorunluluğu ekler (true = evet, false = hayır)
        nsfw: boolean // Komutun nsfw olup olmadığını belirler (true = evet, false = hayır)
    }>,
    run: Awaitable<(client: DiscordBot, message: Message, args: string[]) => void> // Komutun çalıştırılacağı fonksiyon
});
```
