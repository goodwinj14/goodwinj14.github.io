ModifyMesh = {}
var called = 0;
ModifyMesh.updateDimensions = function(geometry,sideID, dist){
		called++;
		console.log("ModifyMesh Called: ", called);
		vertices = geometry.attributes.position.array;
		geometry.computeBoundingBox();
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
			//dist = dist-geometry.boundingBox.max.x;
			//xStepDist = dist/xStepCount.length;
			console.log("dist_: ",dist);
			for (var i = 0; i < vertices.length; i+=3) {
				//if(dist>0){
				//	geometry.attributes.position.array[i] = minPoint-((minPoint-geometry.attributes.position.array[i])*dist);
				//}
				if(minPoint!=vertices[i]&&vertices[i]!=geometry.boundingBox.max.x){
					//vertices[i] = vertices[i] + xStepDist;
					console.log("Should not be called ");
				}
				else if(vertices[i]==geometry.boundingBox.max.x){
					console.log("VP Pre_ ", vertices[i]);
					vertices[i] = dist;
					console.log("VP Post ", vertices[i]);
					if(vertices[i]>dd){
						console.log("WTF ");
					}
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
