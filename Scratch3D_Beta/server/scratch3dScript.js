var Scratch3d = {}
/***************************************************************************
The Base Global attributes that all projects have.
****************************************************************************/
var scene;
var renderer;
var camera;
var windowActive = false;
Scratch3d.init = function(){
			
			scene = new THREE.Scene();
			renderer = new THREE.WebGLRenderer();
			camera = new THREE.PerspectiveCamera( 75, document.getElementById('container').offsetWidth/document.getElementById('container').offsetHeight, 0.1, 1000 );
			renderer.setSize(document.getElementById('container').offsetWidth,document.getElementById('container').offsetHeight);
			document.getElementById('container').appendChild( renderer.domElement );
			
			console.log("Scene", scene);
			var render = function () {
				if(windowActive){
				requestAnimationFrame( render );
				console.log("rendering");
				renderer.render(scene, camera);
				}
			};
			render();
}