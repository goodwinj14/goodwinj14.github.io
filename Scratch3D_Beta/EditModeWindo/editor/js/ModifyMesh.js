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

			if(minPoint<((dist.x-(mesh.position.x+maxPoint)))){
				for (var i = 0; i < vertices.length; i+=3) {
					if(minPoint!=vertices[i]){
						vertices[i] = minPoint+(xStepDist*(Math.abs(vertices[i]-minPoint)/length));
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

			if(maxPoint>((dist.x-(mesh.position.x+minPoint)))){
				for (var i = 0; i < vertices.length; i+=3) {
					if(maxPoint!=vertices[i]){
						vertices[i] = maxPoint+(xStepDist*(Math.abs(vertices[i]-maxPoint)/length));
					}
				}
				mesh.position.x = mesh.position.x + ((dist.x-(mesh.position.x+minPoint))/2);
			}
		}

		if(sideID=="face_2"){
			minPoint = mesh.geometry.boundingBox.min.z;
			maxPoint = mesh.geometry.boundingBox.max.z;
			length = maxPoint-minPoint;
			distNormalized = minPoint+(dist.z-(mesh.position.z+minPoint));
			xStepDist = distNormalized- maxPoint;

			if(maxPoint>((dist.z-(mesh.position.z+minPoint)))){
				for (var i = 2; i < vertices.length; i+=3) {
					if(maxPoint!=vertices[i]){
						vertices[i] = maxPoint+(xStepDist*(Math.abs(vertices[i]-maxPoint)/length));
					}
				}
				mesh.position.z = mesh.position.z + ((dist.z-(mesh.position.z+minPoint))/2);
			}
		}

		if(sideID=="face_3"){
			minPoint = mesh.geometry.boundingBox.min.z;
			maxPoint = mesh.geometry.boundingBox.max.z;
			length = maxPoint-minPoint;
			distNormalized = maxPoint+(dist.z-(mesh.position.z+maxPoint));
			zStepDist = distNormalized- minPoint;

			if(minPoint<((dist.z-(mesh.position.z+maxPoint)))){
				for (var i = 2; i < vertices.length; i+=3) {
					if(minPoint!=vertices[i]){
						vertices[i] = minPoint+(zStepDist*(Math.abs(vertices[i]-minPoint)/length));
					}
				}
				mesh.position.z = mesh.position.z + ((dist.z-(mesh.position.z+maxPoint))/2);
			}
		}

		//Alters the max y width of the object
		if(sideID=="face_4"){
			minPoint = mesh.geometry.boundingBox.min.y;
			maxPoint = mesh.geometry.boundingBox.max.y;
			length = maxPoint-minPoint;
			distNormalized = maxPoint+(dist.y-(mesh.position.y+maxPoint));
			yStepDist = distNormalized- minPoint;
			if(minPoint<((dist.y-(mesh.position.y+maxPoint)))){
				for (var i = 1; i < vertices.length; i+=3) {
					if(minPoint!=vertices[i]){
						vertices[i] = minPoint+(yStepDist*(Math.abs(vertices[i]-minPoint)/length));
					}
				}
				mesh.position.y = mesh.position.y + ((dist.y-(mesh.position.y+maxPoint))/2);
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


		mesh.geometry.center();
		mesh.geometry.attributes.position.needsUpdate = true;
	}	

ModifyMesh.updateRotation = function(mesh, EulerVector){

           deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(EulerVector);
           mesh.rotationalOffset.x += EulerVector.x*(180/Math.PI);
           mesh.rotationalOffset.y += EulerVector.y*(180/Math.PI);
           mesh.rotationalOffset.z += EulerVector.z*(180/Math.PI);


	       mesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, mesh.quaternion);
	       mesh.updateMatrix();
		   mesh.geometry.applyMatrix( mesh.matrix );
		   mesh.geometry.center();
		   mesh.geometry.computeBoundingBox();
		   mesh.rotation.set( 0, 0, 0 );

		   mesh.updateMatrix();
	       mesh.geometry.verticesNeedUpdate = true;
	       rot_change_Event = new CustomEvent('Editor_Obj_rotation_change', { 'detail': mesh});
		   document.dispatchEvent(rot_change_Event);
    }

ModifyMesh.setHeight = function(mesh, dist){
			vertices = mesh.geometry.attributes.position.array;
			mesh.geometry.computeBoundingBox();

			minPoint = mesh.geometry.boundingBox.min.x;
			maxPoint = mesh.geometry.boundingBox.max.x;
			length = maxPoint-minPoint;


				for (var i = 1; i < vertices.length; i+=3) {
					//if(minPoint!=vertices[i]){
						vertices[i] = dist*(vertices[i]/length);
					//}
				}

		mesh.geometry.center();
		mesh.geometry.attributes.position.needsUpdate = true;
				
}