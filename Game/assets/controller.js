//for click events
Game.Buttons = {};
Game.Buttons.leftMouse = 0
Game.Buttons.middleMouse = 1;
Game.Buttons.rightMouse = 2;

//KEY BINDINGS

const BIND = {};
//Bind for opening inventory
BIND.INVENTORY = ROT.VK_I;
BIND.CHEST = ROT.VK_F;
//Bind for exiting to menu
BIND.EXIT_TO_MENU = ROT.VK_M;
//Bind for saving
BIND.SAVE = ROT.VK_CONTROL;
//Pick up items
BIND.USE = ROT.VK_E;
//Pause
BIND.PAUSE = ROT.VK_P;
BIND.UNPAUSE = ROT.VK_SPACE;
//Bind for movement
BIND.MOVE_UP = ROT.VK_W;
BIND.MOVE_DOWN = ROT.VK_S;
BIND.MOVE_LEFT = ROT.VK_A;
BIND.MOVE_RIGHT = ROT.VK_D;
BIND.TOGGLE_SPRINT = ROT.VK_X;
//Attack Related
//Shoot arrows
BIND.SHOOT_ARROW = ROT.VK_Q;
//Shoot magic
BIND.SHOOT_FIRE = ROT.VK_H;
BIND.SHOOT_ICE = ROT.VK_J;
BIND.SHOOT_THUNDER = ROT.VK_K;
BIND.SHOOT_LIFE = ROT.VK_L;
BIND.SWING_SWORD = ROT.VK_U;

