var SCENECOMPONENTS = {};
var SHAPES = {};
/*
*Adds a new 
*/
SCENECOMPONENTS.addShape = function(shape, length, width, height, LocationX, LocationY, LocationZ, shapeID, Scene){
	console.log("Called SCENECOMPONENTS.addShape", shape);
	//Adds a new cube to our scene based off of the user supplied params
	if(shape=="Cube"){
	var cube = null;	
	cube = new THREE.Mesh(new THREE.CubeGeometry(length, width ,height), new THREE.MeshNormalMaterial());
	cube.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(cube!=null){
			Scene.add(cube);
			SHAPES[shapeID] = cube;
		}
	}

	//Adds a new Shpere to our scene based off of the supplied params
	if(shape=="Sphere"){
	var sphere = null;	
	sphere = new THREE.Mesh(new THREE.SphereGeometry(length, 50,50), new THREE.MeshNormalMaterial());
	sphere.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(sphere!=null){
			Scene.add(sphere);
			SHAPES[shapeID] = sphere;
		}
	}

	//Adds a new Circle to our scene based off of the supplied params
	if(shape=="Circle"){
	var circle = null;

	circle = new THREE.Mesh( new THREE.CircleGeometry( length, 32), new THREE.MeshNormalMaterial());	
	circle.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(circle!=null){
			Scene.add(circle);
			SHAPES[shapeID] = circle;
		}
	}		

	//Adds a new Cylinder to our scene based off of the supplied params
	if(shape=="Cylinder"){
	var cylinder = null;

	cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 1, 1, 2, 50 ), new THREE.MeshNormalMaterial() );
	cylinder.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(cylinder!=null){
			Scene.add(cylinder);
			SHAPES[shapeID] = cylinder;
		}
	}

//Adds a new Dodecahedron to our scene based off of the supplied params
	if(shape=="Dodecahedron"){
	var dodecahedron = null;

    dodecahedron = new THREE.Mesh( new THREE.DodecahedronGeometry(1, 0), new THREE.MeshNormalMaterial());
	dodecahedron.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(dodecahedron!=null){
			Scene.add(dodecahedron);
			SHAPES[shapeID] = dodecahedron;
		}
	}

}

SCENECOMPONENTS.move = function(shape_ID, direction, steps){
	//var temp = shape_ID + ", " + direction + ", " + steps;
	//We call parseFloat to help javascript tell the difference between the arithmatic + and string concatination +
	
	//!!!!!!-----The -0 Helps javascript to recognize the following + opperator as an additon operator and not as a string concatination------!!!!!!  
	if(direction=="Left"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			shape.position.x = (shape.position.x - steps);
		}
	}if(direction=="Right"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			shape.position.x = (shape.position.x-0) + (steps-0);
		}
	}if(direction=="Up"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			//!!!!!!-----The -0 Helps javascript to recognize the following + opperator as an additon operator and not as a string concatination------!!!!!!
			shape.position.y = (shape.position.y-0) + (steps-0);
		}
	}if(direction=="Down"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			shape.position.y =  (shape.position.y - steps);
		}
	}if(direction=="Forward"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			shape.position.z = (shape.position.z - steps);
		}
	}if(direction=="Back"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			shape.position.z = (shape.position.z-0) + (steps-0);
		}
	}
}

