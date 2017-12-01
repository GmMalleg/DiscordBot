const Eris = require('eris');
 
const bot = new Eris(process.env.DISCORD_BOT_TOKEN);   // Replace DISCORD_BOT_TOKEN in .env with your bot accounts token

function roller(rolls,dice){
  var roll="";
    for(var i=0;i<rolls;i++){
      roll+=Math.floor(Math.random()*(dice-1)+1)+"+"
      };
  return roll.slice(0, -1);
};

bot.on('ready', () => {                                // When the bot is ready
    console.log('Ready!');                             // Log "Ready!"
});
 
bot.on('messageCreate', (msg) => {                     // When a message is created
  
    try{var expression=msg.content.match(/{(.*)}/)[0].slice(1,-1)}catch(err){var expression=false}; //try to extract the content of the first pair of curly brackets
    var notation= /(\d+)?d(\d+)/i;
      if(expression) {                 // If the message content includes any expression between curly brackets
        var index=0;
        var message=expression+"=";  //debug message to signal the execution of this branch of code
        var first=notation.test(expression);
        while(notation.test(expression)){
          var match=expression.match(notation);
          expression=expression.replace(notation,roller(match[1],match[2]));
          //message+=roller(match[1],match[2]);
          first=false;
          console.log(expression);
        }
        bot.createMessage(msg.channel.id, message+' '+expression+'='+eval(expression) );  // Send a message in the same channel with "YOUR ROLL"

    }
});
 
bot.connect();                                         // Get the bot to connect to Discord Discord