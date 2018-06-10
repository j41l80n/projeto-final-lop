var a = 0;

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  rectMode(CENTER);
  translate(width/2, height/2);
  rotate(a);
  rect(0, 0, width/2, height/4);
  line(0, 0, 0, height/8);
  a = a + 0.01
}
