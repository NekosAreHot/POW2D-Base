Game.createWater = function(x,y){
	Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "water_texture.png",x,y,"water",true));	
}
Game.createLava = function(x,y){
	Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "lava_texture.png",x,y,"lava",true));	
}