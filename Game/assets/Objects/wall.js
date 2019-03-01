Game.createWall = function(x,y,texture,width,height){
	if(width != null && height != null){
		if(texture != null){
			Game.GameObjects.push(new Game.GameObject(width,height,Game.File.getImageDirectory() + texture,x,y,"wall",true));	
		}else{
			Game.GameObjects.push(new Game.GameObject(width,height,Game.File.getImageDirectory() + "brick_20x20.png",x,y,"wall",true));
		}
	}else{
		if(texture != null){
			Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"wall",true));	
		}else{
			Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + "brick_20x20.png",x,y,"wall",true));
		}
	}
	var obj = Game.GameObjects[Game.GameObjects.length - 1];
}
Game.createWoodWall = function(x,y){
	Game.createWall(x,y,"woodwall_texture.png");
}
Game.createWater = function(x,y){
	Game.createWall(x,y,"water_texture.png");
}
Game.createStone = function(x,y){
	Game.createWall(x,y,"stone_texture.png");
}
Game.createRockyWall = function(x,y){
	Game.createWall(x,y,"rock_texture.png");
}
Game.createBrickWall = function(x,y){
	Game.createWall(x,y,"brick2_texture.png");
}


Game.getWall = function(x,y){
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(Game.GameObjects[i].type == "wall" && Game.GameObjects[i].x == x && Game.GameObjects[i].y == y){
			return Game.GameObjects[i];
		}
	}
	return false;
}

Game.removeWall = function(x,y){
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(Game.GameObjects[i].isWall == true && Game.GameObjects[i].x == x && Game.GameObjects[i].y == y){   
			//Hide the wall and make it not a wall to disable the wall check;
			Game.GameObjects[i].isHidden = true;
			Game.GameObjects[i].type = "image";
			Game.GameObjects[i].isWall = false;
		}
	}
}

Game.hitWallCheck = function(other){
	if(other.type == "entity" || other.type == "player"){
		if(other.noclip){
			return false;
		}
	}
	for(var i = 0; i < Game.Walls.length; i++){
		if(other.crashWith(Game.Walls[i])){
			return true;
		}
	}
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(other.crashWith(Game.GameObjects[i]) && Game.GameObjects[i].isWall){
			return true;
		}
	}
	return false;
}

//The Wall around the Game so you cant escape the area
Game.wallPrefix = function(texture){
	//Define the dungeon walls
	//left Side
	for(var i = 0; i < Game.myGameArea.getHeight(); i += 20){
		if(texture != null){
			Game.createWall(0,i,texture);
		}else{
			Game.createWall(0,i);
		}
	}
	//TOP
	for(var i = 0; i < Game.myGameArea.getWidth(); i += 20){
		if(texture != null){
			Game.createWall(i,0,texture);
		}else{
			Game.createWall(i,0);
		}
	}
	//BOTTOM
	for(var i = 0; i < Game.myGameArea.getWidth(); i += 20){
		if(texture != null){
			Game.createWall(i,480,texture);	
		}else{
			Game.createWall(i,480);	
		}
	}
	//Right Side
	for(var i = 0; i < Game.myGameArea.getHeight(); i += 20){
		if(texture != null){
			Game.createWall(980,i,texture);
		}else{
			Game.createWall(980,i);
		}
	}
}