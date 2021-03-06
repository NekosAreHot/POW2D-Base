//Define all varables here for use by the game
Game = {};
//Booleans
var name;
var BlankFile;
var NEWLEVEL = BlankFile;
Game.gridSize = 20;
Game.dev = false;
Game.Died = false;
Game.pause = false;
Game.beatLevel = false;
Game.isInMenu = true;
Game.isInControls = false;
Game.AlreadyInMenu = false;
Game.hasBinded = false;
//Integers
Game.highestLevel = 1;
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

//When the executable loads
window.resizeTo(1050,550);

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
	setTimeout(func,wait);
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
Game.requestString = function(DisplayText,defaulttxt){
	return prompt(DisplayText,defaulttxt);
}