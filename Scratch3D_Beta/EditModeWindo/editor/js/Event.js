var EVENT = {}
var OBJECT_IS_SELECTED = null;
var SELECTED_OBJECT = null;
var LAST_SELECTED = null;
var raycaster, intersects;
var MOUSE_IS_DOWN = false;
var MOUSE_LOC_CHANGED = false;
var mouse;
var IS_SHIFT_DOWN = false;
var   previousMousePosition = {
        x: 0,
        y: 0
    };



EVENT.init = function(){
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

//Updates current Key State 
	document.addEventListener("keydown", function(event){
		if(EDIT_MODE){

    		if(event.keyCode == 16){
    			if(!IS_SHIFT_DOWN){
    				IS_SHIFT_DOWN = true;
    			}
    		}
		}
	}, false);

	document.addEventListener("keyup", function(event){
		if(EDIT_MODE){
    		if(event.keyCode == 16){
    			if(IS_SHIFT_DOWN){
    				IS_SHIFT_DOWN = false;
    			}
    		}
		}
	}, false);
//Updates current Key State 

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

	var vector_a = new THREE.Vector3();
    var widthHalf = 0.5*renderer.context.canvas.width;
    var heightHalf = 0.5*renderer.context.canvas.height;

    SELECTED_OBJECT.updateMatrixWorld();
    vector_a.setFromMatrixPosition(SELECTED_OBJECT.matrixWorld);
    vector_a.project(camera);

    vector_a.x = ( vector_a.x * widthHalf ) + widthHalf;
    vector_a.y = - ( vector_a.y * heightHalf ) + heightHalf;

    var a = new THREE.Vector2( 0, 0 );
    var b = new THREE.Vector2( previousMousePosition.x-vector_a.x, previousMousePosition.y-vector_a.y );
    var c = new THREE.Vector2( e.offsetX-vector_a.x, e.offsetY-vector_a.y );

    //if(isDragging) {
         var deltaRotationQuaternion;

         var angle = Math.acos(b.dot(c)/(b.length()*c.length() ) );
  
    if(!isNaN(angle)){
         angle = ((Math.ceil(angle*(Math.PI / 180)))*Math.PI)/180;
         if((((b.x-a.x)*(c.y-a.y))- ((b.y-a.y)*(c.x-a.x)))>0){
         	angle = angle*-1;
         }
         if(ROTAION_SELECTED.name == "rotate_x"){
         		deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            	angle,0, 0,'XYZ'));
            	SELECTED_OBJECT.rotationalOffset.x += angle*(180/Math.PI);
	       }else if(ROTAION_SELECTED.name == "rotate_y"){
	       		deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            	0,angle, 0,'XYZ'));
            	SELECTED_OBJECT.rotationalOffset.y += angle*(180/Math.PI);
	       }else if(ROTAION_SELECTED.name == "rotate_z"){
	       		deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            	0,0, angle,'XYZ'));
            	SELECTED_OBJECT.rotationalOffset.z += angle*(180/Math.PI);
	       }
	       //var beta = Math.PI/2;
	       //var m2 = new THREE.Matrix4();
	       //m2.makeRotationY( beta );
	      // SELECTED_OBJECT.
	       SELECTED_OBJECT.quaternion.multiplyQuaternions(deltaRotationQuaternion, SELECTED_OBJECT.quaternion);
	       SELECTED_OBJECT.updateMatrix();
		   SELECTED_OBJECT.geometry.applyMatrix( SELECTED_OBJECT.matrix );
		   SELECTED_OBJECT.geometry.center();
		   SELECTED_OBJECT.geometry.computeBoundingBox();
		   SELECTED_OBJECT.rotation.set( 0, 0, 0 );

		   SELECTED_OBJECT.updateMatrix();
	       SELECTED_OBJECT.geometry.verticesNeedUpdate = true;
	       rot_change_Event = new CustomEvent('Editor_Obj_rotation_change', { 'detail': SELECTED_OBJECT});
		   document.dispatchEvent(rot_change_Event);
    }
    	   
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
	size_change_Event = new CustomEvent('Editor_Obj_size_change', { 'detail': SELECTED_OBJECT});
	document.dispatchEvent(size_change_Event);
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

			if(SELECTED_OBJECT!=null&&!IS_SHIFT_DOWN){
				deselectEvent = new CustomEvent('Editor_Obj_Deselected', { 'detail': SELECTED_OBJECT});
				document.dispatchEvent(deselectEvent);
				SELECTED_OBJECT = intersects[0].object;
		    	selectEvent = new CustomEvent('Editor_Obj_Selected',{ 'detail': intersects[0].object});
				document.dispatchEvent(selectEvent);
				OBJECT_IS_SELECTED = true;
			}else if(SELECTED_OBJECT!=null&&IS_SHIFT_DOWN&&(SELECTED_OBJECT.name!=intersects[0].object.name)){ //Allows for multiple objects to be slected at one time
				console.log("Multi object Selection", SELECTED.MULI_SELECTION_GROUP);
				groupArray = SELECTED.MULI_SELECTION_GROUP.children;
				if(groupArray.length<1){
					SELECTED.MULI_SELECTION_GROUP.add(SELECTED_OBJECT);
				}
				var containsOBJalready = false;
				if(SELECTED.MULI_SELECTION_GROUP.getObjectByName(intersects[0].object.name)==undefined){
					scene.remove(intersects[0].object);
					SELECTED.MULI_SELECTION_GROUP.add(intersects[0].object);
					console.log("SELECTED.MULI_SELECTION_GROUP", SELECTED.MULI_SELECTION_GROUP);
					var bbox = new THREE.Box3().setFromObject(SELECTED.MULI_SELECTION_GROUP);
					console.log("bbox", bbox);
					SELECTED.MULI_SELECTION_GROUP.rotation.z = Math.PI/2;
				}
				console.log("MULI_SELECTION_GROUP.children 3",SELECTED.MULI_SELECTION_GROUP.children.length);
				/*
					Multi object selection for align and grouping function
				*/
			}else{
				SELECTED_OBJECT = intersects[0].object;
		    	selectEvent = new CustomEvent('Editor_Obj_Selected',{ 'detail': intersects[0].object});
				document.dispatchEvent(selectEvent);
				OBJECT_IS_SELECTED = true;
			}

		}else{ if(SELECTED_OBJECT!=null){
				deselectEvent = new CustomEvent('Editor_Obj_Deselected', { 'detail': SELECTED_OBJECT});
				document.dispatchEvent(deselectEvent);
				SELECTED_OBJECT = null;
				OBJECT_IS_SELECTED = false;
				}

				if(SELECTED.MULI_SELECTION_GROUP.children.length>0){
					Things = SELECTED.MULI_SELECTION_GROUP.children;
					console.log("Update remove4", scene);

					for (var i = Things.length - 1; i >= 0; i--) {
						scene.add(Things[i]);
						SELECTED.MULI_SELECTION_GROUP.remove(Things[i]);
					}
					scene.matrixWorldNeedsUpdate=true;
				}
		}
	}
}

//Key Events

function handleKeyEvents(event){
	
}
