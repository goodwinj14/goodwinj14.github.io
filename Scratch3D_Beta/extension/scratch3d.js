/***********************************************************/
/***********************************************************/
/*****************Html Three Js Code ***********************/
var sceneWindow = null;
var $3dmodal = null;
var loadingDocument = false;
var htmlCode;
var fullScreenOn = false;

//var htmlCode = "<script>var scene = new THREE.Scene();var cube = null;var camera = new THREE.PerspectiveCamera( 75, document.getElementById('container').offsetWidth/document.getElementById('container').offsetHeight, 0.1, 1000 );var renderer = new THREE.WebGLRenderer();renderer.setSize(document.getElementById('container').offsetWidth,document.getElementById('container').offsetHeight);document.getElementById('container').appendChild( renderer.domElement );var geometry = new THREE.BoxGeometry( 1, 1, 1 );var material = new THREE.MeshbasicMaterial( { color: 0x00ff00 } );cube = new THREE.Mesh( geometry, material );scene.add( cube );cube.rotation.y = 90;cube.rotation.x = 90;camera.position.z = 5;camera.position.y = 1;camera.rotation.x = ( Math.PI / 180);var render = function () {requestAnimationFrame( render );console.log('rendering');if(cube!=null){cube.rotation.x += 0.01;}renderer.render(scene, camera);};//render();}</script>";
/*****************Html Three Js Code ***********************/
/***********************************************************/
/***********************************************************/

