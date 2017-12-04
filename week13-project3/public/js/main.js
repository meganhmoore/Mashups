var bgColor = 255;
var randomColor;
var shapeWidth = 30;
var shapeHeight = 30;

//----------CLIENT-SIDE SOCKET CODE----------//
//Init socket object
var socket = io();
var name = "Wald";
var findButton = document.getElementById('findButton');
findButton.addEventListener('click', function firstLevel(){
	console.log("clicked");//log user info in the database
  $('#container').html('');
	levelOne("wald");
})

function levelOne(name){
	name=name+"o";
	console.log(name);

}

//Receive data from the server using .on()
socket.on('news', function (data) {
	console.log(data);
	//drawData(data);
});

//function drawData(data){
//	noStroke();
//	var socketColor = color(data.fill[0], data.fill[1], data.fill[2]);
//	var drawX = data.pos[0] * windowWidth;
//	var drawY = data.pos[1] * windowHeight;
//	fill(socketColor);
//	if (data.shapeType == 'ellipse'){
//		ellipse(drawX, drawY, shapeWidth, shapeHeight);
//	}
//	else{
//		rect(drawX, drawY, shapeWidth, shapeHeight);
//	}
//	fill(randomColor);
//}

//Send data to the server using .emit()
//function grabAndSend(shape, posX, posY, curFill){

	//socket.emit('drawing', data);
//}


// function makeHTML(theData){
// 	var htmlString = '<ol>';
// 	theData.forEach(function(d){
// 		htmlString += '<li>' + d.user + ' : ' + d.word + '</li>';
// 	});
// 	htmlString += '</ol';
// 	return htmlString;
// }
//
// function getWord(term){
// 	$.ajax({
// 		url: '/api/word/' + term,
// 		type: 'GET',
// 		dataType: 'json',
// 		error: function(data){
// 			console.log(data);
// 			alert("Oh No! Try a refresh?");
// 		},
// 		success: function(data){
// 			console.log("WooHoo!");
// 			console.log(data);
//
// 			var theData = data.map(function(d){
// 				return d.doc;
// 			});
// 			var str = '';
// 			if (theData.length === 1){
// 				str = " time";
// 			}
// 			else{
// 				str = " times";
// 			}
// 			$('body').append('<h2>This word has been favorited ' + theData.length + str + '!</h2>');
// 			var htmlString = makeHTML(theData);
// 			$('body').append(htmlString);
// 		}
// 	});
// }
//
// function getAllData(){
// 	$.ajax({
// 		url: '/api/all',
// 		type: 'GET',
// 		dataType: 'json',
// 		error: function(data){
// 			console.log(data);
// 			alert("Oh No! Try a refresh?");
// 		},
// 		success: function(data){
// 			console.log("We have data");
// 			console.log(data);
// 			//Clean up the data on the client
// 			//You could do this on the server
// 			var theData = data.map(function(d){
// 				return d.doc;
// 			});
// 			var htmlString = makeHTML(theData);
// 			$('body').append(htmlString);
// 		}
// 	});
// }
//
// function saveData(obj){
// 	$.ajax({
// 		url: '/save',
// 		type: 'POST',
// 		contentType: 'application/json',
// 		data: JSON.stringify(obj),
// 		error: function(resp){
// 			console.log("Oh no...");
// 			console.log(resp);
// 		},
// 		success: function(resp){
// 			console.log('WooHoo!');
// 			console.log(resp);
// 			var htmlString = '<li>' + obj.user + ' : ' + obj.word + '</li>';
// 			$('ol').append(htmlString);
// 		}
// 	});
// }
//
// $(document).ready(function(){
// 	if (page === 'get all data'){
// 		$('#container').show();
// 		getAllData();
// 	}
// 	else{
// 		$('#container').hide();
// 		getWord(page);
// 	}
//
// 	$('#enterButton').click(function(){
// 		var userName = $("#userName").val() || 'ME';
// 		var favWord = $("#favWord").val() || 'test';
// 		var timeStamp = new Date();
// 		//Create data object to be saved
// 		var data = {
// 			user: userName,
// 			word: favWord,
// 			date: timeStamp
// 		};
// 		console.log(data);
// 		saveData(data);
// 	});
// });
