Game.Light = {};
Game.light = [];
Game.createDarkness = function(x,y){
	var temp = new Game.GameObject(20, 20,/*Game.File.getImageDirectory() + "fog.png"*/"black", x, y, "light");
	Game.light.push(temp);	
}
Game.Light.object = function(){
	//Put a overlay of black ontop of everything
	Game.light = [];
	for(var z = 0; z < Game.myGameArea.getWidth(); z += 20){
		for(var i = 0; i < Game.myGameArea.getHeight(); i += 20){
			Game.createDarkness(z,i);
		}
	}
};
Game.Light.removeAt = function(x,y){
	//Removes a 20,20 block of darkness from x,y
	for(var i = 0; i < Game.light.length; i += 1){
		if(Game.light[i].x == x && Game.light[i].y == y){
			Game.light[i].isHidden = true;
		}
	}
};
Game.Light.disable = function(){
	//Self explanitory
};
Game.Light.enable = function(){
	//self explanitory
};
Game.Light.placeAt = function(x,y){
	//Places darkness at x,y
};
Game.Light.getAt = function(x,y){
	//Gets a light object at x,y
	for(var i = 0; i < Game.light.length; i++){
		if(Game.light[i].type == "light" && Game.light[i].x == x && Game.light[i].y == y){
			return Game.light[i];
		}
	}
}