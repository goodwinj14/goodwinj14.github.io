self.addEventListener('message', function(e) {
  if(e.data=="start"){
    init();
  }
}, false);

function init(){
  self.postMessage("A successfull call to a web worker");
}