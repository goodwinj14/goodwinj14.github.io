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
				//Sets Up Z faces vertices
				for(y = (-centerY); y<centerY; y++){
					for(x =(-centerX); x<centerX;x++){
						vertices[i] = x;
						vertices[i+1] = y;
						vertices[i+2] = centerZ;
						//Needs to be changed to color array parameter
						NEURONBLOCK.VisiableColors[i] = colors[i];
						NEURONBLOCK.VisiableColors[i +1] = colors[i+1];
						NEURONBLOCK.VisiableColors[i +2] = colors[i+2];
						
						i+=3;
					}
				}

				//Sets Up X faces vertices
				for(y = (-centerY); y<centerY; y++){
					for(z =(-centerZ); z<centerZ;z++){
						vertices[i] = centerX;
						vertices[i+1] = y;
						vertices[i+2] = z;
						
						NEURONBLOCK.VisiableColors[i] = colors[i];
						NEURONBLOCK.VisiableColors[i +1] = colors[i+1];
						NEURONBLOCK.VisiableColors[i +2] = colors[i+2];
						
						i+=3;
					}
				}

				//Sets Up Y faces vertices
				for(z = (-centerZ); z<centerZ; z++){
					for(x =(-centerX); x<centerX;x++){
						vertices[i] = x;
						vertices[i+1] = centerY;
						vertices[i+2] = z;

						NEURONBLOCK.VisiableColors[i] = colors[i];
						NEURONBLOCK.VisiableColors[i +1] = colors[i+1];
						NEURONBLOCK.VisiableColors[i +2] = colors[i+2];
						
						i+=3;
					}
				}

				NEURONBLOCK.StackGeometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
				NEURONBLOCK.StackGeometry.addAttribute( 'color', new THREE.BufferAttribute( NEURONBLOCK.VisiableColors, 3 ) );

				//NEURONBLOCK.StackGeometry.computeBoundingSphere();

};