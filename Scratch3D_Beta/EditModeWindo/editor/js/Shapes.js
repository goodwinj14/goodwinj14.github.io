var SHAPES = {}

SHAPES.add = function(shape_name){
	var shape;
	
	if(shape_name=="add_cube"){
		shape =  newCube(1,1,1);
		shape.name="cube_"+shape.id;
	}else if(shape_name=="add_sphere"){
		shape =  newSphere(.5,32,32);
		shape.name="sphere_"+shape.id;
	}else if(shape_name=="add_cylinder"){
		shape =  newCylinder(.5,32,32);
		shape.name="cylinder_"+shape.id;
	}else if(shape_name=="add_tube"){
		shape =  newTube();
		shape.name="tube_"+shape.id;
	}else if(shape_name=="add_pyramid"){
		shape =  newRamp();
		shape.name="pyramid_"+shape.id;
	}else if(shape_name=="add_circle"){
		shape =  newCicrle();
		shape.name="circle_"+shape.id;
	}else if(shape_name=="add_plane"){
		shape =  newPlane();
		shape.name="plane_"+shape.id;
	}else if(shape_name=="add_ring"){
		shape =  newRing();
		shape.name="ring_"+shape.id;
	}
	GAME_OBJECTS.Shapes.push(shape);
	SELECTED.init(shape);
	
	return shape;
}

function newCube(width,height,depth){
	console.log("depth", depth);
	var geometry = new THREE.BoxBufferGeometry( width, height, depth);
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	shape.position.y=.5;
	return shape;
}

function newSphere(width,height,depth){
	var geometry = new THREE.SphereBufferGeometry( width,height,depth);
	console.log(geometry);
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	return shape;
}

function newCylinder(){
	var geometry = new THREE.CylinderBufferGeometry( .5, .5, 1, 32 );;
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	return shape;
}

function newTube(){
	var geometry = new THREE.TorusBufferGeometry( .5, .25, 16, 100 );
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	return shape;
}

function newPyramid(){
	var geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
var vertices = new Float32Array( [
	-0.5, 0, -0.5,
	 0.5, 0, -0.5,
	 -0.5, 0, 0.5,

	 -0.5, 0, 0.5,
	 0.5, 0, -0.5,
	 0.5, 0, 0.5,

	 -0.5, 0, -0.5,
	 -0.5, 0, 0.5,
	 0, 1, 0,

	 0.5, 0, -0.5,
	 -0.5, 0, -0.5,
	 0, 1, 0,

	 0.5, 0, 0.5,
	 0.5, 0, -0.5,
	 0, 1, 0,

	 -0.5, 0, 0.5,
	 0.5, 0, 0.5,
	 0, 1, 0
] );

// itemSize = 3 because there are 3 values (components) per vertex
geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
geometry.computeVertexNormals();
var material = new THREE.MeshNormalMaterial();
var shape = new THREE.Mesh( geometry, material );
	return shape;
}


function newRamp(){
	var geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
var vertices = new Float32Array( [
	 -0.5, 0, -0.5,
	 -0.5, 0, 0.5,
	 -0.5, 1, -0.5,

	 -0.5, 1, 0.5,
	 -0.5, 1, -0.5,
	 -0.5, 0, 0.5,

	 -0.5, 0, 0.5,
	 0.5, 0, 0.5,
	 -0.5, 1, 0.5,

	 0.5, 0, 0.5,
	 -0.5, 1, -0.5,
	 -0.5, 1, 0.5,

	 -0.5, 1, -0.5,
	 0.5, 0, -0.5,
	 0.5, 0, -.5
] );

// itemSize = 3 because there are 3 values (components) per vertex
geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
geometry.computeVertexNormals();
var material = new THREE.MeshNormalMaterial();
var shape = new THREE.Mesh( geometry, material );
	return shape;
}
function newCicrle(){
	var geometry = new THREE.CircleBufferGeometry( .5, 32 );
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	shape.rotation.x= -Math.PI/2;
	return shape;
}

function newPlane(){
	var geometry = new THREE.PlaneBufferGeometry( 1, 1, 2 );
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	shape.rotation.x= -Math.PI/2;
	return shape;
}

function newRing(){
	var geometry = new THREE.RingBufferGeometry( .25, .5, 32 );
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	shape.rotation.x= -Math.PI/2;
	return shape;
}

SHAPES.createFromExisting = function(shapeid, shape_name, width, height, depth){
	var shape;
	console.log("shape_name",shape_name);
	if(shape_name.indexOf("cube") > -1){
		console.log("depth2", depth);
		shape =  newCube(width, height, depth);
		shape.id = shapeid;
		shape.name="cube_"+shape.id;
	}else if(shape_name.indexOf("sphere") > -1){
		shape =  newSphere(width, height, depth);
		shape.name="sphere_"+shape.id;
	}else if(shape_name=="cylinder"){
		shape =  newCylinder();
		shape.name="cylinder_"+shape.id;
	}else if(shape_name=="tube"){
		shape =  newTube();
		shape.name="tube_"+shape.id;
	}else if(shape_name=="pyramid"){
		shape =  newPyramid();
		shape.name="pyramid_"+shape.id;
	}else if(shape_name=="circle"){
		shape =  newCicrle();
		shape.name="circle_"+shape.id;
	}else if(shape_name=="plane"){
		shape =  newPlane();
		shape.name="plane_"+shape.id;
	}else if(shape_name=="ring"){
		shape =  newRing();
		shape.name="ring_"+shape.id;
	}
	GAME_OBJECTS.Shapes.push(shape);
	SELECTED.init(shape);
	
	return shape;
}