//Resets the bindings
BIND.Reset = function(){
	//Bind for opening inventory
	BIND.INVENTORY = ROT.VK_I;
	BIND.CHEST = ROT.VK_F;
	//Bind for exiting to menu
	BIND.EXIT_TO_MENU = ROT.VK_M;
	//Bind for saving
	BIND.SAVE = ROT.VK_CONTROL;
	//Pick up items
	BIND.USE = ROT.VK_E;
	//Pause
	BIND.PAUSE = ROT.VK_P;
	BIND.UNPAUSE = ROT.VK_SPACE;
	//Bind for movement
	BIND.MOVE_UP = ROT.VK_W;
	BIND.MOVE_LEFT = ROT.VK_A;
	BIND.MOVE_DOWN = ROT.VK_S;
	BIND.MOVE_RIGHT = ROT.VK_D;
	BIND.TOGGLE_SPRINT = ROT.VK_X;
	//Attack Related
	//Shoot arrows
	BIND.SHOOT_ARROW = ROT.VK_Q;
	//Shoot magic
	BIND.SHOOT_FIRE = ROT.VK_H;
	BIND.SHOOT_ICE = ROT.VK_J;
	BIND.SHOOT_THUNDER = ROT.VK_K;
	BIND.SHOOT_LIFE = ROT.VK_L;
	BIND.SWING_SWORD = ROT.VK_U;
}
BIND.setBind = function(key,newValue){
	BIND[key] = newValue;
}
Game.oof2 = false;
Game.Controller = {};
Game.Controller.inGame = function(inputData){
	//This is the code for all the keybinds while in the game with nothing open like the inventory
	//or the chest inventory, etc
	//WASD mapping
	if(!inputData.repeat){
		if(inputData.keyCode === BIND.TOGGLE_SPRINT){
			if(Game.oof2){
				Game.player.sprint = true;
				Game.oof2 = false;
				Game.Dialog.hide();
				Game.Dialog.setText("Sprint On!",2);
			}else{
				Game.player.sprint = false;
				Game.oof2 = true;
				Game.Dialog.hide();
				Game.Dialog.setText("Sprint Off!",2);
			}
		}
		if(inputData.keyCode === BIND.MOVE_UP){
			if (Game.player.sprint) Thread.sleep(500,"move(\"up\");");
			move("up");
		}
		if(inputData.keyCode === BIND.MOVE_LEFT){
			if (Game.player.sprint) Thread.sleep(500,"move(\"left\");");
			move("left");
		}
	
		if(inputData.keyCode === BIND.MOVE_DOWN){
			if (Game.player.sprint) Thread.sleep(500,"move(\"down\");");
			move("down");
		}
	
		if(inputData.keyCode === BIND.MOVE_RIGHT){
			if (Game.player.sprint) Thread.sleep(500,"move(\"right\");");
			move("right");
		}
	if(inputData.keyCode === BIND.PAUSE){
		Game.pause = true;
		Game.HTML.openDialog("menu_dialog");
	}
	if(inputData.keyCode === ROT.VK_ESCAPE){
		Game.pause = false;
	}
	if(inputData.keyCode === BIND.UNPAUSE){
		Game.pause = false;
		Game.Dialog.hide();
	}
	if(inputData.keyCode === BIND.SHOOT_ARROW){
		if(Game.player.hasBow){
			if(Game.player.hasArrows()){
				Sound.Woosh.play();
				Game.createProjectile(Game.player.x,Game.player.y,Game.player.facing,15,15,Game.player);
				Game.player.arrows--;
				
			}else{
				Game.Dialog.hide();
				Game.Dialog.setText("No arrows!",2);
			}
		}
	}
	if(inputData.keyCode === BIND.SHOOT_FIRE){
		if(Game.player.hasFire){
			if(Game.player.hasMagic()){
				if(Game.player.level > 5){
					Game.createFireProjectile(Game.player.x,Game.player.y,"up",15,15,Game.player);
					Game.createFireProjectile(Game.player.x,Game.player.y,"down",15,15,Game.player);
					Game.createFireProjectile(Game.player.x,Game.player.y,"left",15,15,Game.player);
					Game.createFireProjectile(Game.player.x,Game.player.y,"right",15,15,Game.player);
				}else{
					Game.createFireProjectile(Game.player.x,Game.player.y,Game.player.facing,15,30,Game.player);
				}
				Game.player.Magic--;
				Sound.Woosh.restart();
				Sound.Woosh.play();
			}else{
				Game.Dialog.hide();
				Game.Dialog.setText("No Magic!",2);
			}
		}
	}
	if(inputData.keyCode == ROT.VK_U){
		//Swing sword
		Game.player.swingSword();
	}
	if(inputData.keyCode == ROT.VK_TAB){
		var input = Game.requestString("Enter a dev command");
		if(input == "noclip"){
			Game.player.noclip = true;
		}
		if(input == "god"){
			Game.player.healthRoof = Infinity;
			Game.player.health = Infinity;
			Game.player.expRoof = Infinity;
		}
		if(input == "oof 101"){
			Game.player.magicRoof = Infinity;
			Game.player.Magic = Infinity;
			Game.player.addToInventory(Game.Items.equipment.magic.fire);
			Game.Dialog.setText("You now have badass skills",1);
		}
		if(input == "help"){
			alert("god,noclip,oof 101,map,help,eval");
		}
		if(input == "map"){
			var input2 = Game.requestString("enter the generator; put \"none\" for no generator","none");
			if(input2 == null){
				input2 = "none";
			}
			var input3 = Game.requestString("enter the map");
			try{
				if(input2 == "none"){
					Game.Level.loadLevel(input3);
				}else{
					Game.Level[input2].loadLevel(input3);
				}
			}catch(err){
				Game.Dialog.setText(err,1);
			}
		}
		if(input == "eval"){
			var input2 = Game.requestString("Enter code to be executed","Game.Dialog.setText('hello world!',1)");
			try{
				eval(input2);
			}catch(err){
				Game.Dialog.setText(err,1);
			}
		}
	}
		if(inputData.keyCode === BIND.SHOOT_ICE){
			if(Game.player.hasIce){
				if(Game.player.hasMagic()){
					if(Game.player.level > 5){
						Game.createProjectile(Game.player.x,Game.player.y,"up",0,20,Game.player,"snowball.png");
						Game.createProjectile(Game.player.x,Game.player.y,"down",0,20,Game.player,"snowball.png");
						Game.createProjectile(Game.player.x,Game.player.y,"left",0,20,Game.player,"snowball.png");
						Game.createProjectile(Game.player.x,Game.player.y,"right",0,20,Game.player,"snowball.png");
					}else{
						Game.createProjectile(Game.player.x,Game.player.y,Game.player.facing,15,40,Game.player,"snowball.png");
					}
					Game.player.Magic--;
					Sound.Woosh.restart();
					Sound.Woosh.play();
				}else{
					Game.Dialog.hide();
					Game.Dialog.setText("No Magic!",2);
				}
			}
		}
	if(inputData.keyCode === BIND.SHOOT_THUNDER){
		if(Game.player.hasThunder){
			if(Game.player.hasMagic()){
					if(Game.player.level > 5){
						Game.createProjectile(Game.player.x,Game.player.y,"up",15,30,Game.player,"pearl_01e.png");
						Game.createProjectile(Game.player.x,Game.player.y,"down",15,30,Game.player,"pearl_01e.png");
						Game.createProjectile(Game.player.x,Game.player.y,"left",15,30,Game.player,"pearl_01e.png");
						Game.createProjectile(Game.player.x,Game.player.y,"right",15,30,Game.player,"pearl_01e.png");
					}else{
						Game.createProjectile(Game.player.x,Game.player.y,Game.player.facing,15,60,Game.player,"New_Piskel_2.png");
					}
					Game.player.Magic--;
					Sound.Woosh.restart();
					Sound.Woosh.play();
				}else{
					Game.Dialog.hide();
					Game.Dialog.setText("No Magic!",2);
				}
		}
	}
	if(inputData.keyCode === BIND.LIFE){
		if(Game.player.hasLife()){
			if(Game.player.hasMagic()){
				Game.player.health += 1;
				Game.player.Magic--;
				Sound.Woosh.play();
			}else{
				Game.Dialog.hide();
				Game.Dialog.setText("No Magic!",2);
			}
		}
	}
	//Picking up Items
	if(inputData.keyCode === BIND.USE){
		if(Game.onDroppedItem() && Game.getDroppedItemObj().isHidden != true){
			Sound.inter.play();
			Game.player.pickUpItem();
			Game.Dialog.hide();
		}
	}
	//Inventory
	if(inputData.keyCode === BIND.INVENTORY){
		Game.Dialog.hide();
		if(!Game.isSliding){
			if(Game.getCurrentSubMenu.current == "none"){
				Sound.inter.play();
				Game.pause = true;
				Game.openInventory();
			}else{
				Game.pause = false;
				Game.closeInventory();
			}	
		}
	}
	//Opening chests
	if(inputData.keyCode === BIND.CHEST){
		Game.Dialog.hide();
		if(Game.getCurrentSubMenu.current == "none"){
			//Sound.Select.play();
			if(Game.chestCheck()){
				
				Sound.inter.play();
				Game.pause = true;
				Game.openChest(Game.getChest(Game.player.x,Game.player.y));
			}
		}else if(Game.getCurrentSubMenu.current == "chest"){
			Game.pause = false;
			Game.closeChest();
		}
	}
	if(inputData.keyCode === BIND.EXIT_TO_MENU){
		if(Game.getCurrentSubMenu.current == "none"){
			Sound.inter.play();
			Game.Level.loadLevel("main_menu");
		}
	}
	if(inputData.keyCode === BIND.SAVE){
		Sound.inter.play();
		Game.saveGame(1);
		Game.Dialog.hide();
		Game.Dialog.setText("Saved Game!",3);
	}
	if(Game.getCurrentSubMenu.current == "inventory"){
		if(inputData.shiftKey){
			if(inputData.keyCode === ROT.VK_1){
				Game.player.dropItem(Game.player.getItem(1),1);
			}
			if(inputData.keyCode === ROT.VK_2){
				Game.player.dropItem(Game.player.getItem(2),2);
			}
			if(inputData.keyCode === ROT.VK_3){
				Game.player.dropItem(Game.player.getItem(3),3);
			}
			if(inputData.keyCode === ROT.VK_4){
				Game.player.dropItem(Game.player.getItem(4),4);
			}
			if(inputData.keyCode === ROT.VK_5){
				Game.player.dropItem(Game.player.getItem(5),5);
			}
			if(inputData.keyCode === ROT.VK_6){
				Game.player.dropItem(Game.player.getItem(6),6);
			}
			if(inputData.keyCode === ROT.VK_7){
				Game.player.dropItem(Game.player.getItem(7),7);
			}
			if(inputData.keyCode === ROT.VK_8){
				Game.player.dropItem(Game.player.getItem(8),8);
			}
			if(inputData.keyCode === ROT.VK_9){
				Game.player.dropItem(Game.player.getItem(9),9);
			}
			if(inputData.keyCode === ROT.VK_0){
				Game.player.dropItem(Game.player.getItem(10),10);
			}
		}
	
	
	try{
		if(inputData.keyCode === ROT.VK_1){
			if(Game.checkInventory(1) != null){
				Game.player.useItem(1);
			}
		}
		if(inputData.keyCode === ROT.VK_2){
			if(Game.checkInventory(2) != null){
				Game.player.useItem(2);
			}
		}
		if(inputData.keyCode === ROT.VK_3){
			if(Game.checkInventory(3) != null){
				Game.player.useItem(3);
			}
		}
		if(inputData.keyCode === ROT.VK_4){
			if(Game.checkInventory(4) != null){
				Game.player.useItem(4);
			}
		}
		if(inputData.keyCode === ROT.VK_5){
			if(Game.checkInventory(5) != null){
				Game.player.useItem(5);
			}
		}
		if(inputData.keyCode === ROT.VK_6){
			if(Game.checkInventory(6) != null){
				Game.player.useItem(6);
			}
		}
		if(inputData.keyCode === ROT.VK_7){
			if(Game.checkInventory(7) != null){
				Game.player.useItem(7);
			}
		}
		if(inputData.keyCode === ROT.VK_8){
			if(Game.checkInventory(8) != null){
				Game.player.useItem(8);
			}
		}
		if(inputData.keyCode === ROT.VK_9){
			if(Game.checkInventory(9) != null){
				Game.player.useItem(9);
			}
		}
		if(inputData.keyCode === ROT.VK_0){
			if(Game.checkInventory(10) != null){
				Game.player.useItem(10);
			}
		}
	}catch(err){}
	}
	
}
	//END
}


