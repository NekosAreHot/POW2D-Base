Game.mainMenu = function(){
	Game.Selected = "Start";
	Game.Text.text = "Developer Programs";
	Game.Background = new Game.GameObject(Game.myGameArea.getWidth(),Game.myGameArea.getHeight(),"Textures/grass.png",0,0,"image");
	Game.menuSelector = new Game.GameObject(210,110,"red",50,50);
	Game.menuButton_startGame = new Game.GameObject(200,100,"black",50,50);
	Game.menuText_startGame.text = "MapEditor";
	
	Game.menuButton_shop = new Game.GameObject(200,100,"black",50,200);
	Game.menuText_shop.text = "Version 1.0";
	
	//Game.player = new Game.GameObject(20, 20, "black", 950, 250);
}
