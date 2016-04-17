var Scratch3d = {}
/***************************************************************************
The Base Global attributes that all projects have.
****************************************************************************/
var scene;
var renderer;
var camera;
var ext;
Scratch3d.windowActive = false;
Scratch3d.init = function(_ext){
			ext = _ext;
			scene = new THREE.Scene();
			renderer = new THREE.WebGLRenderer();
			camera = new THREE.PerspectiveCamera( 75, document.getElementById('container').offsetWidth/document.getElementById('container').offsetHeight, 0.1, 1000 );
			renderer.setSize(document.getElementById('container').offsetWidth,document.getElementById('container').offsetHeight);
			document.getElementById('container').appendChild( renderer.domElement );
			
			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( geometry, material );
			scene.add( cube );
			camera.position.z = 5;
			console.log("Scene", renderer);
			
			ext.text = function(){
			console.log("worked");
			};
			
			var render = function () {
				if(Scratch3d.windowActive){
				cube.rotation.x += 0.1;
				cube.rotation.y += 0.1;
				requestAnimationFrame( render );
				console.log("rendering");
				renderer.render(scene, camera);
				}
			};
			render();
}

//UPDATE THE SCREEN SIZE WHEN FULLSCREEN IS ENTERED
Scratch3d.updateWindow = function(){
  	renderer.setSize( document.getElementById('container').offsetWidth, document.getElementById('container').offsetHeight);
  	camera.aspect = document.getElementById('container').offsetWidth / document.getElementById('container').offsetHeight;
  	camera.updateProjectionMatrix();
}



Scratch3d.addShape = function(shape, length, width, height, LocationX, LocationY, LocationZ, Physics, shapeID, Scene){
	console.log("Called SCENECOMPONENTS.addShape", shape);
	//Adds a new cube to our scene based off of the user supplied params
	if(shape=="Cube"){
	var cube = null;
	if(Physics=="On"){
		cube = new Physijs.BoxMesh(new THREE.CubeGeometry(length, width ,height), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
	cube = new THREE.Mesh(new THREE.CubeGeometry(length, width ,height), new THREE.MeshNormalMaterial());
	}
	cube.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(cube!=null){
			Scene.add(cube);
			cube.name = shapeID;
			console.log("THE NEW NAME OF ", cube.name);
			SHAPES[shapeID] = cube;
			SCENECOMPONENTS.OBJECTS.push(cube);
		}
	}

	//Adds a new Shpere to our scene based off of the supplied params
	if(shape=="Sphere"){
	var sphere = null;	
	if(Physics=="On"){
		sphere = new Physijs.SphereMesh(new THREE.SphereGeometry(length, 50,50), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
	sphere = new THREE.Mesh(new THREE.SphereGeometry(length, 50,50), new THREE.MeshNormalMaterial());
	}
	sphere.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(sphere!=null){
			Scene.add(sphere);
			sphere.name = shapeID;
			SHAPES[shapeID] = sphere;
			SCENECOMPONENTS.OBJECTS.push(sphere);
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
			circle.name = shapeID;
			SHAPES[shapeID] = circle;
			SCENECOMPONENTS.OBJECTS.push(circle);
		}
	}		

	//Adds a new Cylinder to our scene based off of the supplied params
	if(shape=="Cylinder"){
	var cylinder = null; 
	if(Physics=="On"){
		cylinder = new Physijs.CylinderMesh( new THREE.CylinderGeometry( length, width, height, 50 ), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
		cylinder = new THREE.Mesh( new THREE.CylinderGeometry( length, width, height, 50 ), new THREE.MeshNormalMaterial() );
	}
	cylinder.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(cylinder!=null){
			Scene.add(cylinder);
			cylinder.name = shapeID;
			SHAPES[shapeID] = cylinder;
			SCENECOMPONENTS.OBJECTS.push(cylinder);
		}
	}

//Adds a new Dodecahedron to our scene based off of the supplied params
	if(shape=="Dodecahedron"){
	var dodecahedron = null;
	if(Physics=="On"){
		dodecahedron = new Physijs.ConvexMesh( new THREE.DodecahedronGeometry(length, 0), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
		dodecahedron = new THREE.Mesh( new THREE.DodecahedronGeometry(length, 0), new THREE.MeshNormalMaterial());
	}
    
	dodecahedron.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(dodecahedron!=null){
			Scene.add(dodecahedron);
			dodecahedron.name = shapeID;
			SHAPES[shapeID] = dodecahedron;
			SCENECOMPONENTS.OBJECTS.push(dodecahedron);
		}
	}

	//Adds a new Icosahedron to our scene based off of the supplied params
	if(shape=="Icosahedron"){
	var icosahedron = null;
	if(Physics=="On"){
		icosahedron = new Physijs.ConvexMesh( new THREE.IcosahedronGeometry(length, 0), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
		icosahedron = new THREE.Mesh( new THREE.IcosahedronGeometry(length, 0), new THREE.MeshNormalMaterial());
		}
		icosahedron.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(icosahedron!=null){
			Scene.add(icosahedron);
			icosahedron.name = shapeID;
			SHAPES[shapeID] = icosahedron;
			SCENECOMPONENTS.OBJECTS.push(icosahedron);
		}
	}


//Adds a new Plane to our scene based off of the supplied params
	if(shape=="Plane"){
	var plane = null;
	if(Physics=="On"){
		plane = new Physijs.ConvexMesh( new THREE.PlaneGeometry( length, width, 32 ), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
	 plane = new THREE.Mesh( new THREE.PlaneGeometry( length, width, 32 ), new THREE.MeshNormalMaterial());
	 }
	 plane.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(plane!=null){
			Scene.add(plane);
			plane.name = shapeID;
			SHAPES[shapeID] = plane;
			SCENECOMPONENTS.OBJECTS.push(plane);
		}
	}

//Adds a new Ring to our scene based off of the supplied params
	if(shape=="Ring"){
		var ring = null;
		if(Physics=="On"){
			ring = new Physijs.ConvexMesh( new THREE.RingGeometry( parseFloat(length), parseFloat(width)+1, 32 ), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
			ring = new THREE.Mesh( new THREE.RingGeometry( parseFloat(length), parseFloat(width)+1, 32 ), new THREE.MeshNormalMaterial());
		}
			ring.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(ring!=null){
			Scene.add(ring);
			ring.name = shapeID;
			SHAPES[shapeID] = ring;
			SCENECOMPONENTS.OBJECTS.push(ring);
		}
	}

//Adds a new Torus to our scene based off of the supplied params
	if(shape=="Torus"){
		var torus;
		if(Physics=="On"){
			torus = new Physijs.ConvexMesh( new THREE.TorusGeometry( parseFloat(width), parseFloat(length), 32, 100 ), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
 			torus = new THREE.Mesh( new THREE.TorusGeometry( parseFloat(width), parseFloat(length), 32, 100 ), new THREE.MeshNormalMaterial() );
	}
		torus.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(torus!=null){
			Scene.add(torus);
			torus.name = shapeID;
			SHAPES[shapeID] = torus;
			SCENECOMPONENTS.OBJECTS.push(torus);
		}
	}


}
