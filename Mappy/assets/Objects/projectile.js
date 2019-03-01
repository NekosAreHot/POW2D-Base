Game.createProjectile = function(x,y,direction,speed,damage){
	Game.GameObjects.push(new Game.GameObject(20,20,"grey",x,y,"projectile",true));	
	var temp = Game.GameObjects[Game.GameObjects.length - 1];
	temp.projectile_speed = speed;
	temp.projectile_dir = direction;
	if(damage != null){
		temp.projectile_damagePerHit = damage;
	}
}

Game.projectileTick = function(){
	//for(){
		
	//}
}