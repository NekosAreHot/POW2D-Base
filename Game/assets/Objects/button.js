Game.createButton = function(x,y,func,texture){
	var temp = new Game.GameObject(20,20,"blue",x,y,"button");
	temp.onPress = func;
	if(texture != null){
		temp.setImage(texture);
	}else{
		temp.setImage("trigger_texture.png");
	}
	Game.GameObjects.push(temp);
}

Game.getButton = function(x,y){
	for(var i = 0;i < Game.GameObjects.length;i++){
		if(Game.GameObjects[i].type == "button" && Game.GameObjects[i].x == x && Game.GameObjects[i].y == y){
			return Game.GameObjects[i];
		}
	}
	return null;
}