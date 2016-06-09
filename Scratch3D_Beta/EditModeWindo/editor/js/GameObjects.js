var GAME_OBJECTS = {};

//All the shapes that have been add to any scene
GAME_OBJECTS.Shapes = [];

GAME_OBJECTS.GetObject = function(objectID){
	return scene.getObjectByName(objectID);
}


//Removes and dealocates object from the scene
GAME_OBJECTS.RemoveObject = function(object){
	//Removes object from scene
	
	//Checks if the object was in the scene and if so it is removed
	if(object!=undefined){
		scene.remove( object );
	}else{
		//In the futur we will also have to remove it from our arrays that store the objects 
		//It may be in the array but not in the scene
	}
	if(object.mesh!=undefined){
	object.mesh.dispose(); 
	}
	if(object.geometry!=undefined){
	object.geometry.dispose();
	}
	if(object.material!=undefined){
	object.material.dispose();
	}
	if(object.texture!=undefined){
	object.texture.dispose();
	}

	for (var i = 0; i < GAME_OBJECTS.Shapes.length; i++) {
		if(GAME_OBJECTS.Shapes[i].name == object.name){
			GAME_OBJECTS.Shapes[i].splice(i, 1);
		}
	}
	
}