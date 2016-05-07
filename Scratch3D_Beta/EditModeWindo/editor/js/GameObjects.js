var GAME_OBJECTS = {};

//All the shapes that have been add to any scene
GAME_OBJECTS.Shapes = [];

//Removes and dealocates object from the scene
GAME_OBJECTS.RemoveObject = function(objectID){
	//Removes object from scene
	var removeObject = scene.getObjectByName(objectID);
	var geo = removeObject.geometry;
	var mat = removeObject.material;
	var text = removeObject.texture;
	//Checks if the object was in the scene and if so it is removed
	if(removeObject!=undefined){
		scene.remove( removeObject );
	}else{
		//In the futur we will also have to remove it from our arrays that store the objects 
		//It may be in the array but not in the scene
	}
	geo.dispose();
	mat.dispose();
	text.dispose();
	removeObject.mesh.dispose(); // new

	
}