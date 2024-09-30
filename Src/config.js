const config = {
    database: {
        uri: 'mongodb://localhost:27017/underline'
    },
    development: {
        enabled: true,
        guildId: '754433509032067145',
    },
    commands: {
        prefix: '?',
        message_commands: false,
        application_commands: {
            chat_input: true,
            user_context: true,
            message_context: true
        }
    },
    users: {
        ownerId: '610197515358306313',
        developers: ['610197515358306313', "331547840536903690"]
    },
    messages: {
        NOT_BOT_OWNER: 'Benim sahibim olmadığınız için bu komutu çalıştırma izniniz yok!',
        NOT_BOT_DEVELOPER: 'Benim geliştiricisi olmadığınız için bu komutu çalıştırma izniniz yok!',
        NOT_GUILD_OWNER: 'Sunucu sahibi olmadığınız için bu komutu çalıştırma izniniz yok!',
        CHANNEL_NOT_NSFW: 'Bu komutu NSFW olmayan bir kanalda çalıştıramazsınız!',
        MISSING_PERMISSIONS: 'Bu komutu çalıştırma izniniz yok, eksik izinler.',
        COMPONENT_NOT_PUBLIC: 'Bu düğmenin sahibi siz değilsiniz!',
        GUILD_COOLDOWN: 'Şu anda bekleme süresindesiniz, bu komutu tekrar kullanma yeteneğine sahip olacaksınız: \`%cooldown%s\`.'
    }
}

export default config;