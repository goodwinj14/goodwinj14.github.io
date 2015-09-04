self.addEventListener('message', function(e) {
  if(e.data=="INIT"){
  	init();
  }
}, false);

function init(){
	window.addEventListener("click", function(e){
			console.log("Window click notice");
		 })
	self.postMessage("A successfull web worker call");
}