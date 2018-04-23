exports.run = async (client, message, [mention, ...waifu]) => {
    let db = new client.sqlite3.Database('./waifu.db', (err) => {
        if (err)
            return client.logger.error(err.message);
        client.logger.log("Connected to the waifu SQlite database.");
    });

    if (message.mentions.members.size === 0)
        return message.reply("Perfavore menziona un utente del server!");

    let member = message.mentions.members.first();

    if (member.id != message.member.id && !message.member.roles.has(client.config.waifu_master_id)) 
        return message.reply("Per poter aggiungere una waifu altrui devi ricevere il benestare del Waifu Master.");
    
    if (waifu.join(" ").length == 0)
        return message.reply("Non è stato inserito il nome della waifu!");
    let tmp_waifu;
  
    db.get("SELECT * FROM waifus WHERE user_id = ?", member.id, (err, row) => {

        if (err) return client.logger.error(err.message);
        if (row != undefined) {
            client.logger.log(row.waifu + "returned for " + row.user_id);
            tmp_waifu = row.waifu;
        }

        db.run(`UPDATE waifus SET waifu = ? WHERE user_id = ${member.id}`, [waifu.join(" ")], function (err) {
            client.logger.log("Row(s) updated " + this.changes);
            if (this.changes === 0) {
                db.run("INSERT INTO waifus (user_id, waifu) VALUES (?, ?)", [member.id, waifu.join(" ")]);
                message.channel.send(member + "ha una nuova waifu! " + waifu.join(" ") + " complimenti!");
                client.logger.log("Inserted 1 waifu for user_id: " + member.id);
                return;
            }
            else {
                message.channel.send("Aggiornata la waifu di " + member + " a " + waifu.join(" "));
                message.channel.send(tmp_waifu + ": 'Why did you leave me senpai?!'");
            }
        });
    });

    db.close((err) => {
        if (err)
            return client.logger.error(err.message);
        client.logger.log("Closed the waifus database connection.");
    });
}