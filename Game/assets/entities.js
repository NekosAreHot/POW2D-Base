Game.Entities = {};
Game.Entities.NPC = {};

//All the entities in game excluding the player
Game.Entities.inGame = [];
Game.Entities.NPC.inGame = [];

/**
* Checks to see if an gameobject hit an entity
* @param {object} other - the GameObject you wanna check to see if it hit a entity
**/
Game.Entities.checkHit = function(other){
	for(var i = 0; i < Game.Entities.inGame.length; i++){
		if(other.crashWith(Game.Entities.inGame[i]) && Game.Entities.inGame[i].isHidden != true){
			return true;
		}
	}
	return false;
}

/**
* Checks to see if an gameobject hit an entity
* @param {object} other - the GameObject you wanna check to see if it hit a entity
**/
Game.Entities.NPC.checkHit = function(other){
	for(var i = 0; i < Game.Entities.NPC.inGame.length; i++){
		if(other.crashWith(Game.Entities.NPC.inGame[i]) && Game.Entities.NPC.inGame[i].isHidden != true){
			return true;
		}
	}
	return false;
}


/*
*
* BEGINNING OF GETTERS
*
*/


/**
* Returns an entity at (x,y)
* @param {int} x - the x position to look for
* @param {int} y - the y position to look for
*/
Game.Entities.getNPC = function(x,y){
	for(var i = 0; i < Game.Entities.NPC.inGame.length; i++){
		if(Game.Entities.NPC.inGame[i].x == x && Game.Entities.NPC.inGame[i].y == y){
			return Game.Entities.NPC.inGame[i];
		}
	}
	return false;
}

/**
* Returns an entity at (x,y)
* @param {int} x - the x position to look for
* @param {int} y - the y position to look for
*/
Game.Entities.getEntity = function(x,y){
	for(var i = 0; i < Game.Entities.inGame.length; i++){
		if(Game.Entities.inGame[i].x == x && Game.Entities.inGame[i].y == y){
			return Game.Entities.inGame[i];
		}
	}
	return false;
}


/*
*
*  END OF GETTERS
*
*/

/**
* Creates a NPC entity at (x,y)
* @param {int} x - x position of the bull
* @param {int} y - y position of the bull
* @param {int} health - the startinh health of the bull
*/
Game.Entities.createNPC = function(x,y,DialogArray,texture,ShopItems,ShopPrices){
	var temp = new Game.GameObject(20,20,"red",0,0,"entity",true,"NPC");
	temp.x = x;
	temp.y = y;
	if(ShopItems != null && ShopPrices != null){
		temp.isShop = true;
		temp.hasDialog = false;
		temp.items = ShopItems;
		temp.prices = ShopPrices;
	}else{
		if(DialogArray.length > 0){
			temp.hasDialog = true;
			for(var i = 0; i < DialogArray.length; i++){
				temp.addDialog(DialogArray[i]);
			}
		}else{
			temp.hasDialog = false;
		}
	
	}
	if(texture != null){
		temp.setImage(texture);
		temp.setIcon(texture);
	}
	Game.Entities.NPC.inGame.push(temp);
}

//EXAMPLE NPC
//Game.Entities.createNPC(Game.player.x,Game.player.y,[],"cd_knigh.png");
//var x = Game.Entities.getNPC(Game.player.x,Game.player.y);
//x.addDialog(["this is line 1","this is line 2","this is line 3","this is line 4","this is line 5"]);
//x.addDialog(["hello again!","i see u really wanna talk to me"]);
//x.setIcon("your picture for the icon");

