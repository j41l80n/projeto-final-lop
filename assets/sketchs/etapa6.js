// variaveis
var canvasX = 600;
var canvasY = 400;

// variaveis que escreve na teclado
var vidas = 3;
var pontuacao = 0;
var nivel = 1;
var balas = 7;

let tempoJogo = 10;
let tempoAtirar = 3;
var fimJogo = false;
var podeAtirar = true;
var carregandoBalas = false;
var personagem;

var obstaculo;
var obstaculoArray = new Array();

var balaArray = new Array();;

var atirar;
var ghostRed;

//definindo caracteristicas do personagem
function Personagem() {
  this.posicaoX = 100;
  this.posicaoY = 300;
  this.diametro = 30;

  this.display = function() {
    ellipseMode(CENTER);
    ellipse(this.posicaoX, this.posicaoY, this.diametro, this.diametro);
  }
};

//definindo caracteristicas do obstaculo
function Obstaculo() {
  this.posicaoX = 450;
  this.posicaoY = 300;
  this.tamanhoX = 30;
  this.tamanhoY = 30;
  this.velocidade = 1;
  this.display = function() {
    // rectMode(CENTER);
    rectMode(CORNER);
    rect(this.posicaoX, this.posicaoY, this.tamanhoX, this.tamanhoY);
  }
};

function Bala(x, y) {
  this.posicaoX = x + 20;
  this.posicaoY = y;
  this.tamanhoX = 5;
  this.tamanhoY = 5;

  this.display = function() {
    ellipse(this.posicaoX, this.posicaoY, this.tamanhoX, this.tamanhoY);
  }
};

function preload() {
  //ghostRed = loadImage('/assets/img/ghost.png');
  //font = loadFont('assets/SourceSansPro-Regular.otf');
}

function setup() {
  // funcao setup eh iniciada apenas uma vez
  //window.innerWidth
  //window.innerHeight
  createCanvas(canvasX, canvasY);
  personagem = new Personagem();
  obstaculoArray.push(new Obstaculo());
  obstaculoArray[0].display();
}

function draw() {
  // define o backgroung para preto
  background(0);
  // mostra posicao atual no personagem
  personagem.display();
  // realiza contador decressivo de tmepo
  contagemRegressiva();
  // movimentacao do Personagem
  movimentacaoPersonagem();
  // movimentacao dos Obstaculos
  movimentacaoObstaculos();

  if (atirar == true) {
    for (var i = 0; i < balaArray.length; i++) {
      balaArray[i].display();
      balaArray[i].posicaoX += 5;
    }
  }

  if (balas == 0) {
    podeAtirar = false;
  }

  if (carregandoBalas) {
    fill(255, 0, 0);
    text("r e C a r r e g a n d o ... " + tempoAtirar, 450, 30);
    while (balaArray.length > 0) {
      balaArray.pop();
    }
  }

  if (tempoAtirar == 0) {
    podeAtirar = true;
    tempoAtirar = 4;
    balas = 7;
  }

  if (tempoAtirar == 4) {
    carregandoBalas = false;
  }

  if (obstaculoArray.length == 0) {
    fill(255, 255, 255);
    text("P A R A B É N S\n\teliminação completa da ameaça", width / 2, height * 0.8);
    fimJogo = true;
    noLoop();
  }

  indicadoresInformacao();
  colisaoBalaObstaculo();
  colisaoObstaculoPersonagem();
  gameOVer();
} // fim draw

function mousePressed() {
  if (podeAtirar) {
    atirar = true;
    balaArray.push(new Bala(personagem.posicaoX, personagem.posicaoY));
    balas--;
  }

  if (fimJogo) {
    atirar = false;
    podeAtirar = false;
  }
}

function indicadoresInformacao() {
  fill(255, 255, 255);
  text('Vidas: ' + vidas, 10, 30);
  text('Balas: ' + balas, 90, 30);
  text('Pontuação: ' + pontuacao, 170, 30);
  text('Nivel: ' + nivel, 280, 30);
  text("Tempo: " + tempoJogo, 360, 30);
}

function contagemRegressiva() {
  if (frameCount % 60 == 0 && tempoJogo > 0) {
    tempoJogo--;
  }

  if (frameCount % 60 == 0 && tempoAtirar != 0 && podeAtirar == false) {
    tempoAtirar--;
    carregandoBalas = true;
  }
}

function movimentacaoPersonagem() {
  // faz personagem andar para esquerda quando seta do teclado pessionada
  if (keyIsDown(LEFT_ARROW)) {
    personagem.posicaoX -= 4;
  }

  // faz personagem andar para direita quando seta do teclado pessionada
  if (keyIsDown(RIGHT_ARROW)) {
    personagem.posicaoX += 4;
  }
}

function movimentacaoObstaculos() {
  for (var i = 0; i < obstaculoArray.length; i++) {
    obstaculoArray[i].display();
    obstaculoArray[i].posicaoY += random(-1, 1);
    obstaculoArray[i].posicaoX -= obstaculoArray[i].velocidade;
  }
  resetaMovimentacaoObstaculo();
}

function resetaMovimentacaoObstaculo() {
  for (var i = 0; i < obstaculoArray.length; i++) {
    if (obstaculoArray[i].posicaoX < -120) {
      obstaculoArray[i].posicaoX = width;
      obstaculoArray[i].posicaoY = 200;
      obstaculoArray.push(new Obstaculo());
      obstaculoArray[obstaculoArray.length - 1].velocidade += 1;
    }
  }
}

function colisaoBalaObstaculo(){
  if (balaArray.length > 0) {
    for (var i = 0; i < balaArray.length; i++) {
      for (var j = 0; j < obstaculoArray.length; j++) {
        let hit = collideRectCircle(obstaculoArray[j].posicaoX + 10, obstaculoArray[j].posicaoY, 30, 30, balaArray[i].posicaoX, balaArray[i].posicaoY, 2);
        if (hit) {
          pontuacao++;
          balaArray.splice(i, 1);
          obstaculoArray.splice(j, 1);
        } // fim if
      } // fim for
    } // fim for
  } // fim if
} // fim function

function colisaoObstaculoPersonagem() {
  for (var i = 0; i < obstaculoArray.length; i++) {
    let hit = collideRectCircle(obstaculoArray[i].posicaoX + 10, obstaculoArray[i].posicaoY, 30, 30, personagem.posicaoX, personagem.posicaoY, 20);
    if (hit) {
      vidas--;
      obstaculoArray.splice(i, 1);
    } // fim if
  } // fim for
}

function gameOVer() {
  if (vidas == 0) {
    noLoop();
    fill(255, 255, 255);
    text("G A M E  O V E R\n\tsem mais chances", width / 2, height * 0.8);
    fimJogo = true;
  }

  if (tempoJogo == 0) {
    noLoop();
    fill(255, 255, 255);
    text("G A M E  O V E R\n\tmorte por tempo", width / 2, height * 0.8);
    fimJogo = true;
  }
}
