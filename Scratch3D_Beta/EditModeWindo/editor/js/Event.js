var EVENT = {}
var OBJECT_IS_SELECTED = null;
var SELECTED_OBJECT = null;
var LAST_SELECTED = null;
var raycaster, intersects;
var MOUSE_IS_DOWN = false;
var MOUSE_LOC_CHANGED = false;
var mouse;
var   previousMousePosition = {
        x: 0,
        y: 0
    };



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
    }else if(MOUSE_IS_DOWN && OBJECT_IS_SELECTED && CORNER_SELECTED==null && ROTAION_SELECTED==null){
    	obj_position_change(event);
    }else if(MOUSE_IS_DOWN && OBJECT_IS_SELECTED && ROTAION_SELECTED!=null){
    	objectRotation(event);
    }else if(OBJECT_IS_SELECTED){
    	pos_change_Event = new CustomEvent('Editor_Obj_hover_check', { 'detail': event});
		document.dispatchEvent(pos_change_Event);
    }
	}, false);

	document.getElementById("canvas").addEventListener("mouseup", function(){
    MOUSE_IS_DOWN = false;
    CORNER_SELECTED=null;
	}, false);
}

function obj_position_change(event){
	vector = new THREE.Vector3();
	vector.set(
   		 ( event.clientX / renderer.domElement.width ) * 2 - 1,
   		 - ( event.clientY / renderer.domElement.height ) * 2 + 1,
   		 0.5 );
	vector.unproject( camera );

	dir = vector.sub( camera.position ).normalize();
	distance = - camera.position.y / dir.y;
	pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
	SELECTED_OBJECT.position.x = Math.round(pos.x * 100) / 100;
	//SELECTED_OBJECT.position.y = Math.round(pos.y * 100) / 100;
	SELECTED_OBJECT.position.z = Math.round(pos.z * 100) / 100;
	pos_change_Event = new CustomEvent('Editor_Obj_position_change', { 'detail': SELECTED_OBJECT});
	document.dispatchEvent(pos_change_Event);
}

function objectRotation(e){

	console.log("Rotation Called");
	    var deltaMove = {
        x: e.offsetX-previousMousePosition.x,
        y: e.offsetY-previousMousePosition.y
    };

    //if(isDragging) {
            
        var deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new three.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));
        
        SELECTED_OBJECT.quaternion.multiplyQuaternions(deltaRotationQuaternion, SELECTED_OBJECT.quaternion);
    //}
    
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
}

function editMeshDimensions(event){
/*		vector = new THREE.Vector3();
	vector.set(
   		 ( event.clientX / renderer.domElement.width ) * 2 - 1,
   		 - ( event.clientY / renderer.domElement.height ) * 2 + 1,
   		 0.5 );
   		 	
	vector.unproject( camera );
	console.log("SELECTED_OBJECT: ",SELECTED_OBJECT);
	dir = vector.sub( camera.position ).normalize();*/

	vector = new THREE.Vector3();
	vector.set(
   		 ( event.clientX / renderer.domElement.width ) * 2 - 1,
   		 - ( event.clientY / renderer.domElement.height ) * 2 + 1,
   		 0.5 );
	vector.unproject( camera );
	dir = vector.sub( camera.position ).normalize();

	//Checks to see if we are trying to change the Y dimensions of the geometry
	if(CORNER_SELECTED.name=="face_4"||CORNER_SELECTED.name=="face_5"){
		distance = - camera.position.z / dir.z;
	}
	else{
		distance = - camera.position.y / dir.y;
	}
	pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
	ModifyMesh.updateDimensions(SELECTED_OBJECT,CORNER_SELECTED.name,pos);
	SELECTED.updateHelperPosition(SELECTED_OBJECT);
}

function grid_clicked(event){
	
	event.preventDefault();
	mouse.x = ( event.clientX / renderer.getSize().width ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.getSize().height ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera);
	if (MOVE_OBJ_ACTIVE) {
		MOVE_OBJ_ACTIVE=false;
	}
	//Checks to see if we are hovering over a coner edit shape helper
	if(CORNER_SELECTED==null && ROTAION_SELECTED==null){
		intersects = raycaster.intersectObjects( GAME_OBJECTS.Shapes, false);	
		if ( intersects.length > 0 ) {
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
