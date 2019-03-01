Game.Start = function(){
	//Set all game settings before the game starts here!
	Game.Text = new Game.GameObject("30px", "Times", "black", 80, 40, "text");
	Game.menuText_startGame = new Game.GameObject("30px","Times","black",230,320,"text");
	Game.menuText_shop = new Game.GameObject("30px","Times","black",580,320,"text");
	
	
	Game.classText_startKnight = new Game.GameObject("30px","Times","black",130,320,"text");
	Game.classText_startMage = new Game.GameObject("30px","Times","black",430,320,"text");
	Game.classText_startHunter = new Game.GameObject("30px","Times","black",730,320,"text");
	
	Game.Background = new Game.GameObject(Game.myGameArea.getWidth(),Game.myGameArea.getHeight(),"Textures/Rising_Light.png",0,0,"image");

	
	Game.player = new Game.GameObject(20, 20, "black", 20, 120, "player");
	
	Game.isInMenu = true;

	
	
	//Start the game
	
	if(Game.AlreadyInMenu){
		Game.StartVillage();
	}else{
		Game.mainMenu();
	}
	Game.myGameArea.start();
	//render the light 
	//if(Game.Level.Settings.isDark){
		//Game.Light.object();
	//}
}

Game.getCurrentMenu = function(){
	this.current = "Main_Menu";
	return this.current;
}
Game.getCurrentSubMenu = function(){
	this.current = "none";
	return this.current;
}
Game.forceStart = function(){
	Game.myGameArea.start();
}