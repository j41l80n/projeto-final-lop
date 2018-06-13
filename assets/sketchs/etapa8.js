// variaveis
var canvasX = 800;
var canvasY = 460;
var vidas = 3;
var pontuacao = 0;
var nivel = 1;
var balas = 7;
let tempoJogo = 10;
var tempoJogado = 0;
let tempoAtirar = 3;
var fimJogo = false;
var podeAtirar = true;
var carregandoBalas = false;
var personagem;
var obstaculo;
var obstaculoArray = new Array();
var balaArray = new Array();;
var atirar;
var bg;
var cnv;

var bone;
var jack;
var ghost;
var stars;
var vida;
var skeleton;

var xx = 380;
var yy = 80;

var minhaFonte;

function preload() {
  bg = loadImage('assets/img/bg.png');
  bone = loadImage('/assets/img/bone.png');
  treeBones = loadImage('/assets/img/tree_bones.png');
  twoBones = loadImage('/assets/img/two_bones.png');
  brain = loadImage('/assets/img/brain.png');
  jackLeft = loadImage('/assets/img/jack_left.png');
  jackRight = loadImage('/assets/img/jack_right.png');
  ghost = loadImage('/assets/img/ghost2.png');
  stars = loadImage('/assets/img/stars.png');
  floorLeft = loadImage('/assets/img/floor_left.png');
  floorCenter = loadImage('/assets/img/floor_center.png');
  floorRight = loadImage('/assets/img/floor_right.png');
  skeleton = loadImage('/assets/img/skeleton.png');

  minhaFonte = loadFont('assets/fonts/zombie_holocaust.ttf');
}


function setup() {
  // funcao setup eh iniciada apenas uma vez
  personagem = new Personagem();
  obstaculoArray.push(new Obstaculo(random(400, 800), random(100, 400)));
  obstaculoArray[0].display();
  cnv = createCanvas(canvasX, canvasY);
  cnv.parent('sketch-holder');
  personagem.display(jackRight);
  vida = new Vida(random(50, 700), random(40, 100));
  // textFont(minhaFonte, 36);
}

function draw() {
  // define o backgroung para preto
  background(bg);
  base();

  finalJogo();

  personagem.display(jackRight);

  mostraEstrelas();

  contagemRegressiva();

  movimentacaoPersonagem();

  movimentacaoObstaculos();

  if (vidas == 1 && !fimJogo) {
    vida.display();
    vida.posicaoY += 1;
  }

  poderFogo();

  indicadoresInformacao();

  colisaoBalaObstaculo();

  colisaoObstaculoPersonagem();

  colisaoPersonagemVida();
} // fim draw

//definindo caracteristicas do personagem
function Personagem() {
  this.tamanhoX = 100;
  this.tamanhoY = 80;
  this.posicaoX = 90;
  this.posicaoY = 345;

  this.display = function(sprite) {
    push();
    imageMode(CENTER);
    image(sprite, this.posicaoX, this.posicaoY, this.tamanhoY, this.tamanhoX);
    pop();
  }
};

//definindo caracteristicas do obstaculo
function Obstaculo(posicaoX, posicaoY) {
  this.posicaoX = posicaoX;
  this.posicaoY = posicaoY;
  this.tamanhoX = 79;
  this.tamanhoY = 70;
  this.velocidade = 1;
  this.vidas = 2;
  this.display = function() {
    push();
    imageMode(CENTER);
    image(ghost, this.posicaoX, this.posicaoY, this.tamanhoY, this.tamanhoX);
    pop();
  }
};

function Bala(posicaoX, posicaoY) {
  this.posicaoX = posicaoX + 20;
  this.posicaoY = posicaoY;
  this.tamanhoX = 40;
  this.tamanhoY = 40;

  this.display = function() {
    push();
    imageMode(CENTER);
    image(bone, this.posicaoX, this.posicaoY, this.tamanhoX, this.tamanhoY);
    pop();
  }
};

function Vida(posicaoX, posicaoY) {
  this.posicaoX = posicaoX + 20;
  this.posicaoY = posicaoY;
  this.tamanhoX = 30;
  this.tamanhoY = 30;

  this.display = function() {
    imageMode(CENTER);
    image(brain, this.posicaoX, this.posicaoY, this.tamanhoX, this.tamanhoY);
  }
};

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
    // tempoJogo--;
    tempoJogado++;
  }

  if (frameCount % 60 == 0 && tempoAtirar != 0 && podeAtirar == false) {
    tempoAtirar--;
    carregandoBalas = true;
  }
}

function movimentacaoPersonagem() {
  // faz personagem andar para esquerda quando seta do teclado pessionada
  if (keyIsDown(LEFT_ARROW)) {
    // personagem.display(jackRight);
    personagem.posicaoX -= 4;
  }

  // faz personagem andar para direita quando seta do teclado pessionada
  if (keyIsDown(RIGHT_ARROW)) {
    // personagem.display(jackRight);
    personagem.posicaoX += 4;
  }
}

