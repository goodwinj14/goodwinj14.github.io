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

	// Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ['w', 'New 3D World %m.Scenes Width: %n Height: %n %m.Camera', 'initWorld', "Scene", 10, 10 , "Camera Type",ext],
      ],
		
		menus: {
		        Scenes: ['Grid','Grass','Blank'],
				Camera: ['Perspective'],
		    }
    };

    // Register the extension
   ScratchExtensions.register('Scratch Three JS', descriptor, ext);
})({});

