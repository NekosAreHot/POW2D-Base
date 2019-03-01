Game.createPushable = function(x,y,texture){
	var temp = new Game.GameObject(20,20,"blue",x,y,"pushable");
	if(texture != null){
		temp.setImage(texture);
	}else{
		//Set the default texture
		temp.setImage("crate.png");
	}
	Game.GameObjects.push(temp);
}

Game.getPushable = function(x,y){
	for(var i = 0;i < Game.GameObjects.length;i++){
		if(Game.GameObjects[i].type == "pushable" && Game.GameObjects[i].x == x && Game.GameObjects[i].y == y){
			return Game.GameObjects[i];
		}
	}
	return null;
}

Game.pushPushable = function(Entity){
	var ent = Entity;
	var x = ent.x;
	var y = ent.y;
	var facing = ent.facing;
	if(Game.getPushable(x,y) != null){
		Game.getPushable(x,y).push(facing);
	}
}