function movimentacaoObstaculos() {
  for (var i = 0; i < obstaculoArray.length; i++) {
    obstaculoArray[i].display();
    obstaculoArray[i].posicaoY += random(-2, 2);
    obstaculoArray[i].posicaoX -= obstaculoArray[i].velocidade;
  }
  resetaMovimentacaoObstaculo();
}

function resetaMovimentacaoObstaculo() {
  for (var i = 0; i < obstaculoArray.length; i++) {
    if (obstaculoArray[i].posicaoX < -120) {
      obstaculoArray[i].posicaoX = random(400, 800);
      obstaculoArray[i].posicaoY = random(100, 400);
      obstaculoArray.push(new Obstaculo(random(400, 800), random(100, 400)));
      obstaculoArray[obstaculoArray.length - 1].velocidade += 1;
    }
  }
}

function colisaoBalaObstaculo() {
  if (balaArray.length > 0) {
    for (var i = 0; i < balaArray.length; i++) {
      for (var j = 0; j < obstaculoArray.length; j++) {
        let hit = collideRectCircle(obstaculoArray[j].posicaoX + 10, obstaculoArray[j].posicaoY, 30, 30, balaArray[i].posicaoX, balaArray[i].posicaoY, 40);
        if (hit) {
          obstaculoArray[j].vidas--;
          balaArray.splice(i, 1);

          for (var k = 0; k < obstaculoArray.length; k++) {
            if (obstaculoArray[k].vidas == 0) {
              pontuacao++;
              obstaculoArray.splice(k, 1);
              break;
            }
          }

        } // fim if
      } // fim for
    } // fim for
  } // fim if
} // fim function

function colisaoPersonagemVida() {
  let hit = collideRectCircle(personagem.posicaoX, personagem.posicaoY, 50, 50, vida.posicaoX, vida.posicaoY, 50);
  if (hit) {
    vidas += 1;
    vida.posicaoY = -10;
  } // fim if
} // fim function

function colisaoObstaculoPersonagem() {
  for (var i = 0; i < obstaculoArray.length; i++) {
    let hit = collideRectRect(
      obstaculoArray[i].posicaoX,
      obstaculoArray[i].posicaoY,
      obstaculoArray[i].tamanhoX,
      obstaculoArray[i].tamanhoX,
      personagem.posicaoX,
      personagem.posicaoY,
      30,
      personagem.tamanhoY);
    if (hit) {
      vidas--;
      obstaculoArray.splice(i, 1);
    } // fim if
  } // fim for
}

function finalJogo() {
  fill(255, 255, 255);

  if (obstaculoArray.length == 0) {
    text("P A R A B É N S\n\teliminação completa da ameaça", width / 2, height * 0.8);
    gameOVer();
  }

  if (vidas == 0) {
    text("G A M E  O V E R\n\tsem mais chances", width / 2, height * 0.8);
    gameOVer();
  }

  if (tempoJogo == 0) {
    // textFont(minhaFonte);
    // textSize(30);
    text("G  A  M  E   O  V  E  R\n\tm o r t e  p o r  t e m p o", (width / 2) + 30, height * 0.8);
    textFont(font);
    gameOVer();
  }
}

function gameOVer() {
  fimJogo = true;
  noLoop();
}

function poderFogo() {
  //if (atirar == true) {
    for (var i = 0; i < balaArray.length; i++) {
      balaArray[i].display();
      balaArray[i].posicaoX += 5;
      if (balaArray[i].posicaoX > 800) {
        balaArray.splice(i, 1);
        // balas++;
      }
    }
  //}

  if (balas == 0) {
    podeAtirar = false;
  }

  if (carregandoBalas) {
    fill(255, 0, 0);
    text("r e C a r r e g a n d o ... " + tempoAtirar, 450, 30);
    // while (balaArray.length > 0) {
    //   balaArray.pop();
    // }
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

function mostraEstrelas() {
  imageMode(CENTER);
  image(stars, xx, yy, 850, 450);
  xx -= 0.05;
}

function base() {
  push();
  imageMode(CENTER);
  image(floorLeft, 70, 425, 100, 70);
  for (var i = 170; i < 731; i += 100) {
    image(floorCenter, i, 425, 100, 70);
  }
  image(floorRight, 730, 425, 100, 70);
  image(treeBones, 200, 430, 40, 40);
  image(twoBones, 700, 430, 40, 40);
  image(twoBones, 670, 450, 40, 40);
  image(twoBones, 290, 450, 40, 40);
  image(skeleton, 570, 450, 50, 20);
  pop();
}
