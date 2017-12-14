//Set up requirements
var express = require("express");
var Request = require('request');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var _ = require('underscore');

//Create an 'express' object
var app = express();
app.use(favicon(__dirname + '/public/media/favicon.ico'));
//Set up the views directory
app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

// Enable json body parsing of application/json
app.use(bodyParser.json());

var port = process.env.PORT || 8000;
// Start the server & save it to a var
var server = app.listen(port);
//Pass the server var as an arg to the 'io' init requirement
var io = require('socket.io')(server);
console.log('Express started on port ' + port);

/*---------------
//DATABASE CONFIG
----------------*/
var cloudant_USER = 'USER';
var cloudant_DB = 'DATABASE NAME';
var cloudant_KEY = 'KEY';
var cloudant_PASSWORD = 'PASSWORD';

var cloudant_URL = "https://" + cloudant_USER + ".cloudant.com/" + cloudant_DB;


/*-----
ROUTES
-----*/

//ADD CORS TO ALL ROUTES
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Main Page Route
app.get("/", function(req, res){
	console.log(req.params);
	res.render('index', {page: 'get all data'});
});

//may not need this route but this shows a single word
// (may be useful for showing high scores)
app.get("/:count", function(req, res){
	var currentCount = req.params.count;
	res.render('index', {page: currentCount});
});

//setup database posting to save usernames
app.post("/save", function(req,res){
	console.log("USER REGISTERED");
	//Get the data from the body
	var data = req.body;
	console.log(data);
	//Send the data to the db
	Request.post({
		url: cloudant_URL,
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true,
		body: data
	},
	function (error, response, body){
		if (response.statusCode == 201){
			console.log("Saved User!");
			res.json(body);
		}
		else{
			console.log("Uh oh...");
			console.log("Error: " + res.statusCode);
			res.send("Something went wrong...");
		}
	});
});

//UPDATE an object in the database
app.post('/update', function(req,res){
	console.log("Updating an object");
	var theObj = req.body;
	//Send the data to the db
	Request.post({
		url: cloudant_URL,
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true,
		body: theObj
	},
	function (error, response, body){
		if (response.statusCode == 201){
			console.log("Updated!");
			res.json(body);
		}
		else{
			console.log("Uh oh...");
			console.log("Error: " + res.statusCode);
			res.send("Something went wrong...");
		}
	});
});

//JSON Serving route- to serve users and high scores
app.get("/api/all", function(req,res){
	console.log('Making a DB request for all user data');
	//Use the Request lib to GET the data in the CouchDB on Cloudant
	Request.get({
		url: cloudant_URL+"/_all_docs?include_docs=true",
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true
	},
	function (error, response, body){
		var theRows = body.rows;
		//Send all of the data
		res.json(theRows);
	});
});

//JSON Serving route to serve single user data
app.get("/api/name/:count", function(req, res){
	var currentCount = req.params.count;
	console.log('Making a db request for: ' + currentCount);
	//Use the Request lib to GET the data in the CouchDB on Cloudant
	Request.get({
		url: cloudant_URL+"/_all_docs?include_docs=true",
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true
	},
	function (error, response, body){
		var theRows = body.rows;
		//Filter the results to match the current word
		var filteredRows = theRows.filter(function (d) {
			return d.doc.count == currentCount;
		});
		res.json(filteredRows);
	});
});

//Catch All Route
app.get("*", function(req, res){
	res.send('Sorry, nothing doing here.');
});

//Main Socket Connection
io.on('connection', function (socket) {
 //console.log('a user connected');
	socket.on('drawing', function (data) {
		socket.broadcast.emit('news', data);
		//console.log(data);
  });
});
