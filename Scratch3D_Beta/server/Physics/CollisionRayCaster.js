CollisionDetection = {};
var raycasters = [];

//The extention source to post the message two
CollisionDetection.messageSource = null;
//The origin of the extention we wish to pase the object 
//contaning the touch events to.
CollisionDetection.origin = null;

//The last object that was sent to the scratch extension window.
CollisionDetection.lastTouching = "";

CollisionDetection.appendCasterTo = function(casterObject, touchObject, casterID, touchID){
	var casterObj = new CollisionDetection.RayCaster(casterObject, casterID, touchObject, touchID);
	raycasters.push(casterObj);
}

//The update function checks to see if there has been a change in the touch state of any of
//the objects in it list of objects
CollisionDetection.update = function(){

	var touchReturn ="";

	for (var i = raycasters.length - 1; i >= 0; i--) {
		var temp = raycasters[i];
		temp.CollisionCheck();
		if(temp.isTouching.length>0){
		touchReturn = touchReturn+temp.name+":"+'\"'+temp.isTouching+'\"';
		}
	};
	touchReturn = touchReturn

	if(CollisionDetection.lastTouching != touchReturn){
		CollisionDetection.lastTouching = touchReturn;
		//If the we have had a change in the current touch state 
		//A messgae will be passed to the extention with the new touching state data
		if(CollisionDetection.messageSource!=null || CollisionDetection.origin!=null){
		CollisionDetection.messageSource.postMessage("RAYCASTTOUCH_"+CollisionDetection.lastTouching,CollisionDetection.origin);
		console.log(CollisionDetection.lastTouching);
		}
	}
}

CollisionDetection.touchingObject = {};

CollisionDetection.RayCaster = function(caster, casterID, touch, touchID){
	//sets the name of the object to the touchID name 
	touch.name = touchID;
	caster.name = casterID;
	//Boolean value to check if object was touching on last update
	this.wasTouchingLast = false;
	this.isTouching = [];
	//The mesh that the ray caster will be applied to
	this.mesh = caster;
	//The objects we want to test if the mesh is touching
	this.conntactObjects = [];
	this.conntactObjects.push(touch);
	//The object ID that is associated with the mesh provided
	this.name = casterID;
	//The actual ray caster for this object
	this.caster = new THREE.Raycaster();
	this.caster.far = 32;
	//The rays that will be projected from the origin point when we test for colisions
	this.rays = this.mesh.geometry.vertices;
	//Sets the rays to the caster

    //Sets up the raycaster far 
    console.log("Caster Object", this.rays);

	this.CollisionCheck = function(){
		//this.isTouching = [];
		for (var i = this.rays.length - 1; i >= 0; i--) {
			this.caster.set(this.mesh.position, this.rays[i]);
			var touching = this.caster.intersectObjects(this.conntactObjects);

			for (var j = touching.length - 1; j >= 0; j--) {
				//Checks to see if the touch object has already been detected by another array
				if(this.isTouching.indexOf(touching[j].object.name)<0){
					this.isTouching.push(touching[j].object.name);
				}
			};
		};
			
	}

}