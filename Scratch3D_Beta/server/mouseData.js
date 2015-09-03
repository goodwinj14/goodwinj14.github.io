self.addEventListener('message', function(e) {
  if(e.data=="INIT"){
  	init();
  }
}, false);

function init(){
	self.postMessage("A successfull web worker call");
}