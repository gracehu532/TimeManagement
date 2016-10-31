/*
Grace Hu
12/15/15
exportScript.js
Description: Contains a listener that responds to user clicking "Export" and
sends message to background.js page to launch the web app.
*/

var exportButton = document.getElementById("exportNow");
if(exportButton){ //make sure button is not null
	exportButton.addEventListener('click', function() {
		//opens up the webapp
		chrome.runtime.sendMessage({type:'export'});
	});
}

