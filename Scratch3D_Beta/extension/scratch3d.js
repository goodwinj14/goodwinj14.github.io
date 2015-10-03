/***********************************************************/
/***********************************************************/
/*****************Html Three Js Code ***********************/
var sceneWindow = null;
var $3dmodal = null;
var loadingDocument = false;
var htmlCode = "<html> <head> <title>My first Three.js app</title> <style> body { margin: 0; } canvas { width: 100%; height: 100% } </style> </head> <body> <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r72/three.js'></script> <script> var scene = new THREE.Scene(); var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); var renderer = new THREE.WebGLRenderer(); renderer.setSize( window.innerWidth, window.innerHeight ); document.body.appendChild( renderer.domElement ); function addShape(){var geometry = new THREE.BoxGeometry( 1, 1, 1 ); var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); var cube = new THREE.Mesh( geometry, material ); scene.add( cube ); } camera.position.z = 5; var render = function () {requestAnimationFrame( render ); renderer.render(scene, camera); }; addShape(); render(); </script> </body> </html>";

/*****************Html Three Js Code ***********************/
/***********************************************************/
/***********************************************************/

/***********************************************************/
/***********************************************************/
/***************Extension Local Data ***********************/

    var descriptor = {
        blocks: [],

        menus: {
            Scenes: ['Grid','Grass','Space','Blank'],
            Toggle: ['On','Off'],
            Camera: ['Perspective'],
            CameraRotation: ['Left', 'Right', 'Up', 'Down', 'Roll Left', 'Roll Right'],
            CameraOrbit: ['Orbit Left', 'Orbit Right', 'Orbit Up', 'Orbit Down'],
            CameraControls: ["First Person", "Mouse/Trackball"],
            Sides: ["Back", "Front"],
            Move: ['Left', 'Right', 'Up', 'Down','Forward','Back'],
            Shapes: ['Cube', 'Sphere', 'Circle','Cylinder', 'Dodecahedron', 'Icosahedron', 'Plane', 'Ring', 'Torus'],
            Planets: ['Earth', 'Sun','Moon', 'Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto! #savepluto'],   
            Materials:['MeshBasicMaterial', 'MeshNormalMaterial','MeshDepthMaterial', 'MeshLambertMaterial','MeshPhongMaterial'],
            Images:['Crate', 'Brick', 'Earth', 'Moon', 'Grass','dirt'],
            Keys: ['space', 'up arrow', 'down arrow', 'right arrow', 'left arrow', 'a',  'b',  'c',  'd',  'e',  'f',  'g',  'h', 'i',  'j',  'k',  'l',  'm',  'n',  'o',  'p',  'q',  'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',], 
            Charecters: ['Marine','Car', 'Cat', 'Cat1', 'Lego Vader', 'Pirate Ship'],
            Lights: ['Ambient','Directional','Point'],
            Axis3: ['X','Y','Z'],
            Axis2: ['X','Y'],
            MouseOptions: ['Click', 'Down', 'Up', 'Double Click'],
        }
    };

   
