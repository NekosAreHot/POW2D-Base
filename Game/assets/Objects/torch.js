Game.createTorch = function(x,y){
	Game.GameObjects.push(new Game.GameObject(20,20,"red",x,y,"torch"));
	var obj = Game.GameObjects[Game.GameObjects.length - 1];
	var x = new Game.Animations.create(obj,Texture.torch,0);
	x.add();
}