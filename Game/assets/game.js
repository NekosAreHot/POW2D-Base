//Define all varables here for use by the game
//NODE Stuff
var fs = require('fs');
//Define Game as a constant so you cant overwrite Game
const Game = {};
const POW2D = {};
POW2D.version = "1.1.0";
Game.version = "0.12.7";
Game.codename = "BlueBerry";
Game.consoleversion = "1.02";
//Alias' for game
const Engine = Game;
//Booleans
var Save;
Game.dev = false;
Game.Died = false;
Game.pause = false;
Game.isInMenu = true;
Game.isKnight = false;
Game.isMage = false;
Game.isInGameOver = false;
Game.isHunter = false;
Game.isInIntroSequence1 = false;
Game.isInIntroSequence2 = false;
Game.isInIntroSequence3 = false;
Game.isInIntroSequence4 = false;
Game.isInClass = false;
Game.isInControls = false;
Game.AlreadyInMenu = false;
Game.hasBinded = false;
Game.isSliding = false;
//Integers
Game.highestLevel = 1;
Game.gridSize = 20;
Game.bossDamagerPerHit = 10;
//GameObjects
Game.player;
Game.backBlock;
Game.bossBlock;
Game.winBlock;
Game.Text;
Game.menuSelector;
Game.Selected;
Game.menuButton_startGame;
Game.menuText_startGame;
Game.classButton_startKnight;
Game.classButton_startMage;
Game.classButton_startHunter;
Game.classText_startKnight;
Game.classText_startMage;
Game.classText_startHunter;
Game.menuButton_shop;
Game.menuText_shop;
Game.menuButton_options;
Game.menuText_options;
Game.menuButton_about;
Game.menuText_options;
Game.GameObjects = [];
Game.Walls = [];
Game.Backgrounds = [];
Game.Dangers = [];
Game.triggers = [];
Game.chests = [];
Game.menuObjects = [];
Game.Texts = [];
Game.Foregrounds = [];
Game.droppedItems = [];
//OBJECTS
Game.Directions = {
	up : "up",
	down : "down",
	left : "left",
	right : "right"
}

Game.blankConstructor = function(){};

Game.runString = function(string){
	try{
		eval(string);
	}catch(err){
		Game.Console.sendError("Game.runString(" + string + "); is an invalid line of code.\nErrorCode: " + err);
	}
}
Game.convertToString = function(line){
	return JSON.stringify(line);
}
Game.dirOpposite = function(dir){
	if(dir == Game.Directions.up){
		return "down";
	}else if(dir == Game.Directions.down){
		return "up";
	}else if(dir == Game.Directions.left){
		return "right";
	}else if(dir == Game.Directions.right){
		return "left";
	}else{
		Game.Console.sendError("Direction is invalid in Game.dirOpposite(\"" + dir + "\");");
	}
}

//When the executable loads
window.resizeTo(1050,550);


Game.isValidDirection = function(dir){
	if(dir == Game.Directions.up){
		return true;
	}else if(dir == Game.Directions.down){
		return true;
	}else if(dir == Game.Directions.left){
		return true;
	}else if(dir == Game.Directions.right){
		return true;
	}else{
		return false;
	}
}

//Miscellaneous functions
Game.isObject = function(variable){
	var variable;
	if(typeof variable == "Object"){
		return true;
	}else{
		return false;
	}
};
Game.isString = function(variable){
	var variable;
	if(typeof variable == "String"){
		return true;
	}else{
		return false;
	}
};
Game.getRandom = function(obj){
	var keys = Object.keys(obj);
    return	obj[keys[ keys.length * Math.random() << 0]];
}
Game.CopyArray = function(array){
  let objCopy = {};
  let key;
  for (key in array) {
    objCopy[key] = array[key];
  }
  return objCopy;
}
/**
* Makes any function called be executed in 2 seconds
* @param {function} func - the function you want to input
**/
Game.Wait = function(func){
	var wait = 2000;
	var x = setTimeout(func,wait);
	return x;
}


/**
* Converts a object into an array
* @param {object} obj - object you want to convert
**/
Game.convertObjecttoArray = function(obj){
	var arr = [];
	for(var i in obj){
		if(obj.hasOwnProperty(i)){
			arr.push(obj[i]);
		}
	}
	return arr;
}
/**
* Binds a event to a function
* @param {string} event - type of event
* @param {function} func - the code to be executed on the event
**/
Game.bindEvent = function(event,func){
	window.addEventListener(event,func, false);
}
/**
* Asks the user for a string and returns it
* @param {string} DisplayText - the text that the display says
**/
Game.requestString = function(DisplayText,flag){
	return prompt(DisplayText,flag);
}
/**
* Displays a dialog box that displays text
* @param {string} DisplayText - the text that the display says
**/
Game.displayMessage = function(DisplayText){
	alert(DisplayText);
}
/**
* Returns the users ip address if they are connected to a connection
**/
Game.getIp = function(){
	if(os.networkInterfaces()["Wi-Fi"] != undefined){
		return os.networkInterfaces()["Wi-Fi"][1].address;
	}else{
		return "0.0.0.0 (offline)";
	}
}