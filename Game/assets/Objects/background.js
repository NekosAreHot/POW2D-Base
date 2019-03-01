Game.createBackground = function(x,y,texture,width,height){
	if(width != null && height != null){
		if(texture != null){
			if(texture == "ice.png"){
				Game.createSlippery(x,y,texture,"ice",width,height);
			}else{
				Game.Backgrounds.push(new Game.GameObject(width,height,Game.File.getImageDirectory() + texture,x,y,"image"));
			}
		}else{
			Game.Backgrounds.push(new Game.GameObject(width,height,Game.File.getImageDirectory() + "brown.png",x,y,"image"));
		}
	}else{
		if(texture != null){
			if(texture == "ice.png"){
				Game.createSlippery(x,y,texture,"ice");
			}else{
				Game.Backgrounds.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"image"));
			}
		}else{
			Game.Backgrounds.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "brown.png",x,y,"image"));
		}
	}
}

Game.createBackgroundPrefix = function(texture){
	if(texture == "ice.png"){
		Game.Console.sendError("Prevented a Engine crash, you may have attempted to create a ice background");
	}
	for(var z = 0; z < Game.myGameArea.getWidth(); z += 20){
		for(var i = 0; i < Game.myGameArea.getHeight(); i += 20){
			if(texture != null && texture != "ice.png"){
				Game.createBackground(z,i,texture);
			}else{
				Game.createBackground(z,i);
			}
		}
	}
}

//Fun function - to make normal levels "snowy"
Game.laySnow = function(){
	Game.createBackgroundPrefix("snow.png");
	for(var i = 0;i < Game.GameObjects.length;i++){
		if(Game.GameObjects[i].color == Game.File.getImageDirectory() + "water_texture.png"){
			Game.createBackground(Game.GameObjects[i].x,Game.GameObjects[i].y,"ice.png");
			Game.removeWall(Game.GameObjects[i].x,Game.GameObjects[i].y);
		}
	}
}
Game.createSand = function(x,y){
	Game.createBackground(x,y,"sand_texture.png");
}
Game.createSnow = function(x,y){
	Game.createBackground(x,y,"snow_texture.png");
}
Game.createShell = function(x,y){
	Game.createBackground(x,y,"shell_texture.png");
}

Game.createSlippery = function(x,y,texture,type,width,height){
	if(width != null && height != null){
		var temp = new Game.GameObject(width,height,"blue",x,y,"slippery");
	}else{
		var temp = new Game.GameObject(20,20,"blue",x,y,"slippery");
	}
	if(type != null){
		temp.slipper_type = type;
	}else{
		temp.slippery_type = "ice";
	}
	if(texture != null){
		temp.setImage(texture);
	}
	Game.Backgrounds.push(temp);
}
Game.getSlippery = function(x,y){
	for(var i = 0;i < Game.Backgrounds.length;i++){
		if(Game.Backgrounds[i].type == "slippery" && Game.Backgrounds[i].x == x && Game.Backgrounds[i].y == y){
			return Game.Backgrounds[i];
		}
	}
	return null;
}