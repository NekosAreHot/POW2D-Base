/**
* Creates a locked door at (x,y);
* @param {int} x - the x position of the new door
* @param {int} y - the y position of the new door
* @param {boolean} bool - opens when this is true
**/
Game.createLockedDoor = function(x,y,string){
	Game.createWall(x,y,"cd door key.png");
	var door = Game.GameObjects[Game.GameObjects.length - 1];
	door.setId("lockeddoor");
	var func = function(){
		var door = Game.getLockedDoor(x,y);
		if(eval(string)){
			Game.removeWall(x,y);
			Game.Dialog.hide();
			Game.Dialog.setText("You put the key in the door and open it!",1);
			Game.getTrigger(x - 20,y).triggerFunction = function(){};
			Game.getTrigger(x + 20,y).triggerFunction = function(){};
			Game.getTrigger(x,y - 20).triggerFunction = function(){};
			Game.getTrigger(x,y + 20).triggerFunction = function(){};
		}else{
			Game.Dialog.hide();
			Game.Dialog.setText("The door seems like it needs a key",1);	
		}
	};
	//Create the trigger points
	Game.createTrigger(x - 20,y,true,func);
	Game.createTrigger(x + 20,y,true,func);
	Game.createTrigger(x,y-20,true,func);
	Game.createTrigger(x,y+20,true,func);
	door.triggers = [];
	door.triggers.push(Game.triggers[Game.triggers.length - 1]);
	door.triggers.push(Game.triggers[Game.triggers.length - 2]);
	door.triggers.push(Game.triggers[Game.triggers.length - 3]);
	door.triggers.push(Game.triggers[Game.triggers.length - 4]);
}
/**
* returns a locked door obj from (x,y)
* @param {int} x - x position of the door
* @param {int} y - y position of the door
**/
Game.getLockedDoor = function(x,y){
	for(var i = 0; i < Game.GameObjects.length; i++){
		if(Game.GameObjects[i].id == "lockeddoor"){
			return Game.GameObjects[i];
		}
	}
	return false;
}
/**
*
*
**/
Game.unlockDoor = function(x,y){
	var x = Game.getLockedDoor(x,y);
	if(x != false){
		Game.removeWall(x,y);
		x.triggers = [];
	}
}