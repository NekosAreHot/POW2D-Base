Game.createForeground = function(x,y,texture,width,height){
	if(width != null && height != null){
		if(texture != null){
			Game.Foregrounds.push(new Game.GameObject(width,height,Game.File.getImageDirectory() + texture,x,y,"image"));
		}else{
			Game.Foregrounds.push(new Game.GameObject(width,height,Game.File.getImageDirectory() + "brown.png",x,y,"image"));
		}
	}else{
		if(texture != null){
			Game.Foregrounds.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"image"));
		}else{
			Game.Foregrounds.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "brown.png",x,y,"image"));
		}
	}
}