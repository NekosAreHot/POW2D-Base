/*
* Moves the player in different directions
* @param {string} dir - the direction to move "up" "down" "left" "right"
*/
Game.Level.Settings = {};
Game.Entities.createNPC = function(x,y,DialogArray,texture,ShopItems,ShopPrices){
	Game.createWall(x,y,"NPC_tile.png");
}
Game.createPushable = function(x,y,texture){
	Game.createWall(x,y,"pushable.png");
}
Game.createButton = function(x,y,texture){
	Game.createWall(x,y,"button.png");
}
Game.createShootingTile = function(x,y,damage,direction){
	Game.createWall(x,y,"trigger_texture.png");
}
Game.Level.Settings.fog = false;
Game.Light = {};
Game.Light.object = function(){};
var d = new Date();
function move(dir){
	Game.Dialog.hide();
	Game.oof = true;
	if(Game.paused || Game.player.canMove){
		//AI tick
		//Game.AI.tick();
		if(dir=="left"){
			Game.player.x = Game.player.x - Game.gridSize;
			move("stop");
			/*if(Game.hitWallCheck(Game.player) || Game.player.crashWith(Game.backBlock)){
				Game.player.x = Game.player.x + 20;
				move("stop");
			}else if(Game.Entities.checkHit(Game.player)){
				Game.Dialog.combat();
				var other = Game.Entities.getEntity(Game.getPlayerX(),Game.getPlayerY());
				Game.player.dealDamage(other);
				Game.player.x = Game.player.x + 20;
				move("stop");
			}else{
				Game.player.facing = "east";
			}*/
		}else if(dir=="right"){
			Game.player.x = Game.player.x + Game.gridSize;
			move("stop");
			/*if(Game.hitWallCheck(Game.player) || Game.player.crashWith(Game.backBlock)){
				Game.player.x = Game.player.x - 20;
				move("stop");
			}else if(Game.Entities.checkHit(Game.player)){
				Game.Dialog.combat();
				var other = Game.Entities.getEntity(Game.getPlayerX(),Game.getPlayerY());
				Game.player.dealDamage(other);
				Game.player.x = Game.player.x - 20;
				move("stop");
			}else{
				Game.player.facing = "west";
			}*/
		}else if(dir=="down"){
			Game.player.y = Game.player.y + Game.gridSize;
			move("stop");
			/*if(Game.hitWallCheck(Game.player) || Game.player.crashWith(Game.backBlock)){
				Game.player.y = Game.player.y - 20;
				move("stop");
			}else if(Game.Entities.checkHit(Game.player)){
				var other = Game.Entities.getEntity(Game.getPlayerX(),Game.getPlayerY());
				Game.Dialog.combat();
				Game.player.dealDamage(other);
				Game.player.y = Game.player.y - 20;
				move("stop");
			}else{
				Game.player.facing = "south";
			}*/
		}else if(dir=="up"){
			Game.player.y = Game.player.y - Game.gridSize;
			move("stop");
			/*if(Game.hitWallCheck(Game.player) || Game.player.crashWith(Game.backBlock)){
				Game.player.y = Game.player.y + 20;
				move("stop");
			}else if(Game.Entities.checkHit(Game.player)){
				var other = Game.Entities.getEntity(Game.getPlayerX(),Game.getPlayerY());
				Game.Dialog.combat();
				Game.player.dealDamage(other);
				Game.player.y = Game.player.y + 20;
				move("stop");
			}else{
				Game.player.facing = "north";
			}*/
		}
	}
}
/*
* Moves another gameobject across the screen
* @param {object} other - the other gameobject
* @param {string} dir - direction to move same as move()
*/
function moveOther(other,dir){
	if(dir=="left"){
		other.x -= 20;
		moveOther(other,"stop");
		Game.player.facing = "east";
	}else if(dir=="right"){
		other.x += 20;
		move(other,"stop");
		Game.player.facing = "west";
	}else if(dir=="down"){
		other.y += 20;
		move(other,"stop");
		Game.player.facing = "south";
	}else if(dir=="up"){
		other.y -= 20;
		move(other,"stop");
		Game.player.facing = "north";
	}
}
/**
* BROKEN
*
*/
//UNUSED too smooth oof
function Smoothmove(dir){
	if(dir=="left"){
		Game.player.speedX = -1.5;
		Game.player.speedY = 0;
		if(Game.hitWallCheck(Game.player)){
			Game.player.speedX = 1.5;
			Game.player.speedY = 0;
		}
	}else if(dir=="right"){
		Game.player.speedX = 1.5;
		Game.player.speedY = 0;
		if(Game.hitWallCheck(Game.player)){
			Game.player.speedX = -1.5;
			Game.player.speedY = 0;
		}
	}else if(dir=="down"){
		Game.player.speedX = 0;
		Game.player.speedY = 1.5;
		if(Game.hitWallCheck(Game.player)){
			Game.player.speedX = 0;
			Game.player.speedY = -1.5;
		}
	}else if(dir=="up"){
		Game.player.speedX = 0;
		Game.player.speedY = -1.5;
		if(Game.hitWallCheck(Game.player)){
			Game.player.speedX = 0;
			Game.player.speedY = 1.5;
		}
	}else if(dir=="stop"){
		Game.player.speedX = 0;
		Game.player.speedY = 0;
	}
}
var newTexture = {};
newTexture.background = "grass.png";
newTexture.wall = "brick_20x20.png";
var temp = 0;
var temp2 = 0;
var dHeight = 20;
var dWidth = 20;
var trigger_input = "Game.Level.Overworld.loadLevel(\"beginning\")";
var button_input = "Game.Dialog.setText(\"hello world!\",1)"
Game.fireDmg = 20;
Game.Controller = {};
Game.Controller.inGame = function(inputData){
	//This is the code for all the keybinds while in the game with nothing open like the inventory
	//or the chest inventory, etc
	//WASD mapping
	if(inputData.keyCode === ROT.VK_W){
		move("up");
	}
	
	if(inputData.keyCode === ROT.VK_A){
		move("left");
	}
	
	if(inputData.keyCode === ROT.VK_S){
		move("down");
	}
	
	if(inputData.keyCode === ROT.VK_D){
		move("right");
	}
	if(inputData.keyCode === ROT.VK_5){
		var input = Game.requestString("Input the texture of the pushable");
		Game.createPushable(Game.player.x,Game.player.y,input);
		NEWLEVEL = NEWLEVEL + "Game.createPushable(" + Game.player.x + "," + Game.player.y + ",\"" + input + "\");"; 
	}
	if(inputData.keyCode === ROT.VK_6){
		var input2 = Game.requestString("Input the function you wanna run",button_input);
		button_input = input2;
		Game.createButton(Game.player.x,Game.player.y);
		NEWLEVEL = NEWLEVEL + "Game.createButton(" + Game.player.x + "," + Game.player.y + ",function(){" + input2 + "},\"button.png\");";		
	}
	if(inputData.keyCode === ROT.VK_C){
		var input = Game.requestString("input a code that will return a bool,\n if true, it will unlock the door","Game.Level.hasBeatForest");
		var i = String(input);
		Game.createWall(Game.player.x,Game.player.y,"cd door key.png");
		NEWLEVEL = NEWLEVEL + "Game.createLockedDoor(" + Game.player.x + "," + Game.player.y + "," + i + ");\n";
	}
	if(inputData.keyCode === ROT.VK_ESCAPE){
		Game.removeWall(Game.player.x,Game.player.y);
		NEWLEVEL = NEWLEVEL + "Game.removeWall(" + Game.player.x + "," + Game.player.y + ");\n";
	}
	if(inputData.keyCode === ROT.VK_K){
		var input = Game.requestString("input a direction","left");
		var input2 = Game.requestString("input a damage for the fireballs",Game.fireDmg);
		Game.fireDmg = input2;
		Game.createShootingTile(Game.player.x,Game.player.y,0,0);
		NEWLEVEL = NEWLEVEL + "Game.createShootingTile(" + Game.player.x + "," + Game.player.y + "," + input2 + ",\"" + input + "\");\n";
	}
	if(inputData.keyCode === ROT.VK_Z){
		var input = Game.requestString("Input the filename for the level you wanna load","LevelName");
		var file;
		if(input != null && input != "LevelName"){
			try{
				file = Game.File.ReadFile("C:/Users/Public/Documents/RisingLight/MappyLevels/" + input);
			}catch(err){
				Game.Dialog.setText("invalid file",1);
			}
			if(file != null){
				NEWLEVEL = file.substring(0,file.length - 1);
				eval(file);
				Game.Level.maps[input.substring(0,input.length - 3)]();
				name = input.substring(0,input.length - 3);
			}
		}else{
			Game.Dialog.setText("Please enter a levelName",1);
		}
	}
	if(inputData.keyCode == ROT.VK_7){
		var input = Game.requestString("Set the tile grid size",20);
		if(input != null){
			
		}else{
			input = 20;
		}
		Game.gridSize = Number(input);
	}
	if(inputData.keyCode == ROT.VK_X){
		var input = Game.requestString("Input code","Game.Dialog.setText(\"Hello world!\");");
		if(input != null){
			NEWLEVEL = NEWLEVEL + input;
			Game.Dialog.setText("Added code to level!",1);
		}
	}
	if(inputData.keyCode == ROT.VK_F){
		var input = Game.requestString("Please input the Function you want to \ntie to this trigger. When the player hits the trigger, it will execute\nthe inputted function.\n	\nTrigger Function:",trigger_input);
		Game.createWall(Game.player.x,Game.player.y,"trigger_texture.png");
		trigger_input = String(input);
		NEWLEVEL = NEWLEVEL + "Game.createTrigger(" + Game.player.x + "," + Game.player.y + ",true,function(){" + String(input) + "});\n"
	}
	if(inputData.keyCode === ROT.VK_0){
		Game.createBackgroundPrefix(newTexture.background);
		NEWLEVEL = NEWLEVEL + "Game.createBackgroundPrefix(\"" + newTexture.background + "\");";
	}
	if(inputData.keyCode === ROT.VK_9){
		Game.wallPrefix(newTexture.wall);
		NEWLEVEL = NEWLEVEL + "Game.wallPrefix(\"" + newTexture.wall + "\");";
	}
	if(inputData.keyCode == ROT.VK_1){
		if(temp < 2){
			temp++
		}else{
			newTexture.wall = Game.requestString("input the filename of the texture for the walls","brick_20x20.png");
			temp = 0;
		}
		if(newTexture.wall != null || newTexture.wall != " "){
				
		}else{
			newTexture.wall = Game.requestString("Invalid Texture, please input");
		}
	}
	if(inputData.keyCode === ROT.VK_2){
		if(temp2 < 2){
			temp2++
		}else{
			newTexture.background = Game.requestString("input the filename of the texture for the backgrounds and Foregrounds","grass.png");
			
			temp2 = 0; 
		}
		if(newTexture.background != null || newTexture.background != " "){
				
		}else{
			newTexture.background = Game.requestString("Invalid Texture, please input");
		}
	}
	if(inputData.keyCode === ROT.VK_J){
		var input = Game.requestString("Please input the width of tiles you place",20);
		if(input == null){
			input = 20;
		}
		var input2 = Game.requestString("Please input the height of tiles you place",20);
		if(input2 == null){
			input2 = 20;
		}
		dWidth = input;
		dHeight = input2;
	}
	if(inputData.keyCode === ROT.VK_H){
		Game.createWall(Game.player.x,Game.player.y,newTexture.background,dWidth,dHeight);
		NEWLEVEL = NEWLEVEL + "Game.createForeground(" + Gama.player.x + "," + Game.player.y + ",\"" + newTexture.background + "\"," + dWidth + "," + dHeight + ");\n";
	}
	//Wall codes
	try{
		if(inputData.keyCode === ROT.VK_B){
			Game.createWall(Game.player.x,Game.player.y,newTexture.wall,dWidth,dHeight);
			NEWLEVEL = NEWLEVEL + "Game.createWall(" + Game.player.x + "," + Game.player.y + "," + "\"" + newTexture.wall + "\"," + dWidth + "," + dHeight + ");\n";
		}
	}catch(err){
		newTexture.wall = Game.requestString("Invalid Image");
	}
	if(inputData.keyCode === ROT.VK_4){
		var input = Game.requestString("Type in code to be injected into the level\n Use \"\\n\" to create line breaks");
		NEWLEVEL = input + "\n" + NEWLEVEL;
	}
	
	//Background codes
	try{
		if(inputData.keyCode === ROT.VK_N){
			Game.createWall(Game.player.x,Game.player.y,newTexture.background,dWidth,dHeight);
			NEWLEVEL = NEWLEVEL + "Game.createBackground(" + Game.player.x + "," + Game.player.y + "," + "\"" + newTexture.background + "\"," + dWidth + "," + dHeight + ");\n";
		}
	}catch(err){
		newTexture.background = Game.requestString("Invalid Image");
	}
	
	if(inputData.keyCode === ROT.VK_T){
		Game.createTorch(Game.player.x,Game.player.y);
		NEWLEVEL = NEWLEVEL + "Game.createTorch(" + Game.player.x + "," + Game.player.y + ");\n";
	}
	if(inputData.keyCode === ROT.VK_U){
		var input1 = Game.requestString("Enter the dialog: \nExample: \n [\"line1\",\"line2\",\"line3\",\"line4\"]");
		var input2 = Game.requestString("Enter the npcs texture");
		Game.createWall(Game.player.x,Game.player.y,"NPC_tile.png");
		NEWLEVEL = NEWLEVEL + "Game.Entities.createNPC(" + Game.player.x + "," + Game.player.y + ",[],\"" + input2 + "\");\nvar ent = Game.Entities.getNPC(" + Game.player.x + "," + Game.player.y + ");\n";
		NEWLEVEL = NEWLEVEL + "ent.addDialog(" + input1 + ");\n";
	}
	if(inputData.keyCode === ROT.VK_I){
		Game.dropItem(Game.player.x,Game.player.y);
		NEWLEVEL = NEWLEVEL + "Game.dropItem(" + Game.player.x + "," + Game.player.y + ");\n";
	}
	if(inputData.keyCode === ROT.VK_V){
		//if(Game.getDoorHere()){
			Game.createDoor(Game.player.x,Game.player.y);
		//}
			NEWLEVEL = NEWLEVEL + "Game.createDoor(" + Game.player.x + "," + Game.player.y + ");\n";
	}
	
	if(inputData.keyCode === ROT.VK_M){
		//if(Game.getDoorHere()){
			Game.createHiddenDoor(Game.player.x,Game.player.y);
		//}
		NEWLEVEL = NEWLEVEL + "Game.createHiddenDoor(" + Game.player.x + "," + Game.player.y + ");\n";
	}
	
	if(inputData.keyCode === ROT.VK_G){
		Game.createChest(Game.player.x,Game.player.y,[]);
		NEWLEVEL = NEWLEVEL + "Game.createChest(" + Game.player.x + "," + Game.player.y + ",[Game.getRandomItem(),Game.getRandomItem(),Game.getRandomItem()]);\n";
	}

	
	if(inputData.keyCode === ROT.VK_O){	
		Game.Entities.createDemon(Game.player.x,Game.player.y, Game.Level.depth * 30,Game.Level.depth * 3);
		NEWLEVEL = NEWLEVEL + "Game.Entities.createDemon(" + Game.player.x + "," + Game.player.y + ",Game.Level.depth * 30,Game.Level.depth * 3);\n";
	}
	if(inputData.keyCode === ROT.VK_P){
		Game.playerSpawn = Game.createGeneric(20,20,"green",Game.player.x,Game.player.y);
		NEWLEVEL = NEWLEVEL + "Game.Teleport(" + Game.player.x + "," + Game.player.y + ");\n";
	}
	
	
	
	
	
	if(inputData.keyCode === ROT.VK_CONTROL){
	//Save the level
		NEWLEVEL = NEWLEVEL + "}";
		Game.Dialog.setText("Saved the level in C:/Users/Public/Documents/RisingLight/MappyLevels/",2);
		Game.File.Create("C:/Users/Public/Documents/RisingLight/MappyLevels/" + name + ".mappy",NEWLEVEL);
		alert("Saved File C:/Users/Public/Documents/RisingLight/MappyLevels/" + name + "\" : Contents:  " + NEWLEVEL);
	}
	
	if(inputData.keyCode === ROT.VK_R){
		Game.levelZero();
		Game.Dialog.setText("Cleared the Editor!",2);
		NEWLEVEL = BlankFile;
	}
	//END
}
/**
 *
 * Detects the input from a keyboard using ROT.MIN.JS
 * no need to call this, it automatically is called on a key event
 */
