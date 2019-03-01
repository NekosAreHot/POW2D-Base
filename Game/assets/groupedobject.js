/**
*	Allows you to group multiple objects
*   Has Infinite Paramaters
**/
Game.groupedObject = function(){
	
	//WHEN CONSTRUCTOR IS CALLED
	
	//Get all the args into a easy varable
	var args = arguments;
	//Create a varable to contain the gameObjects
	this.objects = [];
	//Get all the GameObjects in the args
	for(var i = 0; i < args.length; i++){
		//Put them into a array
		this.objects.push(args[i]);
	}
	
	//END OF BEGINNING CODE
	
	
	
	//Methods
	/**
	* Moves a specific object in the group
	**/
	this.move = function(num,dir){
		this.objects[num].move(dir);
	}
	
	/**
	* Moves all objects in a direction
	**/
	this.moveAll = function(dir){
		//Get all the objects
		var isHit = false;
		for(var i = 0; i < this.objects.length; i++){
			this.objects[i].move(dir);
		}
		for(var i = 0; i < this.objects.length; i++){
			if(this.objects[i].wallCheck()){
				if(this.objects[i].type == "entity"){
					var isHit = true;
				}
			}
		}
		if(isHit){
			for(var i = 0; i < this.objects.length; i++){
				this.objects[i].move(dir);
			}
		}
	}
	
	/**
	* Adds a new GameObject to the group
	**/
	this.add = function(GameObject){
		//Assuming the incoming varable is a GameObject
		this.objects.push(GameObject);
	}
	this.teleport = function(x,y){
		for(var i = 0; i < this.objects.length; i++){
			this.objects[i].teleport(x,y);
		}
	}
	/**
	* Removes a GameObject from the group
	**/
	this.remove = function(num){
		this.objects.splice(num,1);
	}
	
	/**
	* returns a GameObject
	**/
	this.get = function(num){
		return this.objects[num];
	}
	
	/**
	* Clears the group and makes it empty
	**/
	this.clear = function(){
		this.objects = [];
	}
}