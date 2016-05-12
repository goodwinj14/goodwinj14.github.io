var SELECTED = {}
var box_helper;
var boundingBox;
var particles;
var obj_Is_Selected;
var avtive_Object;
var shapeHelpers = null;
var CORNER_SELECTED = null;

SELECTED.init = function(object){
	if(shapeHelpers == null){
	console.log(object);
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	object.geometry.computeBoundingBox();
	boundingBox = object.geometry.boundingBox;

	object.material.opacity = 0.7;
	shapeHelpers = new THREE.Object3D();
	shapeHelpers.name="Points";
	size = 0.04;
	right_fwd_coner = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial() );
	right_fwd_coner.position.set(boundingBox.max.x,boundingBox.min.y,boundingBox.max.z);
	right_fwd_coner.material.color = new THREE.Color("rgb(0, 255, 30)");

	Left_fwd_coner = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial() );
	Left_fwd_coner.position.set(boundingBox.min.x,boundingBox.min.y,boundingBox.max.z);
	Left_fwd_coner.material.color = new THREE.Color("rgb(0, 255, 30)");

	Left_back_coner = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial() );
	Left_back_coner.position.set(boundingBox.min.x,boundingBox.min.y,boundingBox.min.z);
	Left_back_coner.material.color = new THREE.Color("rgb(0, 255, 30)");

	right_back_coner = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial() );
	right_back_coner.position.set(boundingBox.max.x,boundingBox.min.y,boundingBox.min.z);
	right_back_coner.material.color = new THREE.Color("rgb(0, 255, 30)");

	top_center_coner = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial() );
	top_center_coner.position.set(((boundingBox.max.x-Math.abs(boundingBox.min.x)))/2,boundingBox.max.y+size,(boundingBox.max.z-Math.abs(boundingBox.min.z))/2);
	top_center_coner.material.color = new THREE.Color("rgb(0, 255, 30)");

	shapeHelpers.add(right_fwd_coner);
	shapeHelpers.add(Left_fwd_coner);
	shapeHelpers.add(right_back_coner);
	shapeHelpers.add(Left_back_coner);
	shapeHelpers.add(top_center_coner);
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

	right_fwd_coner.position.set(boundingBox.max.x,boundingBox.min.y,avtive_Object.position.z);
	Left_fwd_coner.position.set(boundingBox.min.x*avtive_Object.scale.x,boundingBox.min.y*avtive_Object.scale.y,boundingBox.max.z*avtive_Object.scale.z);
	Left_back_coner.position.set(boundingBox.min.x*avtive_Object.scale.x,boundingBox.min.y*avtive_Object.scale.y,boundingBox.min.z*avtive_Object.scale.z);
	right_back_coner.position.set(boundingBox.max.x*avtive_Object.scale.x,boundingBox.min.y*avtive_Object.scale.y,boundingBox.min.z*avtive_Object.scale.z);
	top_center_coner.position.set(Left_fwd_coner.position.x+((right_fwd_coner.position.x-Left_fwd_coner.position.x)/2),boundingBox.max.y*avtive_Object.scale.y+size,Left_fwd_coner.position.z+((right_back_coner.position.z-right_fwd_coner.position.z)/2));
	avtive_Object.position.x = avtive_Object.position.x+((avtive_Object.scale.x-(boundingBox.max.x-boundingBox.min.x))/2);
	avtive_Object.position.y = avtive_Object.position.y+((avtive_Object.scale.y-(boundingBox.max.y-boundingBox.min.y))/2);
	avtive_Object.position.z = avtive_Object.position.z+((avtive_Object.scale.z-(boundingBox.max.z-boundingBox.min.z))/2);

	shapeHelpers.position.x = avtive_Object.position.x;
	shapeHelpers.position.y = avtive_Object.position.y;
	shapeHelpers.position.z = avtive_Object.position.z;
	avtive_Object.material.opacity = .7;
	scene.add( shapeHelpers );
	avtive_Object.material.opacity = .7;
}

SELECTED.deselect = function(event){
	scene.remove( scene.getObjectByName("Points") );
	avtive_Object.material.opacity = 1;
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
					
					intersects[0].object.material.color.g=0;
					intersects[0].object.material.color.b=0;
					CORNER_SELECTED = intersects[0].object.material.color;
				}else if(CORNER_SELECTED!=null && !MOUSE_IS_DOWN){
					CORNER_SELECTED.g=1;
					CORNER_SELECTED.b=1;
					CORNER_SELECTED = null;
				}
}