/* 
Grace Hu
12/9/15
Background.js 
Description: File contains ongoing, background listeners for 
	- when the user presses the Export button in the Gcal to Gsheets extension
	- changes in labels from the Create Event extension
Anything printed to console can be viewed from the background link in the Chrome extensions page.
*/

//update urlparams
//comes in the format of http://script...../exec?input=things1&input=thing2
function updateURL(list){
	if(list == null)
		return '';
	var input = 'input=';
	var and = '&'
	var url_end = '';
	for(var i = 0; i < list.length; i++){
		if(i == 0)
			url_end = url_end + input + list[i];
		else
			url_end = url_end + and + input + list[i];
	}
	return url_end;
}

// Handle requests for web app launch, ie when user presses "Export" button
chrome.runtime.onMessage.addListener(function(request) {
	//url that opens gcal to gsheets web app
    var myURL = 'https://script.google.com/macros/s/AKfycbzM1pJVozTCKM5DIDuybMqAywx7kvKXhnZHB1LZaEpgTzw_GqM/exec'; //TimeMgmt
    
    if (request.type === 'export') {    		
		//grab from local storage the previously stored label
		var allLabels = localStorage.getItem("previousTags");
		var parsedLabels = JSON.parse(allLabels);
		console.log("Labels after getting from storage are: " + parsedLabels);
		
		url_params = '?' + updateURL(parsedLabels);
		console.log("url params is: " + url_params);
		
		//open web app with customized labels embedded in url
		chrome.tabs.create({
			url: myURL + url_params,
			active: true
		}, function(tab) {
			//empty
		});
    }
});

//listening for changes in labels from the Create Event extension 
//changes result from adding labels, deleting, and creating an event
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
  	var requestLabels = []; //holds labels that are being sent from create event extension
    if (request.myCustomMessage) {
    	console.log("got message");
    	requestLabels = request.myCustomMessage;
      	//sendResponse({"result":"Ok, Gcal-extension got your message " + requestLabels});
		
      	//add to the url_params
      	url_params = '?' + updateURL(requestLabels);
      	
      	//add these labels to the local storage for future retrieval
        localStorage.setItem("previousTags", JSON.stringify(requestLabels));
    	console.log("local storage set");
    }
});