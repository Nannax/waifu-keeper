exports.run = async (client, message, args) => {
    message.reply({
    embed: {
        color: 3447003,
        author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
        },
        title: "Waifu Keeper commands",
        fields: [{
            name: "!add",
            value: "!add <utente a cui aggiungere la waifu (se si dispone dei permessi)> <nome waifu>"
        },
        {
            name: "!get",
            value: "!get <utente di cui si vuole conoscere la waifu>"
        },
        {
            name: "Esempio",
            value: "!add @nannax/fraesia Kai'Sa"
        }
        ],
        timestamp: new Date(),
        footer: {
            icon_url: client.user.avatarURL,
            text: "© Nannax"
        }
    }
    });
}