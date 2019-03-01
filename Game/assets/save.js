Game.saveGame = function(slot){
	var p = Game.player;
	var xp = p.exp;
	var r = p.expRoof;
	var pl = p.level;
	var gold = p.gold;
	var arrow = p.arrows;
	var i = p.inventory;
	var x = p.x;
	var y = p.y;
	var l = Game.Level.currentType.generator;
	var lx = Game.Level.currentType.exactMap;
	
	var formatted;
	if(l == "None"){
		formatted = "Game.Level.loadLevel(\"" + lx + "\");";		
	}else{
		formatted = "Game.Level[\"" + l + "\"].loadLevel(\"" + lx + "\");";
	}
	var s = Game.File.Create;
	s("C:/Users/Public/Documents/RisingLight/saves/slot" + slot + ".sav",
	"Save = {};\nSave.sav" + slot + " = {};\nSave.sav" + slot + ".load = function(){\nGame.player.inventory = " + Game.inventoryToString() + 
	";\n" + 
	formatted + 
	"\nGame.player.x = "
	+ x +
	";\nGame.player.baseDamagePerHit = " + Game.player.baseDamagePerHit +
	";\nGame.player.healthRoof = " + Game.player.healthRoof +
	";\nGame.player.damagePerHit = " + Game.player.damagePerHit +
	";\nGame.player.magicRoof = " + Game.player.magicRoof +
	";\nGame.player.level = " + Game.player.level +
	";\nGame.player.Magic = " + Game.player.Magic +
	";\nGame.player.quiver = " + Game.player.quiver +
	";\nGame.player.y = " + y + ";\nGame.player.exp = " + xp + 
	";\nGame.player.expRoof = " + r + 
	";\nGame.player.gold = " + gold + 
	"\nGame.player.arrows = " + arrow +
	"\nGame.player.health = " + p.health + 
	"\nGame.Level.hasBeatenGeneric = " + Game.Level.hasBeatenGeneric +
	"\nGame.Level.hasBeatenForest = " + Game.Level.hasBeatenForest + 
	"\nGame.player.setImage(\"" + Game.player.color + "\");" + 
	"\nGame.isHunter = " + Game.isHunter + 
	"\nGame.isMage = " + Game.isMage +
	"\nGame.isKnight = " + Game.isKnight +
	"\nGame.PlayerName = \"" + Game.PlayerName +  
	"\"\nGame.openInventory();\nGame.closeInventory();\nGame.Level.depth = " + Game.Level.depth + ";\n};");

}