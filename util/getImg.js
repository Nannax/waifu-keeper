const snekfetch = require("snekfetch");

exports.get = async (waifu, client) => {
    
    const response_tmp = await snekfetch.get("https://www.googleapis.com/customsearch/v1?key="+client.config.google_key+"&cx="+client.config.cx_google_id+"&imgType=face&searchType=image&q="+waifu);

    let startIndex = await Number(response_tmp.body.queries.request[0].totalResults);
    if (startIndex > 91)
        startIndex = 91;
    
    const index = await Math.floor((Math.random() * startIndex) + 1);
    client.logger.log("Actual Index: " + index + ", Start Index: " +startIndex);

    const response = await snekfetch.get("https://www.googleapis.com/customsearch/v1?key="+client.config.google_key+"&cx="+client.config.cx_google_id+"&start="+index+"&num=1&imgType=face&searchType=image&q="+waifu);
    client.logger.log("Img URL: " + response.body.items[0].link);
    return response.body.items[0].link;
}