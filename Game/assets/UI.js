Game.UI = {};
Game.UI.background = new Game.GameObject(Game.Screen.getWidth,Game.Screen.getHeight,"white",0,0);
//Set the background to not render by default
Game.UI.background.isHidden = true;
Game.UI.current = "none";
Game.UI.getCurrentMenuId = function(){
	return Game.UI.current;
}
Game.UI.menus = [];
Game.UI.Menu = function(id){
	//Constructor
	this.id = id;
	this.buttons = [];
	this.texts = [];
	//Button varables
	this.buttonWidth = 80;
	this.buttonHeight = 40;
	this.line = 1;
	this.paddingBetweenButtons = 5;
	//Text fonts
	this.fontSize = "20px";
	this.fontStyle = "Consolas";
	this.fontColor = "black";
	this.buttonColor = "grey";
	this.onOpenEvents = [];
	this.isActive = false;
	/**
	* Executes lines of code when menu is opened
	**/
	this.onOpen = function(){
		for(var i = 0; i < this.onOpenEvents.length; i++){
			this.onOpenEvents[i]();
		}
		this.isActive = true;
	}
	/**
	* Adds a line of code to the onOpen() event
	* @param {func} func - function
	**/
	this.addOpenEvent = function(func){
		this.onOpenEvents.push(func);
	}
	/**
	* Resets the lines for onOpen();
	**/
	this.clearOpenEvents = function(){
		this.onOpenEvents = [];
	}
	/**
	* Opens the menu
	**/
	this.open = function(){
		Game.UI.current = this.id;
		this.onOpen();
		//Set the background to render
		Game.UI.background.isHidden = false;
		//Set the buttons to render
		for(var i = 0; i < this.buttons.length; i++){
			this.buttons[i].isHidden = false;
		}
		//Set the texts to render
		for(var i = 0; i < this.texts.length; i++){
			this.texts[i].isHidden = false;
		}
	}
	/**
	* Closes the menu
	**/
	this.close = function(){
		Game.UI.current = "none";
		this.isActive = false;
		//Set the background to not render
		Game.UI.background.isHidden = true;
		//Set the buttons to not render
		for(var i = 0; i < this.buttons.length; i++){
			this.buttons[i].isHidden = true;
		}
		//Set the texts to not render
		for(var i = 0; i < this.texts.length; i++){
			this.texts[i].isHidden = true;
		}
	}
	/**
	* Sets the menus background
	* 
	**/
	this.setBackground = function(image){
		Game.UI.background.setImage(image);
	}
	this.addButton = function(text,image,properties){
		var x = 100;
		var y = 100;
		
		//EXAMPLE properties
		// var menu = new Game.UI.Menu("id");
		// menu.addButton("hello","example.png",{fontSize:"20px",fontStyle:"Consolas",fontColor:"Green",buttonHeight:20,buttonWidth:80,paddingBetweenButtons:10});
		
		if(properties != null){
			var input = properties;
			this.fontSize = input.fontSize;
			this.fontStyle = input.fontStyle;
			this.fontColor = input.fontColor;
			this.buttonHeight = input.buttonHeight;
			this.buttonWidth = input.buttonWidth;
			this.paddingBetweenButtons = input.paddingBetweenButtons;
			this.buttonColor = input.buttonColor;
		}
		
		
		//See if image was defined
		if(image != null){
			var img = image;
			this.buttons.push(new Game.GameObject(this.buttonWidth,this.buttonHeight,img,x,y,"image"));
		}else{
			this.buttons.push(new Game.GameObject(this.buttonWidth,this.buttonHeight,this.fontColor,x,y));
		}
		//Set that buttons text
		//Get the button
		var btn = this.buttons[this.buttons.length - 1];
		var txt = this.texts[this.texts.length - 1];
		var x = btn.x;
		var y = btn.y - this.paddingBetweenButtons + this.line * 20;
		this.texts.push(new Game.GameObject(this.fontSize,this.fontStyle,this.fontColor,x,y,"text"));
		if(!this.isActive){
			btn.isHidden = true;
			this.texts[this.texts.length - 1].isHidden = true;
		}
	}
	this.render = function(){
		Game.UI.background.update();
		for(var i = 0; i < this.buttons.length; i++){
			this.buttons[i].update();
		}
		for(var i = 0; i < this.texts.length; i++){
			this.texts[i].update();
		}
	}
	//Hand it to the rendering engine
	Game.UI.menus.push(this);
};