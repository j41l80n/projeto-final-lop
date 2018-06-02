// variaveis
var canvasX = 600;
var canvasY = 400;

var posicaoX = 150;
var posicaoY = 0;

function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(canvasX, canvasY);
}

function draw() {
  // funcao draw eh repetida em loop infinito

  // definindo cor do background
  background(0);

  // faz personagem andar para esquerda quando seta do teclado pessionada
  if (keyIsDown(LEFT_ARROW)) {
    posicaoX -= 5;
  }

  // faz personagem andar para direita quando seta do teclado pessionada
  if (keyIsDown(RIGHT_ARROW)) {
    posicaoX += 5;
  }

  // personagem
  ellipse(posicaoX, 200, 50, 50);

  // obstaculo
  // rectMode define o ponto central do retangulo
  rectMode(CENTER);
  rect(450, 200, 50, 50);
}