/***************Extension Local Data ***********************/
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

    ext.init = function(){

    var inputElement = null;
    function CreateFromTemplate(elementId, templateId, elementType, appendTo, wrapper, data) {
        elementType = elementType || "div";
        appendTo = appendTo || "body";
        data = data || {};

        var $element = $(document.getElementById(elementId));

        if (!$element.length) {
            var templateContent = "";
            if (typeof(templateId) != "string") {
                for (var id in templateId) {
                    templateContent += $(document.getElementById(templateId[id])).html();

                }
                console.log("if: ", templateContent);
            } else {
                templateContent += $(document.getElementById(templateId)).html();

                    templateContent = htmlCode;
                    console.log("htmlCode: ",templateContent);
            }
            $template = _.template(templateContent);
            htmlCode = "<html><head><title>My first Three.js app</title><style>body { margin: 0; }canvas { width: 100%; height: 100% }</style></head><body><div id='container' style='width:1425px; height:720px;'></div> <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r72/three.js'></script><script>console.log('inner Sript Of 3d called');var scene = new THREE.Scene();var cube = null;var camera = new THREE.PerspectiveCamera( 75, document.getElementById('container').offsetWidth/document.getElementById('container').offsetHeight, 0.1, 1000 );var renderer = new THREE.WebGLRenderer();renderer.setSize(document.getElementById('container').offsetWidth,document.getElementById('container').offsetHeight);document.getElementById('container').appendChild( renderer.domElement );var geometry = new THREE.BoxGeometry( 1, 1, 1 );var material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );cube = new THREE.Mesh( geometry, material );scene.add( cube );cube.rotation.y = 90;cube.rotation.x = 90;camera.position.z = 5;camera.position.y = 1;camera.rotation.x = ( Math.PI / 180);var render = function () {requestAnimationFrame( render );console.log('rendering');if(cube!=null){cube.rotation.x += 0.01;}renderer.render(scene, camera);};render();</script></body></html>";
            //htmlCode = "<html><head><title>My first Three.js app</title><div id='container'><div id = 'holder'>Hello World</div></div><style>body { margin: 0; }canvas { width: 100%; height: 100% }</style></head><body> <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r72/three.js'></script><script>console.log('inner Sript Of 3d called');var scene = new THREE.Scene();var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );var renderer = new THREE.WebGLRenderer();renderer.setSize( window.innerWidth, window.innerHeight ); document.getElementById('holder').innerHTML='Good Bye Crule World';document.getElementById('container').appendChild( renderer.domElement );function addShape(){var geometry = new THREE.BoxGeometry( 1, 1, 1 );var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );var cube = new THREE.Mesh( geometry, material );scene.add( cube );}camera.position.z = 5;var render = function () {requestAnimationFrame( render );renderer.render(scene, camera);};addShape();render();</script></body></html>";
            $element = $("<html></html>")
                .attr("id", elementId)
                .html(htmlCode);
            if (wrapper) $element.wrapInner(wrapper);
            $element.appendTo(appendTo)
        }
        //$element[0] =  htmlCode;
        console.log("element3: ",$element);
        return $element;
    };


      function sModal(templateId, data) {
        /*
         * Copies the HTML referenced by data-template into a new element,
         * with id="modal-[template value]" and creates an overlay on the
         * page, which when clicked will close the popup.
         */

        var zIndex = 100;
        var modalId = ("modal-" + templateId).replace(",", "-");
        //var templateId = "<dialog class='extension-warning with-icon'><section><h2>Warning</h2><p>The extensions on this site are experimental</p></section><section><p>The Scratch Team is <strong>not</strong> responsible for the extensions and projects on this site. Please use caution when using these extensions. <a href='#faq'>Learn More</a></p><input type='file' id='upload'/><button data-action='show' data-target='home'>Back to ScratchX home</button><button class='success'>I understand, continue</button></section></dialog>"

    //<input type='file' id='upload'/>
        $modalwrapper = $("<div class='modal-fade-screen'><button data-dismiss'modal' id='close3d' style='width:150px; height:25px;'>Close</button></div>");
        var $modal = CreateFromTemplate(modalId, templateId, "dialog", "html", $modalwrapper, data);

        $modal.addClass("modal");

        $(".modal-fade-screen", $modal)
            .addClass("visible")
            .click(function(e){if ($(e.target).is($(this))) $(this).trigger("modal:exit")});

        $(".modal-close", $modal).click(function(e){
            e.preventDefault();
            console.log("modal-close ");
            $(document).trigger("modal:exit")
        });
        
        $("body").addClass("modal-open");

        $(document).one("modal:exit page:show editor:extensionLoaded", function(e){
            $("body").removeClass("modal-open");
            //$('#modal').modal('hide');
            Scratch.FlashApp.ASobj.ASsetModalOverlay(false);
            $modal.remove();
        });
        return $modal;
    }
        if($3dmodal==null){
          $3dmodal = sModal("template-warning", null);
      }else{
            console.log("modal-open5",$3dmodal);
            console.log("modal-open5",document);
            Scratch.FlashApp.ASobj.ASsetModalOverlay(true);
            $("body").trigger("modal:open");
      }

        $("button", $3dmodal).click(function(e){
            e.preventDefault();
            $(document).trigger("modal:exit")
        });
          //document.body.focus();
          /*fileSelector = document.createElement('input');
          fileSelector.setAttribute('type', 'file');
          document.body.appendChild(fileSelector);
          var evt = document.createEvent("MouseEvents");
          evt.initEvent("click", true, false);
         zxzx fileSelector.dispatchEvent(evt);*/
    }

    ext.runScratch3d = function(){

    };


    ext.uploadFile = function(){
         /*var fileSelector = document.createElement('button');
        fileSelector.setAttribute('id', 'file');
    document.body.appendChild(fileSelector);
    var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
      fileSelector.dispatchEvent(evt);
      console.log(document.getElementById('file'));*/

var inputElement = null;
function CreateFromTemplate(elementId, templateId, elementType, appendTo, wrapper, data) {
    elementType = elementType || "div";
    appendTo = appendTo || "body";
    data = data || {};

    var $element = $(document.getElementById(elementId));
    if (!$element.length) {
        var templateContent = "";
        if (typeof(templateId) != "string") {
            for (var id in templateId) {
                templateContent += $(document.getElementById(templateId[id])).html();

            }
            console.log("if: ", templateContent);
        } else {
            templateContent += $(document.getElementById(templateId)).html();
                templateContent = "<dialog class='extension-warning with-icon'><section><h2>Warning</h2><p>The extensions on this site are experimental</p></section><section><p>The Scratch Team is <strong>not</strong> responsible for the extensions and projects on this site. Please use caution when using these extensions. <a href='#faq'>Learn More</a></p><input type='file' id='upfile'/><output type='file' id='subfile'/><button data-action='show' data-target='home'>Back to ScratchX home</button><button >Uplaod File</button></section></dialog>"
        }
        $template = _.template(templateContent);
        $element = $("<"+elementType+"></"+elementType+">")
            .attr("id", elementId)
            .html($template(data));
        if (wrapper) $element.wrapInner(wrapper);
        $element.appendTo(appendTo)
    }
    return $element;
};


  function sModal(templateId, data) {
    /*
     * Copies the HTML referenced by data-template into a new element,
     * with id="modal-[template value]" and creates an overlay on the
     * page, which when clicked will close the popup.
     */

    var zIndex = 100;
    var modalId = ("modal-" + templateId).replace(",", "-");
    //var templateId = "<dialog class='extension-warning with-icon'><section><h2>Warning</h2><p>The extensions on this site are experimental</p></section><section><p>The Scratch Team is <strong>not</strong> responsible for the extensions and projects on this site. Please use caution when using these extensions. <a href='#faq'>Learn More</a></p><input type='file' id='upload'/><button data-action='show' data-target='home'>Back to ScratchX home</button><button class='success'>I understand, continue</button></section></dialog>"

//<input type='file' id='upload'/>
    $modalwrapper = $("<div class='modal-fade-screen'><div class='modal-inner'></div></div>");
    var $modal = CreateFromTemplate(modalId, templateId, "dialog", "body", $modalwrapper, data);

    $modal.addClass("modal");

    $(".modal-fade-screen", $modal)
        .addClass("visible")
        .click(function(e){if ($(e.target).is($(this))) $(this).trigger("modal:exit")});

    $(".modal-close", $modal).click(function(e){
        e.preventDefault();
        console.log("modal-close ");
        $(document).trigger("modal:exit")
    });
    
    $("body").addClass("modal-open");

    $(document).one("modal:exit page:show editor:extensionLoaded", function(e){
        $("body").removeClass("modal-open");
        Scratch.FlashApp.ASobj.ASsetModalOverlay(false);
        $modal.remove();
    });
    console.log("returned1");
    return $modal;
}

      $modal = sModal("template-warning", null);
      inputElement = document.getElementById("upfile");
      inputElement.addEventListener("change", function(event){
        file = inputElement.files,
        fsize = file.length;

    for (i=0; i < fsize; i++) {
        console.log("Filename: " + file[i].name);
        console.log("Type: " + file[i].type);
        console.log("Size: " + file[i].size + " bytes");
    }

    var reader = new FileReader();
        reader.onload = function(event) {
            var contents = event.target.result;
            console.log("File contents: " + contents);
            };
        reader.readAsText(file[0]);

      },false);
    $("button", $modal).click(function(e){
       // e.preventDefault();
        console.log("modal-button 2");
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, false);
        document.getElementById("upfile").dispatchEvent(evt);
        
        //$(document).trigger("modal:exit")
    });
      /*fileSelector = document.createElement('input');
      fileSelector.setAttribute('type', 'file');
      document.body.appendChild(fileSelector);
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
     zxzx fileSelector.dispatchEvent(evt);*/
    }

    ext.newShape = function() {
        if(sceneWindow!=null){
        console.log("ScratchExtensions", ScratchExtensions);
        sceneWindow.addShape();
        updateExtension();
       return "loaded";
   }else{
       return "not loaded";
   }
    };

    //Reloads The extention to update block data
    function updateExtension(){
    ScratchExtensions.unregister('scratch3d');
    ScratchExtensions.register('scratch3d', descriptor, ext);
    }

    // Block and block menu descriptions
        descriptor.blocks.push([' ', 'New 3D World %m.Scenes', 'init']);
        descriptor.blocks.push(['r', 'New Shape', 'newShape']);
        descriptor.blocks.push(['null', 'Upload', 'uploadFile']);
    //

    // Register the extension
    ScratchExtensions.register('scratch3d', descriptor, ext);
})({});

