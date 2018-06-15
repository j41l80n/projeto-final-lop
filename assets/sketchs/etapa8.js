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
var balaArray = new Array();
var atirar;
var bg;
var cnv;
var bone;
var jack;
var ghost;
var stars;
var vida;
var skeleton;
var sofreuHit = false;
var xx = 380;
var yy = 80;
var mostraCaixa = true;
var mostraAmigo = false;
var minhaFonte;
var para = false;
var nivelTres = false;
var bruxaX = 850;
var bruxaY = 140;
var friend;
var friendY = 340;
var mostrarChefao = false;
let subiu = false;;
var boss;

function preload() {
  bg = loadImage('assets/img/bg.png');
  bone = loadImage('/assets/img/bone.png');
  treeBones = loadImage('/assets/img/tree_bones.png');
  twoBones = loadImage('/assets/img/two_bones.png');
  brain = loadImage('/assets/img/brain.png');
  jackLeft = loadImage('/assets/img/jack_left.png');
  jackRight = loadImage('/assets/img/jack_right.png');
  ghost = loadImage('/assets/img/ghost2.png');
  ghost2 = loadImage('/assets/img/ghost2_right.png');
  stars = loadImage('/assets/img/stars.png');
  floorLeft = loadImage('/assets/img/floor_left.png');
  floorCenter = loadImage('/assets/img/floor_center.png');
  floorRight = loadImage('/assets/img/floor_right.png');
  skeleton = loadImage('/assets/img/skeleton.png');
  sing = loadImage('/assets/img/sign.png');
  crate = loadImage('/assets/img/crate.png');
  bruxa = loadImage('/assets/img/bruxa.png');
  friend = loadImage('/assets/img/friend.png');
  chefao = loadImage('/assets/img/skull.png');
  boss = loadImage('/assets/img/boss.png');

  minhaFonte = loadFont('assets/fonts/zombie_holocaust.ttf');
}

function setup() {
  // funcao setup eh iniciada apenas uma vez
  personagem = new Personagem();
  personagem.display(jackRight);

  obstaculoArray.push(new Obstaculo(900, 350, ghost));
  obstaculoArray[0].display();

  cnv = createCanvas(canvasX, canvasY);
  cnv.parent('sketch-holder');
  vida = new Vida(random(50, 700), random(40, 100));
}

function draw() {
  // define o backgroung para imagem carregada no preload
  background(bg);

  base();

  finalJogo();

  nivel2();

  colisaoPersonagemPlaca();

  nivel3();

  nivel4();

  nivel5();

  if (nivel > 1) {
    push();
    imageMode(CENTER);
    if (nivel < 5) {
      image(sing, 750, 360, 80, 80);
    }
    image(bruxa, bruxaX, bruxaY, 80, 80);
    pop();
    bruxaX -= 1.3;
  }

  mostraEstrelas();

  contagemRegressiva();

  movimentacaoPersonagem();

  movimentacaoObstaculos();

  mostraVida();

  poderFogo();

  indicadoresInformacao();

  colisaoBalaObstaculo();

  colisaoObstaculoPersonagem();

  colisaoPersonagemVida();

  colisaoPersonagemCaixa();

  colisaoPersonagemAmigo();
  //filter(BLUR, 3);
} // fim draw

function nivel2() {
  if (nivel == 2) {
    if (!para) {
      for (var i = 0; i < 3; i++) {
        obstaculoArray.push(new Obstaculo(random(700, 900), random(100, 350), ghost));
      }
      para = true;
    }

    if (sofreuHit) {
      text("G A M E  O V E R\n\tsem mais chances", width / 2, height * 0.8);
      gameOVer();
    }
  }
}

function nivel3() {
  if (nivel == 3) {
    if (mostraCaixa) {
      push();
      imageMode(CENTER);
      image(crate, 400, 360, 60, 60);
      pop();
    }
    personagem.display(jackLeft);
  } else {
    personagem.display(jackRight);
  }

  if (nivel == 3) {
    if (!para) {
      for (var i = 0; i < 3; i++) {
        obstaculoArray.push(new Obstaculo(random(-50, 50), random(100, 350), ghost2));
      }
      para = true;
    }

    if (sofreuHit) {
      text("G A M E  O V E R\n\tsem mais chances", width / 2, height * 0.8);
      gameOVer();
    }
  }
}

function nivel4() {
  if (nivel == 4) {
    if (mostraAmigo) {
      push();
      imageMode(CENTER);
      image(friend, 100, friendY, 65, 105);
      pop();
    }

    if (!para) {
      for (var i = 0; i < 3; i++) {
        obstaculoArray.push(new Obstaculo(random(700, 900), random(100, 350), ghost));
      }
      para = true;
    }

    if (sofreuHit) {
      text("G A M E  O V E R\n\tsem mais chances", width / 2, height * 0.8);
      gameOVer();
    }
  }
}

function nivel5() {
  if (nivel == 5) {
    push();
    imageMode(CENTER);
    image(friend, 100, friendY, 65, 105);
    pop();
    friendY -= 3;
  }
}

//definindo caracteristicas do personagem
function Personagem() {
  this.tamanhoX = 100;
  this.tamanhoY = 80;
  this.posicaoX = 90;
  this.posicaoY = 345;
  this.velocidade = 1;

  this.display = function(sprite) {
    push();
    imageMode(CENTER);
    image(sprite, this.posicaoX, this.posicaoY, this.tamanhoY, this.tamanhoX);
    pop();
  }
};

