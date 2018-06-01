// variaveis

// declarando e inicializando a variavel posicaoX com valor zero
// var posicaoX = 0;
// var posicaoY = 100;
// var diametro = 50;

//definindo caracteristicas do personagem
var personagem = {
  posicaoX:0,
  posicaoY:100,
  diametro:60
};

function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(720, 480);
  background(205, 155, 55);
}

function draw() {
// funcao draw eh repetida em loop infinito

  //definindo cor de fundo
  background(205, 155, 55);

  // usando as variaveis definidas previamente
  ellipse(199, 100, 50, 50);

  // incrementando a direcao de posicaoX para o deslocamento do personagem
  // posicaoX = posicaoX + 1;
  //posicaoX += 1;
}
