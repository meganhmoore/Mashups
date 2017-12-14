var scoreString;
var images = ["media/7.jpg", "media/8.jpg", "media/13.jpg","media/14.jpg", "media/15.jpg"];
var coords = {0:['450px', '570px'], 1:['450px', '100px'], 2:['800px','200px'], 3:['110px','470px'], 4:['175px','300px']};
var imageIndex;
var dbData;
var userName;
var count;


/*---------------------------------------------
level-by-level code
----------------------------------------------*/
function about(){
	$('#container').html('');
	var data = '<h2> About </h2>';
	data+='<p class="about">For my final project I chose to create a game experience with ';
	data+='inspiration from the game of Wheres Waldo. For the first part of the game, I ask the user to input their name, and "waldo-ify" their name by adding "o" to the end of their name. Then for the first puzzle they must find their "waldo-ified" name in a sea of "waldo"s. Once they have found their name or time has run out, they must go through a series of other games. Flipping between wheres Waldo';
	data+=' discovery games and trivia questions, the user must gather points and try to';
	data+='reach the maximum score or to make it to the high score board. After completing all of the games, the user may either view their standing on the high score board, or they may start over and try the game again. </p> <p class="about"> From the technical side, this project used node packages, a cloudant database and a trivia API. The cloudant database was used to store user data so that users that repeated would not be stored twice, and so that they could try and beat their own personal record. The';
	data+=' database also stored the final score for the user so that the top ten scores could be found and displayed as a high scores table.The trivia API was used to query true or false questions for the user to answer in between solving waldo puzzles. Additionally I used a javascript package called ityped to be able to display the typing animation on the opening screen.</p><p class="about">For future add-ons to this project it would be fun to use unique profile ';
	data+='pictures for each user so that the pictures can be';
	data+=' overlaid on top of the Waldo puzzle and so that they can find themselves in the picture.</p>';
	$('#container').append(data);
	
}

function showHighScores(){
	$('#container').html('');
	$('#score').html('');
	$('#scores').html('');
	$('#container').append("Top Scores: ");

	saveScores();

	getAllData();
	console.log("Getting Top Values");
	var topScorers = ["None","None","None","None","None","None","None","None","None","None"];
	var highScores = [0,0,0,0,0,0,0,0,0,0];
	for(key in dbData){
		var val = dbData[key].doc.count;
		val = parseInt(val);
		var user = dbData[key].doc.user;


		var i=0;
		while(i < 10){
			if(val > highScores[i]){
				var j = i;
				temp = highScores[i];
				tempUser = topScorers[i];
				highScores[i] = val;
				topScorers[i] = user;
				while(j<9){
					newTemp = highScores[j+1];
					newUser = topScorers[j+1];
					highScores[j+1]= temp;
					topScorers[j+1] = tempUser;
					temp = newTemp;
					tempUser = newUser;
					j++;
				}
				break;
			}

			i++;
		}

	}
	var htmlString ='';
	for(var i=0; i<10; i++){
		htmlString+= '<li>'+topScorers[i]+": "+highScores[i]+'</li>';
	}
	$('#container').append(htmlString);
	var restart = "<a class='button' href='https://find-waldo.herokuapp.com'>Restart</a>";
	$('#container').append(restart);
}


function levelOne(){
	userName=userName+"o";
	$('#container').html('');
	$('#container').append("Find "+userName);
	var compName = "waldo";
	var tempName = compName;

	//in case the users name is waldo
	if(userName == "waldo"){
		console.log("same");
		compName = "bobo"
	}

	//making the board of words
	var rand = Math.floor(Math.random() * 100);
	console.log(rand);
	var i = 0;
	while(i<100){
		var randFont= Math.floor((Math.random() * 20) + 20)+"px";
		if(i%10 == 0){
			$("#container").append("<br>");
		}
		if(i == rand){
			tempName = userName;
		}
		else{
			tempName = compName;
		}
	  $("<span />", {class: "span", id:"num"+i,  type: "text"})
			 .css("font-size",randFont)
			 .append(tempName)
	     .appendTo("#container");
	  i++;
	}
	var t=15;
	var time = setInterval(function(){
		$('#score').html('');
		scoreString = "Score: " + count;
		$('#score').append(scoreString);
		if(t==0){
			levelTwo(0);
		}
		t--;
	},1000);

	//add a time to change score
	var findID = "#"+"num"+rand;
	console.log(findID);
	$(findID).click(function(){
		clearInterval(time);
		count=count+t;
		console.log("Score"+count);
		findWaldo(imageIndex, 0, 0);

	})
}

function levelTwo(){
	$('#container').html('');
	$('#score').html('');
	var apiURL= "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=boolean";
	$.ajax({
		url:apiURL,
		type:'GET',
		datatype:'jsonp',
		error: function(err){
			console.log("Problem");
			console.log(err);
			$("container").append("There was an error");
		},
		success: function(data){
			console.log("noice");
			console.log(data);
			playTrivia(data,0);
		}
	})
}

