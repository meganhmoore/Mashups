function setup() {//gets called one time
  createCanvas(800,600);//pixel based graphical (has more fixed dimensionality)
  background(240,210,250);
}

var i=0;
var j=30;
var k =30;
var posX = 0;
var speedX = 5;
var posY =0;
var speedY=5;

function draw() {//continues calling and refreshing the page
  // put drawing code here

  fill(250,150,150);
  ellipse(mouseX, mouseY, 25,25);

  fill(i,j,k);
  ellipse(posX,posY,60,60);
  i=i+1;
  j=j+1;
  k=k+1;
  posX = posX + speedX;
  posY = posY + speedY;
  if(i>250){
    i=0;
  }
  if(j>250){
    j=0;
  }
  if(k>250){
    k=0;
  }
  if(posX > width || posX < 0){
    speedX = speedX *=-1;
  }
  if(posY > height || posY < 0){
    speedY = speedY *=-1;
  }
}
