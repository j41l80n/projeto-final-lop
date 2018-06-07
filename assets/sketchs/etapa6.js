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
  this.diametro = 30;

  this.display = function() {
    ellipseMode(CENTER);
    ellipse(this.posicaoX, this.posicaoY, this.diametro, this.diametro);
  }
};

//definindo caracteristicas do obstaculo
function Obstaculo() {
  this.posicaoX = 450;
  this.posicaoY = 200;
  this.tamanhoX = 30;
  this.tamanhoY = 30;
  this.velocidade = 1;
  this.display = function() {
    rectMode(CENTER);
    rect(this.posicaoX, this.posicaoY, this.tamanhoX, this.tamanhoY);
  }
};

function Bala() {
  this.posicaoX = 100;
  this.posicaoY = 200;
  this.tamanhoX = 5;
  this.tamanhoY = 5;

  this.display = function() {
    ellipse(this.posicaoX, this.posicaoY, this.tamanhoX, this.tamanhoY);
  }
};

function preload() {
  // load in ghost images
  ghostRed = loadImage('/assets/img/ghost.png');
}

function setup() {
  // funcao setup eh iniciada apenas uma vez
  //window.innerWidth
  //window.innerHeight
  createCanvas(canvasX, canvasY);
  personagem = new Personagem();
  obstaculoArray.push(new Obstaculo());
  obstaculoArray[0].display();
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
  personagem.display();

  // obstaculo
  for (var i = 0; i < obstaculoArray.length; i++) {
    obstaculoArray[i].display();
    // obstaculoArray[i].posicaoX += 30;
    obstaculoArray[i].posicaoY += random(-1, 1);
    obstaculoArray[i].posicaoX -= obstaculoArray[i].velocidade;
  }

  // reseta a posicao do obstaculo
  if (obstaculoArray[0].posicaoX < -120) {
    obstaculoArray[0].posicaoX = width;
    obstaculoArray[0].posicaoY = 200;
    obstaculoArray.push(new Obstaculo());
    obstaculoArray[obstaculoArray.length - 1].velocidade += 1;
  }

  if (atirar == true) {
    bala.display();
    bala.posicaoX += 4;
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

  //frameRate(90);
  //collidePointCircle(pointX, pointY, circleX, circleY, diameter)
  hit = collidePointCircle(obstaculoArray[0].posicaoX, obstaculoArray[0].posicaoY, bala.posicaoX, bala.posicaoy, 200);
  if (hit) {
    // obstaculoArray[0].remove();
    //obstaculoArray.splice(0, 1);
    //delete array[i];
    noLoop();
    alert('teste');
  }

  console.log('obstaculoArray: ' + obstaculoArray[0].posicaoX);
  console.log('bala.posicaoX: ' + bala.posicaoX);
}

function mousePressed() {
  if (podeAtirar) {
    console.log('obstaculoArray: ' + obstaculoArray[0].posicaoX);
    console.log('bala.posicaoX: ' + bala.posicaoX);
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
