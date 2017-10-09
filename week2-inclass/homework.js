
function makeTriangle(){
	for(var i=0; i<7; i++){
		var line = "#";
		for(var j=0; j<i-1; j++){
			line=line+"#";
		}
		console.log(line);
	}
}
function fizzBuzz(){
	for(var i=0; i<100; i++){
		if(i%3 == 0){
			if(i%5 == 0){
				console.log("FizzBuzz");
			}else{
				console.log("Fizz");
			}
		}else if(i%5 == 0){
			console.log("Buzz");
		}else{
			console.log(i);
		}
	}
}
function chessBoard(){
	for(var i=0; i<8; i++){
		if(i%2 == 0){
			console.log(" # # # #");
		}else{
			console.log("# # # # ");
		}
	}
}


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
	makeTriangle();
	fizzBuzz();
	chessBoard();
	/**for(var i=0; i<7; i++){
		var line = "#";
		for(var j=0; j<i-1; j++){
			line=line+"#";
		}
		console.log(line);
	}**/
	//console.log("#");
});