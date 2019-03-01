Game.myGameArea = {
    canvas : document.getElementById("game_screen"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 500;
		//Set the bacl=kground to be black
		document.body.style.backgroundColor = "Black";
		//Get all events
		this.canvas.bindEventToScreen = function(event,func) {
            window.addEventListener(event, function(e) {
				if(event == "keydown" || event == "keypress"){
					Game.handleInput(event,e);
				}
				if(event == "resize"){
					window.resizeTo(1200,550);
				}
            });
        };
		
		//Bind all events to the screen
		if(!Game.hasBinded){
			//initalize the keypress engine
			//Game.Console.sendMessage("Initalizing KeyPress Engine");
			// Bind keyboard input events
			this.canvas.bindEventToScreen('keydown');
			this.canvas.bindEventToScreen('resize');
			
			/**
			* Fixed the caps lock bug, it captured two events that do the same thing
			**/
			//this.canvas.bindEventToScreen('keypress');
			
			Game.hasBinded = true;
			//Game.Console.sendMessage("Loaded KeyPress Engine!");
		}
		
		
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
		//Interval called every 20 miliseconds to refresh the renderer
        this.interval = setInterval(Game.updateGameArea, 20);
		//GameTick runs every 1 second
		this.timePerTick = /*250*/500;
		this.interval2 = setInterval(Game.GameTick,this.timePerTick);
		//For modding, runs every 20 miliseconds
		this.modTick = setInterval(Game.modTick,20);
		//Run every 250 miliseconds
		this.animationTick = setInterval(Game.AnimationTick,250);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	getWidth : function(){
		return 1000;
	},
	getHeight : function(){
		return 500;
	}
}
Game.resizeCanvas = function(){
	window.resizeTo(1400,500);
}
Game.maximize = function(){
	Game.Screen.getHeight = screen.availHeight;
	Game.Screen.getWidth = screen.availWidth;
	window.resizeTo(screen.availHeight,screen.availWidth);
}
Game.minimize = function(){
	Game.resizeCanvas();
}