/**
* Creates a mimic entity at (x,y) with health
* @param {int} x - x position of the mimic
* @param {int} y - y position of the mimic
* @param {int} health - the startinh health of the mimic
*/
Game.Entities.createMimic = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "chest_texture.png",0,0,"entity",true,"Mimic");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 2;
	temp.health = health;
	temp.healthRoof = health;
	temp.speed = "none";
	Game.Entities.inGame.push(temp);
}
/**
* Creates a Random Demonic Monster
* @param {int} x - x position of the Demon
* @param {int} y - y position of the Demon
* @param {int} health - the startinh health of the Demon
*/
Game.Entities.createDemon= function(x,y,health){
	var choices = {Mimic:"Mimic",Knight:"Knight",BadArcher: "BadArcher",BadArcher:"BadArcher",BadArcher:"BadArcher",BadMage:"BadMage",BadMage:"BadMage",BadMage:"BadMage",BadMage:"BadMage",Ghost:"Ghost",Mimic:"Mimic",Knight:"Knight",Ghost:"Ghost",Knight:"Knight",Ghost:"Ghost",Knight:"Knight",Mimic:"Mimic",Ghost:"Ghost"};
	var ent = "create" + Game.getRandom(choices);
	Game.Entities[ent](x,y,health);
}

Game.Entities.createKnight = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "demon_texture.png",0,0,"entity", true, "Demon");
	temp.setImage("cd_knigh.png");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 3;
	temp.health = health;
	temp.healthRoof = health;
	temp.speed = 1;
	Game.Entities.inGame.push(temp);
}


Game.Entities.createForestMob = function(x,y,health){
	
	
	var choices = {Mimic:"Mimic",Knight:"Knight",BadArcher: "BadArcher",BadArcher:"BadArcher",Mimic:"Mimic",Mimic:"Mimic",Shroom:"Shroom",Shroom:"Shroom",Bat: "Bat", Bat: "Bat", Bat: "Bat", Rat: "Rat", Rat: "Rat", Rat: "Rat"};
	var ent = "create" + Game.getRandom(choices);
	Game.Entities[ent](x,y,health);
	
}

Game.Entities.createShroom = function(x,y,health){
	
	
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "Shroom.png",0,0,"entity", true, "Shroom");
	temp.setImage("Shroom.png");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 3;
	temp.health = health;
	temp.speed = 1;
	temp.healthRoof = health;
	Game.Entities.inGame.push(temp);
}

Game.Entities.createRat = function(x,y,health){
	
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "Rat.png",0,0,"entity", true, "Rat");
	temp.setImage("Rat.png");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 3;
	temp.health = health;
	temp.healthRoof = health;
	temp.speed = 1;
	Game.Entities.inGame.push(temp);
	
}

Game.Entities.createBat = function(x,y,health){
	
	
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "Bat.png",0,0,"entity", true, "Bat");
	temp.setImage("Bat.png");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 3;
	temp.health = health;
	temp.healthRoof = health;
	temp.speed = 1;
	Game.Entities.inGame.push(temp);
	
	
}



	


/**
* Creates a Ghost entity at (x,y) with health
* @param {int} x - x position of the Ghost
* @param {int} y - y position of the Ghost
* @param {int} health - the startinh health of the Ghost
*/
Game.Entities.createGhost = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "white",0,0,"entity", true, "Ghost");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 3;
	temp.noclip = true;
	temp.health = health;
	temp.setImage("cd ghost.png")
	temp.speed = 0;
	temp.healthRoof = health;
	Game.Entities.inGame.push(temp);
}

Game.Entities.createLivingFire = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "white",0,0,"entity", true, "LivingFire");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 2;
	temp.noclip = true;
	temp.health = health;
	temp.setImage("fire1.png");
	temp.speed = 10;
	temp.healthRoof = health;
	Game.Entities.inGame.push(temp);
}


Game.Entities.createSpider = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "spider.png",0,0,"entity", true, "Spider");
	temp.setImage("spider.png");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 3;
	temp.health = health;
	temp.speed = 1;
	temp.healthRoof = health;
	Game.Entities.inGame.push(temp);
}


Game.Entities.createBadMage = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "white",0,0,"entity", true, "Ghost");
	temp.x = x;
	temp.y = y;
	temp.healthRoof = health;
	temp.damagePerHit = 3;
	temp.specialAttack = function(){
		Game.createFireProjectile(this.x,this.y,"up",15,5,this);
		Game.createFireProjectile(this.x,this.y,"down",15,5,this);
		Game.createFireProjectile(this.x,this.y,"left",15,5,this);
		Game.createFireProjectile(this.x,this.y,"right",15,5,this);
	}
	temp.health = health;
	temp.setImage("redmage.png");
	temp.speed = 0;
	Game.Entities.inGame.push(temp);
}


