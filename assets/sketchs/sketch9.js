var angle;
var jitter;

function setup() {
  createCanvas(640, 360);
  noStroke();
  fill(255);
  rectMode(CENTER);
}

function draw() {
  background(51);
  if (second() % 2 == 0) {
    jitter = random(-0.1, 0.1);
  }
  angle = angle + jitter;
  var c = cos(angle);
  translate(width / 2, height / 2);
  rotate(c);
  rect(0, 0, 180, 180);
}

void draw() {
  // Check current time
  int currentMillis = millis() - startTime;
  // If running for more than 3 seconds...
  if ((currentMillis - previousMillis) > 2500 && firstLoop == true) {
    // Store current time
    previousMillis = currentMillis;
    // Display main screen
    for (int alpha = 0; alpha < 255; alpha += 2) {
      background(155);
      fadeIn(homeScreen, alpha);
    }
    //    image(homeScreen, width/2, height/2);
    image(infoButton, 1000, 600);
    firstLoop = false;
  }
}

void fadeIn(PImage image, int alpha) {
  //  background(155);
  tint(255, 255, 255, alpha);
  image(image, width / 2, height / 2);
}
