
var SCENESTYLES = {};
//new THREE.Mesh(new THREE.PlaneGeometry(300,300), new THREE.MeshNormalMaterial());

var geo = new THREE.Geometry();
var material = new THREE.LineBasicMaterial({color: 'white'});
var size = 200, step = 1;
for(var i = -size; i<= size; i+=step){
	geo.vertices.push(new THREE.Vector3(-size, -0.04, i));
	geo.vertices.push(new THREE.Vector3(size, -0.04, i));
	geo.vertices.push(new THREE.Vector3(i, -0.04, -size));
	geo.vertices.push(new THREE.Vector3(i, -0.04, size));
}

SCENESTYLES.GRID = new THREE.Line(geo, material, THREE.LinePieces);