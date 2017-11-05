var mapimage;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;

function preload(){
  mapimage = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
      clon + ',' + clat + ',' + zoom + '/' +
      ww + 'x' + hh +
      '?access_token=pk.eyJ1IjoibWVnYW5tb29yZSIsImEiOiJjajltaDBxcTg0dWQwMndzNGlrb2dua2Z6In0.jg0M7xESPOc67YPpTscAzg');

}

function setup() {
  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimage, 0, 0);

}
