var EVENT = {}
var OBJECT_IS_SELECTED = null;
var SELECTED_OBJECT = null;
var LAST_SELECTED = null;
var raycaster, intersects;
var MOUSE_IS_DOWN = false;
var MOUSE_LOC_CHANGED = false;
var mouse;



EVENT.init = function(){
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	document.getElementById("canvas").addEventListener("mousedown", function(event){
    MOUSE_IS_DOWN = true;
    grid_clicked(event);
	}, false);

	document.getElementById("canvas").addEventListener("mousemove", function(event){
    MOUSE_LOC_CHANGED = true;
    if(MOVE_OBJ_ACTIVE){
    	//obj_position_change(event);
    }
    if(MOUSE_IS_DOWN && OBJECT_IS_SELECTED && CORNER_SELECTED!=null){
    	editMeshDimensions(event);
    }else if(MOUSE_IS_DOWN && OBJECT_IS_SELECTED && CORNER_SELECTED==null){
    	obj_position_change(event);
    }else if(OBJECT_IS_SELECTED){
    	pos_change_Event = new CustomEvent('Editor_Obj_hover_check', { 'detail': event});
		document.dispatchEvent(pos_change_Event);
    }
	}, false);

	document.getElementById("canvas").addEventListener("mouseup", function(){
    MOUSE_IS_DOWN = false;
	}, false);
}

function obj_position_change(event){
	console.log("Position Changed Called");
	vector = new THREE.Vector3();
	vector.set(
   		 ( event.clientX / renderer.domElement.width ) * 2 - 1,
   		 - ( event.clientY / renderer.domElement.height ) * 2 + 1,
   		 0.5 );
	vector.unproject( camera );

	dir = vector.sub( camera.position ).normalize();
	distance = - camera.position.y / dir.y;
	pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
	SELECTED_OBJECT.position.x = Math.round(pos.x)-.5;
	SELECTED_OBJECT.position.y = pos.y+.5;
	SELECTED_OBJECT.position.z = Math.round(pos.z)-.5;
	pos_change_Event = new CustomEvent('Editor_Obj_position_change', { 'detail': SELECTED_OBJECT});
	document.dispatchEvent(pos_change_Event);
}

function editMeshDimensions(event){
	console.log(.1*event.movementX);
		vector = new THREE.Vector3();
	vector.set(
   		 ( event.clientX / renderer.domElement.width ) * 2 - 1,
   		 - ( event.clientY / renderer.domElement.height ) * 2 + 1,
   		 0.5 );
	vector.unproject( camera );

	dir = vector.sub( camera.position ).normalize();
	//distance = - camera.position.y / dir.y;
	distance = - camera.position.y / dir.y;
	pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
	console.log("pos.y",pos.z);
	console.log("dir",dir);
	console.log("distance",distance);
	ModifyMesh.updateDimensions(SELECTED_OBJECT,5,pos.z);
}

function grid_clicked(event){
	
	event.preventDefault();
	mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;
	console.log(raycaster);
	raycaster.setFromCamera( mouse, camera);
	if (MOVE_OBJ_ACTIVE) {
		MOVE_OBJ_ACTIVE=false;
	}
	//Checks to see if we are hovering over a coner edit shape helper
	if(CORNER_SELECTED==null){
		intersects = raycaster.intersectObjects( GAME_OBJECTS.Shapes, false);	
		if ( intersects.length > 0 ) {
			console.log("called");
			if(SELECTED_OBJECT!=null){
				deselectEvent = new CustomEvent('Editor_Obj_Deselected', { 'detail': SELECTED_OBJECT});
				document.dispatchEvent(deselectEvent);
				SELECTED_OBJECT = intersects[0].object;
		    	selectEvent = new CustomEvent('Editor_Obj_Selected',{ 'detail': intersects[0].object});
				document.dispatchEvent(selectEvent);
				OBJECT_IS_SELECTED = true;
			}else{
				SELECTED_OBJECT = intersects[0].object;
		    	selectEvent = new CustomEvent('Editor_Obj_Selected',{ 'detail': intersects[0].object});
				document.dispatchEvent(selectEvent);
				OBJECT_IS_SELECTED = true;
			}
		}else if(SELECTED_OBJECT!=null){
				deselectEvent = new CustomEvent('Editor_Obj_Deselected', { 'detail': SELECTED_OBJECT});
				document.dispatchEvent(deselectEvent);
				SELECTED_OBJECT = null;
				OBJECT_IS_SELECTED = false;
			}
	}
}
