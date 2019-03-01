Game.Dialog = {};
Game.Dialog.isActive = false;
Game.Dialog.element = new Game.GameObject(1000,600,Game.File.getImageDirectory() + /*"dialog_box.png"*/"parchment.png",0,340,"image");
Game.Dialog.element.isHidden = true;
Game.Dialog.texts = [];
Game.Dialog.textsMSG = [];
Game.Dialog.NpcPic = new Game.GameObject(100,100,Game.File.getImageDirectory() + "exlamation.png",80,375,"image");
Game.Dialog.NpcPic.isHidden = true;
Game.Dialog.setText = function(text, position, color,font,fontStyle){
	var x = 18 * 20;
	var pos = 20 * position;
	Game.Dialog.element.isHidden = false;
	Game.Dialog.isActive = true;
	this.color = "black";
	this.font = "Times";
	this.fontStyle = "normal";
	if(color != null){
		this.color = color;
	}
	if(font != null){
		this.font = font;
	}
	if(fontStyle != null){
		/** ---FONTSTYLES---
		* normal
		* italic
		* oblique
		* bold
		* bolder
		* lighter
		* small-caps
		* 100 - 900 = the intensity of the boldness
		**/
		this.fontStyle = fontStyle;	
	}
	Game.Dialog.texts.push(new Game.GameObject(this.fontStyle + " 20px",this.font,this.color,300,x + pos,"text"));
	Game.Dialog.textsMSG.push(text);
	Game.Dialog.texts[Game.Dialog.texts.length - 1].text = text;
	Game.Dialog.NpcPic.isHidden = false;
}
Game.Dialog.update = function(){
	Game.Dialog.element.update();
	for(var i = 0; i < Game.Dialog.texts.length; i++){
		Game.Dialog.texts[i].text = Game.Dialog.textsMSG[i]
		Game.Dialog.texts[i].update();
	}
	Game.Dialog.NpcPic.update();
}
Game.Dialog.hide = function(){
		Game.Dialog.element.isHidden = true;
		Game.Dialog.NpcPic.isHidden = true;
		Game.Dialog.NpcPic.image = null;
		Game.Dialog.NpcPic.setImage("exlamation.png");
		Game.Dialog.texts = [];
		Game.Dialog.textsMSG = [];
}
Game.Dialog.displayChestText = function(){
	Game.Dialog.hide();
	Game.Dialog.setText("You see a chest!",3);
	Game.Dialog.setText("Press [F] to interact!",6,"green");
}
Game.Dialog.displayItemStats = function(item){
	Game.Dialog.hide();
	Game.Dialog.setText("Item: " + item.name, 1);
	if(item.icon != null){
		Game.Dialog.NpcPic.setImage(item.icon);
	}else{
		Game.Dialog.NpcPic.setImage("droppedItem_texture.png");
	}
	var line = 2;
	if(item.attack != null){
		Game.Dialog.setText("Attack Bonus: " + item.attack,line);
		line++;
	}
	if(item.rarity != null){
		Game.Dialog.setText("Rarity: " + item.rarity,line);
		line++;
	}
	if(item.description != null){
		Game.Dialog.setText(item.description,line);
		line++;
	}
	Game.Dialog.setText("Press [E] to interact",6,"green");
}
Game.Dialog.combat = function(obj){
	Game.Dialog.hide();
	var other = Game.Entities.getEntity(Game.getPlayerX(),Game.getPlayerY());
	if(other.damagePerHit != undefined){
		if(other.health != Infinity){
			if(obj != null){
				Game.Dialog.setText("You dealt " + obj.damagePerHit + " and Took " + other.damagePerHit,2);
			}else{
				Game.Dialog.setText("You dealt " + Game.player.damagePerHit + " and Took " + other.damagePerHit,2);
			}
		}else{
			Game.Dialog.setText("Your attacks seem to do nothing, try to hit another spot",2);
		}
	}else{
		Game.Dialog.setText("You dealt " + Game.player.damagePerHit + " and Took " + Game.bossDamagerPerHit,2);
	}
}

Game.Dialog.Format = function(){
	//Get all the args into a easy varable
	var args = arguments;
	//END OF BEGINNING CODE
	/** ---FONTSTYLES---
	* normal
	* italic
	* oblique
	* bold
	* bolder
	* lighter
	* small-caps
	* 100 - 900 = the intensity of the boldness
	**/
	var out = new String();
	for (var i = 0; i < args.length; i++){
		if (args[i] == "n") out += " normal";
		if (args[i] == "i") out += " italic";
		if (args[i] == "o") out += " oblique";
		if (args[i] == "b") out += " bold";
		if (args[i] == "bb") out += " bolder";
		if (args[i] == "l") out += " lighter";
		if (args[i] == "sc") out += " small-caps";
	}
	
	//Give the format back to the caller
	return out;
}