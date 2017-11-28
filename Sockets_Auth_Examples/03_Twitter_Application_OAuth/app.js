// Declare Requirements
var express = require("express"),
bodyParser = require('body-parser'),
errorHandler = require('errorhandler'),
Twitter = require('twitter'),
favicon = require('serve-favicon');

//Create the app
var app = express();

// Set up the views directory
app.set("views", __dirname + '/views');
// Set EJS as templating language, but allow for .html extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to public folder for css & js files
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/media/favicon.ico'));

app.use(bodyParser.json());

// Set up Express error handling
app.use(errorHandler());
// Start the server
app.listen(3000);
console.log('Express started on port: ' + 3000);

/********************************
Twitter App Info
********************************/
var TWITTER_CONSUMER_KEY = 'AI9OBI9lexo7N8junAck6E3so';
var TWITTER_CONSUMER_SECRET = '	3IoP6o52o0gTpsGRv2c6M4lwS9bghOmP4qE6t4q55siEZR4Blc';
var TWITTER_ACCESS_TOKEN_KEY = '822458350906421250-CjPYEbuEo6UcgD8UX83RdTbWH4X3X1H';
var TWITTER_ACCESS_SECRET = 'gB00hN28cWvWO9xgIYvL5Dwt8PhWY8zzP81be2g1nW987';

var client = new Twitter({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token_key: TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: TWITTER_ACCESS_SECRET
});

//For this example, hard code a user's twitter handle
var params = {
	screen_name: 'NPR'
};

//ROUTES
app.get("/", function(req, res){
	res.render('index');
});

//Using the 'Twitter' lib - https://www.npmjs.com/package/twitter
app.get("/search", function(req, res){
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (error){
			throw error;
		}
		//console.log(tweets);
		console.log(tweets[0].text);
		var theTweet = {'tweet': tweets[0].text };
		res.json(theTweet);
	});
});

app.get("*", function(req,res){
	res.redirect("/");
});
