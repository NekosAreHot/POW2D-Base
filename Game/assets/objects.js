Game.GameObject = function(width, height, color, x, y, type, isWall,creatureType) {
	//Methods for ALL Objects
	this.type = type;
	this.canMove = true;
	this.isDead = false;
	this.facing = "left";
	this.id = type;
	this.setId = function(newId){
		this.id = newId;
	}
	this.teleport = function(nX,nY){
		this.x = nX;
		this.y = nY;
	}
	//Slipperies
	if(this.type == "slippery"){
		this.slippery_type;
	}
	//Trapped tiles
	if(this.type == "trap"){
		this.projectile_type;
		this.dir = "up";
		this.projectile_damage = 20;
		this.isWall = false;
		this.shoot = function(){
			Game.createFireProjectile(this.x,this.y,this.dir,1,this.projectile_damage,this);
		}
	}
	
	//Pushables
	if(this.type == "pushable"){
		//Set a uniqueID for each pushable
		var d = new Date();
		this.setId( Math.random() * Math.random() * Math.random() + Math.random() + 10 + d.getTime());
		//Set the default value of isFrozen
		this.isFrozen = false;
		
		
		/**
		*	returns boolean if the pushable is ontop of a button
		**/
		this.checkIfOnButton = function(){
			var btn = Game.getButton(this.x,this.y);
			if(btn != null){
				return true;
			}else{
				return false;
			}
		}
		
		/**
		*	returns boolean if the pushable is ontop of another pushable
		**/
		this.checkIfOnPushable = function(){
			if(Game.getPushable(this.x,this.y) != null && Game.getPushable(this.x,this.y).id != this.id){
				return true;
			}else{
				return false;
			}
		}
		
		
		/**
		* Moves the pushable in a certain direction
		* @param {string} dir - direction you want the pushable to move
		**/
		this.push = function(dir){
			if(!this.isFrozen){
				this.move(dir);
				if(this.wallCheck()){
					this.move(Game.dirOpposite(dir));
					this.move(Game.dirOpposite(dir));
				}
				if(this.checkIfOnPushable()){
					this.move(Game.dirOpposite(dir));
				}
				if(Game.Entities.NPC.checkHit(this)){
					this.move(Game.dirOpposite(dir));
					this.move(Game.dirOpposite(dir));
				}
				if(this.checkIfOnButton()){
					if(!Game.getButton(this.x,this.y).hasBeenPressed){
						Game.getButton(this.x,this.y).onPress();
						Game.getButton(this.x,this.y).hasBeenPressed = true;
						this.isFrozen = true;
					}else{
						this.move(Game.dirOpposite(dir));
					}
				}
			}
		}
		
		
	}
	/*
	//Ice
	if(this.type == "ice_tile"){
	*/	
		/**
		* Slides a entity (PsudoCode) - not working - fix the do/while loop
		* @param {GameObject} ent - the object you wanna slide
		**/
	
	/*
		this.slide = function(ent){
			var x = ent.x;
			var y = ent.y;
			var facing = ent.facing;
			
			//Freeze the ents controls
			if(ent.type == "player"){
				//If the ent is a player
				ent.canMove = false;
				ent.disableControls();
				ent.enableSpecific("pause");
			}else{
				ent.canMove = false;
			}
			
			//slide the entity (BROKEN DO/WHILE loops break the engine thread)
			do{
				var oldx = ent.x;
				var oldy = ent.y;
				ent.move(facing);
				var newx = ent.x;
				var newy = ent.y;
				if(newx == oldx && newy == oldy){
					//If the ent hit a wall while sliding
					//Force the engine to think its not on ice
					ent.isOnIce = false;
					//Allow NPC's to move
					ent.canMove = true;
					if(ent.type == "player"){
						//Enable the player movements again
						ent.enableControls();
					}
				}
			}
			while(ent.isOnIce);
			
			
			
		}
	}
	*/
	//Buttons	
	if(this.type == "button"){
		this.onPress;
		this.hasBeenPressed = false;
	}
//
	/**
	*
	* 
	*/
	this.move = function(dir,dist){
		var directions = {left:1,right:2,down:3,up:4};
		if(dist != null){
			if(dir=="left"){
				this.x = this.x - dist;
			}
			if(dir=="right"){
				this.x = this.x + dist;
			}
			if(dir=="down"){
				this.y = this.y + dist;
			}
			if(dir=="up"){
				this.y = this.y - dist;
			}
		}else{
			moveOther(this,dir);
		}
	}
	/**
	* Checks for Entities at the objects (x,y) position
	* @param {anyvalue} dyn - Put a value here to return an object {hasHit: boolean, ObjectHit: theEntityyoucollidedwith}
	*/
	this.checkForEntities = function(dyn){
		//Check to see if crashed with player
		if(type != "player" && this.crashWith(Game.player)){
			if(dyn != null){
				return {hasHit : true, ObjectHit : Game.player};
			}else{
				return true;
			}
		}
		//Check for the rest of the entities
		for(var i = 0; i < Game.Entities.inGame.length; i++){
			if(this.crashWith(Game.Entities.inGame[i]) && this.type != "entity" && Game.Entities.inGame[i].isDead != true){
				if(dyn != null){
					return {hasHit : true, ObjectHit : Game.Entities.inGame[i]};
				}else{	
					return true;
				}
			}
		}
		if(dyn != null){
			return {hasHit : false};
		}
		return false;
	}
	
	/**
	* Checks if the ent can move in a direction and returns boolean
	* @param {string} dir - the direction you want to try the move
	**/
	this.tryMove = function(dir,tiles){
		//Try the move
		this.move(dir,tiles);
		if(this.wallCheck() || this.checkForEntities()){
			//if the ent hit any volitile object
			this.move(Game.dirOpposite(dir));
			return false;
		}else{
			//if the ent successfully moved
			this.move(Game.dirOpposite(dir));
			return true;
		}
	}
	
	//BEGINNING WITH NPCS
	if(creatureType == "NPC"){
		this.hasDialog = false;
		this.isShop = false;
		this.name = "NPC: ";
		this.icon = "none";
		this.items = [];
		this.prices = [];
		this.shopDialog = "shop_dialog";
		this.shopBtn = function(intX){
			return Game.HTML.getElement("shop_btn" + intX);
		};
		this.shopReset = function(){
			this.shopBtn(0).innerHTML = "Empty";
			this.shopBtn(1).innerHTML = "Empty";
			this.shopBtn(2).innerHTML = "Empty";
			this.shopBtn(3).innerHTML = "Empty";
			Game.shop_items = [];
			Game.shop_prices = [];
		}
		this.openShop = function(){
			Game.HTML.openDialog("shop_dialog");
			this.shopReset();
			for(var i = 0; i < this.items.length; i++){
				this.shopBtn(i).innerHTML = this.items[i].name + "- - - - " + this.prices[i] + " Gold.";
				Game.shop_items.push(this.items[i]);
				Game.shop_prices.push(this.prices[i]);
			}
		}
		this.dialog = [];
		this.isOn = 1;
		this.addDialog = function(array){
			this.dialog.push(array);
		}
		this.changeName = function(string){
			this.name = string + ": ";
		}
		this.setIcon = function(file){
			this.icon = file;
		}
		this.displayIcon = function(){
			Game.Dialog.NpcPic.setImage(this.icon);
		}
		this.readDialog = function(num){
			var n = num - 1; 
			var obj = this.dialog[n];
			for(var i = 0; i < obj.length; i++){
				Game.Dialog.setText(obj[i],i + 1);
			}
			if(this.icon != "none"){
				this.displayIcon();
			}
		}
		this.read = function(){
			if(this.dialog.length > 0){
				this.readDialog(this.isOn);
				if(this.dialog.length == this.isOn){
					//When it hits the last dialog in the npc
					this.isOn = 1;
				}else{
					this.isOn++;
				}
			}else{
				Game.Dialog.setText("(silent)", 2);
				if(this.icon != "none"){
					this.displayIcon();
				}
			}
		}
		
	}
	//END OF NPCS
	
	this.wallCheck = function(){
		if(this.noclip){
		//code when noclip is on
		return false;
		}else{
			return Game.hitWallCheck(this);
		}
	}
	
	//BEGINNING OF PROJECTILES
	if(type == "projectile"){
		this.projectile_speed;
		this.projectile_damagePerHit;
		this.projectile_name;
		this.projectile_image = "arrow_01e.png";
		this.projectile_type;
		this.projectile_owner;
		this.projectile_facing;
		this.arrowTick = function(){
			this.setImage(this.projectile_image);
			moveOther(this,this.projectile_facing);
			if(this.projectile_type === "magic"){
				this.generateLight();
			}
			this.update();
			if(this.wallCheck()){
				Game.howManyArrowsHaveCollidedWithTheWall++;
				this.isHidden = true;
				this.canMove = false;
			}else if(this.checkForEntities(true).hasHit){
				var Mon =this.checkForEntities(true).ObjectHit;
				if(Mon === this.projectile_owner){
					//if you somehow shot yourself
					//Fixes a bug that you could kill yourself if you walk and shoot
					//Put code to for projectiles that are meant to hit the player
				}else{
					this.checkForEntities(true).ObjectHit.takeDamage(15);
					this.isHidden = true;
					this.canMove = false;
				}
			}
		}
		this.projectile_onDeath = function(obj){
			obj = null;
		}
	}
	//END OF PROJECTILES
	
	if(type == "text"){
		this.getText = function(){
			return this.text;
		}
		this.setText = function(text){
			this.text = text;
		}
	}
	if (type == "image" || type == "wall" || type == "door" || type == "droppedItem") {
		this.image = new Image();
		this.image.src = color;
	}
	
	if(type == "light"){
		if(color == "black"){
			 //Code when the color is defined as Black
			 
		}else{
			this.image = new Image();
			this.image.src = color;
		}
	}
	if(type == "droppedItem"){
		Game.droppedItems.push(this);
		this.setId(Game.droppedItems.length - 1);
		this.heldItem;
		this.canMove = false;
		this.onDeath = function(){
				this.isHidden = true;
				this.heldItem = null;
		}
	}
	this.group;
	if(type == "entity"){
		this.chasing = Game.player;
		this.cooldown = false;
		this.healthRoof = this.health;
		this.count = 0;
		this.speed = 3;
		
		this.AIdisabled = false;
		this.disableAI = function(){
			this.AIdisabled = true;
		}
		this.enableAI = function(){
			this.AIdisabled = false;
		}
		this.wander = function(){
			var rand = Game.getRandom({1:"up",2:"left",3:"right",4:"down"});
			this.move(rand);
			if(this.wallCheck()){
				this.move(Game.dirOpposite(rand));
			}
		}
		this.howManyHits = 0;
		this.AI = function(){
			if(!this.isDead){
				if(this.howManyHits >= 2){
					this.lastX = this.x;
					this.lastY = this.y;
					//Move a random direction in an attempt to get the AI "unstuck"
					this.wander();
					//Reverse if we hit a wall
					if(this.wallCheck()){
						
						if(this.group != null){
							this.group.teleport(this.lastX,this.lastY);
						}else{
							this.teleport(this.lastX,this.lastY);
						}
					}
					this.howManyHits = 0;
				}else{
					var chasing = Game.player;
					if(this.speed != "none" || this.AIdisabled){
						
						
						/////////////////////////////////////////////////////////////////////////////////
							if(this.y >= this.chasing.y){
								if(this.group != null){
									this.group.moveAll("up");
								}else{
									this.y = this.y - 20;
								}
								this.facing = "up";
								//Check to see if the ai hit a entity
								if(this.checkForEntities()){
									//Check if this is a player and deal damage
									if(this.checkForEntities(true).ObjectHit.type == "player"){
										//If it is the player and if in a certain difficulty
										//if(Game.Difficulty == "hard"){
										this.dealDamage(this.checkForEntities(true).ObjectHit);
										//}
									}else{
										this.checkForEntities(true).ObjectHit.AI();
									}
									this.y = this.y - 20;
								}
								//Check to see if the ai hit a wall
								if(this.wallCheck()){
									this.y = this.y + 20;
									this.howManyHits++;
								}
							}else if(this.y <= this.chasing.y){
								if(this.group != null){
									this.group.moveAll("down");
								}else{
									this.y = this.y + 20;
								}
								this.facing = "down";
								//Check to see if the ai hit a entity
								if(this.checkForEntities()){
									//Check if this is a player and deal damage
									if(this.checkForEntities(true).ObjectHit.type == "player"){
										//If it is the player and if in a certain difficulty
										//if(Game.Difficulty == "hard"){
											this.dealDamage(this.checkForEntities(true).ObjectHit);
										//}
									}else{
										this.checkForEntities(true).ObjectHit.AI();
									}
									this.y = this.y - 20;
								}
								//Check to see if the ai hit a wall
								if(this.wallCheck()){
									this.y = this.y - 20;
									this.howManyHits++;
								}
							}
							///////////////////////////////////////////////////////////////////////////////////////////
						
							
							///////////////////////////////////////////////////////////////////////////////////////////
							if(this.x >= this.chasing.x){
								if(this.group != null){
									this.group.moveAll("left");
								}else{
									this.x = this.x - 20;
								}
								this.facing = "left";
								//Check to see if the ai hit a wall
								if(this.wallCheck()){
									this.x = this.x + 20;
									this.howManyHits++;
								}
								if(this.checkForEntities()){
									//Check if this is a player and deal damage
									if(this.checkForEntities(true).ObjectHit.type == "player"){
										//If it is the player and if in a certain difficulty
										//if(Game.Difficulty == "hard"){
											this.dealDamage(this.checkForEntities(true).ObjectHit);
										//}
									}else{
										this.checkForEntities(true).ObjectHit.AI();
									}
									this.x = this.x + 20;
								}
							}else if(this.x <= this.chasing.x){
								if(this.group != null){
									this.group.moveAll("right");
								}else{
									this.x = this.x + 20;
								}
								this.facing = "right";
								//Check to see if the ai hit a entity
								if(this.checkForEntities()){
									//Check if this is a player and deal damage
									if(this.checkForEntities(true).ObjectHit.type == "player"){
										//If it is the player and if in a certain difficulty
										//if(Game.Difficulty == "hard"){
											this.dealDamage(this.checkForEntities(true).ObjectHit);
										//}
									}else{
										this.checkForEntities(true).ObjectHit.AI();
									}
									this.x = this.x - 20;
								}
								//Check to see if the ai hit a wall
								if(this.wallCheck()){
									this.x = this.x - 20;
									this.howManyHits++;
								}
							}
							///////////////////////////////////////////////////////////////////////
						
						}
					}
						
				if(this.specialAttack != null){
					this.specialAttack();
				}
			}
		}
	//End of this.AI
		
	}
	if(type == "trap"){
		this.projectile_type;
		this.damagePerHit = 5;
		this.shoot = function(dir){
			Game.createFireProjectile(this.x,this.y,dir,0,this.damagePerHit,this);
		}
	}
	//BEGINNING OF ENTITIES
	if(type == "player" || type == "entity"){
		if(type == "player"){
			this.isPlayer = true;
		}else{
			this.isPlayer = false;
		}
		this.group;
		this.createGroup = function(){
				
		}
		this.noclip = false;
		this.creatureType = creatureType;
		this.canMove = true;
		if(this.creatureType == "Mimic"){
			this.canMove = false;
		}
		if(this.creatureType == "Mimic" || this.creatureType == "Goblin" || this.creatureType == "boss"){
			this.image = new Image();
			this.image.src = color;
		}
		//Set the non player health roof
		this.health;
		this.healthRoof;
		this.baseDamagePerHit = 0;
		this.damagePerHit = this.baseDamagePerHit + 2;
		this.isDead = false;
		this.canDoDamage = true;
		
		this.getHealth = function(){
			return this.health;
		}
		this.takeDamage = function(num){
			Sound.onDeath.play();
			if(!isNaN(num)){
				this.health -= num;
				if(this.health <= 0){
					this.isDead = true;
					this.onDeath(this);
				}
			}else{
				this.health -= Game.bossDamagePerHit;
				if(this.health <= 0){
					this.isDead = true;
					this.onDeath(this);
				}
			}
		}
		this.dealDamage = function(other){
			//if(this.isPlayer){
				Game.Dialog.combat();
				this.takeDamage(other.damagePerHit);
			//}
			if(other.takeDamage != null){
				other.takeDamage(this.damagePerHit);
			}
		}
		this.dropItem = function(item,slot){
			var x = this.x;
			var y = this.y;
			var temp = true;
			var alreadyHaveItemonFloor = false;
			for(var i = 0;i < Game.GameObjects.length;i++){
				if(Game.GameObjects[i].type == "droppedItem"){
					if(Game.GameObjects[i].x == this.x && Game.GameObjects[i].y == this.y){
						alreadyHaveItemonFloor = true;
					}
				}
			}
			if(alreadyHaveItemonFloor){
				if(this.type == "player"){
					Game.Dialog.hide();
					Game.Dialog.setText("There is already an item were you are standing!",1);
				}
			}else{
				var copy = Game.CopyItem(item);
				var itemObj = new Game.GameObject(20,20,Game.File.getImageDirectory() + "droppedItem_texture.png",x,y,"droppedItem");
				if(item != null){
					itemObj.heldItem = copy;
					if(item.icon != null){
						itemObj.setImage(item.icon);
					}
				}else{
					if(type == "player"){
						//Do nothing
						temp = false;
					}else{
						var Itm = Game.getRandomItem();
						itemObj.heldItem = Itm
						if(Itm.icon != null){
							itemObj.setImage(Itm.icon);
						}
					}
				}
				if(temp){
					if(type == "player" && slot != null){
						this.inventory[slot - 1] = null;
					}
					Game.GameObjects.push(itemObj);
				}
			}
		}
		this.onDeath = function(other){
			if(this.type == "player"){
				Game.Dialog.hide();
				//Game.Dialog.setText("You Died!", 3, "white");
				this.canDoDamage = false;
				this.isHidden = true;
				this.canMove = false;
				Game.isInGameOver = true;
				Game.GameOver();
				
				if(other != null){
					other = null;
				}
				//location.reload();
			}else if(this.type == "entity"){
				if(this.creatureType != "boss"){
					this.dropItem();
				}else{
					//Game.Level.inBossFight = false;
					var reward = this.drops;
					Game.Dialog.setText("Boss beaten! Reward: " + reward.trueName, 3, "green");
					this.dropItem(reward);
					//Gain Alot of exp if you beat a boss
					Game.player.gainExperence();
					Game.player.gainExperence();
					Game.player.gainExperence();
				}
				Game.player.gainExperence();
				this.canDoDamage = false;
				this.canMove = false;
				this.isWall = false;
				this.isHidden = true;
				if(other != null){
					other = null;
				}else{
					
				}
			}
		}
	}
	//END OF ENTITIES
	this.generateLight = function(){
		Game.Light.removeAt(this.x,this.y);
		Game.Light.removeAt(this.x+20,this.y);
		Game.Light.removeAt(this.x-20,this.y);
		Game.Light.removeAt(this.x,this.y-20);
		Game.Light.removeAt(this.x,this.y+20);
		Game.Light.removeAt(this.x-20,this.y-20);
		Game.Light.removeAt(this.x+20,this.y-20);
		Game.Light.removeAt(this.x+20,this.y+20);
		Game.Light.removeAt(this.x-20,this.y+20);
		Game.Light.removeAt(this.x+40,this.y);
		Game.Light.removeAt(this.x-40,this.y);
		Game.Light.removeAt(this.x,this.y+40);
		Game.Light.removeAt(this.x,this.y-40);
		Game.Light.removeAt(this.x-40,this.y-40);
		Game.Light.removeAt(this.x+40,this.y-40);
		Game.Light.removeAt(this.x+40,this.y+40);
		Game.Light.removeAt(this.x-40,this.y+40);
		Game.Light.removeAt(this.x+60,this.y);
		Game.Light.removeAt(this.x-60,this.y);
		Game.Light.removeAt(this.x,this.y+60);
		Game.Light.removeAt(this.x,this.y-60);
		Game.Light.removeAt(this.x-40,this.y+20);
		Game.Light.removeAt(this.x-20,this.y+40);
		Game.Light.removeAt(this.x-40,this.y-40);
		Game.Light.removeAt(this.x-20,this.y-40);
		Game.Light.removeAt(this.x+20,this.y-40);
		Game.Light.removeAt(this.x+20,this.y+40);
		Game.Light.removeAt(this.x+40,this.y+20);
		Game.Light.removeAt(this.x+40,this.y-20);
		Game.Light.removeAt(this.x-40,this.y-20);
	}
	if(type == "sword"){
		//the players sword
		this.image = new Image();
		this.image.src = Game.File.getImageDirectory() + color;
		
		
		this.swing = function(){
			if(this.checkForEntities()){
				this.checkForEntities(true).ObjectHit.takeDamage(Game.player.damagePerHit);
				Game.Dialog.setText("You dealt " + Game.player.damagePerHit + " Damage!",2);
			}
		}
	}
	//BEGINNING OF PLAYER
	if(type == "player"){
		this.canGainExp = true;
		this.hasBow = false;
		this.hasSword = false;
		this.sprint = false;
		this.currentSword = "sword_01a.png";
		this.swordObject = new Game.GameObject(20,20,this.currentSword,999,999,"sword");
		this.swordObject.isHidden = true;
		this.maxInventorySize = 10;
		this.PlayerName;
		this.arrows = 0;
		this.quiver = 50;
		this.health = 50;
		this.Magic = 10;
		this.magicRoof = 50;
		this.healthRoof = 50;
		this.exp = 0;
		this.isDrunk = false;
		this.swingSword = function(){
			//If the player even has a sword
			if(this.hasSword){
				//Set the position of the sword
				this.swordObject.x = this.x;
				this.swordObject.y = this.y;
				this.swordObject.move(this.facing);
				this.currentSword = ["sword_animations/sword_1_" + this.facing + "_frame1.png","sword_animations/sword_1_" + this.facing + "_frame2.png","sword_animations/sword_1_" + this.facing + "_frame3.png"];
				//Animate it
				this.swordObject.isHidden = false;
				//add animations
				var x = new Game.Animations.create(this.swordObject,[this.currentSword[0],this.currentSword[1],this.currentSword[2]],0);
				x.add();
				this.swordObject.swing();
				Thread.sleep(1500,"Game.player.swordObject.isHidden = true;Game.player.swordObject.x = 9999;");
			}
		}
		
		this.upgradeQuiver = function(){
			this.quiver = this.quiver * 2;
		}
		this.manageCheat = function(){
			if(this.arrows > this.quiver){
				this.arrows = this.quiver;
			}
			if(this.health > this.healthRoof){
				this.health = this.healthRoof;
			}
			if(this.Magic > this.magicRoof){
				this.Magic = this.magicRoof;
			}
		}
		this.expRoof = 25;
		this.level = 1;
		this.gold = 0;
		this.gainExperence = function(){
			if(!this.canGainExp){
				//if the player is drunk, they cant gain exp
			}else{
				var rand = Game.getRandom({1:2,2:5,3:10,4:15,5:6,6:20}) * this.level;
				this.exp = this.exp + rand;
				if(this.exp >= this.expRoof){
					//See if we went over the roof and give back the extra xp
					if(this.exp > this.expRoof){
						this.exp = this.exp - this.expRoof;
					}else{
						//if its equal
						this.exp = 0;
					}
					//Increase the roof
					this.expRoof = this.expRoof * 2;
					//Increase the players health roof and base attack
					this.healthRoof = this.healthRoof + 30;
					this.health = this.healthRoof;
					this.baseDamagePerHit = this.baseDamagePerHit + 5;
					this.damagePerHit = this.baseDamagePerHit + 2;
					this.magicRoof = this.magicRoof + 5;
					//Increment the players level
					this.level++;
				}else{
					//Code when the player hasnt reached the exp levelup
					
				}
			}
		}
		this.hasArrows = function(){
			if(this.arrows > 0){
				return true;
			}else{
				return false;
			}
		}
		this.hasMagic = function(){
			if(this.Magic > 0){
				return true;
			}else{
				return false;
			}
		}
				
		this.inventory = [];
		this.pickUpItem = function(){
			for(var i = 0; i < Game.GameObjects.length; i++){
				if(Game.GameObjects[i].x == this.x && Game.GameObjects[i].y == this.y && Game.GameObjects[i].type == "droppedItem" && Game.GameObjects[i].heldItem != null){
					var get = Game.GameObjects[i];
					var item = get.heldItem;
					if(item.trueName != "key"){
						//Check if the player has room in their inventory
						if(this.inventory.length < this.maxInventorySize){
							item.onPickup();
							this.addToInventory(item);
							get.isHidden = true;
							for(var i = 0;i < Game.GameObjects.length;i++){
								if(Game.GameObjects[i].id == get.id){
									Game.GameObjects.splice(i,1);
								}
							}
							for(var i = 0;i < Game.droppedItems.length;i++){
								if(Game.droppedItems[i].id == get.id){
									Game.droppedItems.splice(i,1);
								}
							}
						}else{
							Game.Dialog.setText("Player cannot hold any more items! Current Backpack size: " + this.maxInventorySize,1);
						}	
					}else{
						item.onPickup();
						get.isHidden = true;
						for(var i = 0;i < Game.GameObjects.length;i++){
							if(Game.GameObjects[i].id == get.id){
								Game.GameObjects.splice(i,1);
							}
						}
						for(var i = 0;i < Game.droppedItems.length;i++){
							if(Game.droppedItems[i].id == get.id){
								Game.droppedItems.splice(i,1);
							}
						}
					}
				}
			}
		}
		this.addToInventory = function(item,returnvalue){
				if(this.inventory.length < this.maxInventorySize){
					var x = Game.CopyItem(item);
					if(x.trueName != "key"){
						this.inventory.push(x);
					}else{
						item.onPickup();
					}
					if(returnvalue != null){
						//So you could test it
						return true
					}
				}else{
					Game.Console.sendMessage("Player cannot hold any more items! Current Backpack size: " + this.maxInventorySize);
					if(returnvalue != null){
						//So you could test it
						return false;
					}
				}
		}
		this.getItem = function(num){
			if(num <= this.maxInventorySize){
				return this.inventory[num - 1];
			}else{
				Game.Console.sendMessage("Error!: this.getItem(num) needs a valid number thats less than or equal too " + this.maxInventorySize);
			}
		}
		this.useItem = function(num){
			try{
				if(num <= this.maxInventorySize){
				var Item = this.inventory[num - 1];
				Item.use();				
				if(Item.isConsumable){
					this.inventory[num - 1] = null;
				}
			}else{
				Game.Console.sendMessage("Error!: this.useItem(num) needs a valid number thats less than or equal too " + this.maxInventorySize);
			}
			}catch(err){
				throw(err);
			}
			
		}
		this.checkItem = function(num){
			if(num <= this.maxInventorySize && this.getItem(num) != null){
				return true;
			}else{
				return false;
			}
		}
		
		
		this.equipt = function(num){
			if(this.inventory[num - 1] != null){
				this.inventory[num - 1].equipt();
			}else{
				Game.Console.sendMessage("No item to equipt at this.equipt(" + num + ");");
			}
		}
		
	}
	//END OF PLAYER
	
	//BEGINNING OF CHESTS
	if(type == "chest" || type == "lockedchest"){
		this.contents = [];
		this.getContents = function(num){
			if(this.contents[num - 1] != null){
				return this.contents[num - 1];
			}else{
				return null;
			}
		}
		this.setContents = function(item){
			var copy = Game.CopyItem(item)
			this.contents.push(copy);
		}
		this.removeContentsExcept = function(num){
			this.contents.splice(num - 1,1);
		}
		this.removeContents = function(num){
			this.contents[num - 1] = null;
		}
		this.image = new Image();
		this.image.src = color;
	}
	//For locked chests
	if(type == "lockedchest"){
		this.isLocked = true;
		this.lock = function(){
			this.isLocked = true;
		}
		this.unlock = function(key){
			if(this.x == key.unlocks.x && this.y == key.unlocks.y){
				this.isLocked = false;
				//so this can be used in a if statement
				return true;
			}else{
				//so this can be used in a if statement
				return false;
			}
		}
	}
	//END of chests
	this.setImage = function(file){
		this.image = new Image();
		this.image.src = Game.File.getImageDirectory() + file;
		this.color = file;
	}
	
	this.facing = "east";
	this.score = 0;
	this.bounce = 0.6;
	this.speed = 1;
	this.color = color;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;	
	this.x = x;
	this.y = y;
	this.isHidden = false;
	this.isWall = isWall;
	this.getFacing = function(){
		return this.facing;
	}
	this.update = function() {
		try{
			if(!this.isHidden){
				ctx = Game.myGameArea.context;
				if (this.image != null) {
					ctx.drawImage(this.image, 
					this.x, 
					this.y,
					this.width, this.height);
				}else if (this.type == "text") {
					ctx.font = " " + this.width + " " + this.height;
					ctx.fillStyle = this.color;
					ctx.fillText(this.text, this.x, this.y);
					}else {
					ctx.fillStyle = this.color;
					ctx.fillRect(this.x, this.y, this.width, this.height);
				}
			}else{
				//Called if the hidden object is called through Object.update();
				//Triggers are hidden
				
			}
		}catch(err){
			if(err = "InvalidStateError: Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The HTMLImageElement provided is in the 'broken' state."){
				this.image.src = "Textures/error.png";
			}
		}
	}
	this.triggerFunction;
	this.hitBottom = function() {
		var rockbottom = Game.myGameArea.canvas.height - this.height;
		if (this.y > rockbottom) {
			this.y = rockbottom;
		}
	}
	this.crashWith = function(otherobj){
		//define the current objects "hitbox"
		var playerleft = this.x;
		var playerright = this.x + (this.width);
		var playertop = this.y;
		var playerbottom = this.y + (this.height);
		
		//define the otherobj "hitbox"
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		
		//define crash so we can actually use it
		var crash = true;
		
		if ((playerbottom <= othertop) || (playertop >= otherbottom) || (playerright <= otherleft) || (playerleft >= otherright)) {
			crash = false;
		}
		return crash;
	}
	
	this.toString = function(){
		return "GameObject At: (" + this.x + "," + this.y + ") Type: " + this.type + " ID:" + this.id;
	}
}