//definindo caracteristicas do obstaculo
function Obstaculo(posicaoX, posicaoY, sprite) {
  this.posicaoX = posicaoX;
  this.posicaoY = posicaoY;
  this.tamanhoX = 79;
  this.tamanhoY = 70;
  // this.velocidade = 1;
  this.vidas = 2;

  if (nivel == 1) {
    this.velocidade = 1;
    this.tint = 255;
    this.vidas = 2;
  } else if (nivel == 2) {
    this.velocidade = random(2, 3);
    this.tint = random(140, 200);
    this.vidas = 3;
  } else if (nivel == 5) {
    this.tamanhoX = 480;
    this.tamanhoY = 350;
    this.vidas = 11;
    tempoJogo = 23;
  } else {
    this.velocidade = random(4, 6);
    this.tint = random(30, 190);
    this.vidas = random(3, 4);
  }

  this.display = function() {
    push();
    imageMode(CENTER);
    // a funcao tint aplica tranparencia na miagem
    tint(255, this.tint);
    image(sprite, this.posicaoX, this.posicaoY, this.tamanhoY, this.tamanhoX);
    pop();
  }
};

function Bala(posicaoX, posicaoY) {
  if (nivel == 3) {
    this.posicaoX = posicaoX - 20;
  } else {
    this.posicaoX = posicaoX + 20;
  }
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
    tint(255, 180);
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
    tempoJogo--;
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
  if (nivel == 3) {
    for (var i = 0; i < obstaculoArray.length; i++) {
      obstaculoArray[i].display();
      obstaculoArray[i].posicaoY += random(-2, 2);
      obstaculoArray[i].posicaoX += obstaculoArray[i].velocidade;
    }
  } else if (nivel == 5) {
    obstaculoArray[0].display();
    if (!subiu) {
      obstaculoArray[0].posicaoY -= 1;
      console.log('subiu ' + subiu);
      console.log('(obstaculoArray[0].posicaoY ' + obstaculoArray[0].posicaoY);
      if (obstaculoArray[0].posicaoY == 50) {
        subiu = true;
      }
    } else if (subiu) {
      obstaculoArray[0].posicaoY += 1;
      if (obstaculoArray[0].posicaoY == 400) {
        subiu = false;
      }
    }
  } else {
    for (var i = 0; i < obstaculoArray.length; i++) {
      obstaculoArray[i].display();
      obstaculoArray[i].posicaoY += random(-2, 2);
      obstaculoArray[i].posicaoX -= obstaculoArray[i].velocidade;
    }
  }

  resetaMovimentacaoObstaculo();
}

function resetaMovimentacaoObstaculo() {
  for (var i = 0; i < obstaculoArray.length; i++) {
    if (obstaculoArray[i].posicaoX < -120) {
      obstaculoArray[i].posicaoX = random(400, 800);
      obstaculoArray[i].posicaoY = random(100, 400);
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
              // break;
            }
          }
        } // fim if
      } // fim for
    } // fim for
  } // fim if
  if (nivel == 1 && obstaculoArray.length == 0) {
    nivel = 2;
    vidas++;
  }
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
      if (nivel > 1) {
        sofreuHit = true;
      }
      vidas--;
      obstaculoArray.splice(i, 1);
    } // fim if
  } // fim for
}

function colisaoPersonagemPlaca() {
  let hit = collideRectCircle(personagem.posicaoX, personagem.posicaoY, 50, 50, 750, 360, 50);
  if (hit && !nivelTres) {
    nivel = 3;
    nivelTres = true;
    para = false;
    while (obstaculoArray.length > 0) {
      obstaculoArray.pop();
    }
  } // fim if
}

function colisaoPersonagemCaixa() {
  let hit = collideRectCircle(personagem.posicaoX, personagem.posicaoY, 50, 50, 400, 360, 50);
  if (hit && nivel == 3) {
    nivel = 4;
    para = false;
    mostraCaixa = false;
    mostraAmigo = true;
    while (obstaculoArray.length > 0) {
      obstaculoArray.pop();
    }
    while (balaArray.length > 0) {
      balaArray.pop();
    }
  }
}

function colisaoPersonagemAmigo() {
  let hit = collideRectCircle(personagem.posicaoX, personagem.posicaoY, 50, 50, 100, friendY, 90);
  if (hit && nivel == 4) {
    nivel = 5;
    para = false;
    mostraCaixa = false;
    mostraAmigo = true;
    mostrarChefao = true;
    while (obstaculoArray.length > 0) {
      obstaculoArray.pop();
    }
    while (balaArray.length > 0) {
      balaArray.pop();
    }
    obstaculoArray.push(new Obstaculo(750, 250, chefao));
  }
}

function finalJogo() {
  fill(255, 255, 255);

  if (vidas == 0) {
    text("G A M E  O V E R\n\tsem mais chances", width / 2, height * 0.8);
    gameOVer();
  }

  if (tempoJogo == 0) {
    text("G  A  M  E   O  V  E  R\n\tm o r t e  p o r  t e m p o", (width / 2) + 30, height * 0.8);
    gameOVer();
  }
}

function gameOVer() {
  fimJogo = true;
  noLoop();
}

function poderFogo() {
  for (var i = 0; i < balaArray.length; i++) {

    balaArray[i].display();
    if (nivel == 3) {
      balaArray[i].posicaoX -= 5;
      if (balaArray[i].posicaoX <= 0) {
        balaArray.splice(i, 1);
      }
    } else {
      balaArray[i].posicaoX += 5;
      if (balaArray[i].posicaoX > 800) {
        balaArray.splice(i, 1);
      }
    }
  }

  if (balas == 0) {
    podeAtirar = false;
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

function mostraVida() {
  if (vidas == 1 && !fimJogo) {
    vida.display();
    vida.posicaoY += 1;
  }
}
