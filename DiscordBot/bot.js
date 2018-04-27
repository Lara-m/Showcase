/*
The bot that turns what was typed into regional indicators.
*/

const Discord = require("discord.js");
const client = new Discord.Client();
 
client.on("ready", ()=> {
    console.log("Superbot 3000 has initialized!");
    console.log("==User Information==");
    console.log(`Username: ${client.user.tag}`);
});
 
client.on("message", (message)=> {
    if(message.author.bot) return;
    var prefix  = ">>>";
    if(message.content.startsWith(prefix))
    {
        var a = message.content.split("");
        var reply = ""
    	for (var i = 3; i < a.length; i++) {
    		reply +=  ":regional_indicator_"+a[i].toLowerCase()+":";
    	}
    	message.channel.send(reply);
    }
});
 
client.login("Seriously? Use your own. :|");
