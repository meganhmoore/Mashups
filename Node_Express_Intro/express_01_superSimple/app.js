//package.json specifies all of the dependencies needed for this
//application


//Set up requirements
var express = require('express');

//Create an 'express' object, an object that deals with the requests
var app = express();

//Declare a route
app.get('/', function(request, response){
	response.send('We are good to go!');
});

app.get('/mashups', function(request, response){
	response.send('Mashups!');
});

//* is a catchall if something goes wrong has to come last so that
//things that DO work get checked for first and applied
//only if everything else doesn't work should this come into play
app.get('*', function(request, response){
	response.send('Sorry Something is Wrong');
});



//Start the server
app.listen(3000);

//Write a message to the TERMINAL CONSOLE
console.log("Express App running at localhost:3000");
