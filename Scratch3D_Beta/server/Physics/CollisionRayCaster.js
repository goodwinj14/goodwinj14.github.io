CollisionDetection = {};
var raycasters = [];

CollisionDetection.appendCasterTo = function(casterObject, touchObject, casterID, touchID){
	var casterObj = new CollisionDetection.RayCaster(casterObject, touchObject, casterID, touchID);
	raycasters.push(casterObj);
}

//The update function checks to see if there has been a change in the touch state of any of
//the objects in it list of objects
CollisionDetection.update = function(){
	test.CollisionCheck();
}

CollisionDetection.RayCaster = function(caster, casterID, touch, touchID){
	//The mesh that the ray caster will be applied to
	this.mesh = caster;
	//The objects we want to test if the mesh is touching
	this.conntactObjects = [];
	//The object ID that is associated with the mesh provided
	this.ID = objectID;
	//The actual ray caster for this object
	this.caster = new THREE.Raycaster();
	//The rays that will be projected from the origin point when we test for colisions
    this.rays = [
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(1, 0, 1),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(1, 0, -1),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(-1, 0, -1),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(-1, 0, 1)
    ];

    //Sets up the raycaster far 
    console.log("Caster Object"this.objects);

	this.CollisionCheck = function(){
	console.log(this.object);
	}

};