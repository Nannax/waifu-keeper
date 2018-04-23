exports.run = async (client, message, args) => {
    let db = new client.sqlite3.Database('./waifu.db', (err) => {
        if (err)
            return client.logger.error(err.message);
        client.logger.log("Connected to the waifu SQlite database.");
    });
  
    if (message.mentions.members.size === 0)
        return message.reply("Perfavore menziona un utente del server!");
  
    let member = message.mentions.members.first();          
    
    db.get("SELECT * FROM waifus WHERE user_id = ?", member.id, (err, row) => {
        if (err)
            return client.logger.error(err.message);
        if (row != undefined) {
            message.reply("La waifu di " + member + " \u00E8 " + row.waifu);

            client.img.get(row.waifu, client).then(response => 
                message.channel.send({embed: {
                    title: "Found [" + member.displayName + " - " + row.waifu + "]",
                    url: response,
                    color: 3447003,
                    image:{
                        url: response,
                    },
                    footer:{
                        text: "Se l'immagine non viene caricata cliccare sul titolo."
                    }

            }})).catch( err => {
                client.logger.error(err);
                message.reply("Beep-Beeep-Boop ALL systems failure, can't load image.");
            });

        } else {
            message.reply(member + " non ha ancora una waifu.");
        }
    });
    
    db.close((err) => {
        if (err)
            return client.logger.error(err.message);
        client.logger.log("Closed the waifus database connection.");
    });
}
