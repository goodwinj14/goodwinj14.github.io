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
	//The object ID that is associated with the mesh provided
	this.ID = casterID;
	//The actual ray caster for this object
	this.caster = new THREE.Raycaster();
	//The rays that will be projected from the origin point when we test for colisions
	var vertices = this.mesh.geometry.vertices;

	this.rays = [];
	var xFarthest = 0;
	var yFarthest = 0;
	var zFarthest = 0;
	for (var i = vertices.length - 1; i >= 0; i--) {
		console.log("Caster X", vertices[i].x);
		console.log("Caster Y", vertices[i].y);
		console.log("Caster Z", vertices[i].z);
		this.rays.push(new THREE.Vector3(vertices[i]));
	};

    

    //Sets up the raycaster far 
    console.log("Caster Object", vertices);

	this.CollisionCheck = function(){
	
	}

};