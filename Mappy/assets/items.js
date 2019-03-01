Game.getRandomItem = function(){
    var keys = Object.keys(Game.Items.common);
	var copy = Game.CopyItem(Game.Items.common[keys[ keys.length * Math.random() << 0]]);
    return copy;
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
//A much easier way to create Items
//declare a new item as this
// Game.Items.common.example = new Game.createItem("example","example","exampledescription",function(){});
// when run through typeof it will return "object"
Game.createItem = function(name,trueName,description,use){
	this.name = name;
	this.trueName = name;
	this.description = description;
	this.use = use;
	var Item = {
		name : this.name,
		trueName : this.trueName,
		description : this.description,
		use : this.use
	};
	return Item;
}
//All items
Game.Items = {};

//Common Rarity items
Game.Items.common = {};
Game.Items.common.sword = {
	name : "sword",
	trueName : "sword",
	cooldown : 3,
	cooldown_1 : 0,
	attack : 10,
	isBroken : false,
	rarity : 1,
	isEquiptable : true,
	isEquipped : false,
	description : "A well made sword lays on the floor were your standing.",
	use : function(){
		this.equipt();
	},
	equipt : function(){
		if(this.cooldown > this.cooldown_1){
			this.cooldown_1++;
			if(this.isEquipped){
				this.name = "Click again to unequipt";
			}else{
				this.name = "Click again to equipt";
			}
			//if(this.cooldown == this.cooldown_1){
			//	this.equipt();
			//}
		}else{
			this.cooldown_1 = 0;
			if(this.isEquipped){
				this.isEquipped = false;
				this.name = "sword";
				Game.player.damagePerHit -= this.attack;
			}else{
				this.isEquipped = true;
				this.name = "sword [equipped]";
				Game.player.damagePerHit += this.attack;
			}
		}
		
	},
	unequipt : function(){
		this.isEquipped = false;
		this.name = "sword";
		Game.player.damagePerHit -= this.attack;
	}
}
Game.Items.common.note_start = {
	name : "Note",
	trueName : "Note",
	attack : 0,
	isBroken : false,
	rarity : 0,
	isConsumable : true,
	description : "Welcome to Dragon Dungeon 2!",
	use : function(){},
	equipt : function(){}
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
Game.Items.common.bow = {
	name : "bow",
	trueName : "bow",
	attack : 15,
	isBroken : false,
	ammo : "arrow",
	rarity : 2,
	isConsumable : true,
	description : "A curvy bow made from oak wood and high quality string.",
	use : function(){},
	equipt : function(){}
}
Game.Items.common.apple = {
	name : "apple",
	trueName : "apple",
	healing : 5,
	rarity : 0.2,
	isConsumable : true,
	description : "A big bright red apple.",
	use : function(){
		Game.player.health += 5;
	},
	equipt : function(){}
}
Game.Items.common.arrow = {
	name : "arrow",
	trueName : "arrow",
	rarity : 0.5,
	stack : 1,
	maxStack : 60,
	isConsumable : true,
	description : "A pointy ass arrow.",
	use : function(){},
	equipt : function(){}
}
Game.Items.common.gold = {
	name : "gold",
	trueName : "gold",
	rarity : 4,
	stack : 1,
	isConsumable : true,
	maxStack : 99,
	description : "A sparkling gold coin",
	use : function(){
		Game.player.score += 20;
	},
	equipt : function(){}
}
Game.Items.common.potion = {
	name : "health_potion",
	trueName : "Potion of healing",
	rarity : 2.5,
	stack : 1,
	healing: 20,
	isConsumable : true,
	maxStack : 4,
	description : "A bright green substance in a vial, it appears to revitalize.",
	use : function(){
		Game.player.health += 20;
	},
	equipt : function(){},
	unequipt : function(){}
}
Game.Items.common.silver = {
	name : "silver",
	trueName : "silver",
	rarity : 3,
	stack : 1,
	isConsumable : true,
	maxStack : 99,
	use : function(){
		Game.player.score += 15;
	},
	equipt : function(){},
	unequipt : function(){}
}
Game.Items.common.bronze = {
	name : "bronze",
	trueName : "bronze",
	rarity : 2.5,
	stack : 1,
	isConsumable : true,
	maxStack : 99,
	use : function(){
		Game.player.score += 10;
	},
	equipt : function(){},
	unequipt : function(){}
}

//All legendary items
Game.Items.legendary = {};
Game.Items.legendary.mythical_sword = {
	name : "Mythical Sword",
	trueName : "mythic_sword",
	description : "A glowing Mythical Sword is laying on the ground.",
	attack : 40,
	cooldown : 3,
	cooldown_1 : 0,
	isBroken : false,
	rarity : 150,
	isEquiptable : true,
	isEquipped : false,
	use : function(){
		this.equipt();
	},
	equipt : function(){
		if(this.cooldown > this.cooldown_1){
			this.cooldown_1++;
			if(this.isEquipped){
				this.name = "Click again to unequipt";
			}else{
				this.name = "Click again to equipt";
			}
			//if(this.cooldown == this.cooldown_1){
			//	this.equipt();
			//}
		}else{
			this.cooldown_1 = 0;
			if(this.isEquipped){
				this.isEquipped = false;
				this.name = "Mythical Sword";
				Game.player.damagePerHit -= this.attack;
			}else{
				this.isEquipped = true;
				this.name = "Mythical Sword [equipped]";
				Game.player.damagePerHit += this.attack;
			}
		}
		
	},
	unequipt : function(){
		this.isEquipped = false;
		this.name = "Mythical Sword";
		Game.player.damagePerHit -= this.attack;
	}
}

//All dungeon keys
Game.Items.keys = {};
Game.Items.keys.firstdungeon = {
	name : "Skeleton Key (forest dungeon)",
	trueName : "lvl1_key",
	description : "A old skeleton key for the first dungeon in the forest.",
	isConsumable : false,
	use : function(){
		//does nothing
	},
	equipt : function(){
		//cant equipt
	},
	unequipt : function(){
		//cant unequipt
	}
}