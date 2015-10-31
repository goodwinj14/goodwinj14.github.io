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
		this.FaceInFocus = "F1";
		//The verticie colors currently being draw
		this.VisiableColors = null;
		this.vertices = null;
		this.VisiableColorsBuffer = null;
		this.verticesBuffer = null;
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

		this.xUpperLimit = 0;
		this.xLowerLimit = 0;
		this.yUpperLimit = 0;
		this.yLowerLimit = 0;
		this.zUpperLimit = 0;
		this.zLowerLimit = 0;
		
		this.xSizeNeedsUpdating = false;
		this.ySizeNeedsUpdating = false;
		this.zSizeNeedsUpdating = false;

		this.height = Height;
		this.width = Width;		

		//Camera View References 
		this.phi = 0.0;
		this.theta = 0.0;
		//Math Constants
		this.PI_4 = Math.PI/4;
		this.PI_2 = Math.PI/2;
		this.Five_PI_4 = (Math.PI*5)/4;
		this.THREExPI_2 = (Math.PI*3)/2;
		var area = Height*Width;
		var points = area*3;
		var centerY = Height/2;
		var centerX = Width/2;
		var centerZ = Width/2;

				this.xUpperLimit = centerX;
				this.xLowerLimit = -centerX;
				this.yUpperLimit = centerY;
				this.yLowerLimit = -centerY;
				this.zUpperLimit = centerZ;
				this.zLowerLimit = -centerZ;

				
				//Needs to calculate the current surface area of the 3 sides of our cube
				//Then update the verticies and colores array acordinly
				this.updateGeometryArray = function(){
					
					
					var F1Area = (this.xUpperLimit + Math.abs(this.xLowerLimit))*(this.yUpperLimit + Math.abs(this.yLowerLimit));
					var F2Area = (this.zUpperLimit + Math.abs(this.zLowerLimit))*(this.yUpperLimit + Math.abs(this.yLowerLimit));
					var F3Area = (this.zUpperLimit + Math.abs(this.zLowerLimit))*(this.xUpperLimit + Math.abs(this.xLowerLimit));
					var totalArea = (F1Area+F2Area+F3Area)*3;
					this.vertices = new Float32Array( totalArea );
					this.VisiableColors = new Float32Array( totalArea);
					for (var i = this.VisiableColors; i >= 0; i-=3) {
						this.VisiableColors[i] = 1.0;
						this.VisiableColors[i+1] = 0.0;
						this.VisiableColors[i+2] = 0.0;
						this.vertices[i] = i;
						this.vertices[i+1] = i;
						this.vertices[i+2] = i;
					};
					if(this.StackGeometry.attributes.color==null){
					this.StackGeometry.addAttribute( 'position', new THREE.BufferAttribute( this.vertices, 3 ) );
					this.StackGeometry.addAttribute( 'color', new THREE.BufferAttribute( this.VisiableColors, 3 ) );
				}else{
					this.StackGeometry.attributes.color.needsUpdate = true;
					this.StackGeometry.attributes.position.needsUpdate = true;
					}
					this.StackGeometry.computeBoundingSphere();
				
	
				}

				this.updateGeometryArray();
				

				i = 0;
				j = 0;

				//Sets Up Z faces vertices
				for(y = centerY; y>(-centerY); y--){
					for(x =(-centerX); x<centerX;x++){
						this.vertices[i] = x;
						this.vertices[i+1] = y;
						this.vertices[i+2] = centerZ;
						//Needs to be changed to color array parameter
						
						this.VisiableColors[i] = colors[j];
						this.VisiableColors[i +1] = colors[j];
						this.VisiableColors[i +2] = colors[j];
						
						
						i+=3;
						j++;

					}
					
				}
				
				

				//Sets Up X faces vertices
				
				var r=0;

				for(y = (centerY); y>-centerY; y--){
					var c=0;
					for(z =(centerZ); z>-centerZ;z--){
						this.vertices[i] = centerX;
						this.vertices[i+1] = y;
						this.vertices[i+2] = z;
						
						
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
						this.vertices[i] = x;
						this.vertices[i+1] = centerY;
						this.vertices[i+2] = z;

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

				
				


	//Changes the postion and colors of the X-Axis Vertices to display 
	//the Face Four data.
	this.drawF1 = function(){
		var end = ((area*3)-1)+(area*3);
		
		var rowLength = this.width*3;
		var F3Start = 0;
		var F4ColorStart = (120-this.zUpperLimit)*area;
		var it = (area*3);
		colorsIteration =0;
		
		for (var j = 0; j < 240; j++) {
			var rowR = j*rowLength;
			var rowG = rowR+1;
			var rowB = rowG+1;
			var z = 240*j;
			for (var i = 0; i < 240*3; i+=3) {
				//this.StackGeometry.attributes.position.array[i] = (0);
				//this.StackGeometry.attributes.position.array[(area*3)+i] = (-centerY)-2;
				//this.StackGeometry.attributes.color.array[(area*3)+ i] = 255;
				//this.StackGeometry.attributes.color.array[(area*3)+i+1] = 0;
				//this.StackGeometry.attributes.color.array[(area*3)+i+2] = 0;
				
				this.StackGeometry.attributes.color.array[F3Start+i+rowR] = colors[(F4ColorStart+(i/3)+(z))];
				this.StackGeometry.attributes.color.array[F3Start+i+rowG] = colors[(F4ColorStart+(i/3)+(z))];
				this.StackGeometry.attributes.color.array[F3Start+i+rowB] = colors[(F4ColorStart+(i/3)+(z))];
				this.StackGeometry.attributes.position.array[i+rowB] = this.zUpperLimit;
				colorsIteration++;
				
				
			
			//colorsIteration = colorsIteration;
			};
			//colorsIteration = 0;
		};
		//this.StackGeometry.addAttribute( 'color', new THREE.BufferAttribute( this.VisiableColors, 3 ) );
		this.StackGeometry.attributes.color.needsUpdate = true;
		this.StackGeometry.attributes.position.needsUpdate = true;

	};

	//Changes the postion and colors of the X-Axis Vertices to display 
	//the Face Four data.
	this.drawF2 = function(){
		var end = ((area*3)-1)+(area*3);
		
		var moveOneRow = this.width*3;
		var F3Start = ((area)*3);
		var zRange = (Math.abs(this.zLowerLimit)+this.zUpperLimit)*3;
		arrayOffSet = 240*3;
		var F2ColorStart = 239+(240-(zRange));
		
		
		colorsIteration =0;
		
			for (var j = 0; j < 240; j++) {
				var colorsIteration = 0;
				for (var i = 0; i <240*3; i+=3) {
					
					if(arrayOffSet-i<=zRange){
					this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)] = colors[(239)+(area*(i/3))+(240*j)];
					this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+1] = colors[(239)+(area*(i/3))+(240*j)];
					this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+2] = colors[(239)+(area*(i/3))+(240*j)];
					this.StackGeometry.attributes.position.array[F3Start+i+(j*moveOneRow)] = this.xUpperLimit;
					colorsIteration++;
					}else{
					this.StackGeometry.attributes.position.array[F3Start+i+(j*moveOneRow)] = 999999;
					}
				
				//colorsIteration = colorsIteration;
				};
				//colorsIteration = 0;
			};
		this.StackGeometry.attributes.color.needsUpdate = true;
		this.StackGeometry.attributes.position.needsUpdate = true;

	};
	//Changes the postion and colors of the X-Axis Vertices to display 
	//the Face Four data.
	this.drawF3 = function(){
		var end = ((area*3)-1)+(area*3);
		
		var moveOneRow = this.width*3;
		var F3Start = 0;
		var F4ColorStart = area*239;
		
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
				
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)] = colors[(F4ColorStart+(i/3)+(240*j))];
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+1] = colors[(F4ColorStart+(i/3)+(240*j))];
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+2] = colors[(F4ColorStart+(i/3)+(240*j))];
				this.StackGeometry.attributes.position.array[i+(j*moveOneRow)+2] = -centerY;
				colorsIteration++;
					
				
			
			//colorsIteration = colorsIteration;
			};
			//colorsIteration = 0;
		};
		this.StackGeometry.attributes.color.needsUpdate = true;
		this.StackGeometry.attributes.position.needsUpdate = true;

	};
	this.drawF4 = function(){
		
		var end = ((area*3)-1)+(area*3);
		
		var moveOneRow = this.width*3;
		var F3Start = (area*3);
		var F4ColorStart = area;
		var zRange = (Math.abs(this.zLowerLimit)+this.zUpperLimit)*3;
		arrayOffSet = 240*3;
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
				if(arrayOffSet-i<=zRange){
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)] = colors[(colorsIteration*area)+(j*240)];
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+1] = colors[(colorsIteration*area)+(j*240)];
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+2] = colors[(colorsIteration*area)+(j*240)];
				this.StackGeometry.attributes.position.array[F3Start+i+(j*moveOneRow)] = -centerY;
				}else{
					this.StackGeometry.attributes.position.array[F3Start+i+(j*moveOneRow)] = 999999;
				}

				colorsIteration++;
				
				
			
			//colorsIteration = colorsIteration;
			};
			//colorsIteration = 0;
		};
		this.StackGeometry.attributes.color.needsUpdate = true;
		this.StackGeometry.attributes.position.needsUpdate = true;

	}
		//Changes the postion and colors of the X-Axis Vertices to display 
	//the Face Four data.
	this.drawF5 = function(){
		var end = ((area*3)-1)+(area*3);
		
		var moveOneRow = this.width*3;
		var F3Start = (area*3)*2;
		var F6ColorStart = area-239;
		var it = (area*3);

		var F4ColorStart = area;
		var zRange = (Math.abs(this.zLowerLimit)+this.zUpperLimit);
		
		colorsIteration =0;
		for (var j = 0; j < 240; j++) {
			var colorsIteration = 0;
			for (var i = 0; i < 240*3; i+=3) {
				//this.StackGeometry.attributes.position.array[i] = (0);
				//this.StackGeometry.attributes.position.array[(area*3)+i] = (-centerY)-2;
				//this.StackGeometry.attributes.color.array[(area*3)+ i] = 255;
				//this.StackGeometry.attributes.color.array[(area*3)+i+1] = 0;
				//this.StackGeometry.attributes.color.array[(area*3)+i+2] = 0;
				if(240-j<=zRange){
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)] = colors[(i/3)+(area*j)];
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+1] = colors[(i/3)+(area*j)];
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+2] = colors[(i/3)+(area*j)];
				this.StackGeometry.attributes.position.array[F3Start+i+(j*moveOneRow)+1] = centerY;
				colorsIteration++;
				}else{
					this.StackGeometry.attributes.position.array[F3Start+i+(j*moveOneRow)+1] = 999999;
				}

				
			
			//colorsIteration = colorsIteration;
			};
			//colorsIteration = 0;
		};
		this.StackGeometry.attributes.color.needsUpdate = true;
		this.StackGeometry.attributes.position.needsUpdate = true;

	};

		//Changes the postion and colors of the X-Axis Vertices to display 
	//the Face Four data.
	this.drawF6 = function(){
		var end = ((area*3)-1)+(area*3);
		
		var moveOneRow = this.width*3;
		var F3Start = (area*3)*2;
		var F6ColorStart = area-239;
		var it = (area*3);
		var zRange = (Math.abs(this.zLowerLimit)+this.zUpperLimit);
		colorsIteration =0;
		for (var j = 0; j < 240; j++) {
			var colorsIteration = 0;
			for (var i = 0; i < 240*3; i+=3) {
				//this.StackGeometry.attributes.position.array[i] = (0);
				//this.StackGeometry.attributes.position.array[(area*3)+i] = (-centerY)-2;
				//this.StackGeometry.attributes.color.array[(area*3)+ i] = 255;
				//this.StackGeometry.attributes.color.array[(area*3)+i+1] = 0;
				//this.StackGeometry.attributes.color.array[(area*3)+i+2] = 0;
				if(240-j<=zRange){
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)] = colors[(area-(240-(i/3)))+(area*j)];
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+1] = colors[(area-(240-(i/3)))+(area*j)];
				this.StackGeometry.attributes.color.array[F3Start+i+(j*moveOneRow)+2] = colors[(area-(240-(i/3)))+(area*j)];
				this.StackGeometry.attributes.position.array[F3Start+i+(j*moveOneRow)+1] = -centerY;
				colorsIteration++;
				}//else{
					//this.StackGeometry.attributes.position.array[F3Start+i+(j*moveOneRow)+1] = 1000;
				//}
				
			
			//colorsIteration = colorsIteration;
			};
			//colorsIteration = 0;
		};
		this.StackGeometry.attributes.color.needsUpdate = true;
		this.StackGeometry.attributes.position.needsUpdate = true;

	};

	//Removes one slice from the specifed face and then updates block
	this.removeSlice = function(face, steps){
		if(face == "F1"){
			this.focalFace();
			this.zUpperLimit = this.zUpperLimit-steps;
			//this.xSizeNeedsUpdating = true;
			//this.updateGeometryArray();
			this.drawF1();
			this.drawF2();
			this.drawF5();
		}else if(face == "F2"){
			this.xUpperLimit = this.xUpperLimit--;
		}else if(face == "F3"){
			this.zLowerLimit = this.zLowerLimit++;
		}else if(face == "F4"){
			this.xLowerLimit = this.xLowerLimit++;
		}else if(face == "F5"){
			this.yUpperLimit = this.yUpperLimit--;
		}else if(face == "F6"){
			this.yLowerLimit = this.yLowerLimit++;
		}
		
	}

	this.update =function(){
		var x = camera.position.x;
		var y = camera.position.y;
		var z = camera.position.z;
		//Uses spherical cordinets to determ angle of the camera with respect to the origin point(0,0,0)
		//them determins which face is the main focus based off of theta and phi 

		//Finds the current Sphirical Cordinets of the camera
		var rho = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2)+Math.pow(z, 2));
		var h = Math.sqrt(Math.pow(x, 2)+Math.pow(z, 2));
		this.theta = Math.acos(x/h);
		this.phi = (Math.asin(y/rho));


		var X_normalized = Math.sin(this.theta)*rho;
		var Z_normalized = Math.cos(this.theta)*rho;

		this.theta = (Math.atan((Z_normalized/X_normalized)));

		if(z<0&&x>=0){
			this.theta = Math.PI - this.theta;
		}else if(z<0&&x<0){
			this.theta = Math.PI - this.theta;
		}else if(z>=0&&x<0){
			this.theta = (2*Math.PI) + this.theta;
		}


		if(this.theta>Math.PI){
			this.drawF4();
		}if(this.theta>0&&this.theta<Math.PI){
			this.drawF2();
		}if(this.phi>0){
			this.drawF5();
		}if(this.phi<0){
			this.drawF6();
		}if(this.theta>this.PI_2&&this.theta<this.THREExPI_2){
			this.drawF3();
		}if(this.theta>this.THREExPI_2||this.theta<this.PI_2){
			this.drawF1();
		}
	}

	this.focalFace = function(){
		var x = camera.position.x;
		var y = camera.position.y;
		var z = camera.position.z;
		

		/*ADD IN CHECKS FOR PHI*/
		if(this.theta<(Math.PI/4)||this.theta>((Math.PI*7)/4)){
			if(this.phi<(Math.PI/4)&&this.phi>((-Math.PI)/4)){
			console.log("Face One Visable");
			}else if(this.phi>(Math.PI/4)){
				console.log("Face Five Visable");
			}else if(this.phi<((-Math.PI)/4)){
				console.log("Face six Visable");
			}

		}else if(this.theta<((Math.PI*3)/4)){
			if(this.phi<(Math.PI/4)&&this.phi>((-Math.PI)/4)){
			console.log("Face Two Visable");
			}else if(this.phi>(Math.PI/4)){
				console.log("Face Five Visable");
			}else if(this.phi<((-Math.PI)/4)){
				console.log("Face six Visable");
			}
		}else if(this.theta<((Math.PI*5)/4)){
			if(this.phi<(Math.PI/4)&&this.phi>((-Math.PI)/4)){
			console.log("Face Three Visable");
			}else if(this.phi>(Math.PI/4)){
				console.log("Face Five Visable");
			}else if(this.phi<((-Math.PI)/4)){
				console.log("Face six Visable");
			}
		}else if(this.theta<((Math.PI*7)/4)){
			if(this.phi<(Math.PI/4)&&this.phi>((-Math.PI)/4)){
			console.log("Face Four Visable");
			}else if(this.phi>(Math.PI/4)){
				console.log("Face Five Visable");
			}else if(this.phi<((-Math.PI)/4)){
				console.log("Face six Visable");
			}
		}
	}
};