Game.inventoryMenu = {};
Game.inventoryMenu.inside = new Game.GameObject(350,240,Game.File.getImageDirectory() + "parchment.png", 40, 40,"image");
Game.inventoryMenu.outside = new Game.GameObject(Game.myGameArea.width,Game.myGameArea.height, "black", 0, 0);
Game.inventoryMenu.icon1 = new Game.GameObject(20,20,"white",50,85);
Game.inventoryMenu.icon2 = new Game.GameObject(20,20,"white",50,105);
Game.inventoryMenu.icon3 = new Game.GameObject(20,20,"white",50,125);
Game.inventoryMenu.icon4 = new Game.GameObject(20,20,"white",50,145);
Game.inventoryMenu.icon5 = new Game.GameObject(20,20,"white",50,165);
Game.inventoryMenu.icon6 = new Game.GameObject(20,20,"white",50,185);
Game.inventoryMenu.icon7 = new Game.GameObject(20,20,"white",50,205);
Game.inventoryMenu.icon8 = new Game.GameObject(20,20,"white",50,225);
Game.inventoryMenu.icon9 = new Game.GameObject(20,20,"white",50,245);
Game.inventoryMenu.icon10 = new Game.GameObject(20,20,"white",50,265);
Game.inventoryIcons = function(){
	Game.inventoryMenu.icon1.y =65;
	Game.inventoryMenu.icon2.y =85;
	Game.inventoryMenu.icon3.y =105;
	Game.inventoryMenu.icon4.y =125;
	Game.inventoryMenu.icon5.y =145;
	Game.inventoryMenu.icon6.y =165;
	Game.inventoryMenu.icon7.y =185;
	Game.inventoryMenu.icon8.y =205;
	Game.inventoryMenu.icon9.y =225;
	Game.inventoryMenu.icon10.y =245;
}
Game.chestIcons = function(){
	Game.inventoryMenu.icon1.y =85;
	Game.inventoryMenu.icon2.y =105;
	Game.inventoryMenu.icon3.y =125;
	Game.inventoryMenu.icon4.y =145;
	Game.inventoryMenu.icon5.y =165;
	Game.inventoryMenu.icon6.y =185;
	Game.inventoryMenu.icon7.y =205;
	Game.inventoryMenu.icon8.y =225;
	Game.inventoryMenu.icon9.y =245;
	Game.inventoryMenu.icon10.y =265;
}
Game.inventoryText = {
		line1: new Game.GameObject("20px","Consolas","black",65,85,"text"),
		line2: new Game.GameObject("20px","Consolas","black",65,105,"text"),
		line3: new Game.GameObject("20px","Consolas","black",65,125,"text"),
		line4: new Game.GameObject("20px","Consolas","black",65,145,"text"),
		line5: new Game.GameObject("20px","Consolas","black",65,165,"text"),
		line6: new Game.GameObject("20px","Consolas","black",65,185,"text"),
		line7: new Game.GameObject("20px","Consolas","black",65,205,"text"),
		line8: new Game.GameObject("20px","Consolas","black",65,225,"text"),
		line9: new Game.GameObject("20px","Consolas","black",65,245,"text"),
		line10: new Game.GameObject("20px","Consolas","black",65,265,"text"),
		line11: new Game.GameObject("20px","Consolas","black",65,65,"text")
}




