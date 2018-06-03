// variaveis
var canvasX = 600;
var canvasY = 400;

var ritgh = false;

var xspeed = 10.8;

var personagem;
var obstaculo;
var bala = false;

var circle, explode, sleep, glitch;

var x = 0;
var y = 0;

var taVivo;

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

//definindo caracteristicas do obstaculo
function Bala() {
  this.posicaoX = 450;
  this.posicaoY = 200;
  this.tamanhoX = 10;
  this.tamanhoY = 10;

  this.criar = function() {
    ellipse(this.posicaoX, this.posicaoY, this.tamanhoX, this.tamanhoY);
  }
};

function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(canvasX, canvasY);
  // createSprite(400, 200, 50, 50);
  personagem = new Personagem();
  obstaculo = new Obstaculo();
  bala = new Bala();
//  smooth();
}

function draw() {
  background(0);

  // faz personagem andar para esquerda quando seta do teclado pessionada
  if (keyIsDown(LEFT_ARROW)) {
    personagem.posicaoX -= 4;
  }

  // faz personagem andar para direita quando seta do teclado pessionada
  if (keyIsDown(RIGHT_ARROW)) {
    personagem.posicaoX += 4;
    ritgh = true;
  }

  // faz personagem andar para direita quando seta do teclado pessionada
  // if (keyIsDown(UP_ARROW)) {
  //   personagem.posicaoY -= xspeed;
  // }

  // personagem
  personagem.criar();

  // obstaculo
  obstaculo.criar();
  obstaculo.posicaoY += random(-1, 1);
  obstaculo.posicaoX -= 1;

  // reseta a posicao do obstaculo
  if (obstaculo.posicaoX < -120) {
    obstaculo.posicaoX = width;
    obstaculo.posicaoY = 200;
  }

  if (taVivo == true) {
    bala.criar();
    bala.posicaoX += 6;
  }
}

function mousePressed() {
  taVivo = true;
  bala.posicaoX = personagem.posicaoX;
  bala.posicaoY = personagem.posicaoY;
}

// function keyPressed() {
//   if (keyCode == UP_ARROW) {
//     for (var i = 0; i < 60; i++) {
//       personagem.posicaoY -= i;
//       personagem.criar();
//    }
//   }
// }

// function keyReleased() {
//   if (keyCode == UP_ARROW) {
//     for (var i = 1; i <= 200; i++) {
//       personagem.posicaoY = i;
//       personagem.posicaoX = i;
//       personagem.criar();
//     }
//   }
//}
