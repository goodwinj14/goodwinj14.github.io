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
	if(objectID!=undefined){
		scene.remove( objectID );
	}else{
		//In the futur we will also have to remove it from our arrays that store the objects 
		//It may be in the array but not in the scene
	}
	objectID.mesh.dispose(); 
	objectID.geometry.dispose();
	objectID.material.dispose();
	objectID.texture.dispose();
	
	
}