Game.Entities.createCorruptionMage = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "white",0,0,"entity", true, "Ghost");
	temp.x = x;
	temp.y = y;
	temp.damagePerHit = 3;
	temp.healthRoof = health;
	temp.specialAttack = function(){
		Game.createMysteryProjectile(this.x,this.y,"up",15,5,this);
		Game.createMysteryProjectile(this.x,this.y,"down",15,5,this);
		Game.createMysteryProjectile(this.x,this.y,"right",15,5,this);
	}
	temp.health = health;
	temp.setImage("desert_corruptionmage.png");
	temp.speed = 0;
	Game.Entities.inGame.push(temp);
}








Game.Entities.createEvilSnowman = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "white",0,0,"entity", true, "Ghost");
	temp.x = x;
	temp.y = y;
	temp.healthRoof = health;
	temp.damagePerHit = 3;
	temp.specialAttack = function(){
		Game.createSnowProjectile(this.x,this.y,"up",15,5,this);
		Game.createSnowProjectile(this.x,this.y,"down",15,5,this);
	}
	temp.health = health;
	temp.setImage("evil_snowman.png");
	temp.speed = 0;
	Game.Entities.inGame.push(temp);
}


Game.Entities.createBadArcher = function(x,y,health){
	var temp = new Game.GameObject(20,20,Game.File.getImageDirectory() + "white",0,0,"entity", true, "Ghost");
	temp.x = x;
	temp.y = y;
	temp.healthRoof = health;
	temp.damagePerHit = 3;
	temp.specialAttack = function(){
		Game.createProjectile(this.x,this.y,"up",15,5,this);
		Game.createProjectile(this.x,this.y,"down",15,5,this);
		Game.createProjectile(this.x,this.y,"left",15,5,this);
		Game.createProjectile(this.x,this.y,"right",15,5,this);

	}
	temp.health = health;
	temp.setImage("redarcher.png");
	temp.speed = 0;
	Game.Entities.inGame.push(temp);
}

/**
* OOF?
*	-Noah
**/

/*
Game.Entities.Spiky = function(x,y,health){
	var temp = new Game.GameObject920,20,Game.File.getImageDirectory() + "grey",0,0,"entity", true, "Spike";
	temp.x =x;
	temp.y = y;
	temp.damagePerHit = 5;
	temp.specialAttack = function()
	{
		
		
		
//Moving Spike

// if ( player x pos == Moving spike x pos )

		
		//Move the spikes x pos to the players by 20px singular movements via AI.
		
		// Var range = x;
		// When range has been met move it back
	
	}
	
	temp.health = 1000000000;
	
		//temp.setImage("");
		temp.speed = 0;
		Game.Entities.inGame.push(temp);
		
}

*/
	
Game.Entities.Boss = {};
Game.Entities.Boss.create = function(x,y,width,height,sprite,health,dph,speed,drops){
	var temp = new Game.GameObject(width,height,Game.File.getImageDirectory() + sprite,0,0,"entity", true, "boss");
	temp.setImage(sprite);
	temp.x = x;
	temp.y = y;
	if(drops !=null){
		temp.drops = drops;
	}else{
		temp.drops = Game.Items.common.gold;
	}
	temp.damagePerHit = dph;
	Game.bossDamagePerHit = dph;
	temp.healthRoof = health;
	temp.health = health;
	temp.speed = speed;
	/*temp.specialAttack = function(){
		if(!(this.timesSummoned != null)){
			this.timesSummoned = 1;
		}else{
			if(this.timesSummoned >= 5){
				this.timesSummoned = 0;
				Game.Entities.createLivingFire(this.x + 20,this.y + 20,5);
			}else{
				this.timesSummoned++;
			}
		}
	}*/
	Game.Entities.inGame.push(temp);
}
Game.Entities.createEntity = function(){
	return new Game.GameObject(20,20,"green",x,y,"entity");
}