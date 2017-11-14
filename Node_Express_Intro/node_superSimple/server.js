//Set up requirements
var http = require("http");//gets package from node

// Build the server
var app = http.createServer(function(request, response) {

	console.log(request);
	console.log(request.url);

	if(request.rul =="/mashups"){
		resomnse.writeHead(200, {
			"Content-Type": "text/plain"
		});
		response.end("Mashups!!!");
	}else{
		response.writeHead(200, {
				"Content-Type": "text/plain"
		});
		response.end("NODE!!!!");
	}

});

// Start the server
app.listen(3000, "localhost");
//Write a message to the TERMINAL CONSOLE
console.log("Server running at http://localhost:3000/");