//Not used
Game.classSelect = function(){}



Game.openChest = function(chest){
	Game.chestIcons();
	Game.player.canMove = false;
	Game.pause = true;
	Game.getCurrentSubMenu.current = "chest";
	var temp = Game.inventoryText;
	var temp2 = Game.inventoryMenu;
	temp.line1.text = "Chest: ";
	temp.line2.text = "[1]: " + Game.checkChest(1);
	temp2.icon1.setImage(Game.getChestItem(1).icon);
	temp.line3.text = "[2]: " + Game.checkChest(2);
	temp2.icon1.setImage(Game.getChestItem(2).icon);
	temp.line4.text = "[3]: " + Game.checkChest(3);
	temp2.icon1.setImage(Game.getChestItem(3).icon);
	temp.line5.text = "[4]: " + Game.checkChest(4);
	temp2.icon1.setImage(Game.getChestItem(4).icon);
}
Game.closeChest = function(){
	Game.player.canMove = true;
	Game.pause = false;
	Game.getCurrentSubMenu.current = "none";
}
Game.chestCheck = function(){
	for(var i = 0; i < Game.chests.length; i++){
		if(Game.player.crashWith(Game.chests[i])){
			return true;
		}
	}
	return false;
}

Game.checkInventory = function(num){
	if(Game.player.checkItem(num)){
		return Game.player.getItem(num).name;
	}else{
		return "Empty";
	}
}
Game.getInventoryItem = function(num){
	if(Game.player.checkItem(num)){
		return Game.player.getItem(num);
	}else{
		return "empty.png";
	}
}
Game.openInventory = function(){
	Game.inventoryIcons();
	Game.player.canMove = false;
	Game.pause = true;
	Game.getCurrentSubMenu.current = "inventory";
	var temp = Game.inventoryText;
	temp.line11.text = "Press the specified number to use item";
	temp.line1.text = "[1]: " + Game.checkInventory(1);
	temp.line2.text = "[2]: " + Game.checkInventory(2);
	temp.line3.text = "[3]: " + Game.checkInventory(3);
	temp.line4.text = "[4]: " + Game.checkInventory(4);
	temp.line5.text = "[5]: " + Game.checkInventory(5);
	temp.line6.text = "[6]: " + Game.checkInventory(6);
	temp.line7.text = "[7]: " + Game.checkInventory(7);
	temp.line8.text = "[8]: " + Game.checkInventory(8);
	temp.line9.text = "[9]: " + Game.checkInventory(9);
	temp.line10.text = "[10]: " + Game.checkInventory(10);
}
Game.closeInventory = function(){
	Game.getCurrentSubMenu.current = "none";
	Game.player.canMove = true;
	Game.pause = false;
}


//Prefix's
//Premade Structures


//Create Room Prefix
//todo
Game.createRoom = function(x,y,width,height,doors){
	
}




Game.DeveloperMode = function(){
	Game.dev = true;
	Game.showAllTriggers();
}