/*
* Moves the player in different directions
* @param {string} dir - the direction to move "up" "down" "left" "right"
*/
function move(dir){
	Game.Dialog.hide();
	Game.HTML.closeDialog("shop_dialog");
	Game.oof = true;
	//If game isnt paused and if the player Can even move
	if(!Game.pause && Game.player.canMove && Game.isValidDirection(dir)){
		//Move the player
		if(Game.player.isDrunk){
			//If the player is drunk move them in a random direction
			dir = Game.getRandom({right:"right",left:"left",up:"up",down:"down"});
			if(Game.player.sprint){
				Game.player.move(dir,Game.gridSize);
				//Game.player.move(dir,Game.gridSize);
			}else{
				Game.player.move(dir,Game.gridSize);
			}
		}else{
			if(Game.player.sprint){
				Game.player.move(dir,Game.gridSize);
				//Game.player.move(dir,Game.gridSize);
			}else{
				Game.player.move(dir,Game.gridSize);
			}
		}
		//Wall collisions
		if(Game.player.wallCheck()){
			Game.player.move(Game.dirOpposite(dir));
		}
		//Entity collisions
		if(Game.Entities.checkHit(Game.player)){
			Game.Dialog.combat();
			var other = Game.Entities.getEntity(Game.getPlayerX(),Game.getPlayerY());
			Game.player.dealDamage(other);
			Game.player.move(Game.dirOpposite(dir),Game.gridSize);	
		}
		//NPC collisions
		if(Game.Entities.NPC.checkHit(Game.player)){
			var other = Game.Entities.getNPC(Game.getPlayerX(),Game.getPlayerY());
			if(other.isShop){
				other.openShop();
			}else{
				other.read();
			}
			Game.player.move(Game.dirOpposite(dir),Game.gridSize);
		}
		//Makes torches and the player generate light
		Game.Light.render();
		//Set the players facing direction
		Game.player.facing = dir;
		//For swords
		Game.player.swordObject.isHidden = true;
		Game.player.swordObject.x = 100000;
		//Push a pushable if one exists
		Game.pushPushable(Game.player);
		//Slipperiea
		//Add a game.getgoodframe that looks at lag and returns a good int
		if(Game.getSlippery(Game.player.x,Game.player.y) != null){
			//Move to the next tile and check if its a slippery
			Game.player.move(dir);
			//Check
			if(Game.getSlippery(Game.player.x,Game.player.y) != null){
				//If the next tile is a slippery
				//Move back and do the move
				Game.player.move(Game.dirOpposite(dir));
				//Delay the movement so you can see the player slide
				Game.player.canMove = false;
				Game.isSliding = true;
				Thread.sleep(100,"Game.player.canMove = true;move(\"" + dir + "\");");
				//Game.Console.sendMessage(Game.player.canMove + " In first if");
			}
			if(Game.player.wallCheck()){
				//If the next tile is a wall
				Game.player.move(Game.dirOpposite(dir));
				Game.player.canMove = true;
				Game.isSliding = false;
				//Game.Console.sendMessage(Game.player.canMove + " in wallcheck");
			}
		}else if(Game.getSlippery(Game.player.x,Game.player.y) == null){
			//If the tile isnt a slippery
			Game.isSliding = false;
		}
		
	}else{
		//If game Is paused or player cannot move
		
	}
}

