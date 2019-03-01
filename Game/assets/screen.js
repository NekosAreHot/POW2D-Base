Game.Screen = {};
Game.Screen.getWidth = 1200;
Game.Screen.getHeight = 700;
Game.Screen.resize = function(width,height){
  window.resizeTo(width,height);
}
Game.Screen.click = function(event,eventData){
	var clickx = eventData.clientX;
	var clicky = eventData.clientY;
	var btn = eventData.button;
	//Check to see if screen clicked a thing
	Game.Console.sendMessage(clickx + "," + clicky + ", btn:" + btn);
}