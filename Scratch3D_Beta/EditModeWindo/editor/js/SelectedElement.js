var SELECTED = {}
var box_helper;
var boundingBox;
var particles;
var obj_Is_Selected;
var avtive_Object;
var shapeHelpers = null;
var CORNER_SELECTED = null;
var ROTAION_SELECTED = null;
var POSTION_SELECTED = null;
var rotationX_Color;
var rotationY_Color;
var rotationZ_Color;
var rotation_Select_Color;
var conner_select_color;
var rotate_x;
var rotate_y;
var rotate_z;
var arrowHelper;

SELECTED.init = function(object){
	if(shapeHelpers == null){
    rotationX_Color = new THREE.Color("rgb(0, 255, 255)");
    rotationY_Color = new THREE.Color("rgb(255, 255, 0)");
    rotationZ_Color = new THREE.Color("rgb(255, 0, 255)");
    rotation_Select_Color = new THREE.Color("rgb(255, 0, 0)");
    conner_select_color = new THREE.Color("rgb(0, 255, 30)");

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	object.geometry.computeBoundingBox();
	boundingBox = object.geometry.boundingBox;

	shapeHelpers = new THREE.Object3D();
	shapeHelpers.name="Points";
	size = 0.04;
	face_0 = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial() );
	face_0.position.set(boundingBox.max.x,boundingBox.min.y,0);
	face_0.material.color = new THREE.Color("rgb(0, 255, 30)");
	face_0.name = "face_0";

	face_1 = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial() );
	face_1.position.set(boundingBox.min.x,boundingBox.min.y,0);
	face_1.material.color = new THREE.Color("rgb(0, 255, 30)");
	face_1.name = "face_1";

	face_2 = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial() );
	face_2.position.set(0,boundingBox.min.y,boundingBox.max.z);
	face_2.material.color = new THREE.Color("rgb(0, 255, 30)");
	face_2.name = "face_2";

	face_3 = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial() );
	face_3.position.set(0,boundingBox.min.y,boundingBox.max.z);
	face_3.material.color = new THREE.Color("rgb(0, 255, 30)");
	face_3.name = "face_3"

	face_4 = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial() );
	face_4.position.set(0,boundingBox.max.y,0);
	face_4.material.color = new THREE.Color("rgb(0, 255, 30)");
	face_4.name = "face_4";

	mat_ring_x = new THREE.MeshBasicMaterial();
	mat_ring_x.side = THREE.DoubleSide;
	mat_ring_x.color = rotationX_Color;
	rotate_x = new THREE.Mesh(new THREE.RingBufferGeometry( 1, 1.05, 64 ), mat_ring_x);
	rotate_x.rotation.y = Math.PI/2;
	rotate_x.name = "rotate_x";

	mat_ring_y = new THREE.MeshBasicMaterial();
	mat_ring_y.side = THREE.DoubleSide;
	mat_ring_y.color = rotationY_Color;
	rotate_y = new THREE.Mesh(new THREE.RingBufferGeometry( 1, 1.05, 64 ), mat_ring_y);
	rotate_y.rotation.x = Math.PI/2;
	rotate_y.name = "rotate_y";

	mat_ring_z = new THREE.MeshBasicMaterial();
	mat_ring_z.side = THREE.DoubleSide;
	mat_ring_z.color = rotationZ_Color;
	rotate_z = new THREE.Mesh(new THREE.RingBufferGeometry( 1, 1.05, 64 ), mat_ring_z);
	rotate_z.name = "rotate_z";

	var dir = new THREE.Vector3( 0, 1, 0 );
	var origin = new THREE.Vector3( 0, boundingBox.max.y, 0 );
	var length = 0.5;
	var hex = 0xffff00;

    arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    //arrowHelper.name = "position_y";

    scene.add(createAlignGUI());

	shapeHelpers.add(face_0);
	shapeHelpers.add(face_1);
	shapeHelpers.add(face_3);
	shapeHelpers.add(face_2);
	shapeHelpers.add(face_4);
	shapeHelpers.add(rotate_x);
	shapeHelpers.add(rotate_y);
	shapeHelpers.add(rotate_z);
	//shapeHelpers.add(arrowHelper);

	shapeHelpers.position.set(object.position.x, object.position.y, object.position.z);

	scene.add( shapeHelpers );

	//shapeHelpers.position.x = object.position.x;
	//shapeHelpers.position.y = object.position.y;
	//shapeHelpers.position.z = object.position.z;
	document.addEventListener('Editor_Obj_Deselected', SELECTED.deselect);
	document.addEventListener('Editor_Obj_Selected', SELECTED.select);
	document.addEventListener('Editor_Obj_position_change', SELECTED.select);
	document.addEventListener('Editor_Obj_hover_check', SELECTED.helperHoverCheck);
	}else{
	shapeHelpers.position.x = object.position.x;
	shapeHelpers.position.y = object.position.y;
	shapeHelpers.position.z = object.position.z;
	}
}
 