/*
* Moves another gameobject across the screen
* @param {object} other - the other gameobject
* @param {string} dir - direction to move same as move()
*/
function moveOther(other,dir){
	if(other.canMove){
		if(dir=="left"){
			other.x -= 20;
		
		}else if(dir=="right"){
			other.x += 20;
		
		}else if(dir=="down"){
			other.y += 20;
		
		}else if(dir=="up"){
			other.y -= 20;
		}
		other.facing = dir;
	}
}


/**
 *
 * Detects the input from a keyboard using ROT.MIN.JS
 * no need to call this, it automatically is called on a key event
 */
Game.handleInput = function(inputType, inputData){
	if(!Game.isInMenu && !Game.isInControls && !Game.isInClass){
		Game.Controller.inGame(inputData);
	}
	if(Game.getCurrentSubMenu.current == "chest"){
		var chest = Game.getChest(Game.player.x,Game.player.y);
		if(inputData.keyCode === ROT.VK_1){
			var chestContent = chest.getContents(1);
			if(chestContent != null){
				if(Game.player.addToInventory(chestContent,true)){
					chest.removeContents(1);
				}else{
					Game.Dialog.hide();
					Game.Dialog.setText("You dont have room in your bag for this!",2,null,"Impact");
					Game.Dialog.setText("TIP: you can drop items by pressing: [SHIFT] + [itemslot] in your inventory!",3,null,"Impact");
				}
			}
		}
		if(inputData.keyCode === ROT.VK_2){
			var chest = Game.getChest(Game.player.x,Game.player.y);
			var chestContent = chest.getContents(2);
			if(chestContent != null){
				if(Game.player.addToInventory(chestContent,true)){
					chest.removeContents(2);
				}else{
					Game.Dialog.hide();
					Game.Dialog.setText("You dont have room in your bag for this!",2,null,"Impact");
					Game.Dialog.setText("TIP: you can drop items by pressing: [SHIFT] + [itemslot] in your inventory!",3,null,"Impact");
				}
			}
		}
		if(inputData.keyCode === ROT.VK_3){
			var chest = Game.getChest(Game.player.x,Game.player.y);
			var chestContent = chest.getContents(3);
			if(chestContent != null){
				if(Game.player.addToInventory(chestContent,true)){
					chest.removeContents(3);
				}else{
					Game.Dialog.hide();
					Game.Dialog.setText("You dont have room in your bag for this!",2,null,"Impact");
					Game.Dialog.setText("TIP: you can drop items by pressing: [SHIFT] + [itemslot] in your inventory!",3,null,"Impact");
				}
			}
		}
		if(inputData.keyCode === ROT.VK_4){
			var chest = Game.getChest(Game.player.x,Game.player.y);
			var chestContent = chest.getContents(4);
			if(chestContent != null){
				if(Game.player.addToInventory(chestContent,true)){
					chest.removeContents(4);
				}else{
					Game.Dialog.hide();
					Game.Dialog.setText("You dont have room in your bag for this!",2,null,"Impact");
					Game.Dialog.setText("TIP: you can drop items by pressing: [SHIFT] + [itemslot] in your inventory!",3,null,"Impact");
				}
			}
		}
	}
}
