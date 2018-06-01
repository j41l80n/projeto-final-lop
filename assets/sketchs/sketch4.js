function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(720, 480);
  background(205, 155, 55);
}

function draw() {
  // funcao draw eh repetida em loop infinito

  // background(255, 255, 255);

  // ellipse
  noStroke();
  fill(50, 50, 50, 30);
  ellipse(mouseX, mouseY, 25, 25);

  // ellipse
  fill(80, 80, 80);
  rect(150, 150, 25, 25);
}

function mousePressed() {
  // limpa tela
  background(255, 255, 255);
}
