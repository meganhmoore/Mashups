function makeD3Chart(dataTime, dataset){
	//Clear the page each time a new chart is made
	// $('body').html('');

	//Get data about page
	var w = $(window).width()-60;
	var h = 300;
	var barPadding = 2;

	//Create SVG element
	var svg = d3.select("#container")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	//Initialize the y-scale
	var yScale = d3.scaleLinear()
		.domain([dataset[0], dataset[8]])
		.range([50,h - 50]);

	var rScale = d3.scaleLinear()
		.domain([dataset[0], dataset[8]])
		.range([5,20]);

	//Create g 'groups' for the different types of circles
	//Groups allow for separating data
	var maxPop = svg.append("g")
		.attr("class", "maxPop");

	//Plot the maxTemps
	maxPop.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", function(d, i) {
			var temp = (i*60)+100;
			console.log("X val "+temp);
			return temp;
		})
		.attr("cy", function(d) {
			console.log("Y "+yScale(d));
			return h - yScale(d);
		})
		.attr("r", function(d) {
			console.log("R "+rScale(d));
			return rScale(d);
		})
		.on('click', function(d,i){
			console.log(d);
			$('#container').html("The high temp in " + (i+1) + " days will be: " + d + "C");
		});


		maxPop.selectAll("text")
			.data(dataTime)
			.enter()
			.append("text")
			.text(function(d) {
				return d.toString();
			})
			.attr("text-anchor", "middle")
			.attr("x", function(d, i) {
				return (i*60)+100;
			})
			.attr("y", function(d) {
				return h;
			})
			.attr("font-family", "sans-serif")
			.attr("font-size", "11px")
			.attr("fill", "black");

		maxPop.selectAll("text.values")
			.data(dataset)
			.enter()
			.append("text")
			.text(function(d) {
				return d.toString();
			})
			.attr("text-anchor", "middle")
			.attr("x", function(d, i) {
				return (i*60)+100;
			})
			.attr("y", function(d, i) {
				return h-yScale(d)-((i*2)+7);
			})
			.attr("font-family", "sans-serif")
			.attr("font-size", "11px")
			.attr("fill", "black");

}

//AJAX Request for Weather Data
function requestPeopleData(){

	var weatherURL = "http://api.opendatanetwork.com/data/v1/values?variable=demographics.population.count&entity_id=0100000US%2C0400000US53&forecast=3&describe=false&format=&app_token=cQovpGcdUT1CSzgYk0KPYdAI0";
  console.log(weatherURL);

	$.ajax({
		url: weatherURL,
		type: 'GET',
		dataType: 'json',
		error: function(err){
			console.log(err);
		},
		success: function(data){
			console.log(data);

			//var days;
      var pop = new Array();
      var yrs = new Array();
      for(var i=1; i<10; i++){
        var temp = data.data[i];
        console.log("NUMBER "+temp[3]);
        pop.push(temp[3]);
        yrs.push(temp[0]);
      }
      console.log(pop);
      console.log(yrs);

			makeD3Chart(yrs, pop);
		}
	});
}

$(document).ready(function(){
	requestPeopleData();
});
