//Sounds are enabled by default
Game.isMuted = false;
Game.Sound = {};
Game.Sound.getAll = [];
Game.Sound.SoundElement = function(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	Game.Sound.getAll.push(this.sound);
	this.isLooped = null;
	this.loop = function(bool){
		this.isLooped = bool;
		this.sound.loop = bool;
	}
	this.isEnded = function(){
		return this.sound.ended;
	}
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	//document.body.appendChild(this.sound);
	this.play = function(){
		if(!Game.isMuted){
			this.sound.play();	
		}else{
			//if the game is muted
		}
	}
	this.stop = function(){
		this.sound.pause();
	}
	this.restart = function(){
		this.sound.currentTime = 0;
	}
	this.pause = function(){
		this.stop();
	}
	this.mute = function(){
		this.sound.muted = true;
	}
	this.unmute = function(){
		this.sound.muted = false;
	}
	this.setVolume = function(number){
		this.sound.volume = number;
	}
	this.getVolume = function(){
		return this.sound.volume;
	}
	this.getPlayTime = function(){
		return this.sound.duration;
	}
	this.getCurrentTime = function(){
		return this.sound.currentTime;
	}
};

var Sound = {
	mute : function(){
		Game.isMuted = true;
		this.restartAll();
	},
	unMute : function(){
		Game.isMuted = false;
		this.restartAll();
	},
	restartAll : function(){
		for(var i = 0;Game.Sound.getAll.length;i++){
			Game.Sound.getAll[i].pause();
			if(Game.isInMenu){
				this.theme.play();
			}
		}
	},
	pauseAll : function(){
		for(var i = 0;Game.Sound.getAll.length;i++){
			Game.Sound.getAll[i].pause();
		}
	},
	stopAll : function(){
		for(var i = 0;Game.Sound.getAll.length;i++){
			Game.Sound.getAll[i].pause();
		}
	},
	onDeath : new Game.Sound.SoundElement(Game.File.getSoundDirectory() + "entity_death.mp3"),
	Woosh : new Game.Sound.SoundElement(Game.File.getSoundDirectory() + "woosh.mp3"),
	Select : new Game.Sound.SoundElement(Game.File.getSoundDirectory() + "startbutton.mp3"),
	theme : new Game.Sound.SoundElement(Game.File.getSoundDirectory() + "theme.mp3"),
	inter : new Game.Sound.SoundElement(Game.File.getSoundDirectory() + "interact.mp3"),
	Chest : new Game.Sound.SoundElement(Game.File.getSoundDirectory() + "open.mp3"),
	Shop : new Game.Sound.SoundElement(Game.File.getSoundDirectory() + "shop.mp3"),
	water_env : new Game.Sound.SoundElement(Game.File.getSoundDirectory() + "env/water_env.mp3")
};

//Set Loop for all new sounds
Sound.Shop.loop(false);
Sound.Chest.loop(false);
Sound.inter.loop(false);
Sound.onDeath.loop(false);
Sound.Woosh.loop(false);
Sound.Select.loop(false);
Sound.theme.loop(true);

//Env's
Sound.water_env.loop(true);