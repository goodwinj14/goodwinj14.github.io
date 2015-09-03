self.addEventListener('message', function(e) {
  self.postMessage("A successfull call to a web worker");
}, false);

function init(){
  self.postMessage('A successfull call to a web worker');
}