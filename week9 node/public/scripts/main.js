
function makeHTML(theData){
	var theHTML = '<ul>';
	theData.forEach(function(d){
		theHTML += '<li>' + d + '</li>';
	});
	theHTML += '</ul>';
	return theHTML;
}


//Function to get data via the server's JSON route
function getAPIData(term){

	//$('body').empty();//empties out everything on the page to show data

	$.ajax({
		url: '/api/' + term,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log(data);
			alert("Oh No! Try a refresh?");
		},
		success: function(data){
			console.log("WooHoo!");
			console.log(data);
			var theHTML = makeHTML(data[1]);
			$('body').append(theHTML);
		}
	});
}

$(document).ready(function(){
	console.log(search);
	console.log(message);

	if (search){
		console.log("Make Request!");
		getAPIData(message);
	}
	$('#the-button').click(function(){
		var theInput = $('#the-input').val();
		getAPIData(theInput);
	});
});



var w = $(window).width();
var h = $(window).height();
var showSpending = false;
var map;

var popButton = document.getElementById('population');
popButton.addEventListener('click', function popMap(){
  showSpending = false;
  setPopData();

})

var genderButton = document.getElementById('gender');
genderButton.addEventListener('click', function genderMap(){
  showSpending = false;
  genderInequality();
})

var spendingButton = document.getElementById('spending');
spendingButton.addEventListener('click', function spendingMap(){
  showSpending = true;
  setSpendingMap();
})

map = new Datamap({
  element: document.getElementById('container'),
  fills:{
    "Population>200 million": 'rgb(197,121,109)',
    "Population<100 million": 'rgb(208,171,177)',
    "Population<10 million": 'rgb(219,230,246)',
    "High gender inequality": '#f8b500',
    "Medium gender inequality":'#facf5d',
    "Low gender inequality": '#fceabb',
    "Agriculture Spending": '#393b79',
    "Education Spending" : '#5254a3',
    "Health Spending" : '#6b6ecf',
    "Social Protection Spending": '#9c9ede',
    "Other Spending": '#637939',
    defaultFill: 'rgb(99,120,126)' // Any hex, color name or rgb/rgba value
  },
  geographyConfig:{
    borderColor: 'rgb(0,0,0)',
    popupTemplate: function(geography){
      var temp = geography.properties.name;
      var data = myData[temp].totalpop2017;
      var gender = myData[temp].index_genderinequality;
      var ag = myData[temp].totag_ppp2012;
      var ed = myData[temp].toteducation_ppp2012;
      var health = myData[temp].tothealth_ppp2012;
      var sp = myData[temp].totsp_ppp2012;
      return'<div class="hoverinfo" ><strong>' +geography.properties.name + '<br>'
      +"Population: "+data+"000"+ '<br>'+ "Gender Inequality Rating: " + gender + '<br>'+
      "Spending: "+'<br>'+"Agriculture: "+ag+"%"+'<br>'+"Education: "+ed+"%"+'<br>'+
      "Health: "+ed+"%"+'<br>'+"Social Proctection: "+sp+"%"+
      '</strong></div>';
    }
  },

  done: function(datamap){
    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
      if(showSpending == true){
        console.log(geography);
        console.log(geography.geometry.coordinates);
        datamap.svg.selectAll(".arc").remove();
        var newCountry = geography.properties.name;
        var ag = parseInt(myData[newCountry].totag_ppp2012);
        var ed = parseInt(myData[newCountry].toteducation_ppp2012);
        var health = parseInt(myData[newCountry].tothealth_ppp2012);
        var sp = parseInt(myData[newCountry].totsp_ppp2012);
        var extra= 100-(sp+health+ed+ag);
        var color = d3.scale.category20b();

        /**var longScale = d3.scaleLinear()
          .domain([-90,90])
          .range(0,500);

        var latScale = d3.scaleLinear()
          .domain([-180,180])
          .range(0,1200);
          **/

        var data = [ag, ed, health, sp, extra];

        var arcs = d3.pie()
        .sort(null)
        .value(function (data){return data;});


        var arc = d3.arc()
        .outerRadius(100)
        .innerRadius(0);

        var labelArc = d3.arc()
        .outerRadius(80)
        .innerRadius(80);

        var g = datamap.svg.selectAll(".arc")
        .data(arcs(data))
        .enter().append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

        g.append("path")
        .attr("d", arc)
        .attr("fill", function(d, i) { return color(i); } );

        g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".20em")
        .text(function(d) { return (d.data+"%"); });
      }else{
        datamap.svg.selectAll(".arc").remove();
      }
    });
  }
});
map.legend();


function setPopData(){
  map.svg.selectAll(".arc").remove();
  var populationDict = {};
  for(countryKey in myData){
    for(newKey in nameToISO){
      if(nameToISO[newKey] == countryKey){
        var tempDict={fillKey : "Population<10 million"};
        var temp = myData[countryKey];
        if(parseInt(temp["totalpop2017"])<10000){
          tempDict["fillKey"] = 'Population<10 million';
        }else if(parseInt(temp["totalpop2017"])<100000){
          tempDict["fillKey"] = 'Population<100 million';
        }else if(parseInt(temp["totalpop2017"])>200000){
          tempDict["fillKey"] = 'Population>200 million';
        }
        else{
          tempDict["fillKey"] = 'Population<100 million'
        }
        populationDict[newKey] = tempDict;
      }
    }
  }
  for(val in populationDict){
    var color = populationDict[val].fillKey.toString();
    var temp = {}
    temp[val] = {fillKey : color};
    map.updateChoropleth(temp);
  }
}

function genderInequality(){
  map.svg.selectAll(".arc").remove();

  var genderDict = {};
  for(countryKey in myData){
    for(newKey in nameToISO){
      if(nameToISO[newKey] == countryKey){
        var tempDict={fillKey : "Low gender inequality"};
        var temp = myData[countryKey];
        if(parseFloat(temp["index_genderinequality"])<0.15){
          tempDict["fillKey"] = 'Low gender inequality';
        }else if(parseFloat(temp["index_genderinequality"])<0.3){
          tempDict["fillKey"] = 'Medium gender inequality';
        }else if(parseFloat(temp["index_genderinequality"])<1){
          tempDict["fillKey"] = 'High gender inequality';
        }
        else{
          tempDict["fillKey"] = 'Medium gender inequality'
        }
        genderDict[newKey] = tempDict;
      }
    }
  }
  for(val in genderDict){
    var color = genderDict[val].fillKey.toString();
    temp[val] = {fillKey : color};
    map.updateChoropleth(temp);
  }
}

function setSpendingMap(){
  var spendingDict = {};
  for(countryKey in myData){
    for(newKey in nameToISO){
      if(nameToISO[newKey] == countryKey){
        var tempDict={fillKey: 'Social Protection Spending'};
        var temp = myData[countryKey];
        //tempDict ["fillkey"] = 'Agriculture';
        spendingDict[newKey] = tempDict;
      }
    }
  }
  for(val in spendingDict){
    var color = spendingDict[val].fillKey.toString();
    temp[val] = {fillKey : color};
    map.updateChoropleth(temp);
  }
}
