self.addEventListener('message', function(e) {
  alert(e.data);
}, false);

function init(){
  self.postMessage("A successfull call to a web worker");
}