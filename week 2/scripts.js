var x = "Megan"

function sayHello(){
	console.log("HI " + x);
	//return "HI " + x;
}
var num = 0;
var button1 = document.getElementById('button1');
//button1.addEventListener('click', sayHello); //don't need the quotes otherwise it would complete the function right away
//alternatively defining the function in line
button1.addEventListener('click', function sayHello(){
	var button1Data = document.getElementById('button1-data');
	button1Data.innerHTML = num;
	num++;
	//console.log("HI " + x);
});