// variaveis
var canvasX = 600;
var canvasY = 400;

// variaveis que escreve na teclado
var vidas = 0;
var pontuacao = 0;
var nivel = 0;
var balas = 13;
var ritgh = false;

let tempoJogo = 10;
let tempoAtirar = 2;
var gameOVer = false;
var podeAtirar = true;

var personagem;
var obstaculo;
var bala = false;

var atirar;

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
  this.velocidade = 1;
  this.criar = function() {
    rectMode(CENTER);
    rect(this.posicaoX, this.posicaoY, this.tamanhoX, this.tamanhoY);
  }
};

//definindo caracteristicas do obstaculo
function Bala() {
  this.posicaoX = 450;
  this.posicaoY = 200;
  this.tamanhoX = 10;
  this.tamanhoY = 10;

  this.criar = function() {
    ellipse(this.posicaoX, this.posicaoY, this.tamanhoX, this.tamanhoY);
    // sphere(this.tamanhoX);
  }
};

function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(canvasX, canvasY);
  // createSprite(400, 200, 50, 50);
  personagem = new Personagem();
  obstaculo = new Obstaculo();
  bala = new Bala();
  smooth();
}

function draw() {
  background(0);
  fill(255, 255, 255);
  text('Vidas: ' + vidas, 10, 30);
  text('Balas: ' + balas, 90, 30);
  text('Pontuação: ' + pontuacao, 170, 30);
  text('Nivel: ' + nivel, 280, 30);
  // faz personagem andar para esquerda quando seta do teclado pessionada
  if (keyIsDown(LEFT_ARROW)) {
    personagem.posicaoX -= 4;
  }

  // faz personagem andar para direita quando seta do teclado pessionada
  if (keyIsDown(RIGHT_ARROW)) {
    personagem.posicaoX += 4;
    ritgh = true;
  }

  // personagem
  personagem.criar();

  // obstaculo
  obstaculo.criar();
  obstaculo.posicaoY += random(-1, 1);
  obstaculo.posicaoX -= obstaculo.velocidade;

  // reseta a posicao do obstaculo
  if (obstaculo.posicaoX < -120) {
    obstaculo.posicaoX = width;
    obstaculo.posicaoY = 200;
  }

  if (atirar == true) {
    bala.criar();
    bala.posicaoX += 6;
  }

  if (frameCount % 60 == 0 && tempoJogo > 0) {
    tempoJogo--;
  }

  fill(255, 255, 255);
  text("Tempo: " + tempoJogo, 360, 30);

  if (tempoJogo == 0) {
    noLoop();
    fill(255, 255, 255);
    text("G A M E  O V E R", width / 2, height * 0.8);
    gameOVer = true;
  }

  if (balas == 0) {
    podeAtirar = false;
  }

  if (frameCount % 60 == 0 && tempoAtirar != 0 && podeAtirar == false) {
    tempoAtirar--;
  }

  fill(255, 0, 0);
  text("recarregando ... " + tempoAtirar, 450, 30);

  if (tempoAtirar == 0) {
    podeAtirar = true;
    tempoAtirar = 4;
    balas = 13;
  }
}

function mousePressed() {
  if (podeAtirar) {
    atirar = true;
    bala.posicaoX = personagem.posicaoX;
    bala.posicaoY = personagem.posicaoY;
    balas--;
  }

  if (gameOVer) {
    tempoJogo = 15;
    loop();
  }
}
