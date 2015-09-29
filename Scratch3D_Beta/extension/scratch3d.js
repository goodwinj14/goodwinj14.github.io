/***********************************************************/
/***********************************************************/
/*****************Html Three Js Code ***********************/
var sceneWindow = null;
var loadingDocument = false;
var htmlCode = "<html> <head> <title>My first Three.js app</title> <style> body { margin: 0; } canvas { width: 100%; height: 100% } </style> </head> <body> <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r72/three.js'></script> <script> var scene = new THREE.Scene(); var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); var renderer = new THREE.WebGLRenderer(); renderer.setSize( window.innerWidth, window.innerHeight ); document.body.appendChild( renderer.domElement ); function addShape(){var geometry = new THREE.BoxGeometry( 1, 1, 1 ); var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); var cube = new THREE.Mesh( geometry, material ); scene.add( cube ); } camera.position.z = 5; var render = function () {requestAnimationFrame( render ); renderer.render(scene, camera); }; addShape(); render(); </script> </body> </html>";

/*****************Html Three Js Code ***********************/
/***********************************************************/
/***********************************************************/
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.init = function() {
        console.log("descriptor", descriptor);
        console.log("ext", ext);
        sceneWindow = window.open();
        sceneWindow.document.write(htmlCode);
    };

    ext.newShape = function() {
        if(sceneWindow!=null){
       sceneWindow.addShape();
       //descriptor.blocks.push([' ', 'A new Block', 'init']);
       console.log("descriptor", descriptor);
        console.log("ScratchExtensions", ScratchExtensions);
       return "loaded";
   }else{
       return "not loaded";
   }
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'my first block', 'init'],
            ['r', 'New Shape', 'newShape'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('My first extension', descriptor, ext);
})({});

