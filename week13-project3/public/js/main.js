
/**var name = document.getElementById('name');
name.addEventListener('click', function firstLevel(){
	console.log("clicked");//log user info in the database
  $('#container').html('');
	levelOne("wald");
})**/

function levelOne(name, count){
	name=name+"o";
	$('#container').html('');
	$('#container').append("Find "+name);
	var compName = "waldo";
	var tempName = compName;
	if(name == "waldo"){
		console.log("same");
		compName = "bobo"
	}
	var rand = Math.floor(Math.random() * 100);
	console.log(rand);
	var i = 0;
	while(i<100){
		var randFont= Math.floor((Math.random() * 20) + 20)+"px";
		if(i%10 == 0){
			$("#container").append("<br>");
		}
		if(i == rand){
			tempName = name;
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
	//add a time to change score
	var findID = "#"+"num"+rand;
	console.log(findID);
	$(findID).click(function(){
		levelTwo(name, count, 0);
	})
}

function levelTwo(name, count){
	console.log(name);
	$('#container').html('');

	var apiURL= "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium";
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
			playTrivia(data, count);
		}
	})
}

//runs the trivia game
function playTrivia(data, count, i){
	console.log("DATA"+data);
	console.log("QUESTIONS"+data.results);
	var trueButton = "<button>" + "True" + "</button>";
	var falseButton = "<button>" + "False" + "</button>";
	$("#container").append(trueButton);
	$("#container").append(falseButton);
	var question = data.results[i];
	console.log("The question is" + data.results[i].question);
	var htmlString = "<div>" + question.question+ "</div";
	$("#container").append(htmlString);

	$("#trueButton").click(function(){
		console.log("you answered true");
		i++;
	})
	$("#falseButton").click(function(){
		console.log("You answered false");
		i++;
	})
	if(i<10){
		playTrivia(data, count, i);
	}
}


//Class for my data objects
function UserCount(dataObj){

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
			/**else if (theID == curObj.dataObj._id){
				sendDeleteRequest(curObj.dataObj);
			}**/
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
			name = data;
			//$('#dataContainer').html('');
			var wordData = data.map(function(d){
				return d.doc;
			});
			/**var str = '';
			if (wordData.length === 1){
				str = " time";
			}
			else{
				str = " times";
			}
			$('#dataContainer').append('<h2>The word "' + term + '" has been favorited ' + wordData.length + str + '!</h2>');
			**/
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
			//You could do this on the server
			var dbData = data.map(function(d){
				return d.doc;
			});
			//Clear out current data on the page if any
			//$('#dataContainer').html('<ul id="theDataList">');

			//Create UserCount objects
			dbData.forEach(function(d){
				var tempObj = new UserCount(d);
				tempObj.createDomElement();
			});
		}
	});
}

/**function sendDeleteRequest(obj){
	console.log(obj);
	//Make sure you want to delete
	var conf = confirm("Are you sure you want to delete '" + obj.user + " : " + obj.word + "' ?");
	if (!conf) return;
	//Proceed if confirm is true
	$('#dataContainer').html('<div id="loading">Data is being deleted...</div>');
	$.ajax({
		url: '/delete',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(obj),
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
		},
		success: function(resp){
			console.log('Deleted!');
			console.log(resp);
			getAllData();
		}
	});
}**/

function sendUpdateRequest(obj){
	//Change a value
	var promptVal = prompt('Enter a new word to replace "' + obj.word + '":');
	if (!promptVal) return;
	obj.word = promptVal;

	//$('#dataContainer').html('<div id="loading">Data is being updated...</div>');
	console.log(obj);
	$.ajax({
		url: '/update',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(obj),
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
		},
		success: function(resp){
			console.log('Updated!');
			console.log(resp);
			getAllData();
		}
	});
}

function saveData(obj){
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
		console.log("got data");
		//$('#container').show();
		getAllData();
	}
	else{
		$('#container').hide();
		console.log("getting data on the word");
		getWord(page);
	}

	$('#findButton').click(function(){
		var count = 0;
		//$("#userName").val() || 'ME';
		var userName = $("#name").val().toLowerCase() || 'test';
		var timeStamp = new Date();
		//Create data object to be saved
		var data = {
			user: userName,
			count: count,
			date: timeStamp
		};
		console.log(data);
		saveData(data);
		//Clear out the form fields
		//$("#userName").val('');
		$("#name").val('');
		levelOne(userName, count);
	});
});



//----------CLIENT-SIDE SOCKET CODE----------//
//Init socket object
var socket = io();

//Receive data from the server using .on()
socket.on('news', function (data) {
	console.log(data);
	//drawData(data);
});
