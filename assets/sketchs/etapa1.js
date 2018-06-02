// variaveis
var canvasX = 600;
var canvasY = 400;

function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(canvasX, canvasY);
}

function draw() {
  // funcao draw eh repetida em loop infinito

  // definindo cor do background
  background(0);

  // personagem
  ellipse(150, 200, 50, 50);

  // obstaculo
  // rectMode define o ponto central do retangulo
  rectMode(CENTER);
  rect(450, 200, 50, 50);
}
