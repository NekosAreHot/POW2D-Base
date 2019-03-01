Game.Level = {};
Game.Level.clear = function(){
	Game.File.savePlayerInventory();
	Game.File.savePlayerHealth();
	Game.File.savePlayerScore();
	Game.Walls = [];
	Game.Backgrounds = [];
	Game.GameObjects = [];
	Game.Dangers = [];
	Game.triggers = [];
	Game.Entities.inGame = [];
	Game.chests = [];
	Game.winBlock = undefined;
	Game.Text;
	Game.backBlock = undefined;
	Game.Entities.NPC.inGame = [];
	Game.projectiles = [];
	Game.Animations.inGame = [];
	Game.Foregrounds = [];
	Game.traps = [];
}
Game.Level.Settings = {
	thickFog : true,
	isDark : true,
	fog : true,
	disableLight : false
}
//This is for the maps
Game.Level.currentType = {generator:"None"};
//If we are in a boss level
Game.Level.inBossFight = false;
//Players Depth in the Dungeon
Game.Level.depth = 0;
Game.Level.maps = {};
Game.Level.path = Game.File.getLevelDirectory() + "Maps/";
//all the maps for this generator go here
Game.Level.maps = {};
/**
* Gets all the levels in the maps folder and loads them into memory
* TODO : skipfiletypes - doesnt read files if they contain the filetype, param will be an array of string filetypes
**/
Game.Level.getAll = function(skipfiletypes){
	var array = Game.convertObjecttoArray(Game.File.getAllFilesInPath(Game.Level.path));
	for(var i = 0; i < array.length;i++){
		try{
			var file = Game.Level.path + array[i];
			var readFile = Game.File.ReadFile(file);
			eval(readFile);
		}catch(err){
			//If the file in the folder isnt in correct syntax
			Game.Console.sendMessage("Level Error in " + array[i] + ". " + err);
		}
	}
}
Game.Level.onEnter = function(){
	//Intialize the Maps settings
	//Set the settings to outside enviornment
	Game.Level.Settings.fog = true;
	Game.Light.object();
	//Set the Games current level settings so we can actually tell what map the player is on
	Game.Level.currentType = {generator: "None"};
}
Game.Level.randomLevel = function(){
	var rand = Game.getRandom(Game.Level.maps);
	rand();
	Game.Level.onEnter();
}
Game.Level.loadLevel = function(string){
	Game.Level.maps[string]();
	//Loads this dungeons onEnter method
	Game.Level.onEnter();
	Game.Level.currentType.generator = "None";
	Game.Level.currentType.exactMap = string;
}
//When the generator is initated, get all maps
Game.Level.getAll();