 
 $(function(){
	 $("#subScores").click(function(){
		
		nombre=$("#username").val();
		score=$("#score").val();
		console.log(nombre);
		console.log(score);
		$("#username").val('');
		$("#score").val('');
		
		$.post("gentle-castle-5723.herokuapp.com/submit.json", {'username':nombre, 'score':score});
	  });
});

