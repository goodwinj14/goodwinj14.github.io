var SHAPES = {}

SHAPES.add = function(shape_name){
	var shape;
	
	if(shape_name=="add_cube"){
		shape =  newCube();
		shape.name="cube_"+shape.id;
	}else if(shape_name=="add_sphere"){
		shape =  newSphere();
		shape.name="sphere_"+shape.id;
	}else if(shape_name=="add_cylinder"){
		shape =  newCylinder();
		shape.name="cylinder_"+shape.id;
	}else if(shape_name=="add_tube"){
		shape =  newTube();
		shape.name="tube_"+shape.id;
	}else if(shape_name=="add_pyramid"){
		shape =  newPyramid();
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

function newCube(){
	var geometry = new THREE.BoxGeometry( 1,1,1);
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	shape.position.y=.5;
	return shape;
}

function newSphere(){
	var geometry = new THREE.SphereGeometry( .5,32,32);
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	return shape;
}

function newCylinder(){
	var geometry = new THREE.CylinderGeometry( .5, .5, 1, 32 );;
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	return shape;
}

function newTube(){
	var geometry = new THREE.TorusBufferGeometry( .5, .25, 16, 100 );
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	shape.position.z=-10;
	shape.rotation.x=Math.PI/2;
	
	return shape;
}

function newPyramid(){
	var geometry = new THREE.CylinderGeometry( 0, .71, 1, 4 );
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	shape.rotation.y=Math.PI/4;
	return shape;
}

function newCicrle(){
	var geometry = new THREE.CircleGeometry( .5, 32 );
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	shape.rotation.x= -Math.PI/2;
	return shape;
}

function newPlane(){
	var geometry = new THREE.PlaneGeometry( 1, 1, 2 );
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	shape.rotation.x= -Math.PI/2;
	return shape;
}

function newRing(){
	var geometry = new THREE.RingGeometry( .25, .5, 32 );
	var material = new THREE.MeshNormalMaterial();
	var shape = new THREE.Mesh( geometry, material );
	shape.rotation.x= -Math.PI/2;
	return shape;
}

