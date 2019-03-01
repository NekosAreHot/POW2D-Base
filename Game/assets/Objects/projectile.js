Game.howManyArrowsHaveCollidedWithTheWall = 0;
Game.projectiles = []; //So we can have multiple "projectiles" at any given time



Game.createProjectile = function(x,y,direction,speed,damage,owner,image){
	var temp = new Game.GameObject(20,20,"red",x,y,"projectile",true);
	temp.projectile_speed = speed;
	temp.projectile_facing = direction;
	temp.projectile_owner = owner;
	temp.projectile_image = "arrow_01e.png";
	temp.setImage("arrow_01e.png");
	if(image != null){
		temp.setImage(image);
		temp.projectile_image = image;
	}
	Game.projectiles.push(temp);	
	if(damage != null){
		temp.projectile_damagePerHit = damage;
	}else{
		temp.projectile_damagePerHit = Game.Items.Equipment.weapons.bow.attack;
	}
}

Game.createFireProjectile = function(x,y,direction,speed,damage,owner){
	var temp = new Game.GameObject(20,20,"red",x,y,"projectile",true);
	temp.projectile_speed = speed;
	temp.projectile_facing = direction;
	temp.projectile_owner = owner;
	temp.projectile_type = "magic";
	temp.projectile_image = "fire1.png";
	temp.setImage("fire1.png");
	Game.projectiles.push(temp);	
	if(damage != null){
		temp.projectile_damagePerHit = damage;
	}else{
		temp.projectile_damagePerHit = Game.Items.common.fire.attack;
	}
	var t = Game.projectiles[Game.projectiles.length - 1];
	var x = new Game.Animations.create(t,["fire1.png","fire 2.png","fire 3.png","fire 4.png"],0);
	x.add();
}
Game.createIceProjectile = function(x,y,direction,speed,damage,owner){
	Game.projectiles.push(new Game.GameObject(20,20,"blue",x,y,"projectile",true));	
	var temp = Game.GameObjects[Game.GameObjects.length - 1];
	temp.projectile_speed = speed;
	temp.projectile_facing = direction;
	temp.projectile_owner = owner;
	temp.projectile_type = "magic";
	if(damage != null){
		temp.projectile_damagePerHit = damage;
	}else{
		temp.projectile_damagePerHit = Game.Items.common.ice.attack;
	}
}
Game.createThunderProjectile = function(x,y,direction,speed,damage,owner){
	Game.projectiles.push(new Game.GameObject(20,20,"yellow",x,y,"projectile",true));	
	var temp = Game.GameObjects[Game.GameObjects.length - 1];
	temp.projectile_speed = speed;
	temp.projectile_facing = direction;
	temp.projectile_owner = owner;
	temp.projectile_type = "magic";
	if(damage != null){
		temp.projectile_damagePerHit = damage;
	}else{
		temp.projectile_damagePerHit = Game.Items.common.thunder.attack;
	}
}
Game.projectile_tick = function(){

}

Game.createSnowProjectile = function(x,y,direction,speed,damage,owner){
	var temp = new Game.GameObject(20,20,"white",x,y,"projectile",true);
	temp.projectile_speed = speed;
	temp.projectile_facing = direction;
	temp.projectile_owner = owner;
	temp.projectile_type = "magic";
	temp.projectile_image = "snowball.png";
	temp.setImage("snowball.png");
	Game.projectiles.push(temp);	
	if(damage != null){
		temp.projectile_damagePerHit = damage;
	}else{
		temp.projectile_damagePerHit = Game.Items.common.fire.attack;
	}
	var t = Game.projectiles[Game.projectiles.length - 1];

}

Game.createMysteryProjectile = function(x,y,direction,speed,damage,owner){
	var temp = new Game.GameObject(20,20,"black",x,y,"projectile",true);
	temp.projectile_speed = speed;
	temp.projectile_facing = direction;
	temp.projectile_owner = owner;
	temp.projectile_type = "magic";
	temp.projectile_image = "gem_01j.png";
	temp.setImage("gem_01j.png");
	Game.projectiles.push(temp);	
	if(damage != null){
		
		// REVERSE CONTROLS
		temp.projectile_damagePerHit = damage;
	}else{
		temp.projectile_damagePerHit = Game.Items.common.fire.attack;
	}
	var t = Game.projectiles[Game.projectiles.length - 1];

}
Game.traps = [];
Game.createShootingTile = function(x,y,damage,direction){
	var temp = {
		projectile_damage: damage,
		dir: null,
		x: x,
		y: y,
		shoot:function(){
			if(this.dir != null){
				Game.createFireProjectile(this.x,this.y,this.dir,15,15,{});
			}else{
				Game.createFireProjectile(this.x,this.y,
				Game.getRandom({r:"right",l:"left",d:"down",u:"up"}),15,15,{});
			}
		}
	}
	if(direction != null){
		temp.dir = direction;
	}
	Game.traps.push(temp);
}
Game.getTrap = function(x,y){
	
}