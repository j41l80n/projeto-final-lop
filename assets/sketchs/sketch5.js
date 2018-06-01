// variaveis

// declarando e inicializando a variavel circleX com valor zero
var circleX = 0;

function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(720, 480);
  background(205, 155, 55);

  // inicializando a variavel circleX com valor diferente de zero
  circleX = 199;
}

function draw() {
  // funcao draw eh repetida em loop infinito

  background(205, 155, 55);

  // usando a variavel definida inicialmente
  ellipse(circleX, 100, 50, 50);

  // incrementando a direcao de circleX para o deslocamento do personagem
  // circleX = circleX + 1;
  circleX +=1;
}
