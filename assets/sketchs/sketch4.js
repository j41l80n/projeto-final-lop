function setup() {
  // funcao setup eh iniciada apenas uma vez
  createCanvas(480, 270);
  // background(100, 100, 100);
}

function draw() {
  // funcao draw eh repetida em loop infinito

  // background(100, 100, 100);

  // ellipse
  noStroke();
  fill(50, 50, 50, 30);
  ellipse(mouseX, mouseY, 25, 25);

  // ellipse
  fill(80, 80, 80);
  rect(150, 150, 25, 25);
}
