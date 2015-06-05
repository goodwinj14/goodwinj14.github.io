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

	cylinder = new THREE.Mesh( new THREE.CylinderGeometry( length, width, height, 50 ), new THREE.MeshNormalMaterial() );
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

    dodecahedron = new THREE.Mesh( new THREE.DodecahedronGeometry(length, 0), new THREE.MeshNormalMaterial());
	dodecahedron.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(dodecahedron!=null){
			Scene.add(dodecahedron);
			SHAPES[shapeID] = dodecahedron;
		}
	}

	//Adds a new Icosahedron to our scene based off of the supplied params
	if(shape=="Icosahedron"){
	var icosahedron = null;
		icosahedron = new THREE.Mesh( new THREE.IcosahedronGeometry(length, 0), new THREE.MeshNormalMaterial());
		icosahedron.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(icosahedron!=null){
			Scene.add(icosahedron);
			SHAPES[shapeID] = icosahedron;
		}
	}


//Adds a new Plane to our scene based off of the supplied params
	if(shape=="Plane"){
	var plane = null;
	 plane = new THREE.Mesh( new THREE.PlaneGeometry( length, width, 32 ), new THREE.MeshNormalMaterial());
	 plane.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(plane!=null){
			Scene.add(plane);
			SHAPES[shapeID] = plane;
		}
	}

//Adds a new Ring to our scene based off of the supplied params
	if(shape=="Ring"){
		var ring = null;
			ring = new THREE.Mesh( new THREE.RingGeometry( parseFloat(length), parseFloat(width)+1, 32 ), new THREE.MeshNormalMaterial());
			ring.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(ring!=null){
			Scene.add(ring);
			SHAPES[shapeID] = ring;
		}
	}

//Adds a new Torus to our scene based off of the supplied params
	if(shape=="Torus"){
		var torus;
 		torus = new THREE.Mesh( new THREE.TorusGeometry( parseFloat(width), parseFloat(length), 32, 100 ), new THREE.MeshNormalMaterial() );
		torus.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(torus!=null){
			Scene.add(torus);
			SHAPES[shapeID] = torus;
		}
	}


}

/*
**Adds a new object to the scene loaded from an outside source
*/
SCENECOMPONENTS.addOBJ = function(url, objID, Scene){

			//Loads at .OBJ file from an outside url and adds it to the sceen
			var objLoader = new THREE.OBJLoader();
    		var material = new THREE.MeshBasicMaterial({color: 'yellow', side: THREE.DoubleSide});
    		objLoader.load(url, function (obj) {
       		obj.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
                child.material = material;
            }

       	 });
       	console.log("LOADed Object: ", obj);
       Scene.add(obj);
       SHAPES[objID] = obj;
       });
	   
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