SELECTED.select = function(event){
	avtive_Object = event.detail;
	avtive_Object.geometry.computeBoundingBox();
	boundingBox = avtive_Object.geometry.boundingBox;
	//boundingBox.setFromObject( avtive_Object );

	face_0.position.set(boundingBox.max.x+0.02,boundingBox.min.y,0);
	face_1.position.set(boundingBox.min.x-0.02,boundingBox.min.y,0);
	face_2.position.set(0,boundingBox.min.y,boundingBox.min.z-0.02);
	face_3.position.set(0,boundingBox.min.y,boundingBox.max.z+0.02);
	face_4.position.set(0,boundingBox.max.y+0.02,0);

	maxHeight = (((boundingBox.max.x-boundingBox.min.x)-1)/2)+1;
	if((boundingBox.max.y-boundingBox.min.y)>maxHeight){
		maxHeight = (((boundingBox.max.y-boundingBox.min.y)-1)/2)+1;
	}if((boundingBox.max.z-boundingBox.min.z)>maxHeight){
		maxHeight = (((boundingBox.max.z-boundingBox.min.z)-1)/2)+1;
	}
	rotate_x.geometry.computeBoundingBox();

	

	//console.log("(rotate_x.geometry.boundingBox.max.x+rotate_x.geometry.boundingBox.min.x)", Math.floor(((rotate_x.geometry.boundingBox.max.x-rotate_x.geometry.boundingBox.min.x)/2));
	rotate_x.scale.set(maxHeight,maxHeight,maxHeight);
	rotate_y.scale.set(maxHeight,maxHeight,maxHeight);
	rotate_z.scale.set(maxHeight,maxHeight,maxHeight);
	//avtive_Object.position.x = avtive_Object.position.x+((avtive_Object.scale.x-(boundingBox.max.x-boundingBox.min.x))/2);
	//avtive_Object.position.y = avtive_Object.position.y+((avtive_Object.scale.y-(boundingBox.max.y-boundingBox.min.y))/2);
	//avtive_Object.position.z = avtive_Object.position.z+((avtive_Object.scale.z-(boundingBox.max.z-boundingBox.min.z))/2);

	shapeHelpers.position.x = avtive_Object.position.x;
	shapeHelpers.position.y = avtive_Object.position.y;
	shapeHelpers.position.z = avtive_Object.position.z;

	arrowHelper.position.y = avtive_Object.position.y;

	scene.add( shapeHelpers );

}

