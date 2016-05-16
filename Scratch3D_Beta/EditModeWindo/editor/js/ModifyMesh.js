ModifyMesh = {}

ModifyMesh.updateDimensions = function(mesh,sideID, dist){
		vertices = mesh.geometry.attributes.position.array;
		mesh.geometry.computeBoundingBox();
		
		//Alters the max x width of the object
		var xStepCount = [];

		for(var i = 0; i < vertices.length; i+=3){
			if(xStepCount.indexOf(vertices[i]) < 0){
				xStepCount.push(vertices[i]);
			}
		}
		
		if(sideID=="face_0"){
			minPoint = mesh.geometry.boundingBox.min.x;
			maxPoint = mesh.geometry.boundingBox.max.x;
			length = maxPoint-minPoint;
			distNormalized = maxPoint+(dist.x-(mesh.position.x+maxPoint));
			xStepDist = distNormalized- minPoint;
			console.log("distNormalized", distNormalized);
			
				for (var i = 0; i < vertices.length; i+=3) {
					if(minPoint!=vertices[i]){
						if(minPoint<(minPoint+(xStepDist*(Math.abs(vertices[i]-minPoint)/length))){
							vertices[i] = minPoint+(xStepDist*(Math.abs(vertices[i]-minPoint)/length));
						}
					}
				}
				mesh.position.x = mesh.position.x + ((dist.x-(mesh.position.x+maxPoint))/2);
			}
		}
		//Alters the min x width of the object
		if(sideID=="face_1"){
			minPoint = mesh.geometry.boundingBox.min.x;
			maxPoint = mesh.geometry.boundingBox.max.x;
			length = maxPoint-minPoint;
			distNormalized = minPoint+(dist.x-(mesh.position.x+minPoint));
			xStepDist = distNormalized- maxPoint;
			//if(distNormalized<mesh.position.x+maxPoint){
				for (var i = 0; i < vertices.length; i+=3) {
					if(maxPoint!=vertices[i]){
						vertices[i] = maxPoint+(xStepDist*(Math.abs(vertices[i]-maxPoint)/length));
					}
				}
				mesh.position.x = mesh.position.x + ((dist.x-(mesh.position.x+minPoint))/2);
			//}
		}
		//Alters the max y width of the object
		if(sideID=="face_4"){
			minPoint = mesh.geometry.boundingBox.min.y;
			maxPoint = mesh.geometry.boundingBox.max.y;
			length = maxPoint-minPoint;
			distNormalized = maxPoint+(dist-(mesh.position.y+maxPoint));
			xStepDist = distNormalized- minPoint;
			for (var i = 1; i < vertices.length; i+=3) {
				if(minPoint!=vertices[i]){
					vertices[i] = minPoint+(xStepDist*(Math.abs(vertices[i]-minPoint)/length));
				}
			}
		}
		if(sideID=="face_5"){
			maxPoint = geometry.boundingBox.max.y;
			for (var i = 1; i < vertices.length; i+=3) {
				if(dist>0){
					vertices[i] = maxPoint-((maxPoint-vertices[i])*dist);
				}
			}
		}
		if(sideID=="face_3"){
			minPoint = mesh.geometry.boundingBox.min.z;
			maxPoint = mesh.geometry.boundingBox.max.z;
			length = maxPoint-minPoint;
			distNormalized = maxPoint+(dist.z-(mesh.position.z+maxPoint));
			zStepDist = distNormalized- minPoint;
			for (var i = 2; i < vertices.length; i+=3) {
				if(minPoint!=vertices[i]){
					vertices[i] = minPoint+(zStepDist*(Math.abs(vertices[i]-minPoint)/length));
				}
			}
			mesh.position.z = mesh.position.z + ((dist.z-(mesh.position.z+maxPoint))/2);
		}
		if(sideID=="face_2"){
			minPoint = mesh.geometry.boundingBox.min.z;
			maxPoint = mesh.geometry.boundingBox.max.z;
			length = maxPoint-minPoint;
			distNormalized = minPoint+(dist.z-(mesh.position.z+minPoint));
			xStepDist = distNormalized- maxPoint;
			for (var i = 2; i < vertices.length; i+=3) {
				if(maxPoint!=vertices[i]){
					vertices[i] = maxPoint+(xStepDist*(Math.abs(vertices[i]-maxPoint)/length));
				}
			}
			mesh.position.z = mesh.position.z + ((dist.z-(mesh.position.z+minPoint))/2);
		}
		mesh.geometry.center();
		mesh.geometry.attributes.position.needsUpdate = true;
	}	
