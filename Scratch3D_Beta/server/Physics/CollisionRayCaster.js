CollisionDetection = {};
var raycasters = [];

CollisionDetection.appendCasterTo = function(object){

}

//The update function checks to see if there has been a change in the touch state of any of
//the objects in it list of objects
CollisionDetection.update = function(){
	var test = new CollisionDetection.RayCaster();
	console.log("collisionDetection");
	test.CollisionCheck();
}

CollisionDetection.RayCaster = function(){
	this.object = 'hello';

	this.CollisionCheck = function(){
	console.log(object);
	}

};