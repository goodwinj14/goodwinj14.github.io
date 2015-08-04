var NEURONBLOCK = {};

NEURONBLOCK.StackGeometry = new THREE.BufferGeometry();
NEURONBLOCK.AllColors = null;
NEURONBLOCK.VisiableColors = null;
NEURONBLOCK.initImageStackVertices = function (Height, Width, colors) {

				
				var area = Height*Width;
				var points = area*3;
				var centerY = Height/2;
				var centerX = Width/2;
				var centerZ = Width/2;
				var vertices = new Float32Array( points*3 );
				NEURONBLOCK.VisiableColors = new Float32Array( points*3 );
				NEURONBLOCK.AllColors = colors;

				i = 0;
				j = 0;
				//Sets Up Z faces vertices
				for(y = centerY; y>(-centerY); y--){
					for(x =(-centerX); x<centerX;x++){
						vertices[i] = x;
						vertices[i+1] = y;
						vertices[i+2] = centerZ;
						//Needs to be changed to color array parameter
						if(i==717){
						NEURONBLOCK.VisiableColors[i] = 255;
						NEURONBLOCK.VisiableColors[i +1] = 0;
						NEURONBLOCK.VisiableColors[i +2] = 0;
						colors[j] = 255;
						}else{
						NEURONBLOCK.VisiableColors[i] = colors[j];
						NEURONBLOCK.VisiableColors[i +1] = colors[j];
						NEURONBLOCK.VisiableColors[i +2] = colors[j];
						}
						
						i+=3;
						j++;

					}
					if(y==-centerY){
						console.log("Real Value: ", colors[i]);
					}
				}
				console.log("Real Value: ", colors[240*3]);
				//Sets Up X faces vertices
				
				var r=0;
				for(y = (centerY); y>-centerY; y--){
					var c=0;
					for(z =(centerZ); z>-centerZ;z--){
						vertices[i] = centerX;
						vertices[i+1] = y;
						vertices[i+2] = z;
						
						
						var offsetX = ((240-1)+(240*r));
						var offsetArea=0;
						if(c>0){
						offsetArea = (area-1)+(area*(c-1));
						}
						var totalOffset = offsetX + offsetArea;
						
						NEURONBLOCK.VisiableColors[i] = colors[totalOffset];
						NEURONBLOCK.VisiableColors[i +1] = colors[totalOffset];
						NEURONBLOCK.VisiableColors[i +2] = colors[totalOffset];
						 c++;
						i+=3;
					}
					r++;
				}

				//Sets Up Y faces vertices
				for(z = (-centerZ); z<centerZ; z++){
					var offsetZ = z*239;
					for(x =(-centerX); x<centerX;x++){
						vertices[i] = x;
						vertices[i+1] = centerY;
						vertices[i+2] = z;
						var offsetX = (x*239) +offsetZ;
						NEURONBLOCK.VisiableColors[i] = colors[offsetX];
						NEURONBLOCK.VisiableColors[i +1] = colors[offsetX+1];
						NEURONBLOCK.VisiableColors[i +2] = colors[offsetX+2];
						
						i+=3;
					}
				}

				NEURONBLOCK.StackGeometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
				NEURONBLOCK.StackGeometry.addAttribute( 'color', new THREE.BufferAttribute( NEURONBLOCK.VisiableColors, 3 ) );

				//NEURONBLOCK.StackGeometry.computeBoundingSphere();

};