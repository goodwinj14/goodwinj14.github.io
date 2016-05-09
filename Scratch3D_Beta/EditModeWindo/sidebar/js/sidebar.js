	console.log("SideBar.js");
    function openTab(evt, editTab) {
    // Declare all variables
    evt.preventDefault();
    var i, tabcontent, tablinks;
    console.log("openTab Called");
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabcontent.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(editTab).style.display = "block";
    evt.currentTarget.className += " active";
}

function imageSelected(evt){
    img = document.getElementsByClassName("image");
    for (i = 0; i < img.length; i++) {
        img[i].className = img[i].className.replace(" select", "");
    }
    evt.currentTarget.className += " select";
    EDITOR.add_shape(evt.currentTarget.id);
}

function updateShape(){
    var edit =  GAME_OBJECTS.GetObject(document.getElementById("ACT_OBJ_NAME").value);
    console.log("Geo Check",edit);
    
    //edit.geometry.verticesNeedUpdate = true;
    //edit.
    EDITOR.TEST_OBJ = edit;
    console.log("needs upDating now  ", edit.geometry.attributes.position.needsUpdate);
   /* console.log("Update called");
    w = parseFloat(document.getElementById("ACT_OBJ_WIDTH").value);
    h = parseFloat(document.getElementById("ACT_OBJ_HEIGHT").value);
    d = parseFloat(document.getElementById("ACT_OBJ_DEPTH").value);
    console.log("w", w);
    console.log("h", h);
    console.log("d", d);
    var remove =  GAME_OBJECTS.GetObject(document.getElementById("ACT_OBJ_NAME").value);
    console.log(remove);
    id = remove.id;
    GAME_OBJECTS.RemoveObject(remove);
    var temp = SHAPES.createFromExisting(id,document.getElementById("ACT_OBJ_NAME").value, w, h, d);
    scene.add(temp);
    GAME_OBJECTS.Shapes.push(temp);*/
}

document.addEventListener('Editor_Obj_Selected', updateEditorWindoVals);

function updateEditorWindoVals(event){
    document.getElementById("ACT_OBJ_NAME").value = event.detail.name;

    document.getElementById("ACT_OBJ_LOC_X").value = event.detail.position.x;
    document.getElementById("ACT_OBJ_LOC_Y").value = event.detail.position.y;
    document.getElementById("ACT_OBJ_LOC_Z").value = event.detail.position.z;
    document.getElementById("ACT_OBJ_WIDTH").value = event.detail.scale.x;
    document.getElementById("ACT_OBJ_HEIGHT").value = event.detail.scale.y;
    document.getElementById("ACT_OBJ_DEPTH").value = event.detail.scale.z;

}