var EDITOR = {};
var gridHelper;
var scene;
var camera;
var viewWindow;
var renderer;
var MOVE_OBJ_ACTIVE = false;
var MOVE_OBJ;
EDITOR.TEST_OBJ = null;
EDITOR.intiEditor = function(viewport){
			viewWindow = viewport;
			console.log("viewport", viewport);
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 5, viewport.offsetWidth/viewport.offsetHeight, 0.1, 1000 );
			renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
			renderer.setSize( viewport.offsetWidth, viewport.offsetHeight );
			viewport.appendChild( renderer.domElement );
			renderer.domElement.id = "canvas";

			var size = 100;
			var step = 1;

			gridHelper = new THREE.GridHelper( size, step );
			gridHelper.name = "grid";
			scene.add( gridHelper );

			camera.position.z = 30;
			camera.position.y = 25;
			//cube.rotation.y = Math.PI/3;
			var vector = new THREE.Vector3(0,0,0);
			camera.lookAt(vector);

			controls = new THREE.TrackballControls( camera, viewport );

				controls.rotateSpeed = 1.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;

				controls.noZoom = false;
				controls.noPan = false;

				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;

				controls.keys = [ 65, 83, 68 ];

				controls.addEventListener( 'change', render );


			function animate() {

				requestAnimationFrame( animate );
				if(OBJECT_IS_SELECTED && MOUSE_IS_DOWN){
					
				}else{
					controls.update();
				}

				if(EDITOR.TEST_OBJ!=null){
					//console.log("needs upDating again  ", EDITOR.TEST_OBJ.geometry.verticesNeedUpdate); 
				}
			}
				
			var render = function () {
				requestAnimationFrame( render );
				renderer.render(scene, camera);
			};
			
			render();
			animate();
		}

EDITOR.update_grid = function(){
			var size = parseInt($('#grid_size').val());
			var steps = parseInt($('#grid_steps').val());
			if(size>0 && steps>0){
			scene.remove (scene.getObjectByName( "grid" ));
			gridHelper = new THREE.GridHelper( size, steps );
			gridHelper.name = "grid";
			scene.add( gridHelper );
			}
		}

EDITOR.add_shape = function(shape){
			obj = SHAPES.add(shape);
			obj.geometry.computeBoundingBox();
			obj.geometry.boundingBox.min.y;
			//Lifts the shape up to lay flat on build plane
			obj.position.y = obj.geometry.boundingBox.min.y*-1;
			scene.add(obj);
			SELECTED.init(obj);
			MOVE_OBJ = obj;
			SELECTED_OBJECT = obj;
			MOVE_OBJ_ACTIVE=true;
		}


