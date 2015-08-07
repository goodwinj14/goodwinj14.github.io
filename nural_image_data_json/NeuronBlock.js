var NEURONBLOCK = {};

/*Face Number Pattern

        ******
        **F5**
        ******
        ------
 ******|******|******|******|
 **F4**|**F1**|**F2**|**F3**|
 ******|******|******|******|
        ------
        ******
        **F6**
        ******
*/



NEURONBLOCK.imageStack = function (Height, Width, colors, camera) {
		this.camera = camera;
		//The verticie colors currently being draw
		this.VisiableColors = null;
		//Geomerty generated by the image stack
		this.StackGeometry = new THREE.BufferGeometry();
		//All the vericie colors of the stack geometry
		this.colors = colors;

	    //Which faces are currently visible and should be draw
		this.FaceOneVisible = true;
		this.FaceTwoVisible = true;
		this.FaceThreeVisible = true;
		this.FaceFourVisible = false;
		this.FaceFiveVisible = false;
		this.FaceSixVisible = false;

		//The layer of each face that is currently visible and should draw
		//Starts at 0 and goes to one half the total length of that side
		this.FaceOneLayer = 0;
		this.FaceTwoLayer = 0;
		this.FaceThreeLayer = 0;
		this.FaceFourLayer = 0;
		this.FaceFiveLayer = 0;
		this.FaceSixLayer = 0; 

		this.height = Height;
		this.width = Width;		

				var area = Height*Width;
				var points = area*3;
				var centerY = Height/2;
				var centerX = Width/2;
				var centerZ = Width/2;
				var vertices = new Float32Array( points*3 );
				this.VisiableColors = new Float32Array( points*3 );

				i = 0;
				j = 0;
				//Sets Up Z faces vertices
				for(y = centerY; y>(-centerY); y--){
					for(x =(-centerX); x<centerX;x++){
						vertices[i] = x;
						vertices[i+1] = y;
						vertices[i+2] = centerZ;
						//Needs to be changed to color array parameter
						
						this.VisiableColors[i] = colors[j];
						this.VisiableColors[i +1] = colors[j];
						this.VisiableColors[i +2] = colors[j];
						
						
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
						
						this.VisiableColors[i] = colors[totalOffset];
						this.VisiableColors[i +1] = colors[totalOffset];
						this.VisiableColors[i +2] = colors[totalOffset];
						 c++;
						i+=3;
					}
					r++;
				}

				//Sets Up Y faces vertices
				var r2=0;
				for(z = centerZ-1; z>(-centerZ-1); z--){
					var c2=0;
					for(x =(-centerX); x<centerX;x++){
						vertices[i] = x;
						vertices[i+1] = centerY;
						vertices[i+2] = z;
						var offsetX = (c2);
						var offsetArea=0;
						if(r2>0){
						offsetArea = (area-1)+(area*(r2-1));
						}
						var totalOffset = offsetX + offsetArea;
						this.VisiableColors[i] = colors[totalOffset];
						this.VisiableColors[i +1] = colors[totalOffset];
						this.VisiableColors[i +2] = colors[totalOffset];
						
						i+=3;
						c2++;
					}
					r2++;
				}

				this.StackGeometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
				this.StackGeometry.addAttribute( 'color', new THREE.BufferAttribute( this.VisiableColors, 3 ) );

				this.StackGeometry.computeBoundingSphere();

	//Changes the postion and colors of the X-Axis Vertices to display 
	//the Face Four data.
	this.drawF3 = function(){
		var end = ((area*3)-1)+(area*3);
		
		var moveOneRow = this.width*3;
		var F3Start = (area*3);
		var F4ColorStart = area;
		var it = (area*3);
		
		colorsIteration =0;
		for (var j = 0; j < 240; j++) {
			var colorsIteration = 0;
			for (var i = 0; i < 240*3; i+=3) {
				//this.StackGeometry.attributes.position.array[i] = (0);
				//this.StackGeometry.attributes.position.array[(area*3)+i] = (-centerY)-2;
				//this.StackGeometry.attributes.color.array[(area*3)+ i] = 255;
				//this.StackGeometry.attributes.color.array[(area*3)+i+1] = 0;
				//this.StackGeometry.attributes.color.array[(area*3)+i+2] = 0;
				
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)] = colors[(240-1)+(area*(i/3))+(240*j)];
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+1] = colors[(240-1)+(area*(i/3))+(240*j)];
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+2] = colors[(240-1)+(area*(i/3))+(240*j)];
				this.StackGeometry.attributes.position.array[F3Start+i+(j*moveOneRow)] = centerY;
				colorsIteration++;
				
				
			
			//colorsIteration = colorsIteration;
			};
			//colorsIteration = 0;
		};
		this.StackGeometry.addAttribute( 'color', new THREE.BufferAttribute( this.VisiableColors, 3 ) );
		this.StackGeometry.attributes.position.needsUpdate = true;

	};
	this.drawF4 = function(){
		console.log("positions: ", this.colors.length);
		
		var end = ((area*3)-1)+(area*3);
		
		var moveOneRow = this.width*3;
		var F3Start = (area*3);
		var F4ColorStart = area;
		var it = (area*3);
		
		colorsIteration =0;
		for (var j = 0; j < 240; j++) {
			var colorsIteration = 0;
			for (var i = 0; i < 240*3; i+=3) {
				//this.StackGeometry.attributes.position.array[i] = (0);
				//this.StackGeometry.attributes.position.array[(area*3)+i] = (-centerY)-2;
				//this.StackGeometry.attributes.color.array[(area*3)+ i] = 255;
				//this.StackGeometry.attributes.color.array[(area*3)+i+1] = 0;
				//this.StackGeometry.attributes.color.array[(area*3)+i+2] = 0;
				
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)] = colors[(colorsIteration*area)+(j*240)];
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+1] = colors[(colorsIteration*area)+(j*240)];
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+2] = colors[(colorsIteration*area)+(j*240)];
				this.StackGeometry.attributes.position.array[F3Start+i+(j*moveOneRow)] = -centerY;
				colorsIteration++;
				
				
			
			//colorsIteration = colorsIteration;
			};
			//colorsIteration = 0;
		};
		this.StackGeometry.addAttribute( 'color', new THREE.BufferAttribute( this.VisiableColors, 3 ) );
		this.StackGeometry.attributes.position.needsUpdate = true;

	}

	this.update =function(){
		console.log("Camera Roatation y", this.camera.rotation.y);
		if(this.camera.rotation.y<-0.03){
			this.drawF4();
		}else if(this.camera.rotation.y> 0.03){
			this.drawF3();
		}
	}
};