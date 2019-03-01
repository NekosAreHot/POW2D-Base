/**
* Runs every 20 miliseconds
*
**/
Game.updateGameArea = function() {
	if(Game.Level.isInOverworld){
		Game.Level.depth = 0;
	}
	if(!Game.isInMenu && !Game.isInControls && !Game.isInClass && !Game.isInIntroSequence1  && !Game.isInIntroSequence2  && !Game.isInIntroSequence3  && !Game.isInIntroSequence4 && !Game.isInGameOver){
		
		if(Game.onDroppedItem() && Game.oof && Game.getDroppedItemObj().isHidden != true){
			Game.oof = false;
			Game.Dialog.displayItemStats(Game.getDroppedItem());
		}
		
		
		if(Game.chestCheck() && Game.oof){
			Game.oof = false;
			Game.Dialog.displayChestText();
			Game.Dialog.NpcPic.setImage("chest_texture.png");
		}
		
		
		for (i = 0; i < Game.Dangers.length; i += 1) {
			if (Game.player.crashWith(Game.Dangers[i])) {
				moveOther(Game.Dangers[i],"up");
				Game.pause = true;
				Game.Text.text = "You Failed! press any key to restart";
				Game.Text.update();
				Game.Died = true;
				return;
			} 
		}
		for (i = 0; i < Game.triggers.length; i += 1) {
			if (Game.player.crashWith(Game.triggers[i])) {
				Game.triggers[i].triggerFunction();
			} 
		}
		
		if(!Game.pause){
			Game.myGameArea.clear();
			Game.Background.update();
			
			for(var i = 0; i < Game.Backgrounds.length; i += 1){
				Game.Backgrounds[i].update();
			}
			
			for (i = 0; i < Game.GameObjects.length; i += 1) {
				Game.GameObjects[i].update();
			}
			
			for (i = 0; i < Game.Dangers.length; i += 1){
				Game.DangerTick(Game.Dangers[i]);
				Game.Dangers[i].update();
			}
			
			for(var i = 0; i < Game.triggers.length; i += 1){
				Game.triggers[i].update();
			}
			
			for(var i = 0; i < Game.chests.length; i += 1){
				Game.chests[i].update();
			}
			
			for(var i = 0; i < Game.Entities.inGame.length; i += 1){
				Game.Entities.inGame[i].update();
			}
			
			for(var i = 0; i < Game.Entities.NPC.inGame.length; i += 1){
				Game.Entities.NPC.inGame[i].update();
			}
			
			for(var i = 0; i < Game.projectiles.length; i += 1){
				if(!Game.projectiles[i].isHidden && Game.projectiles[i] != null){
					Game.projectiles[i].arrowTick();
				}
			}
			
			for(var i = 0; i < Game.light.length; i += 1){
				Game.light[i].update();
			}
			/*
			if(Game.howManyArrowsHaveCollidedWithTheWall >= Game.projectiles.length){
				Game.projectiles = [];
				Game.howManyArrowsHaveCollidedWithTheWall = 0;
			}
			*/
			Game.player.update();
			//If the fog is thick and regenerates
			if(Game.Level.Settings.thickFog){
				Game.Light.thickFog();
			}
			if(Game.player.swordObject != null){
				Game.player.swordObject.update();
			}
			for(var i = 0; i < Game.Foregrounds.length; i += 1){
				Game.Foregrounds[i].update();
			}
			
			Game.player.manageCheat();
			
			//Standard texts
			Game.Texts[0].text = "Health: (" + Game.player.health + " / " + Game.player.healthRoof + ")";
			Game.Texts[1].text = "EXP: " + Game.player.exp + "/" + Game.player.expRoof;
			Game.Texts[2].text = "Gold: " + Game.player.gold;
			Game.Texts[3].text = "Magic: (" + Game.player.Magic + " / " + Game.player.magicRoof + ")";
			Game.Texts[4].text = "LV: " + Game.player.level+ " Attack: " + Game.player.damagePerHit;
			Game.Texts[5].text = "Name: " + Game.PlayerName;
			Game.Texts[8].text = "Arrows: " + Game.player.arrows;
			Game.HealthSpace.update();
			Game.ExpSpace.update();
			Game.GoldSpace.update();
			Game.MagicSpace.update();
			
			
			
			if(Game.Level.inBossFight){
				Game.Texts[6].text = "--BOSS--";
				Game.Texts[7].text = "(" + Game.Entities.inGame[0].health + "/" + Game.Entities.inGame[0].healthRoof + ")";
			}else{
				Game.Texts[6].text = " ";
				Game.Texts[7].text = " ";
			}
			for(var i = 0; i < Game.Texts.length; i += 1){
				Game.Texts[i].update();
			}
			Game.Player.inventoryRefresh();
			Game.Light.render();
		}
	}
	
	
	
	Game.Dialog.update();

	if(Game.getCurrentSubMenu.current == "inventory"){
			for(var i = 0; i < Game.Backgrounds.length; i += 1){
				Game.Backgrounds[i].update();
			}
			
			for (i = 0; i < Game.GameObjects.length; i += 1) {
				Game.GameObjects[i].update();
			}
			
			for (i = 0; i < Game.Dangers.length; i += 1){
				Game.DangerTick(Game.Dangers[i]);
				Game.Dangers[i].update();
			}
			
			for(var i = 0; i < Game.triggers.length; i += 1){
				Game.triggers[i].update();
			}
			
			for(var i = 0; i < Game.chests.length; i += 1){
				Game.chests[i].update();
			}
			
			for(var i = 0; i < Game.Entities.inGame.length; i += 1){
				Game.Entities.inGame[i].update();
			}
			
			for(var i = 0; i < Game.Entities.NPC.inGame.length; i += 1){
				Game.Entities.NPC.inGame[i].update();
			}
			for(var i = 0; i < Game.light.length; i += 1){
				Game.light[i].update();
			}
			for(var i = 0; i < Game.projectiles.length; i += 1){
				Game.projectiles[i].update();
			}
			Game.player.update();
			if(Game.player.swordObject != null){
				Game.player.swordObject.update();
			}
			for(var i = 0; i < Game.Foregrounds.length; i += 1){
				Game.Foregrounds[i].update();
			}
				Game.inventoryMenu.inside.update();
				Game.inventoryMenu.outside.update();
				Game.Dialog.update();
				var temp = Game.inventoryText;
				var temp2 = Game.inventoryMenu;
				temp.line1.text = "[1]: " + Game.checkInventory(1);
				temp2.icon1.setImage(Game.getInventoryItem(1).icon);
				temp.line2.text = "[2]: " + Game.checkInventory(2);
				temp2.icon2.setImage(Game.getInventoryItem(2).icon);
				temp.line3.text = "[3]: " + Game.checkInventory(3);
				temp2.icon3.setImage(Game.getInventoryItem(3).icon);
				temp.line4.text = "[4]: " + Game.checkInventory(4);
				temp2.icon4.setImage(Game.getInventoryItem(4).icon);
				temp.line5.text = "[5]: " + Game.checkInventory(5);
				temp2.icon5.setImage(Game.getInventoryItem(5).icon);
				temp.line6.text = "[6]: " + Game.checkInventory(6);
				temp2.icon6.setImage(Game.getInventoryItem(6).icon);
				temp.line7.text = "[7]: " + Game.checkInventory(7);
				temp2.icon7.setImage(Game.getInventoryItem(7).icon);
				temp.line8.text = "[8]: " + Game.checkInventory(8);
				temp2.icon8.setImage(Game.getInventoryItem(8).icon);
				temp.line9.text = "[9]: " + Game.checkInventory(9);
				temp2.icon9.setImage(Game.getInventoryItem(9).icon);
				temp.line10.text = "[10]: " + Game.checkInventory(10);
				temp2.icon10.setImage(Game.getInventoryItem(10).icon);
				Game.inventoryText.line11.text = "Press the specified number";
				temp2.icon1.update();
				temp2.icon2.update();
				temp2.icon3.update();
				temp2.icon4.update();
				temp2.icon5.update();
				temp2.icon6.update();
				temp2.icon7.update();
				temp2.icon8.update();
				temp2.icon9.update();
				temp2.icon10.update();
				Game.inventoryText.line1.update();
				Game.inventoryText.line2.update();
				Game.inventoryText.line3.update();
				Game.inventoryText.line4.update();
				Game.inventoryText.line5.update();
				Game.inventoryText.line6.update();
				Game.inventoryText.line7.update();
				Game.inventoryText.line8.update();
				Game.inventoryText.line9.update();
				Game.inventoryText.line10.update();
				Game.inventoryText.line11.update();
	}
	//Make Item icons
	if(Game.getCurrentSubMenu.current == "chest"){
		
			for(var i = 0; i < Game.Backgrounds.length; i += 1){
				Game.Backgrounds[i].update();
			}
			
			for (i = 0; i < Game.GameObjects.length; i += 1) {
				Game.GameObjects[i].update();
			}
			
			for (i = 0; i < Game.Dangers.length; i += 1){
				Game.DangerTick(Game.Dangers[i]);
				Game.Dangers[i].update();
			}
			
			for(var i = 0; i < Game.triggers.length; i += 1){
				Game.triggers[i].update();
			}
			
			for(var i = 0; i < Game.chests.length; i += 1){
				Game.chests[i].update();
			}
			
			for(var i = 0; i < Game.Entities.inGame.length; i += 1){
				Game.Entities.inGame[i].update();
			}
			
			for(var i = 0; i < Game.Entities.NPC.inGame.length; i += 1){
				Game.Entities.NPC.inGame[i].update();
			}
			for(var i = 0; i < Game.light.length; i += 1){
				Game.light[i].update();
			}
			for(var i = 0; i < Game.projectiles.length; i += 1){
				Game.projectiles[i].update();
			}
				Game.player.update();
			if(Game.player.swordObject != null){
				Game.player.swordObject.update();
			}
			for(var i = 0; i < Game.Foregrounds.length; i += 1){
				Game.Foregrounds[i].update();
			}
				Game.inventoryMenu.inside.update();
				Game.inventoryMenu.outside.update();
				Game.Dialog.update();
				var temp = Game.inventoryText;
				var temp2 = Game.inventoryMenu;
				temp.line1.text = "Chest: ";
				temp.line2.text = "[1]: " + Game.checkChest(1);
				temp2.icon1.setImage(Game.getChestItem(1).icon);
				temp.line3.text = "[2]: " + Game.checkChest(2);
				temp2.icon2.setImage(Game.getChestItem(2).icon);
				temp.line4.text = "[3]: " + Game.checkChest(3);
				temp2.icon3.setImage(Game.getChestItem(3).icon);
				temp.line5.text = "[4]: " + Game.checkChest(4);
				temp2.icon4.setImage(Game.getChestItem(4).icon);
				temp2.icon1.update();
				temp2.icon2.update();
				temp2.icon3.update();
				temp2.icon4.update();
				Game.inventoryText.line1.update();
				Game.inventoryText.line2.update();
				Game.inventoryText.line3.update();
				Game.inventoryText.line4.update();
				Game.inventoryText.line5.update();
	}
	if(Game.isInIntroSequence1){
		
		
		Game.IntBack1.update();
		
	}
	
	 if(Game.isInIntroSequence2){
		
		
		Game.IntBack2.update();
		
	}
	 if(Game.isInIntroSequence3){
		
		
		Game.IntBack3.update();
		
	}
	 if(Game.isInIntroSequence4){
		
		
		Game.IntBack4.update();
		
	}
	if(Game.isInGameOver) {
		
		Game.GOBackground.update();
	}
	
	if(Game.isInMenu){
		//if(Sound.theme.getCurrentTime() == 24.0588){
		//	Sound.theme.restart();
		//	Sound.theme.play();
		//}
		if(!(Game.HTML.getElement("menu_dialog").style.open != null)){
			Game.HTML.openDialog("menu_dialog");
		}
		for(var i = 0; i < Game.Backgrounds.length; i += 1){
			Game.Backgrounds[i].update();
		}
			
		for (i = 0; i < Game.GameObjects.length; i += 1) {
			Game.GameObjects[i].update();
		}
	}
	if(Game.isInMenu){
		//Display the main menu
		//Game.Background.update();
	}
}

