Game.Console = {
 throwMessage: function(type, msg){
    console.log(type + msg);
 },
 type: function(int){
    if(int == 1 || int == 0){
        return Game.Console.Prefix.Error;
    }else if(int == 2){
        return Game.Console.Prefix.Warning;
    }else if(int == 3){
        return Game.Console.Prefix.Message;
    }else if(int == 4){
        return Game.Console.Prefix.Console;
    }
 }
}

/**
* Sends messages, all uss same properties
* @param {string} msg - the message to print to console
**/
Game.Console.sendMessage = function(msg){
    Game.Console.throwMessage(Game.Console.type(3),msg);
}
Game.Console.sendSilent = function(msg){
	console.log(msg);
}
Game.Console.sendError = function(msg,type){
	if(type != null){
		throw(type + ": " + msg);
	}else{
		throw("Error: " + msg);
	}
}
Game.Console.sendWarning = function(msg){
    Game.Console.throwMessage(Game.Console.type(2),msg);
}
Game.Console.sendCommand = function(msg){
    Game.Console.Messages.pushMessage(msg);
}
Game.Console.Console = function(msg){
    Game.Console.throwMessage(Game.Console.type(4),msg);
}
Game.Console.sendTest = function(){
	Game.Console.throwMessage(Game.Console.type(3),"Ping");
}

Game.Console.Prefix = {};
Game.Console.Prefix.Message = "Message: ";
Game.Console.Prefix.Error = "Error: ";
Game.Console.Prefix.Warning = "Warning: ";
Game.Console.Prefix.Command = "Command: ";
Game.Console.Prefix.Console = "";


//Load the console
//Display Engine details to console
Game.Console.sendSilent("ooooooooo.     .oooooo.   oooooo   oooooo     oooo   .oooo.   oooooooooo.  ");
Game.Console.sendSilent("`888   `Y88.  d8P'  `Y8b   `888.    `888.     .8'  .dP\"\"Y88b  `888'   `Y8b ");
Game.Console.sendSilent(" 888   .d88' 888      888   `888.   .8888.   .8'         ]8P'  888      888");
Game.Console.sendSilent(" 888ooo88P'  888      888    `888  .8'`888. .8'        .d8P'   888      888");
Game.Console.sendSilent(" 888         888      888     `888.8'  `888.8'       .dP'      888      888");
Game.Console.sendSilent(" 888         `88b    d88'      `888'    `888'      .oP     .o  888     d88'");
Game.Console.sendSilent("o888o         `Y8bood8P'        `8'      `8'       8888888888 o888bood8P'");  
Game.Console.sendSilent("-------------------------------------------------------------------------");
Game.Console.sendSilent("Console: Version: " + Game.consoleversion);
Game.Console.sendSilent("POW2D Version: " + POW2D.version);
Game.Console.sendSilent("Engine Codename: " + Game.codename);
Game.Console.sendSilent("Game Version: " + Game.version);
Game.Console.sendSilent(" ");
Game.Console.sendSilent("User: " + os.userInfo().username);
Game.Console.sendSilent("Player IP for Multiplayer: " + Game.getIp());
Game.Console.sendSilent("Platform: " + os.platform() + " / " + os.type());
for(var i = 0; i < os.cpus().length; i++){
 Game.Console.sendSilent("CPU " + i + ": " + os.cpus()[i].model);   
}
Game.Console.sendSilent("Total Memory: " +  os.totalmem() / 1000000000 + " GB");
Game.Console.sendSilent("Architecture: " + os.arch());
Game.Console.sendSilent("-------------------------------------------------------------------------");
Game.Console.sendSilent("                             Basic Documentation                         ");
Game.Console.sendSilent("Dropdown displays all commands for the engine");
Game.Console.sendSilent(Engine);

Game.Console.sendSilent("-------------------------------------------------------------------------");