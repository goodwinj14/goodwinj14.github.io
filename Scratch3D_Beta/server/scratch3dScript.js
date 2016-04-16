var Scratch3d = {}
/***************************************************************************
The Base Global attributes that all projects have.
****************************************************************************/
var scene;
var renderer;
var camera;
Scratch3d.windowActive = false;
Scratch3d.init = function(){
			
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
			var render = function () {
				if(Scratch3d.windowActive){
				cube.rotation.x += 0.1;
				cube.rotation.y += 0.1;
				requestAnimationFrame( render );
				console.log("rendering");
				renderer.render(scene, camera);
				}
			};
			//render();
}

//UPDATE THE SCREEN SIZE WHEN FULLSCREEN IS ENTERED
Scratch3d.updateWindow = function(){
	renderer.clientHeight = document.getElementById('container').offsetHeight;
	renderer.clientWidth = document.getElementById('container').offsetWidth;
  	renderer.setViewport(0, 0, document.getElementById('container').offsetWidth, document.getElementById('container').offsetHeight);
  	camera.aspect = document.getElementById('container').offsetWidth / document.getElementById('container').offsetHeight;
  	camera.updateProjectionMatrix();
}