SELECTED.updateHelperPosition = function(obj){
	avtive_Object = obj;
	avtive_Object.geometry.computeBoundingBox();
	boundingBox = avtive_Object.geometry.boundingBox;

	//boundingBox.setFromObject( avtive_Object );
	//rotate_x.geometry.computeBoundingBox();
		maxHeight = (((boundingBox.max.x-boundingBox.min.x)-1)/2)+1;
	if((boundingBox.max.y-boundingBox.min.y)>maxHeight){
		maxHeight = (((boundingBox.max.y-boundingBox.min.y)-1)/2)+1;
	}if((boundingBox.max.z-boundingBox.min.z)>maxHeight){
		maxHeight = (((boundingBox.max.z-boundingBox.min.z)-1)/2)+1;
	}
	
	rotate_x.scale.set(maxHeight,maxHeight,maxHeight);
	rotate_y.scale.set(maxHeight,maxHeight,maxHeight);
	rotate_z.scale.set(maxHeight,maxHeight,maxHeight);

	face_0.position.set(boundingBox.max.x+0.02,boundingBox.min.y,0);
	face_1.position.set(boundingBox.min.x-0.02,boundingBox.min.y,0);
	face_2.position.set(0,boundingBox.min.y,boundingBox.min.z-0.02);
	face_3.position.set(0,boundingBox.min.y,boundingBox.max.z+0.02);
	face_4.position.set(0,boundingBox.max.y+0.02,0);

	shapeHelpers.position.x = avtive_Object.position.x;
	shapeHelpers.position.y = avtive_Object.position.y;
	shapeHelpers.position.z = avtive_Object.position.z;

	arrowHelper.position.y = avtive_Object.position.y;
}

SELECTED.deselect = function(event){
	scene.remove( scene.getObjectByName("Points") );
}


SELECTED.update = function(event){
	avtive_Object = event.detail

}

SELECTED.helperHoverCheck = function(event){
				
				mouse.x = ( (event.detail.clientX) / renderer.getSize().width ) * 2 - 1;
				mouse.y = - ( (event.detail.clientY) / renderer.getSize().height ) * 2 + 1;
				raycaster.setFromCamera( mouse, camera );

				intersects = raycaster.intersectObjects( shapeHelpers.children, true);
				if ( intersects.length > 0 ) {
					console.log("POSTION_SELECTED", intersects[0].object);
					if(intersects[0].object.name.indexOf("face")>-1){
						CORNER_SELECTED = intersects[0].object;
					}else if(intersects[0].object.name.indexOf("rotate")>-1){
						ROTAION_SELECTED = intersects[0].object;
					}else if(intersects[0].object.name.indexOf("position")>-1){
						POSTION_SELECTED = intersects[0].object;
						
					}

					if(CORNER_SELECTED!=null){
						if(CORNER_SELECTED.name.indexOf("face")>-1){
						CORNER_SELECTED.material.color = conner_select_color;
						}
					}
					intersects[0].object.material.color = rotation_Select_Color;
				

					
					
				}else if(!MOUSE_IS_DOWN){
					
					if(CORNER_SELECTED!=null){
						if(CORNER_SELECTED.name.indexOf("face")>-1){
							CORNER_SELECTED.material.color = conner_select_color;
						}
					}

					if(POSTION_SELECTED!=null){
						POSTION_SELECTED.material.color = rotationX_Color;
					}

					if(ROTAION_SELECTED!=null){
						if(ROTAION_SELECTED.name == "rotate_x"){
							ROTAION_SELECTED.material.color = rotationX_Color;
						}else if(ROTAION_SELECTED.name == "rotate_y"){
							ROTAION_SELECTED.material.color = rotationY_Color;
						}else if(ROTAION_SELECTED.name == "rotate_z"){
							ROTAION_SELECTED.material.color = rotationZ_Color;
						}
					}
					POSTION_SELECTED = null
					ROTAION_SELECTED = null;
					CORNER_SELECTED = null;
				}
}

function createAlignGUI(){

	var group = new THREE.Object3D();
	var geometry = new THREE.CircleBufferGeometry( .1, 32 );
	var material = new THREE.MeshPhongMaterial( { color: 0xdddddd,  shininess: 3, shading: THREE.FlatShading } );
	var circleOne = new THREE.Mesh( geometry, material );
	circleOne.material.side = THREE.DoubleSide;
	circleOne.rotation.x=Math.PI/2;
	circleOne.position.x = -0.5;

	var circleTwo = new THREE.Mesh( geometry, material );
	circleTwo.material.side = THREE.DoubleSide;
	circleTwo.rotation.x=Math.PI/2;
	circleTwo.position.x = -0.5;

	group.add(circleOne);
	group.add(circleTwo);
	return group;
}


