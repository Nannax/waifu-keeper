if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const Enmap = require("enmap");
const sqlite3 = require('sqlite3').verbose();
const fs = require("fs");
const http = require('http');
const express = require('express');
const client = new Discord.Client();

const app = express();

client.config = require("./config.js");

client.logger = require("./util/logger"); // yet to use

client.img = require("./util/getImg");

client.sqlite3 = sqlite3;

  
  app.get("/", (request, response) => {
    client.logger.log(Date.now() + " Ping Received");
    response.sendStatus(200);
  });
  app.listen(process.env.PORT);
  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 280000);

  
  fs.readdir("./", (err, files) => {
    let init = false;
    if (err) return client.logger.error(err);
    files.forEach(file => {
      if (file == "waifu.db") init = true;
    });

    if (!init) {
      let db = new client.sqlite3.Database('./waifu.db', (err) => {
        if (err) return client.logger.error(err.message);
        client.logger.log("Connected to the waifu SQlite database.");

        db.run("CREATE TABLE IF NOT EXISTS waifus(user_id text PRIMARY KEY, waifu text)", function (err) {
          if (err) return client.logger.error(err.message);
          client.logger.log("Creating the waifu table...");

          db.close((err) => {
            if (err) return client.logger.error(err.message);
            client.logger.log('Closed the waifu database connection.');
          });
        });
      });
    }
  });


  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, eventFunction.bind(null, client));
    });
  });

  client.commands = new Enmap();

  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Attempting to load command ${commandName}`);
      client.commands.set(commandName, props);
    });
  });

  client.login(client.config.token);
