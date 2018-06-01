// declarando a variavel circleX
var circleX = 0;

function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(720, 480);
  background(205, 155, 55);

  // inicializando a variavel circleX
  circleX = 199;
}

function draw() {
  // funcao draw eh repetida em loop infinito

  // usando a variavel definida inicialmente
  ellipse(circleX, 100, 50, 50); 
}
