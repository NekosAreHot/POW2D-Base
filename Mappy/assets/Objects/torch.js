Game.createTorch = function(x,y,texture,isHidden){
	if(texture != null){
		Game.GameObjects.push(new Game.GameObject(20,20,Game.File.getImageDirectory() + texture,x,y,"torch"));	
	}else{
		Game.GameObjects.push(new Game.GameObject(20,20,"red",x,y,"torch"));
	}
	var obj = Game.GameObjects[Game.GameObjects.length - 1];
	if(isHidden != null){
		obj.isHidden = isHidden;
	}
}