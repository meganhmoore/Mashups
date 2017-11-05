//Define a global object to store the space data
var spaceData = {
	ready : false, //manages when things start
	animate : false,
	apiData	: {}
};

//Define a function to execute the AJAX call
function getSpaceData() {
	//Define the url for the API call
	var url = "http://api.open-notify.org/astros.json";
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'jsonp',
		error: function(data){
			console.log("We got problems");
			spaceData.apiData = {number: 0};
			spaceData.ready = true;
		},
		success: function(data){
			console.log("WooHoo!");
			console.log(data);
			spaceData.apiData = data;
			spaceData.ready = true;
		}
	});
}
//Execute the function to make the AJAX call
getSpaceData();


/*---------------------------------------------
p5 Code
----------------------------------------------*/
//Array to store the objects
var astros = [];

function setup() {
	createCanvas(windowWidth, windowHeight); //make the whole page the canvas

}


function draw() {
	background(20,40,90);

	//Check if the data is ready
	if (spaceData.ready){
		console.log("Data is ready!");
		if (spaceData.apiData.number === 0){
			//Update msg div
			$('#spaceNum').html('No one is in space right now');
			spaceData.ready = false;
		}
		else{
			//Toggle the booleans
			spaceData.ready = false;
			spaceData.animate = true;
			//Update msg div
			$('#spaceNum').html("There are <span class='big'>" + spaceData.apiData.number + "</span> people in space right now!");

			//Initialize our objects here

			for(var i=0; i<spaceData.apiData.number; i++){
				astros[i] = new SpaceHuman(spaceData.apiData.people[i]);

				//astros.push(new SpaceHuman()); also works
			}

		}
	}
	//Start animation once objects are intialized
	if (spaceData.animate){
		//Animate our objects here
		for(var j=0; j<astros.length; j++){
			astros[j].drawHumans();
			astros[j].update();
		}

	}
}

//Called every time the mouse is pressed, event listener
function mousePressed(){
	//Check if one of our objects was clicked here
	for(var i=0; i<astros.length; i++){
		if(astros[i].hovering()){
			$('#spaceNum').html(astros[i].info.name);
		}
	}
}

//Called every time the window is resized
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}


//Make Astronaut Class here
function SpaceHuman(peopleObj){
	this.x = random(0, width);
	this.y = random(0, height);

	this.width = random(50, 100);
	this.height = random(50, 100);

	this.info = peopleObj;
	//initializing once
	this.r = random(256);
	this.g = random(256);
	this.b = random(256);
	//drawing over and over again, you don't want the values to change or it will be very confusing
	this.drawHumans = function(){
		fill(this.r,this.g,this.b);
		rect(this.x, this.y, this.width, this.height);
	};

	this.hovering = function(){
		if((mouseX > this.x) && (mouseX < (this.x+this.width)) && (mouseY > this.y) && (mouseY < (this.y+this.height))){
			return true;
		}
		else{
			return false;
		}
	};

	this.update = function(){
		this.x = this.x + 2;
		if(this.x > windowWidth){
			this.x=0;
		}
	};
}

/** THIS DOES THE SAME THING AS THE DRAW FUNCITON IN SPACEHUMAN
SpaceHuman.prototype.draw = function(){
	rect(this.x, this.y, this.width, this.height);
};**/
