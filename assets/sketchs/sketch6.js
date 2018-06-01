// variaveis
var canvasX = 600;
var canvasY = 400;

function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(canvasX, canvasY);
}

function draw() {
  // funcao draw eh repetida em loop infinito

  background(0);

  stroke(255);
  strokeWeight(2);
  noFill();

  if (mouseX > 300) {
    fill(255, 0, 200);
    // background(255);
  }
  // else {
  //   background(0);
  // }
  ellipse(300, 200, 100, 100);
}