//runs the trivia game
function playTrivia(data, i){
	console.log("question number"+i);
	//screen set up
	$('#container').html('');
	$('#score').html('');
	scoreString = "Score: " + count;
	$('#score').append(scoreString);
	var trueButton = "<button id='trueButton' class='button'>" + "True" + "</button>";
	var falseButton = "<button id='falseButton' class='button'>" + "False" + "</button>";
	$("#container").append(trueButton);
	$("#container").append(falseButton);
	var question = data.results[i];
	var htmlString = "<div>" + question.question+ "</div>";
	var gameOver = '<br><div class="over">Game Over, Great Job!</div>';
	$("#container").append(htmlString);

	$("#trueButton").click(function(){
		if(question.correct_answer == "True"){
			count++;
		}
		i++;
		if(i<4){
			findWaldo(imageIndex, data, i);
		}
		else{
			$('#container').html('');
			$("#container").append(gameOver);
		}
	})
	$("#falseButton").click(function(){
		if(question.correct_answer == "False"){
			count++;
		}
		i++;
		if(i<4){
			findWaldo(imageIndex, data, i);
		}
		else{
			$('#container').html('');
			$("#container").append(gameOver);
		}
	})
}


function findWaldo(imageNum, data, i){

	//setting up screen
	$('#container').html('');
	$('#score').html('');
	scoreString = "Score: " + count;
	$('#score').append(scoreString);
	var img = document.createElement("img");
	var div = document.createElement("div");
	div.style.position = 'relative';
	img.src = images[imageNum];
	img.style.width='1200px';
	var findButton = document.createElement("button");
	findButton.id = 'waldo';
	findButton.style.width = '100px';
	findButton.style.height = '100px';
	findButton.style.position = 'absolute';
	console.log(coords[0]);
	var temp = coords[imageNum];
	findButton.style.left = temp[0];
	findButton.style.top = temp[1];
	div.append(findButton);
	div.append(img);
	container.append(div);


	imageIndex++;

	$('#waldo').click(function(){
		console.log("Found Waldo");
		count++;
		if(imageNum == 0){
			levelOne();
		}
		else if (imageNum == 1){
			levelTwo();
		}
		else if(imageNum > 1){
			playTrivia(data, i);
		}
		else{
			console.log("PROBLME");
		}
	})
}


//Class for my data objects
function Users(dataObj){

	//Set the db object as the
	this.dataObj = dataObj;

	//A method to call on the object to generate HTML and bind event handlers
	this.createDomElement = function(){
		var htmlString = '';
		htmlString += '<li>' + this.dataObj.count + ' : ';
		htmlString += '<a href="/' + this.dataObj.user + '">'  + this.dataObj.user + '</a>';
		htmlString += '<button id=' + this.dataObj._rev + ' class="deleteButton">UPDATE</button>';
		htmlString += '<button id=' + this.dataObj._id + ' class="deleteButton">DELETE</button>';
		htmlString += '</li>';

		//Bind DOM events within the class
		var curObj = this;
		curObj.element = $(htmlString).appendTo('#theDataList');
		curObj.element.click(function(e){
			var theID = $(e.target).attr("id");
			if (theID == curObj.dataObj._rev){
				sendUpdateRequest(curObj.dataObj);
			}
		});
	};
}

function getWord(term){
	$.ajax({
		url: '/api/word/' + term + '?nums=10',
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log(data);
			alert("Oh No! Try a refresh?");
		},
		success: function(data){
			console.log("WooHoo!");
			console.log(data);
			userName = data;
			var wordData = data.map(function(d){
				return d.doc;
			});
		}
	});
}

function getAllData(){
	$.ajax({
		url: '/api/all',
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log(data);
			alert("Oh No! Try a refresh?");
		},
		success: function(data){
			console.log("We have data");
			console.log(data);
			dbData = data;
			return data;


		}
	});
}


//function sendUpdateRequest(){
function saveScores(){
	console.log("Score" + count);
	for(key in dbData){
		console.log(dbData[key]);
		var temp = dbData[key];
		console.log("temp" + temp.doc.user);
		var tempName = temp.doc.user;
		tempName +="o";
		console.log("Stringified: "+ tempName +"vs."+userName);
		if(tempName == userName){
			if(temp.doc.count < count){
				console.log("Need to update count");
				temp.doc.count = count;
				$.ajax({
					url:'/update',
					type:'POST',
					contentType: 'application/json',
					data: JSON.stringify(temp.doc),
					error: function(error){
						console.log("Error updating score");
						console.log(error);
					},
					success: function(data){
						console.log("Updated properly!");
						showHighScores();
					}
				});
			}
		}
	}

}

 function addUser(obj){
	console.log("USER"+userName);
	$.ajax({
		url: '/save',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(obj),
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
		},
		success: function(resp){
			console.log('WooHoo!');
			console.log(resp);
			getAllData();
		}
	});
}


$(document).ready(function(){


	if (page === 'get all data'){
		getAllData();
	}
	else{
		$('#container').hide();
		getWord(page);
	}

	$('#findButton').click(function(){
		count = 0;
		userName = $("#name").val() || 'test';
		var timeStamp = new Date();

		//Create data object to be saved
		var data = {
			user: userName,
			count: count,
			date: timeStamp
		};

		//adding the new user only if they have not already played before
		var alreadyPresent = false;
		for(key in dbData){
			var tempUser = dbData[key].doc.user;
			if(tempUser == userName){
				alreadyPresent = true;
			}
		}
		if(alreadyPresent == false){
			console.log("adding new user" + userName);
			addUser(data);
		}
		else{
			console.log("user already present"+userName);
		}
		$("#name").val('');
		imageIndex = 0;
		findWaldo(imageIndex, 0, 0);
	});

	$('#highScores').click(function(){
		console.log("High Score button clicked");
		showHighScores();
	});

	$('#aboutButton').click(function(){
		console.log("About clicked");
		about();
	});
	$
});
