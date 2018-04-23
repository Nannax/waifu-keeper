exports.run = async (client, message, args) => {
    let string = args.join(" ").replace(/\s/g,"").split("");
    let numbers = [];
    let y = 0;
    let wasNum = false;
    
    string.forEach(word => {
        if (!isNaN(parseFloat(word)) && isFinite(word)) {
            y = y * 10 + parseFloat(word);
            wasNum = true;
        } else {
            if (y != 0 || y == 0 && wasNum) {
                numbers.push(y);
                y = 0;
                wasNum = false;
            }
        }
    });
  
    if (y != 0 || y == 0 && wasNum)
        numbers.push(y);
  
    message.reply("I numeri/o dentro la frase sono/è: " + numbers.toString());
}