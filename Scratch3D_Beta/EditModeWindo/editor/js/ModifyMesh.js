ModifyMesh = {}

ModifyMesh.updateDimensions = function(geometry,sideID, dist){
		vertices = geometry.attributes.position.array;
		geometry.computeBoundingBox();
		console.log("Updated");
		//Alters the max x width of the object
		var xStepCount = [];

		for(var i = 0; i < vertices.length; i+=3){
			if(xStepCount.indexOf(vertices[i]) < 0){
				xStepCount.push(vertices[i]);
			}
		}
		
		if(sideID==0){
			var dd = dist;
			minPoint = geometry.boundingBox.min.x;
			maxPoint = geometry.boundingBox.max.x;
			length = maxPoint-minPoint;
			xStepDist = dist - minPoint;

			for (var i = 0; i < vertices.length; i+=3) {
				//if(dist>0){
				//	geometry.attributes.position.array[i] = minPoint-((minPoint-geometry.attributes.position.array[i])*dist);
				//}
				if(dist>0){
					if(minPoint!=vertices[i]&&vertices[i]!=geometry.boundingBox.max.x){
						vertices[i] = minPoint+(xStepDist*(Math.abs(vertices[i]-minPoint)/length));
						
					}
					else if(vertices[i]==geometry.boundingBox.max.x){
						vertices[i] = dist;
					}
				}else{
					
				}
			}
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
		geometry.attributes.position.needsUpdate = true;
	}	
