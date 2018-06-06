// variaveis
var canvasX = 600;
var canvasY = 400;

// variaveis que escreve na teclado
var vidas = 3;
var pontuacao = 0;
var nivel = 1;
var balas = 7;
var ritgh = false;

let tempoJogo = 10;
let tempoAtirar = 3;
var gameOVer = false;
var podeAtirar = true;
var carregandoBalas = false;
var personagem;
var obstaculo;
var obstaculoArray = new Array();
var bala = false;

var atirar;
var ghostRed

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

function preload() {
  // load in ghost images
  ghostRed = loadImage('/assets/img/ghost.png');
}

function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(canvasX, canvasY);
  personagem = new Personagem();
  obstaculoArray.push(new Obstaculo());
  obstaculoArray[0].criar();
  bala = new Bala();
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
  for (var i = 0; i < obstaculoArray.length; i++) {
    obstaculoArray[i].criar();
    // obstaculoArray[i].posicaoX += 30;
    obstaculoArray[i].posicaoY += random(-1, 1);
    obstaculoArray[i].posicaoX -= obstaculoArray[i].velocidade;
  }

  // reseta a posicao do obstaculo
  if (obstaculoArray[0].posicaoX < -120) {
    obstaculoArray[0].posicaoX = width;
    obstaculoArray[0].posicaoY = 200;
    obstaculoArray.push(new Obstaculo());
    obstaculoArray[obstaculoArray.length-1].velocidade+=1.03;
  }

  if (atirar == true) {
    bala.criar();
    bala.posicaoX += 6;
  }

  if (frameCount % 60 == 0 && tempoJogo > 0) {
     // tempoJogo--;
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
    carregandoBalas = true;
  }

  if (carregandoBalas) {
    fill(255, 0, 0);
    text("r e C a r r e g a n d o ... " + tempoAtirar, 450, 30);
  }

  if (tempoAtirar == 0) {
    podeAtirar = true;
    tempoAtirar = 4;
    balas = 7;
  }

  if (tempoAtirar == 4) {
    carregandoBalas = false;
  }
}

function mousePressed() {
  if (podeAtirar) {
    atirar = true;
    bala.posicaoX = personagem.posicaoX + 30;
    bala.posicaoY = personagem.posicaoY;
    balas--;
  }

  if (gameOVer) {
    tempoJogo = 15;
    loop();
  }
}
