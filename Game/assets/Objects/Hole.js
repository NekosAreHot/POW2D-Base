
Game.Hole.checkHit = function(other){
	for(var i = 0; i < Game.Entities.inGame.length; i++){
		if(other.crashWith(Game.Entities.inGame[i]) && Game.Entities.inGame[i].isHidden != true){
			return true;
		}
	}
	return false;
}



Game.createHole = function(x,y,texture){
	if(texture != null){
		Game.Backgrounds.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"image"));
	}else{
		Game.Backgrounds.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "void.png",x,y,"image"));
	}
}


Game.createSand = function(x,y){
	Game.createBackground(x,y,"void.png");
	
}

