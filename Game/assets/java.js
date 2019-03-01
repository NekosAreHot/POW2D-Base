Game.Java = {};
Game.Java.run = function(file){
	//Overwrite file
	
	//Run main
	exe.exec("java-engine.exe");
}
Game.Java.create = function(data,name){
	
	exe.exec("Java/compile.exe");
}
Game.Java.read = function(dir){
	
}