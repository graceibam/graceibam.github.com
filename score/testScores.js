 
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
		
		var xhr = new XMLHttpRequest();
		xhr.open("get", url, true);
		xhr.onload = function(){
			$.post("http://gentle-castle-5723.herokuapp.com/submit.json", {'username':nombre, 'score':score});
			//do something
		};
		xhr.send(null);
		
		
	  });
});

