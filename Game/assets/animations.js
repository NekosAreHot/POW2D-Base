//ANIMATIONS 
Texture = {};
Texture.torch = ["Torch/torch1.png","Torch/torch2.png","Torch/torch3.png","Torch/torch4.png"];
Texture.bat = ["Bat/Bat.png","Bat/Bat2.png","Bat/Bat3.png"];

Game.Animations = {};
Game.Animations.inGame = [];
Game.Animations.numberInGame = 0;
//Animations are "animated" every 1 second
Game.Animations.create = function(GameObject,arraytextures,tick){
	this.hasRequested = false;
	this.tick = tick;
	this.obj = GameObject;
	this.textures = [];
	this.currentframe = 0;
	this.GameTick = 0;
	this.isPaused = false;
	//Add textures to this.textures
	for(var i = 0; i < arraytextures.length; i++){
		this.textures.push(arraytextures[i]);
	}
	this.frames = this.textures.length - 1;
	//Animate
	this.animate = function(){
		if(!this.isPaused){
			//Skips the tick for this.tick times
			if(this.GameTick < this.tick ){
				//Skip the tick for 1 second
				this.GameTick++;
			}else{
				//Render the animation
				if(this.obj.type == "projectile"){
					this.obj.projectile_image = this.textures[this.currentframe];
				}else{
					this.obj.setImage(this.textures[this.currentframe]);
				}
				if(this.currentframe == this.frames){
					this.currentframe = 0;
				}else{
					this.currentframe++;
				}
				this.GameTick = 0;
			}
		}
	}
	this.add = function(){
		Game.Animations.inGame.push(this);
	}
	this.pause = function(){
		for(var i = 0; i < Game.Animations.inGame.length; i++){
			if(Game.Animations.inGame[i] === this){
				this.isPaused = true;
			}
		}
	}
	this.play = function(){
		for(var i = 0; i < Game.Animations.inGame.length; i++){
			if(Game.Animations.inGame[i] === this){
				this.isPaused = false;
			}
		}
	}
}