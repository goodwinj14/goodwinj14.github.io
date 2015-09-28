/***********************************************************/
/***********************************************************/
/*****************Html Three Js Code ***********************/
var sceneWindow;
var loadingDocument = false;
var htmlCode = "<html><head><title>My first Three.js app</title><style>body{margin: 0;}canvas{width: 100%; height: 100%}</style></head><body><script src='http://threejs.org/build/three.min.js'></script><script>var scene=new THREE.Scene();var camera=new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );var renderer=new THREE.WebGLRenderer();renderer.setSize( window.innerWidth, window.innerHeight );document.body.appendChild( renderer.domElement );var geometry=new THREE.BoxGeometry( 1, 1, 1 );var material=new THREE.MeshBasicMaterial({color: 0x00ff00});var cube=new THREE.Mesh( geometry, material );scene.add( cube );camera.position.z=5;var render=function (){requestAnimationFrame( render );cube.rotation.x +=0.1;cube.rotation.y +=0.1;renderer.render(scene, camera);};render();</script></body></html>";
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
        sceneWindow = window.open();
        sceneWindow.document.write(htmlCode);
    };

    ext.newShape = function() {
       
       return "loaded";
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