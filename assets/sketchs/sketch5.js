// variaveis
// declarando e inicializando a variavel posicaoX com valor zero
// var posicaoX = 0;
// var posicaoY = 100;
// var diametro = 50;
var randomicoX = 0;
var randomicoY = 0;
var cor = 0;
var canvasX = 600;
var canvasY = 400;

//definindo caracteristicas do personagem
var personagem = {
  posicaoX: 100,
  posicaoY: 100,
  diametro: 90
};

function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(canvasX, canvasY);
  background(0);
}

function draw() {
  // funcao draw eh repetida em loop infinito

  // width para X
  randomicoX = random(0, width);
  // height para y
  randomicoY = random(0, height);

  // variavel cor recebe o valor da posicao X do mouse
  cor = map(mouseX, 0, canvasX, 0, 255);
  //definindo cor de fundo
  // background(cor);

  // usando as variaveis definidas previamente
  noStroke();
  ellipse(randomicoX, randomicoY, 50, 50);

  stroke(1);
  ellipse(mouseX, personagem.posicaoY, personagem.diametro, personagem.diametro);
  // incrementando a direcao de posicaoX para o deslocamento do personagem
  // posicaoX = posicaoX + 1;
  //posicaoX += 1;
  //personagem.posicaoX +=1;
}
