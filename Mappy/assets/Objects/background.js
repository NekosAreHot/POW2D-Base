Game.createBackground = function(x,y,texture,width,height){
	if(width != null && height != null){
		if(texture != null){
			if(texture == "ice.png"){
				Game.createSlippery(x,y,texture,"ice");
			}else{
				Game.Backgrounds.push(new Game.GameObject(width,height,Game.File.getImageDirectory() + texture,x,y,"image"));
			}
		}else{
			Game.Backgrounds.push(new Game.GameObject(width,height,Game.File.getImageDirectory() + "brown.png",x,y,"image"));
		}
	}else{
		if(texture != null){
			Game.Backgrounds.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"image"));
		}else{
			Game.Backgrounds.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "brown.png",x,y,"image"));
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