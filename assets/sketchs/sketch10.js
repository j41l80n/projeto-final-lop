var pg;

function setup() {
  createCanvas(windowWidth - 100, windowHeight - 100);
  background(255);

  pg = createGraphics(100, 100);
  pg.fill(0);
  pg.ellipse(pg.width/2, pg.height/2, 50, 50);
  pg.fill(50);
  pg.ellipse(pg.width/2, pg.height/2, 40, 40);
  pg.fill(100);
  pg.ellipse(pg.width/2, pg.height/2, 30, 30);
  pg.fill(150);
  pg.ellipse(pg.width/2, pg.height/2, 20, 20);
  pg.filter("blur", 10);
  //pg.filter("threshold");
}

function draw() {
  image(pg, 50, 50);
}
