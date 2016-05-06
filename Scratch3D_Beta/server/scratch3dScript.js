var Scratch3d = {}
/***************************************************************************
The Base Global attributes that all projects have.
****************************************************************************/
var scene;
var renderer;
var camera;
Scratch3d.windowActive = false;

//Array to hold all of the shape specific 
Scratch3d.shapeID = [];
Scratch3d.init = function(ext){
		console.log("Scratch3d.init  called");
			ext.newShape = function(shape, id, length, width, height, LocationX, LocationY, LocationZ){
 				Scratch3d.addShape( shape, id, length, width, height, LocationX, LocationY, LocationZ);
 				console.log(Scratch3d.shapeID[Scratch3d.shapeID.length-1]);
			};

			EDITOR.intiEditor(document.getElementById('container'));
			EVENT.init();
}

Scratch3d.test = function(){
 console.log("worked");
};
Scratch3d.updateWindow = function(){
	console.log(renderer);
	console.log(camera);
	camera.aspect = document.getElementById('container').width / document.getElementById('container').height;
    camera.updateProjectionMatrix();

    renderer.setSize( document.getElementById('container').width, document.getElementById('container').height );
}



Scratch3d.addShape = function(shape, id, length, width, height, LocationX, LocationY, LocationZ){
	//Adds a new cube to our scene based off of the user supplied params
	console.log("Scratch3d.addShape");
	if(shape=="Cube"){
	var cube = null;
	cube = new THREE.Mesh(new THREE.CubeGeometry(length, width ,height), new THREE.MeshNormalMaterial());
	cube.position.set(LocationX,LocationY,LocationZ);
	cube.name = id;
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(cube!=null){
			Scratch3d.shapeID[Scratch3d.shapeID.length]= id;
			scene.add(cube);
			
		}
	}

	//Adds a new Shpere to our scene based off of the supplied params
	if(shape=="Sphere"){
	var sphere = null;	
	sphere = new THREE.Mesh(new THREE.SphereGeometry(length, 50,50), new THREE.MeshNormalMaterial());
	sphere.position.set(LocationX,LocationY,LocationZ);
	sphere.name = id;
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(sphere!=null){
			scene.add(sphere);
		}
	}

	//Adds a new Circle to our scene based off of the supplied params
	if(shape=="Circle"){
	var circle = null;

	circle = new THREE.Mesh( new THREE.CircleGeometry( length, 32), new THREE.MeshNormalMaterial());	
	circle.position.set(LocationX,LocationY,LocationZ);
	circle.name = id;
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(circle!=null){
			scene.add(circle);
		}
	}		

	//Adds a new Cylinder to our scene based off of the supplied params
	if(shape=="Cylinder"){
	var cylinder = null; 
	cylinder = new THREE.Mesh( new THREE.CylinderGeometry( length, width, height, 50 ), new THREE.MeshNormalMaterial() );
	cylinder.position.set(LocationX,LocationY,LocationZ);
	cylinder.name = id;
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(cylinder!=null){
			scene.add(cylinder);
		}
	}

//Adds a new Dodecahedron to our scene based off of the supplied params
	if(shape=="Dodecahedron"){
	var dodecahedron = null;
	dodecahedron = new THREE.Mesh( new THREE.DodecahedronGeometry(length, 0), new THREE.MeshNormalMaterial());
	dodecahedron.position.set(LocationX,LocationY,LocationZ);
	dodecahedron.name = id;
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(dodecahedron!=null){
			scene.add(dodecahedron);
		}
	}

	//Adds a new Icosahedron to our scene based off of the supplied params
	if(shape=="Icosahedron"){
	var icosahedron = null;
	icosahedron = new THREE.Mesh( new THREE.IcosahedronGeometry(length, 0), new THREE.MeshNormalMaterial());
	icosahedron.position.set(LocationX,LocationY,LocationZ);
	icosahedron.name = id;
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(icosahedron!=null){
			scene.add(icosahedron);
		}
	}


//Adds a new Plane to our scene based off of the supplied params
	if(shape=="Plane"){
	var plane = null;
	 plane = new THREE.Mesh( new THREE.PlaneGeometry( length, width, 32 ), new THREE.MeshNormalMaterial());
	 plane.position.set(LocationX,LocationY,LocationZ);
	 plane.name = id;
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(plane!=null){
			scene.add(plane);
		}
	}

//Adds a new Ring to our scene based off of the supplied params
	if(shape=="Ring"){
		var ring = null;
		ring = new THREE.Mesh( new THREE.RingGeometry( parseFloat(length), parseFloat(width)+1, 32 ), new THREE.MeshNormalMaterial());
		ring.position.set(LocationX,LocationY,LocationZ);
		ring.name = id;
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(ring!=null){
			scene.add(ring);
		}
	}

//Adds a new Torus to our scene based off of the supplied params
	if(shape=="Torus"){
		var torus;
 		torus = new THREE.Mesh( new THREE.TorusGeometry( parseFloat(width), parseFloat(length), 32, 100 ), new THREE.MeshNormalMaterial() );
		torus.position.set(LocationX,LocationY,LocationZ);
		torus.name = id;
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(torus!=null){
			scene.add(torus);
		}
	}


}