Game.DangerTick = function(dangerObject){
	var x = dangerObject.x;
	var y = dangerObject.y;
	if(y >= 500){
		dangerObject.y = 0;
	}else{
		moveOther(dangerObject,"down");
	}
	
}
var seconds = 0;
var coldowndowndown = 0;
Game.GameTick = function(){
	//THIS IS RAN EVERY 1 SECOND
	seconds++;
	//Game.Console.sendMessage(seconds + " Seconds has passed since game started");
	if(!Game.isInMenu && !Game.pause && !Game.isInClass){
		//Runs every 1 second if in game and not paused
		Game.AI.think();
	}
	
	if(coldowndowndown >= 5){
		Game.player.Magic++;
		coldowndowndown = 0;
	}else{
		coldowndowndown++;
	}
}
//For mods, called every  nanoseconds
Game.modTick = function(){
	
}

Game.AnimationTick = function(){
	//Animation tick
	for(var i = 0; i < Game.Animations.inGame.length; i++){
		Game.Animations.inGame[i].animate();
	}
	//Drunkify the player if their drunk
	//if(Game.player.isDrunk){
	//	move("up");
	//}
	//Make traps shoot their fireballs
	for(var i = 0; i < Game.traps.length; i++){
		//Game.traps[i].update();
		Game.traps[i].shoot();
	}
}