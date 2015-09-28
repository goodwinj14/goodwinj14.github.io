/***********************************************************/
/***********************************************************/
/*****************Html Three Js Code ***********************/
var sceneWindow = null;
var loadingDocument = false;

var htmlCode = "<html><head><title>My first Three.js app</title><style>body{margin:0}canvas{width:100%;height:100%}</style><body><script src='https://github.com/mrdoob/three.js/raw/master/build/three.min.js'></script><script>function addShape(){var e=new THREE.BoxGeometry(1,1,1),n=new THREE.MeshBasicMaterial({color:65280}),r=new THREE.Mesh(e,n);scene.add(r)}function animate(){requestAnimationFrame(animate),render()}var scene=new THREE.Scene,camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3),renderer=new THREE.WebGLRenderer;renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(renderer.domElement),camera.position.z=5;var render=function(){renderer.render(scene,camera)};render();</script>"


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
        console.log(htmlCode);
        sceneWindow.document.write(htmlCode);
    };

    ext.newShape = function() {
        if(sceneWindow!=null){
       sceneWindow.addShape();
   }
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

