let center, direction;
let r;
let variation;
let x_start = 0;

function setup() {
  background(0);
  createCanvas(windowWidth, windowHeight);
  center = createVector(width / 2, height / 2);

  r = Math.min(height, width) / 3;
  variation = r * 2;

  direction = createVector(r, 0);
}

let inc;
let prev;
let p;
let xoff;
let rotation_speed;
let polygon;
let density;
function draw() {
  background(0, 15);

  // starting location for Perlin noise
  xoff = x_start;

  // UI inputs
  polygon = parseFloat(polyValue); 
  rotation_speed = parseFloat(rotationValue);
  inc = parseFloat(incrementValue);
  density = parseFloat(densityValue);

  // initial calculations for initialising previous vector
  let scaleVector = direction.copy();
  let mag = map(noise(xoff), 0, 1, r - variation, r + variation);
  scaleVector.setMag(mag);
  prev = center.copy().add(scaleVector);
  xoff += inc;

  for (let i = 0; i <= density * PI; i += polygon) {
    scaleVector = direction.copy().rotate(i);
    mag = map(noise(xoff), 0, 1, r - variation, r + variation);

    stroke(
      map(noise(xoff), 0, 1, 0, 255),
      map(noise(xoff + 1000), 0, 1, 0, 255),
      map(noise(xoff + 2000), 0, 1, 0, 255),
      255 - mag / 1.6
    );
    strokeWeight(map(noise(xoff), 0, 1, 10, 0.5));

    scaleVector.setMag(mag);
    p = center.copy().add(scaleVector);

    line(prev.x, prev.y, p.x, p.y);

    prev = p;
    xoff += inc;
  }
  x_start += rotation_speed;
}
