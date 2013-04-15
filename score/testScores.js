 
 $(function(){
	 $("#subScores").click(function(){
		
		nombre=$("#username").val();
		score=$("#score").val();
		console.log(nombre);
		console.log(score);
		$("#username").val('');
		$("#score").val('');
		
		var url = 'http://gentle-castle-5723.herokuapp.com/submit.json';
		//var xhr = createCORSRequest('GET', url);
		//xhr.send();
		
		createCORSRequest("get", url);
			$.post("http://gentle-castle-5723.herokuapp.com/submit.json", {'username':nombre, 'score':score});
	
		
		
	  });
});


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}
/* 
var xhr = createCORSRequest('GET', url);
if (!xhr) {
  throw new Error('CORS not supported');
}
 */