// variaveis
var canvasX = 600;
var canvasY = 400;

var posicaoX = 150;
var posicaoY = 0;

var personagem;
var obstaculo;

//definindo caracteristicas do personagem
function Personagem() {
  this.posicaoX = 100;
  this.posicaoY = 200;
  this.diametro = 50;

  this.criar = function() {
    ellipse(this.posicaoX, this.posicaoY, this.diametro, this.diametro);
  }
};

//definindo caracteristicas do obstaculo
function Obstaculo() {
  this.posicaoX = 450;
  this.posicaoY = 200;
  this.tamanhoX = 50;
  this.tamanhoY = 50;

  this.criar = function() {
    rectMode(CENTER);
    rect(this.posicaoX, this.posicaoY, this.tamanhoX, this.tamanhoY);
  }
};

function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(canvasX, canvasY);
  personagem = new Personagem();
  obstaculo = new Obstaculo();
}

function draw() {
  background(0);

  // faz personagem andar para esquerda quando seta do teclado pessionada
  if (keyIsDown(LEFT_ARROW)) {
    personagem.posicaoX -= 5;
    posicaoX -= 5;
  }

  // faz personagem andar para direita quando seta do teclado pessionada
  if (keyIsDown(RIGHT_ARROW)) {
    personagem.posicaoX += 5;
    posicaoX += 5;
  }

  // personagem
  personagem.criar();

  // obstaculo
  obstaculo.criar();
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle / 2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
