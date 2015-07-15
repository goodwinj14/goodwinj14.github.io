(function(ext) {
	var win = null;
	var canvas = null;
	var ctx = null;
	var lastKeyEvent = null;
	//var liveURL = "http://localhost:8888/main.html";
	var shapes = [];
	var charecters = [];
	//var liveURL = "http://033ae09.netsolhost.com//gsd2014team5/Localhost/main.html";
	var liveURL = "http://goodwinj14.github.io/ThreeJS/server/threemain.html";
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };    
	
	//Sets up the connection to the Three.js server 
	//Opens the window and 
	//A wait block is required for this function do to the fact that we must wait for the entire 
	//three.js file to load befor we can countinue exicuting our program.
	ext.initWorld = function(scene, width, height, cameraType, callback) {
		//Opens the three.js window
		//win = window.open (liveURL, "", "width=window.width, height=window.height");
		//Test URLS
		window.addEventListener("message", receiveMessage, false);
		
		function receiveMessage()
		{
			console.log(event.data);
			lastKeyEvent = event.data;
    	}
		win = window.open (liveURL, "", "width=window.width, height=window.height");

		/*
		**Checks Browser Version in win returns null
		**
		*/
		if(win==null){
			var browserData = navigator.userAgent;
			if(browserData.indexOf("Safari")>-1){
			alert("This extension must open in a separate window. \rTo run please enable pop-ups from this site. \rTo enable PopUps: \rClick Safari, \rClick Preferences, \rClick security, \rUncheck Block pop-up windows, \rThen refresh page. ");
			}
		}
		//**//
		
        setTimeout(function (){
			var message = "INIT_"+scene+","+width+","+height;
			win.postMessage(message,liveURL);
			callback(); //Calls back to Scaratch proggram to allow exicution flow to reStart once the page has been loaded
        }, 1000);
	};

	



	//Rotates the camera in a user supplied direction by a user supplied number of degrees
	ext.rotateCamera = function(direction, degrees){
		
		//Checks to make sure the user has supplied a Direction 
		if(direction != "Direction" && degrees != 0){
		//Creates the message to be sent to the main.html 
		//Messge will be formated as tag, turn direction, number of degrees to rotate. exp.  "CAMERAROTATE_Left,15"	
		var message = "CAMERAROTATE_"+direction + "," + degrees;
		//Sends Message to the main.htlm event listener with the rotate tags along with user supplied params 
		win.postMessage(message, liveURL);
		console.log("Direction: ", direction, "Degrees: ", degrees);
		}
	} 
	
	
	ext.orbitCamera = function(direction){
		var message = "CAMERAORBIT_" + direction;
		win.postMessage(message, liveURL);
		console.log("orbit Camera Called", message);
	}
	
	ext.moveCamera = function(direction, steps){
		var message = "CAMERAMOVE_"+direction+","+steps;
		win.postMessage(message, liveURL);
		console.log("Move Camera Called", message);
	}
	
	ext.createShape = function(shape, l,w,h, locX,locY, locZ){
		var shapeID = generatID(shape);
		shapes.push(shapeID);
		var message = "CREATESHAPE_"+shape+','+l+','+w+','+h+','+locX+','+locY+','+locZ+','+shapeID;
		win.postMessage(message, liveURL);
		return shapeID;
	}
	
	ext.moveShape = function(shape_id, direction, steps){
		//Makes sure that the shape we are trying to move has been created
		//console.log(shapes.indexOf(shape_id));
		console.log("Move ", shape_id);
		if(shapes.indexOf(shape_id)>-1){
		var message = "MOVESHAPE_"+shape_id+','+direction+','+steps;
		win.postMessage(message, liveURL);
		}
	}

	ext.camControls = function(up, down, left, right){
		var message = "SETCAMERACONTROLS_"+up+','+down+','+left+','+right;
		win.postMessage(message, liveURL);
	}

	ext.camControlsRotate = function(){
		var message = "SETCAMERACONTROLS_";
		win.postMessage(message, liveURL);
	}

	ext.lookAt = function(object){
		console.log("Look At: ", object);
		var message = "SETCAMERALOOKAT_"+object;
		win.postMessage(message, liveURL);
	}

	ext.loadOBJ = function(URL){
		var objID = generatID("OBJ");
		shapes.push(objID);
		var message = "LOADOBJ_"+URL+','+objID;
		win.postMessage(message, liveURL);
		return objID;
	}

	ext.add_Charecter = function(Charecter, locX, locY, locZ){
		console.log("ext.add_Charecter called ");
		var charecterID = generatID("CHARECTER");
		charecters.push(charecterID);
		console.log("Charecter ID: ", charecterID);
		var message = "ADDCHARECTER_"+Charecter+','+locX+','+locY+','+locZ+','+charecterID;
		console.log("Charecter Message: ", message);
		win.postMessage(message, liveURL);
		return charecterID;
	}

	ext.key_Pressed = function(key) {
       // Reset alarm_went_off if it is true, and return true
       // otherwise, return false.

       //Checks to see if we are looking for a key command exp. "left arrow"
       //If so we the check to see if that key has been pressed 
       //If it has been pressed we then return true exectuing the code stack below the when pressed block
       if(key=='up arrow'){
       	if (lastKeyEvent == 38) {
           lastKeyEvent = null;
           return true;
           }
       }else if(key=="space"){
       	if (lastKeyEvent == 32) {
           lastKeyEvent = null;
           return true;
           }
       }else if(key=='down arrow'){
       	if (lastKeyEvent == 40) {
           lastKeyEvent = null;
           return true;
           }
       }else if(key=='right arrow'){
       	if (lastKeyEvent == 39) {
           lastKeyEvent = null;
           return true;
           }
       }else if(key=='left arrow'){
       	if (lastKeyEvent == 37) {
           lastKeyEvent = null;
           return true;
           }
       }
       //If a letter was entered insted of a command key
       else{
       if (lastKeyEvent == 65) {
           lastKeyEvent = null;
           return true;
       }
       }
       
       return false;
    };

	// Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ['w', 'New 3D World %m.Scenes Width: %n Height: %n %m.Camera', 'initWorld', "Scene", 10, 10 , "Camera Type",ext],
            //['', 'Set Camera Controls  Up: %m.Keys Down: %m.Keys Left: %m.Keys Right: %m.Keys ', 'camControlsMove', 'w', 's','a','d'],
            ['', 'Add Camera Mouse Controles', 'camControlsRotate'],
			//The camera rotate block to allow users to rotate the view of the camra "Left", "Right", "Up" and "Down"
			['', "Rotate Camera %m.CameraRotation %n Degrees" , 'rotateCamera', "Direction", "1"],
			//The camera orbit block to allow users to orbit the camera around a given point
			['', " Camera Orbit  %m.CameraOrbit ","orbitCamera", "Direction"],
			//The camera move block allows a user to move the camera in both the positive and negative direction of the X,Y, and Z axis.
			['', " Move Camera  %m.Move  %n steeps ","moveCamera", "Direction", "1"],
			//The camera look at block allows a user to set the camera to allways be focused on a specific object
			['', "Look at Object %s" , 'lookAt', "Variable"],
			['r', 'New Shape %m.Shapes Size: %n %n %n Location: X: %n Y: %n Z: %n', 'createShape', 'Shape', '1','1','1','0','0','0'],
			['', "Move %s %m.Move %n Steps" , 'moveShape', "Variable", "Left", 1],
			['h', "When %m.Keys  Pressed" , 'key_Pressed', "space"],
			['r', "Add %m.Charecters Location: X: %n Y: %n Z: %n" , "add_Charecter", "Marine", '1','1','1'],
			['r', "Load Object URL: %s", "loadOBJ","http://goodwinj14.github.io/ThreeJS/server/threeJScontrols/shiptriangle.obj"],
        ],
		
		menus: {
		        Scenes: ['Grid','Grass','Blank'],
				Camera: ['Perspective'],
				CameraRotation: ['Left', 'Right', 'Up', 'Down', 'Roll Left', 'Roll Right'],
				CameraOrbit: ['Orbit Left', 'Orbit Right', 'Orbit Up', 'Orbit Down'],
				CameraControls: ["Default", "Move", "Rotate"],
				Move: ['Left', 'Right', 'Up', 'Down','Forward','Back'],
				Shapes: ['Cube', 'Sphere', 'Circle','Cylinder', 'Dodecahedron', 'Icosahedron', 'Plane', 'Ring', 'Torus'],
		    	Keys: ['space', 'up arrow', 'down arrow', 'right arrow', 'left arrow', 'a',  'b',  'c',  'd',  'e',  'f',  'g',  'h', 'i',  'j',  'k',  'l',  'm',  'n',  'o',  'p',  'q',  'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',], 
		    	Charecters: ['Marine'],
		    }
    };

    // Register the extension
   ScratchExtensions.register('Scratch Three JS', descriptor, ext);
})({});

//Generates A random id key to go with a newly created object
var idCounter = 0;
function generatID(objectType){
	idCounter++;
	return objectType + idCounter;
}



/*
**Returns The Browser Type and Version 
**
*/

Podium = {};
Podium.keydown = function(k) {
    var oEvent = document.createEvent('KeyboardEvent');

    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     
    Object.defineProperty(oEvent, 'which', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     

    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
    } else {
        oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
    }

    oEvent.keyCodeVal = k;

    if (oEvent.keyCode !== k) {
        alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    }

    document.dispatchEvent(oEvent);
}
