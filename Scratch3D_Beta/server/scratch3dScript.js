var scene = new THREE.Scene();
			var cube = null;
			var rot = false;
			var camera = new THREE.PerspectiveCamera( 75, document.getElementById('container').offsetWidth/document.getElementById('container').offsetHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(document.getElementById('container').offsetWidth,document.getElementById('container').offsetHeight);
			document.getElementById('container').appendChild( renderer.domElement );


			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );
			cube = new THREE.Mesh( geometry, material );
			scene.add( cube );
			cube.rotation.y = 90;
			cube.rotation.x = 90;
			camera.position.z = 5;
			camera.position.y = 1;
			camera.rotation.x = ( Math.PI / 180);
			
			function rotate(){
				rot = true;
			};
			var render = function () {
				requestAnimationFrame( render );
				console.log('rendering');
				if(rot){
				cube.rotation.x += 0.01;
				}
				renderer.render(scene, camera);
			};
			render();