//All items
Game.Items = {};
Game.Items.equipment = {};
Game.Items.equipment.helmet = {};
Game.Items.equipment.rings = {};
Game.Items.equipment.shields = {};
Game.Items.equipment.weapons = {};
Game.Items.equipment.magic = {};
Game.Items.common = {};
Game.Items.Admin = {};
Game.Items.uncommon = {};
Game.Items.rare = {};
Game.Items.legendary = {};
Game.Items.FirstDungeon = {};
Game.Items.Shop = {};
Game.Items.Generic = {};

Game.getRandomItem = function(){
    var keys = Object.keys(Game.Items.common);
	var copy = Game.CopyItem(Game.Items.common[keys[ keys.length * Math.random() << 0]]);
    return copy;
}
/**
* Converts the players inventory array into a string
**/
Game.inventoryToString = function(){
	var x = Game.player.inventory;
	var value = "[";
	for(var i = 0; i < x.length; i++){
		if(i == 0){
			value = value + "Game.CopyItem(Game.Items." + x[i].trueName + ")";
		}else{
			 value = value + ",Game.CopyItem(Game.Items." + x[i].trueName + ")";
		}
	}
	value = value + "]";
	return value;
}
Game.getRandomLegendaryItem = function(){
    var keys = Object.keys(Game.Items.common);
	var copy = Game.CopyItem(Game.Items.common[keys[ keys.length * Math.random() << 0]]);
    return copy;
}
Game.CopyItem = function(item){
  let objCopy = {};
  let key;
  for (key in item) {
    objCopy[key] = item[key];
  }
  return objCopy;
}
/**
* Gets all the items and loads them into memory
**/
Game.getAllItems = function(){
	var array = Game.convertObjecttoArray(Game.File.getAllFilesInPath(Game.File.getItemPath()));
	for(var i = 0; i < array.length;i++){
		try{
			var file = Game.File.getItemPath() + array[i];
			var readFile = Game.File.ReadFile(file);
			eval(readFile);
		}catch(err){
			//If the file in the folder isnt in correct syntax
			Game.Console.sendMessage("Item Error in " + array[i] + ".ict " + err);
		}
	}
}
Game.getAllItems();

Game.exportItem = function(item,filename,returnvalue){
	//Convert the item tostring
	//Convert name
	var d = new Date();
	var NEWITEM = "var item" + d.getTime() + " = new Game.createItem();\n";
	NEWITEM = NEWITEM + "item" + d.getTime() + ".name = \"" + item.name + "\";\n";
	//Convert trueName
	NEWITEM = NEWITEM + "item" + d.getTime() + ".trueName = \"item" + d.getTime() + "\";\n";
	//Convert use
	NEWITEM = NEWITEM + "item" + d.getTime() + ".use = " + item.use.toString() + ";\n";
	//Convert description
	NEWITEM = NEWITEM + "item" + d.getTime() + ".description = \"" + item.description + "\";\n";
	//Convert onpickup
	NEWITEM = NEWITEM + "item" + d.getTime() + ".onPickup = " + item.onPickup.toString() + ";\n";
	//Convert icon
	NEWITEM = NEWITEM + "item" + d.getTime() + ".icon = \"" + item.icon + "\"\n";
	if(returnvalue){
		return NEWITEM;
	}else{
		Game.File.Create(Game.File.getItemPath() + filename + ".ick",NEWITEM);
	}
}


//A much easier way to create Items
//declare a new item as this
// Game.Items.common.example = new Game.createItem("example","example","exampledescription",function(){});
// when run through typeof it will return "object"
Game.createItem = function(name,trueName,description,use,onpickup,icon){
	this.name = name;
	this.trueName = name;
	this.description = description;
	this.use = use;
	this.pu = onpickup
	this.icon = icon;
	var Item = {
		name : this.name,
		trueName : this.trueName,
		description : this.description,
		use : this.use,
		onPickup : this.pu,
		icon : this.icon
	};
	return Item;
}

/*
//Example on how to use Game.createItem to define a new Item
Game.Items.common.bow = new Game.createItem();
Game.Items.common.bow.name = "bow";
Game.Items.common.bow.trueName = "bow";
Game.Items.common.bow.attack = 15;
Game.Items.common.bow.isBroken = false;
Game.Items.common.bow.ammo = "arrow";
Game.Items.common.bow.rarity = 2;
Game.Items.common.bow.isConsumable = false;
Game.Items.common.bow.description = "A curvy bow made from oak wood and high quality string.";
Game.Items.common.bow.use = function(){
	//Code
};
Game.Items.common.bow.equipt = function(){
	//Code
};
*/
