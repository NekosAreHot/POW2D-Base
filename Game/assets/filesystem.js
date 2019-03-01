/**
  * Output: returns String
  */
Game.File.getDirectory = function(){
	return "Game/assets/";
};
Game.File.getLevelDirectory = function(){
	return Game.File.getDirectory() + "levels/";
};
Game.File.getSoundDirectory = function(){
	return Game.File.getDirectory() + "sounds/";
};
Game.File.getImageDirectory = function(){
	return "Textures/";
};
Game.File.getAnimationDirectory = function(){
	return Game.File.getDirectory() + "animations/";
};
Game.File.getNodeDirectory = function(){
	return "Game/node_modules/";
};
Game.File.getItemPath = function(){
	return "Game/assets/items/";
}
Game.File.getHomePath = function(){
	return "C:/Users/" + os.userInfo().username + "/";
}
//Varables

//Storage Functions
Game.File.CreateDir("C:/Users/Public/Documents/RisingLight/");
Game.File.CreateDir("C:/Users/Public/Documents/RisingLight/saves/");
Game.File.CreateDir("C:/Users/Public/Documents/RisingLight/MappyLevels/");
Game.File.CreateDir("C:/Users/Public/Documents/RisingLight/itemtoolkit/");
Game.File.Create("C:/Users/Public/Documents/RisingLight/MappyLevels/readme.txt","Levels made in POW2D Engine will save Here! \n -------------------------------------------");