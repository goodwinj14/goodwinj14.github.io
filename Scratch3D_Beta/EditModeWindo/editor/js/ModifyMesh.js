ModifyMesh = {}
var called = 0;
ModifyMesh.updateDimensions = function(geometry,sideID, dist){
		called++;
		console.log("ModifyMesh Called: ", called);
		vertices = geometry.attributes.position.array;
		geometry.computeBoundingBox();
		//Alters the max x width of the object
		if(sideID==0){
			minPoint = geometry.boundingBox.min.x;
			for (var i = 0; i < vertices.length; i+=3) {
				if(dist>0){
					console.log("Pre ", geometry.attributes.position.array[i]);
					geometry.attributes.position.array[i] = minPoint-((minPoint-geometry.attributes.position.array[i])*dist);
					console.log("Post ", geometry.attributes.position.array[i]);
				}
			}
			console.log("dist ", vertices.length);
		}
		//Alters the min x width of the object
		if(sideID==1){
			maxPoint = geometry.boundingBox.max.x;
			for (var i = 0; i < vertices.length; i+=3) {
				if(dist>0){
					vertices[i] = maxPoint-((maxPoint-vertices[i])*dist);
				}
			}
		}
		//Alters the max y width of the object
		if(sideID==2){
			minPoint = geometry.boundingBox.min.y;
			for (var i = 1; i < vertices.length; i+=3) {
				if(dist>0){
					vertices[i] = minPoint-((minPoint-vertices[i])*dist);
				}
			}
		}
		if(sideID==3){
			maxPoint = geometry.boundingBox.max.y;
			for (var i = 1; i < vertices.length; i+=3) {
				if(dist>0){
					vertices[i] = maxPoint-((maxPoint-vertices[i])*dist);
				}
			}
		}
		if(sideID==4){
			minPoint = geometry.boundingBox.min.z;
			for (var i = 2; i < vertices.length; i+=3) {
				if(dist>0){
					vertices[i] = minPoint-((minPoint-vertices[i])*dist);
				}
			}
		}
		if(sideID==5){
			maxPoint = geometry.boundingBox.max.z;
			for (var i = 2; i < vertices.length; i+=3) {
				if(dist>0){
					vertices[i] = maxPoint-((maxPoint-vertices[i])*dist);
				}
			}
		}
		console.log("needs upDating", geometry.verticesNeedUpdate);
	}	
