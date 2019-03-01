Game.dropItem = function(x,y,itm){
	var itemObj = new Game.GameObject(20,20,Game.File.getImageDirectory() + "droppedItem_texture.png",x,y,"droppedItem");
	if(itm != null){
		itemObj.heldItem = Game.CopyItem(itm);
	}else{
		itemObj.heldItem = Game.getRandomItem();
	}
	if(itemObj.heldItem.icon != null){
		//Sets the image of the dropped item to the items icon if it exists
		itemObj.setImage(itemObj.heldItem.icon);
	}
	Game.GameObjects.push(itemObj);
}
Game.getDroppedItem = function(){
	var x = Game.player.x;
	var y = Game.player.y;
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(Game.GameObjects[i].x == x && Game.GameObjects[i].y == y && Game.GameObjects[i].type == "droppedItem"){
			return Game.GameObjects[i].heldItem;
		}
	}
}
Game.getDroppedItemObj = function(){
	var x = Game.player.x;
	var y = Game.player.y;
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(Game.GameObjects[i].x == x && Game.GameObjects[i].y == y && Game.GameObjects[i].type == "droppedItem"){
			return Game.GameObjects[i];
		}
	}
}
Game.onDroppedItem = function(){
	var x = Game.player.x;
	var y = Game.player.y;
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(Game.GameObjects[i].x == x && Game.GameObjects[i].y == y && Game.GameObjects[i].type == "droppedItem"){
			return true;
		}
	}
	return false;
}