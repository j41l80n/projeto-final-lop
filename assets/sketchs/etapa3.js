// variaveis
var canvasX = 600;
var canvasY = 400;

var posicaoX = 150;
var posicaoY = 0;

var personagem;

//definindo caracteristicas do personagem
function Personagem() {
  posicaoX = 100;
  posicaoY = 200;
  diametro = 50;

  this.criar = function() {
		 // fill(this.r, this.g, this.b);
     ellipse(posicaoX, posicaoY, diametro, diametro);
  }
};

function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(canvasX, canvasY);
  personagem = new Personagem();
}

function draw() {
  // funcao draw eh repetida em loop infinito

  // definindo cor do background
  background(0);

  // push();
  // translate(width*0.5, height*0.5);
  // rotate(frameCount / 50.0);
  // star(10, 10, 5, 70, 5);
  // pop();

  // faz personagem andar para esquerda quando seta do teclado pessionada
  if (keyIsDown(LEFT_ARROW)) {
    personagem.posicaoX -=5;
    posicaoX -= 5;
  }

  // faz personagem andar para direita quando seta do teclado pessionada
  if (keyIsDown(RIGHT_ARROW)) {
    personagem.posicaoX +=5;
    posicaoX += 5;
  }

  // personagem
  //ellipse(posicaoX, 200, 50, 50);
  personagem.criar();
  // obstaculo
  // rectMode define o ponto central do retangulo
  rectMode(CENTER);
  rect(450, 200, 50, 50);
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
