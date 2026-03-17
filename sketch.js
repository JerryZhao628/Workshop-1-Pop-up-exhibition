// images for before/after restoration
let oldImg, newImg;

// how visible the restored image is
let alphaValue = 0;

// serial communication
let port;
let reader;
let serialBuffer = "";

// basic state flags controlled by the ring
let journeyStarted = false;
let easingBack = false;

// progress of the three journeys (0–1)
let route1 = 0;
let route2 = 0;
let route3 = 0;

// city positions on screen
let germany, beijing, sichuan, jinan;

// the final heart appears only at the end
let showHeart = false;


// load both images before the sketch starts
function preload() {
  oldImg = loadImage("old.jpg");
  newImg = loadImage("new.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // approximate map positions on the photograph
  germany = createVector(width * 0.70, height * 0.28);
  beijing = createVector(width * 0.66, height * 0.45);
  sichuan = createVector(width * 0.62, height * 0.70);
  jinan   = createVector(width * 0.30, height * 0.75);

  // small button to connect the serial port manually
  const connectBtn = createButton("Connect Serial");
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectSerial);
}


// open Web Serial and start reading incoming data
async function connectSerial() {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    reader = port.readable.getReader();
    readSerialLoop();
  } catch (err) {
    console.log("Serial connection failed:", err);
  }
}


// keeps reading serial data continuously
async function readSerialLoop() {
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    if (value) {
      serialBuffer += new TextDecoder().decode(value);
      let parts = serialBuffer.split("\n");
      serialBuffer = parts.pop();
      parts.forEach(line => handleSerialLine(line.trim()));
    }
  }
}


// whenever a line arrives, check if it’s TOUCH or RELEASE
function handleSerialLine(line) {
  if (line.includes("TOUCH")) startJourney();
  if (line.includes("RELEASE")) releaseJourney();
}


// triggered when ring touches the metal plate
function startJourney() {
  journeyStarted = true;
  easingBack = false;
  showHeart = false;
}

// triggered when the ring is lifted
function releaseJourney() {
  journeyStarted = false;
  easingBack = true;
  showHeart = false;
}


function draw() {
  background(0);

  updateRoutes();

  // how much the photo should be restored
  // route1 contributes more because it’s the emotional “first journey”
  let repairProgress =
    route1 * 0.45 +
    route2 * 0.30 +
    route3 * 0.25;

  let targetAlpha = repairProgress * 255;
  alphaValue = lerp(alphaValue, targetAlpha, 0.1);

  // draw damaged image first
  image(oldImg, 0, 0, width, height);

  // overlay the restored image on top
  tint(255, alphaValue);
  image(newImg, 0, 0, width, height);
  noTint();

  drawRoutesLayer();
  drawJinanLabel();

  if (showHeart) drawGradientHeart(jinan.x, jinan.y);
}


function updateRoutes() {

  // when touching → journeys move forward one by one
  if (journeyStarted) {
    if (route1 < 1) {
      route1 = min(1, route1 + 0.004);
    } else if (route2 < 1) {
      route2 = min(1, route2 + 0.006);
    } else if (route3 < 1) {
      route3 = min(1, route3 + 0.008);
    }

    // only show the heart when the final route completes
    if (route3 >= 1) showHeart = true;


  // when the ring is released → everything eases back
  } else if (easingBack) {
    let backSpeed = 0.03;
    route1 = max(0, route1 - backSpeed);
    route2 = max(0, route2 - backSpeed);
    route3 = max(0, route3 - backSpeed);

    if (route1 === 0 && route2 === 0 && route3 === 0) {
      easingBack = false;
      showHeart = false;
    }
  }
}


// draws all three journeys
function drawRoutesLayer() {
  drawRoute(germany, jinan, route1, "Grandpa · Germany");
  drawRoute(beijing, jinan, route2, "Beijing");
  drawRoute(sichuan, jinan, route3, "Sichuan");
}


// each route draws a base line + the animated progress
function drawRoute(start, end, t, label) {

  // base map line (light)
  stroke(255, 60);
  strokeWeight(2);
  line(start.x, start.y, end.x, end.y);

  // progress line only appears when t > 0
  if (t > 0) {
    let mx = lerp(start.x, end.x, t);
    let my = lerp(start.y, end.y, t);

    stroke(255, 210);
    strokeWeight(3);
    line(start.x, start.y, mx, my);

    // small moving dot that travels along the line
    noStroke();
    fill(255, 170);
    ellipse(mx, my, 14, 14);
    fill(255);
    ellipse(mx, my, 6, 6);
  }

  // subtle pulse at the starting point
  noStroke();
  let pulse = (t < 0.1 && journeyStarted)
              ? 1.2 + 0.2 * sin(frameCount * 0.25)
              : 1;
  fill(255);
  ellipse(start.x, start.y, 8 * pulse, 8 * pulse);

  // label for each city
  fill(255);
  textSize(14);
  textAlign(CENTER, TOP);
  text(label, start.x, start.y + 12);
}


// final arrival point label
function drawJinanLabel() {
  fill(255);
  ellipse(jinan.x, jinan.y, 10, 10);

  textSize(14);
  textAlign(CENTER, TOP);
  text("Grandma · Jinan", jinan.x, jinan.y + 12);
}


// pulsing gradient heart that appears at the end
function drawGradientHeart(x, y) {
  push();
  translate(x, y);

  let s = 2.0 + 0.4 * sin(frameCount * 0.25);
  scale(s);

  let r = 18;
  let ctx = drawingContext;

  let grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
  grad.addColorStop(0, "rgba(255,130,180,1)");
  grad.addColorStop(1, "rgba(255,130,180,0)");

  ctx.fillStyle = grad;

  noStroke();
  beginShape();
  vertex(0, -8);
  bezierVertex(14, -24, 30, -4, 0, 22);
  bezierVertex(-30, -4, -14, -24, 0, -8);
  endShape(CLOSE);

  pop();
}