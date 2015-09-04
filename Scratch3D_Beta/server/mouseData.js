self.addEventListener('message', function(e) {
  if(e.data=="INIT"){
  	init();
  }
}, false);

function init(){
	self.addEventListener("click", click(), false);
	self.postMessage("A successfull web worker call");
}

function click(e) {
    self.postMessage("Click From Web Worker");
}