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
    var edit_Obj =  GAME_OBJECTS.GetObject(document.getElementById("ACT_OBJ_NAME").value);
   

    w = parseFloat(document.getElementById("ACT_OBJ_WIDTH").value);
    h = parseFloat(document.getElementById("ACT_OBJ_HEIGHT").value);
    d = parseFloat(document.getElementById("ACT_OBJ_DEPTH").value);
        var tempSize = edit_Obj.geometry.boundingBox.max.x-edit_Obj.geometry.boundingBox.min.x;
    if(w!= tempSize){
        dist = new THREE.Vector3(edit_Obj.geometry.boundingBox.max.x+(w-tempSize),0,0);
        ModifyMesh.updateDimensions(edit_Obj,"face_0",dist);
        SELECTED.updateHelperPosition(SELECTED_OBJECT);
    }
        var tempSize = edit_Obj.geometry.boundingBox.max.y-edit_Obj.geometry.boundingBox.min.y;
    if(h!= tempSize){
        dist = new THREE.Vector3(0,(h-tempSize),0);
        ModifyMesh.updateDimensions(edit_Obj,"face_4",dist);
        SELECTED.updateHelperPosition(SELECTED_OBJECT);
    }
        var tempSize = edit_Obj.geometry.boundingBox.max.z-edit_Obj.geometry.boundingBox.min.z;
    if(d!= tempSize){
        console.log(tempSize);
        dist = new THREE.Vector3(0,0,edit_Obj.geometry.boundingBox.max.z+(d-tempSize));
        ModifyMesh.updateDimensions(edit_Obj,"face_3",dist);
        SELECTED.updateHelperPosition(SELECTED_OBJECT);
    }


    locX = parseFloat(document.getElementById("ACT_OBJ_LOC_X").value);
    locY = parseFloat(document.getElementById("ACT_OBJ_LOC_Y").value);
    locZ = parseFloat(document.getElementById("ACT_OBJ_LOC_Z").value);
    if(locX!=edit_Obj.position.x){
        edit_Obj.position.x = locX;
    }if(locY!=edit_Obj.position.y){
        edit_Obj.position.y = locY;
    }if(locZ!=edit_Obj.position.z){
        edit_Obj.position.z = locZ;
    }


    rotX = parseFloat(document.getElementById("ACT_OBJ_ROT_X").value);
    rotY = parseFloat(document.getElementById("ACT_OBJ_ROT_Y").value);
    rotZ = parseFloat(document.getElementById("ACT_OBJ_ROT_Z").value);
    if(rotX!=edit_Obj.rotationalOffset.x){
        ModifyMesh.updateRotation(edit_Obj, new THREE.Euler((rotX*Math.PI)/180,0, 0,'XYZ'));
    }if(rotY!=edit_Obj.rotationalOffset.y){
        ModifyMesh.updateRotation(edit_Obj, new THREE.Euler((0,rotY*Math.PI)/180, 0,'XYZ'));
    }if(rotZ!=edit_Obj.rotationalOffset.z){
        ModifyMesh.updateRotation(edit_Obj, new THREE.Euler((0,0,rotZ*Math.PI)/180,'XYZ'));
    }


    /*var remove =  GAME_OBJECTS.GetObject(document.getElementById("ACT_OBJ_NAME").value);
    console.log(remove);
    id = remove.id;
    GAME_OBJECTS.RemoveObject(remove);
    var temp = SHAPES.createFromExisting(id,document.getElementById("ACT_OBJ_NAME").value, w, h, d);
    scene.add(temp);
    GAME_OBJECTS.Shapes.push(temp);*/
}

document.addEventListener('Editor_Obj_Selected', updateEditorWindoVals);
document.addEventListener('Editor_Obj_rotation_change', updateEditorWindoVals);
document.addEventListener('Editor_Obj_position_change', updateEditorWindoVals);
document.addEventListener('Editor_Obj_size_change', updateEditorWindoVals);

function updateEditorWindoVals(event){
    document.getElementById("ACT_OBJ_NAME").value = event.detail.name;

    document.getElementById("ACT_OBJ_LOC_X").value = event.detail.position.x;
    document.getElementById("ACT_OBJ_LOC_Y").value = event.detail.position.y;
    document.getElementById("ACT_OBJ_LOC_Z").value = event.detail.position.z;
    document.getElementById("ACT_OBJ_ROT_X").value = event.detail.rotationalOffset.x;
    document.getElementById("ACT_OBJ_ROT_Y").value = event.detail.rotationalOffset.y;
    document.getElementById("ACT_OBJ_ROT_Z").value = event.detail.rotationalOffset.z;
    document.getElementById("ACT_OBJ_WIDTH").value = event.detail.geometry.boundingBox.max.x-event.detail.geometry.boundingBox.min.x;
    document.getElementById("ACT_OBJ_HEIGHT").value = event.detail.geometry.boundingBox.max.y-event.detail.geometry.boundingBox.min.y;
    document.getElementById("ACT_OBJ_DEPTH").value = event.detail.geometry.boundingBox.max.z-event.detail.geometry.boundingBox.min.z;

}