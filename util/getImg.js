const snekfetch = require("snekfetch");

exports.get = async (waifu, client) => {
    const index = await Math.floor((Math.random() * 51) + 1);
    client.logger.log("Index: " + index);

    const response = await snekfetch.get("https://www.googleapis.com/customsearch/v1?key="+client.config.google_key+"&cx="+client.config.cx_google_id+"&start="+index+"&num=1&imgType=face&searchType=image&q="+waifu);
    client.logger.log("Img URL: " + response.body.items[0].link);
    return response.body.items[0].link;
}
