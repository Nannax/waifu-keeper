exports.run = async (client, message, mention) => {
    if (!message.member.roles.has(client.config.waifu_master_id)) {
        message.reply("Solo chi ha abbastanza esperienza con le waifu può passare i propri poteri.");
        client.logger.log("User with id: " + message.member.displayName + " tried to use command '!benestare'.");
        return;
    } else {
        
        if (message.mentions.members.size === 0)
            return message.reply("Perfavore menziona un utente del server!");

        let member = message.mentions.members.first();
      
        if (!member.roles.has(client.config.waifu_master_id)) {
            member.addRole(client.config.waifu_master_id).catch(console.error);
            message.reply("Complimenti " + member.displayName + ", ora sei anche te un Waifu Master!");
            client.logger.log("User with id: " + member.displayName + " is now a Waifu Master.")
        } else {
            message.reply(member.displayName + " è già un Waifu Master!");
        }
    }
}