let doodleClassifier;
let mobileNetClassifier;
let currentClassifier;
let canvas;
let label;
let confidence;

function preload() {
  doodleClassifier = ml5.imageClassifier('DoodleNet');
  mobileNetClassifier = ml5.imageClassifier('MobileNet');
}

function setup() {
  canvas = createCanvas(280, 280);
  background(225);
  canvas.mouseReleased(classifyCanvas);

  let button = createButton('Clear Canvas');
  button.position(7, 44);
  button.mousePressed(clearCanvas);

  label = createDiv('Label: ...');
  confidence = createDiv('Confidence: ...');

  currentClassifier = doodleClassifier;
}

function clearCanvas() {
  background(225);
}

function draw() {
  strokeWeight(15);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function classifyCanvas() {
  currentClassifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  label.html('Label: ' + results[0].label);
  confidence.html('Confidence: ' + nf(results[0].confidence, 0, 2));
}

function useDoodleNet() {
  currentClassifier = doodleClassifier;
}

function useMobileNet() {
  currentClassifier = mobileNetClassifier;
}