Game.handleInput = function(inputType, inputData){
	
	if(!Game.isInMenu){
		Game.Controller.inGame(inputData);
	}
	
	if(Game.isInMenu){
		//if in the Menu
		if(inputData.keyCode === ROT.VK_W){
			Game.Selected = "Start";
			Game.menuSelector.y = 50;
		}else if(inputData.keyCode === ROT.VK_S){
			Game.Selected = "Shop;"
			Game.menuSelector.y = 200;
		}else if(inputData.keyCode === ROT.VK_A){
			if(Game.Selected == "Start"){
				Game.isInMenu = false;
				Game.myGameArea.clear();
				Game.levelZero();
			}else if(Game.Selected == "Shop"){
				
			}
		}
	}
	if(Game.getCurrentSubMenu.current == "chest"){
		var chest = Game.getChest(Game.player.x,Game.player.y);
		if(inputData.keyCode === ROT.VK_1){
			var chestContent = chest.getContents(1);
			if(chestContent != null){
				Game.player.addToInventory(chestContent);
				chest.removeContents(1);
			}
		}
		if(inputData.keyCode === ROT.VK_2){
			var chest = Game.getChest(Game.player.x,Game.player.y);
			var chestContent = chest.getContents(2);
			if(chestContent != null){
				Game.player.addToInventory(chestContent);
				chest.removeContents(2);
			}
		}
		if(inputData.keyCode === ROT.VK_3){
			var chest = Game.getChest(Game.player.x,Game.player.y);
			var chestContent = chest.getContents(3);
			if(chestContent != null){
				Game.player.addToInventory(chestContent);
				chest.removeContents(3);
			}
		}
		if(inputData.keyCode === ROT.VK_4){
			var chest = Game.getChest(Game.player.x,Game.player.y);
			var chestContent = chest.getContents(4);
			if(chestContent != null){
				Game.player.addToInventory(chestContent);
				chest.removeContents(4);
			}
		}
	}
	if(Game.Died){
		
			location.reload();
		
	}
	
}
