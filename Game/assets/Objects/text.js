Game.createText = function(line, msg,color,xcoord){
	var x = line * 20;
	if(color != null){
		if(xcoord != null){
			Game.Texts.push(new Game.GameObject("18px","Lucida Console",color,xcoord,x,"text"));
		}else{
			Game.Texts.push(new Game.GameObject("18px","Lucida Console",color,100,x,"text"));
		}
	}else{
		if(xcoord != null){
			Game.Texts.push(new Game.GameObject("18px","Lucida Console","white",xcoord,x,"text"));
		}else{
			Game.Texts.push(new Game.GameObject("18px","Lucida Console","white",100,x,"text"));
		}
	}
	
	Game.Texts[Game.Texts.length - 1].text = msg;
}

//All the Texts in the game
//Each line break is room for a text
Game.createText(.85,"Health: ","white",0);
Game.createText(.85,"EXP: ","white",260);
Game.createText(.85,"Gold: ","white",760);
Game.createText(.85,"Magic: ","white",510);
Game.createText(22,"Lv: ");
Game.createText(23, "Name");
Game.createText(18,"boss_header","red");
Game.createText(19,"boss_health","red");
Game.createText(21,"Arrows: ");

Game.HealthSpace = new Game.GameObject(250,20,"Textures/HealthCanvas2.png",0,0,"image");
Game.ExpSpace = new Game.GameObject(250,20,"Textures/expspace.png",250,0,"image");
Game.MagicSpace = new Game.GameObject(250,20,"Textures/magicspace.png",500,0,"image");
Game.GoldSpace = new Game.GameObject(250,20,"Textures/goldspace.png",750,0,"image");
















Game.createText(23, "Name");