/***********************************************************/
/***********************************************************/
/***************Extension Local Data ***********************/
/***************Extension Local Data ***********************/
/***********************************************************/
/***********************************************************/

    var descriptor = {
        blocks: [
            ],
            
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


    
    
    
    
    
    
 //Loads the needed Libaries
    var script = document.createElement('script');
    script.onload = function() {
    };
    
    script.src = 'http://goodwinj14.github.io/Scratch3D_Beta/server/three.js';
    document.getElementsByTagName('body')[0].appendChild(script);

    //Loads the acctuall scratch3D code
    htmlCode = document.createElement('script');
    htmlCode.onload = function() {};
    
    htmlCode.src = 'http://goodwinj14.github.io/Scratch3D_Beta/server/scratch3dScript.js';
    document.getElementsByTagName('body')[0].appendChild(htmlCode);

    //Loads the acctuall scratch3D code
    sideBarScript = document.createElement('script');
    sideBarScript.onload = function() {};
    
    sideBarScript.src = 'http://goodwinj14.github.io/Scratch3D_Beta/EditModeWindo/sidebar/js/sidebar.js';
    document.getElementsByTagName('body')[0].appendChild(sideBarScript);

        //Loads the acctuall scratch3D code
    editorScript = document.createElement('script');
    editorScript.onload = function() {};
    
    editorScript.src = 'http://goodwinj14.github.io/Scratch3D_Beta/EditModeWindo/editor/js/editerMain.js';
    document.getElementsByTagName('body')[0].appendChild(editorScript);

       //Loads the acctuall scratch3D code
    Shapes = document.createElement('script');
    Shapes.onload = function() {};
    
    Shapes.src = 'http://goodwinj14.github.io/Scratch3D_Beta/EditModeWindo/editor/js/Shapes.js';
    document.getElementsByTagName('body')[0].appendChild(Shapes);

       //Loads the acctuall scratch3D code
    SelectedElement = document.createElement('script');
    SelectedElement.onload = function() {};
    
    SelectedElement.src = 'http://goodwinj14.github.io/Scratch3D_Beta/EditModeWindo/editor/js/SelectedElement.js';
    document.getElementsByTagName('body')[0].appendChild(SelectedElement);

       //Loads the acctuall scratch3D code
    GameObjects = document.createElement('script');
    GameObjects.onload = function() {};
    
    GameObjects.src = 'http://goodwinj14.github.io/Scratch3D_Beta/EditModeWindo/editor/js/GameObjects.js';
    document.getElementsByTagName('body')[0].appendChild(GameObjects);

           //Loads the acctuall scratch3D code
    Events = document.createElement('script');
    Events.onload = function() {};
    
    Events.src = 'http://goodwinj14.github.io/Scratch3D_Beta/EditModeWindo/editor/js/Event.js';
    document.getElementsByTagName('body')[0].appendChild(Events);

                      //Loads the acctuall scratch3D code
    TrackballControls = document.createElement('script');
    TrackballControls.onload = function() {};
    
    TrackballControls.src = 'http://goodwinj14.github.io/Scratch3D_Beta/EditModeWindo/js/controls/TrackballControls.js';
    document.getElementsByTagName('body')[0].appendChild(TrackballControls);

    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", "http://goodwinj14.github.io/Scratch3D_Beta/EditModeWindo/sidebar/css/editStyle.css");
    document.getElementsByTagName("head")[0].appendChild(fileref);
 //************************  

    
    
    
    
    
    
    
    
    
    // Register the extension

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
            
            templateContent += $(document.getElementById(templateId)).html(); 
                templateContent = "<dialog id='main' class='modal-inner' style='position: absolute; top: 72px; left: 5px' ><section id='Holder' style=' padding: 0px; margin-top: -22px;'><div id='sidebar' style='float: right; background-color: green;'></div><div id='container' style=' position: relative; background-color: #e6ffff; top: 0; left: 0; '></div><img id='expand' src='https://raw.githubusercontent.com/goodwinj14/goodwinj14.github.io/master/Scratch3D_Beta/images/icon-expand-blue.png' style='position: absolute; top: 5px; left: 7px;' onclick='fullScreen()'/><img id='edit_mode' src='http://goodwinj14.github.io/Scratch3D_Beta/images/editMode.png' style='position: absolute; top: 5px; margin-left: -90px;'/><img id='run_mode' src='http://goodwinj14.github.io/Scratch3D_Beta/images/runmode.png' style='position: absolute; top: 5px; margin-right: -90px;'/><img id='closeButton' src='http://goodwinj14.github.io/Scratch3D_Beta/images/close-icon.png' style='position: absolute; top: 5px; left: 458px;'/></section></dialog>";
                

        $template = _.template(templateContent);
        $element = $("<dialog></dialog>")
            .attr("id", elementId)
            .html($template);
        $element.appendTo(appendTo);
        document.getElementById("Holder").appendChild(htmlCode);
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


    var $modal =  CreateFromTemplate(modalId, templateId, "div", "body", null, data);
    
    $modal.addClass("modal"); 
    $modal.addClass("visible");
    $modal.click(function(e){if ($(e.target).is($(this))) $(this).trigger("modal:exit")});
    /*$(".modal-fade-screen", $modal)
        .addClass("visible")
        .click(function(e){if ($(e.target).is($(this))) $(this).trigger("modal:exit")});*/

    $(".modal-close", $modal).click(function(e){
        e.preventDefault();
        $(document).trigger("modal:exit")
    });
    
    $("body").addClass("modal-open");

    $(document).one("modal:exit page:show editor:extensionLoaded", function(e){
        $("body").removeClass("modal-open");
        Scratch.FlashApp.ASobj.ASsetModalOverlay(false);
        $modal.remove();
    });
    return $modal;
}

      $modal = sModal("template-warning", null);
      $("a", $modal).click(function(e){
        console.log("called a");
      });
      $("li", $modal).click(function(e){
        console.log("called li");
      });
      $("ul", $modal).click(function(e){
        console.log("called ul");
      });
      $("tabs", $modal).click(function(e){
        console.log("called tabs");
      });
      $("tablinks", $modal).click(function(e){
        console.log("called tablinks");
      });
    $("img", $modal).click(function(e){
        buttonID = e.delegateTarget.id;

        if(buttonID=='edit_mode'){

            var w = (window.innerWidth-7).toString() + "px";
            var containerWidth = (window.innerWidth-407).toString() + "px";
            var h = (window.innerHeight-7).toString() + "px";
            var bPosition = (window.innerWidth-437).toString() + "px";
            fullScreenOn= true;
            document.getElementById("main").style.width = "100%";
            document.getElementById("main").style.top = "0px";
            document.getElementById("Holder").style.width = "100%";
            document.getElementById("container").style.width = "69%";
            document.getElementById("sidebar").style.width = "31%";
            document.getElementById("sidebar").style.margin.left = "-19px";
            document.getElementById("main").style.height = h;
            document.getElementById("Holder").style.height = h;
            document.getElementById("container").style.height = h;
            document.getElementById("closeButton").style.left = bPosition;
            //ADDS THE EDITOR SIDE BAR TO THE EXSTENTION
                //Loads Side Bar Code From File
            jQuery.ajax({ 
                url: "http://goodwinj14.github.io/Scratch3D_Beta/EditModeWindo/sidebar/sideMenu.html", dataType: "html" 
            }).done(function( responseHtml ) {
                document.getElementById("sidebar").innerHTML = responseHtml;
            });

        Scratch3d.windowActive = true;
        Scratch3d.init(ext);
        }
        
        if(buttonID=='run_mode'){
            fullScreenOn= false;
            document.getElementById("sidebar").innerHTML = "";
            document.getElementById("main").style.top = "70px";
            document.getElementById("main").style.width = "500px";
            document.getElementById("Holder").style.width = "462px";
            document.getElementById("container").style.margin.left = "19px";
            document.getElementById("container").style.width = "482px";
            document.getElementById("main").style.height = "400px";
            document.getElementById("Holder").style.height = "";
            document.getElementById("container").style.height = "361px";
            document.getElementById("closeButton").style.left = "458px";
            Scratch3d.updateWindow();
        }
        
        if(buttonID=='expand'){
            if(!fullScreenOn){
            var w = (window.innerWidth-7).toString() + "px";
            var h = (window.innerHeight-7).toString() + "px";
            var bPosition = (window.innerWidth-20).toString() + "px";
            fullScreenOn= true;
            document.getElementById("main").style.width = w;
            document.getElementById("main").style.top = "0px";
            document.getElementById("Holder").style.width = w;
            document.getElementById("container").style.width = w;
            document.getElementById("main").style.height = h;
            document.getElementById("Holder").style.height = h;
            document.getElementById("container").style.height = h;
            document.getElementById("closeButton").style.left = bPosition;
            Scratch3d.updateWindow();
            }else{
            fullScreenOn= false;
            document.getElementById("main").style.top = "70px";
            document.getElementById("main").style.width = "500px";
            document.getElementById("Holder").style.width = "462px";
            document.getElementById("container").style.margin.left = "19px";
            console.log(document.getElementById("container").style);
            document.getElementById("container").style.width = "482px";
            document.getElementById("main").style.height = "400px";
            document.getElementById("Holder").style.height = "";
            document.getElementById("container").style.height = "361px";
            document.getElementById("closeButton").style.left = "458px";
            Scratch3d.updateWindow();
            }
            
        }if(buttonID=='closeButton'){
        Scratch3d.windowActive = false;
        e.preventDefault();
        $(document).trigger("modal:exit")
        }
    });
        console.log("Called");
      /*fileSelector = document.createElement('input');
      fileSelector.setAttribute('type', 'file');
      document.body.appendChild(fileSelector);
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
     zxzx fileSelector.dispatchEvent(evt);*/
     

        console.log("not in null");
        if(sceneWindow!=null){
            console.log("not null");
            sceneWindow.addShape();
            updateExtension();
            return "loaded";
        }else{
            console.log("null");
            return "not loaded";
        }
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


    //Reloads The extention to update block data
    function updateExtension(){
    ScratchExtensions.unregister('scratch3d');
    ScratchExtensions.register('scratch3d', descriptor, ext);
    }

    // Block and block menu descriptions
        descriptor.blocks.push(['null', 'Run Scratch 3D!', 'init']);
        descriptor.blocks.push([' ', 'New Shape %m.Shapes ID: %s Size: %n %n %n Location: X: %n Y: %n Z: %n', 'newShape', 'Cube', 'ID Name', '1','1','1','0','0','0']);
        descriptor.blocks.push(['null', 'Upload', 'uploadFile']);
    //

    ScratchExtensions.register('scratch3d', descriptor, ext);
    console.log("disc", descriptor);
    console.log("ext", ext);
    //Initializes the blank scene 
    console.log(document.getElementsByClassName("success"));
})({});
  
