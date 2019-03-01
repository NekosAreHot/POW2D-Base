Game.HTML = {};
Game.HTML.hideElement = function(id){
	var get = document.getElementById(id);
	get.style.visibility = "hidden";
}
Game.HTML.showElement = function(id){
	var get = document.getElementById(id);
	get.style.visibility = "visible";
}
Game.HTML.openDialog = function(id){
	var get = document.getElementById(id);
	if(get.open){
		get.open = null;
	}
	get.showModal();
}
Game.HTML.closeDialog = function(id){
	var get = document.getElementById(id);
	get.close();
}

Game.shop_items = [];
Game.shop_prices = [];

Game.buyShop = function(num){
	Game.Dialog.hide();
	if(Game.player.gold >= Game.shop_prices[num]){
		if(!(Game.player.inventory.length >= Game.player.maxInventorySize)){
			//If the player has the gold to buy an item
			Sound.Shop.play();
			Game.player.addToInventory(Game.CopyItem(Game.shop_items[num]));
			Game.Dialog.setText("You bought " + Game.shop_items[num].name,4);
			Game.player.gold = Game.player.gold - Game.shop_prices[num];
		}else{
			//If the players inventory is full
			Game.Dialog.setText("Your inventory is full!",4);
		}
	}else{
		if(Game.shop_items[num] != null){
			//IF the player doesnt have the gold
			Game.Dialog.setText("You do not have enough gold!",4);
		}
	}
}



Game.HTML.createButton = function(){
	return document.createElement("button");
}
Game.HTML.getElement = function(id){
	return document.getElementById(id);
}
Game.HTML.dialogs = [];
Game.HTML.dialogs.push(document.getElementById("select_class"));
Game.HTML.dialogs.push(document.getElementById("menu_dialog"));

Game.HTML.createDialog = function(id,numberofbuttons,buttontexts,onclicks){
	var obj = document.createElement("DIALOG");
	obj.id = id;
	for(var i = 0; i < numberofbuttons; i ++){
		//Create a button obj
		var newButton = Game.HTML.createButton();
		newButton.innerHTML = buttontexts[i];
		newButton.onclick = onclicks[i];
		//Add the button
		obj.appendChild(newButton);
		//Separate the buttons by one line
		var brk = document.createElement("br");
		var brk2 = document.createElement("br");
		obj.appendChild(brk);
		obj.appendChild(brk2);
	}
	//Add it to the body
	document.body.appendChild(obj);
	//Add it to the dialogs list
	Game.HTML.dialogs.push(obj);
}

Game.HTML.showClassScreen = function(){
	Sound.Select.play();
	Game.PlayerName = Game.requestString("What is your name?");
	Game.HTML.openDialog("select_class");
	//Game.HTML.closeDialog("menu_dialog");
}

Game.HTML.showSettings = function(){
	Sound.Select.play();
	Game.HTML.openDialog("settings_dialog");
	document.getElementById('user').innerHTML = os.userInfo().username + ' - ' + os.platform();
	document.getElementById('user2').innerHTML = os.cpus()[0].model;
}
Game.HTML.closeSettings = function(){
	Sound.Select.play();
	if(Game.isInMenu){
		Game.HTML.openDialog("menu_dialog");
	}
	Game.HTML.closeDialog("settings_dialog");
}

Game.HTML.showControls = function(){
		Sound.Select.play();
	Game.HTML.openDialog("controls_dialog");
	//Game.HTML.closeDialog("menu_dialog");
}

Game.HTML.closeControls = function(){
		Sound.Select.play();
	if(Game.isInMenu){
		Game.HTML.openDialog("menu_dialog");
	}
	Game.HTML.closeDialog("controls_dialog");
}

Game.HTML.openInventory = function(){
	
	Game.HTML.openDialog("inventory_dialog");
}

Game.HTML.loadSave = function(){
	Sound.Select.play();
	Sound.theme.stop();
	Game.myGameArea.clear();
	if(Save != null){
		Save.sav1.load();
		Game.isInMenu = false;
		Game.HTML.closeDialog("menu_dialog");
	}else{
		alert("No Save File!");
	}
	Game.openInventory();
	Game.closeInventory();
}

Game.HTML.startGame = function(){
	Sound.Select.play();
	Game.isInMenu = false;
	Game.myGameArea.clear();
	//if(Save != null){
	//	Save.sav1.load()
	//}else{
		Game.Level.loadLevel("StartVillage");
	//}
	Game.openInventory();
	Game.closeInventory();
	Game.HTML.closeDialog("menu_dialog");
	//Game.Level.currentType.map = "None";
}

Game.HTML.startMage = function(){
	Sound.Select.play();
	Game.isInMenu = false;
	Game.HTML.closeDialog("menu_dialog");
	Game.myGameArea.clear();
	Game.HTML.closeDialog("select_class");
	Game.isHunter = false;
	Game.isMage = true;
	Game.isKnight = false;
	Game.player.setImage("cd_mage.png");
	Game.player.health = 35;
	Game.player.Magic = 30;
	Game.player.addToInventory(Game.Items.equipment.magic.fire);
	Game.player.equipt(1);
	Game.player.equipt(1);
	Sound.theme.stop();
	//Game.Level.currentType.map = "None";
	Game.Level.loadLevel("StartVillage");
	Game.openInventory();
	Game.closeInventory();
}

Game.HTML.startArcher = function(){
	Sound.Select.play();
	Game.isInMenu = false;
	Game.HTML.closeDialog("menu_dialog");
	Sound.Select.play();
	Sound.theme.stop();
	Game.isMage = false;
	Game.isKnight = false;
	Game.isHunter = true;
	Game.player.setImage("bluearcher.png");
	Game.player.health = 40;
	Game.player.Magic = 0;
	Game.player.addToInventory(Game.Items.equipment.weapons.bow);
	Game.player.addToInventory(Game.Items.common.arrow);
	Game.player.addToInventory(Game.Items.common.arrow);
	Game.player.addToInventory(Game.Items.common.arrow);
	Game.player.addToInventory(Game.Items.common.arrow);
	Game.player.addToInventory(Game.Items.common.arrow);
	Game.player.equipt(1);
	Game.player.equipt(1);
	Game.player.equipt(2);
	Game.player.equipt(3);
	Game.player.equipt(4);
	Game.player.equipt(5);
	Game.player.equipt(6);
	Game.myGameArea.clear();
	Game.HTML.closeDialog("select_class");
	//Game.Level.currentType.map = "None";
	Game.openInventory();
	Game.closeInventory();
	Game.Level.loadLevel("StartVillage");
}
Game.HTML.startKnight = function(){
	Sound.Select.play();
	Game.isInMenu = false;
	Game.HTML.closeDialog("menu_dialog");
	Sound.Select.play();
	Sound.theme.stop();		
	Game.isMage = false;
	Game.isHunter = false;
	Game.isKnight = true;
	Game.myGameArea.clear();
	Game.HTML.closeDialog("select_class");
	Game.player.health = 30;
	Game.player.Magic = 0;
	Game.player.addToInventory(Game.Items.equipment.weapons.woodensword);
	Game.player.equipt(1);
	Game.player.equipt(1);
	Game.player.setImage("cd_knight.png");
	Game.Level.loadLevel("StartVillage");
}