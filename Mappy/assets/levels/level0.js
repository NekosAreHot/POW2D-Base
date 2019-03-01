Game.levelZero = function(){
	Game.playerSpawn = undefined;
	Game.player.noclip = true;
	window.open("Mappy/windows/controls.html");
	Game.getCurrentMenu.current = "levelZero";
	Game.Level.clear();
	//Player is 20pixels by 20pixles at (x,y) (0,120)
	Game.player.facing = "east";
	//BackGround
	Game.createBackgroundPrefix();
	Game.openInventory();
	Game.closeInventory();
	name = Game.requestString("Please input the name of the level","new_Mappy_"+ Math.floor(Math.random() * 20) + Math.floor(Math.random() * 20) + Math.floor(Math.random() * 20) + Math.floor(Math.random() * 20) + Math.floor(Math.random() * 20));
	BlankFile = "Game.Level.maps." + name +" = function(){\nGame.Level.clear();\nGame.Level.Settings.fog = false;\nGame.Light.object();\nGame.wallPrefix();\nGame.createBackgroundPrefix();\nGame.winBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + \"door_texture.jpg\", 9999, 220,\"image\");\nGame.backBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + \"door_texture.jpg\",9999,20,\"image\");\n";
    NEWLEVEL = BlankFile;
	Game.wallPrefix();
	Game.winBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg", 99999,99999,"image");
	Game.backBlock = new Game.GameObject(20,20,Game.File.getImageDirectory() + "door_texture.jpg",99999,99999,"image");
}