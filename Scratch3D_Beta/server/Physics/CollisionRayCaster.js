CollisionDetection = {};
var raycasters = [];

CollisionDetection.appendCasterTo = function(casterObject, touchObject, casterID, touchID){
	var casterObj = new CollisionDetection.RayCaster(casterObject, touchObject, casterID, touchID);
	raycasters.push(casterObj);
}

//The update function checks to see if there has been a change in the touch state of any of
//the objects in it list of objects
CollisionDetection.update = function(){

}

CollisionDetection.RayCaster = function(caster, casterID, touch, touchID){
	//The mesh that the ray caster will be applied to
	this.mesh = caster;
	//The objects we want to test if the mesh is touching
	this.conntactObjects = [];
	this.conntactObjects.push(touch);
	//The object ID that is associated with the mesh provided
	this.ID = casterID;
	//The actual ray caster for this object
	this.caster = new THREE.Raycaster();
	this.caster.far = 32;
	//The rays that will be projected from the origin point when we test for colisions
	this.rays = this.mesh.geometry.vertices;
	//Sets the rays to the caster
	this.caster.set(this.mesh.position, this.rays[i]);

	console.log(this.caster.intersectObjects(this.conntactObjects));
    //Sets up the raycaster far 
    console.log("Caster Object", this.rays);

	this.CollisionCheck = function(){
	
	}

};