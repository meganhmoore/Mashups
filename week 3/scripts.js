console.log("Ready 1");

function searchWiki(term){
	var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
	var searchURL = wikiURL + term;
	console.log(wikiURL);

	$('#results').html("");


	$.ajax({
		url: searchURL,
		type: 'GET',
		dataType: 'jsonp',//this can be problematic
		error: function(err){
			console.log("we got problemzzz");
			console.log(err);
		},
		success: function(data){
			console.log("noice");
			console.log(data);

			var theResults = data[1];
			console.log(theResults);
			for(var i=0; i<theResults.length; i++){
				var htmlString = "<div>" + theResults[i] + "</div>";
				$("#results").append(htmlString);
			}
		}

	});

}

$(document).ready(function(){ //event listener
	console.log("Ready 2");
	$("#theButton").click(function(){
		console.log("The button was pressed!");

		//Grab the inut box value
		var theInput = $('#theInput').val();
		console.log(theInput);

		searchWiki(theInput);
	});//selecting for an element based on a characteristic (like an id) and creating a function that runs
});

console.log("Ready 3");
