// === p5.js: Linear transform viz + S Pen support + input mode toggle (auto/pen/mouse) ===

class MyShape {
  constructor(closed = true) {
    this.closed = closed;
    this.path = [];
  }
  addPoint(vBasis) {
    this.path.push(vBasis.copy());
  }
  show(B) {
    if (this.path.length === 0) return;
    stroke(0);
    this.closed ? fill(210) : noFill();
    beginShape();
    for (const pB of this.path) {
      const pE = applyMat2(B, pB);
      const pt = worldToScreen(pE);
      vertex(pt.x, pt.y);
    }
    this.closed ? endShape(CLOSE) : endShape();
  }
}

// --- Stav ---
let shapes = [];
let drawingShape = null;
let drawClosed = true;

let iHat, jHat;
let dragging = null;

let hoverWorld = null;
let activePointerId = null;

// UI
let inA, inB, inC, inD, btnReset;
let modeSelect; // Auto / Pen only / Mouse
let modeLabel;

// Input režim
let inputMode = "auto"; // 'auto' | 'pen' | 'mouse'
let lastPenSeen = false;

// souř. systém
const SCALE = 80;

function setup() {
  createCanvas(1000, 700);
  pixelDensity(1);

  iHat = createVector(1, 0);
  jHat = createVector(0, 1);

  textSize(14);
  inA = createInput(nf(iHat.x, 1, 3));
  inA.size(60);
  inA.input(onInputsChange);
  inB = createInput(nf(iHat.y, 1, 3));
  inB.size(60);
  inB.input(onInputsChange);
  inC = createInput(nf(jHat.x, 1, 3));
  inC.size(60);
  inC.input(onInputsChange);
  inD = createInput(nf(jHat.y, 1, 3));
  inD.size(60);
  inD.input(onInputsChange);
  btnReset = createButton("Reset (R)");
  btnReset.mousePressed(resetBasis);

  modeSelect = createSelect();
  modeSelect.option("Auto", "auto");
  modeSelect.option("Pen only", "pen");
  modeSelect.option("Mouse", "mouse");
  modeSelect.changed(() => {
    inputMode = modeSelect.value();
  });
  modeLabel = createSpan(""); // current device label

  positionUI();

  const c = _renderer.canvas;
  c.style.touchAction = "none";
  c.addEventListener("contextmenu", (e) => e.preventDefault());
  c.addEventListener("pointerdown", onPtrDown, { passive: false });
  c.addEventListener("pointermove", onPtrMove, { passive: false });
  c.addEventListener("pointerup", onPtrUp, { passive: false });
  c.addEventListener("pointercancel", onPtrUp, { passive: false });
}

function windowResized() {
  positionUI();
}
function positionUI() {
  const pad = 10,
    top = 10;
  inA.position(pad, top + 18);
  inB.position(pad + 70, top + 18);
  inC.position(pad + 150, top + 18);
  inD.position(pad + 220, top + 18);
  btnReset.position(pad + 300, top + 18);

  modeSelect.position(pad + 380, top + 18);
  modeLabel.position(pad + 520, top + 22);
}

function draw() {
  background(248);
  drawGrid();
  drawBasis();

  const Bcur = basisMatrix();
  for (const s of shapes) s.show(Bcur);
  if (drawingShape) drawingShape.show(Bcur);

  if (hoverWorld) {
    const p = worldToScreen(hoverWorld);
    noFill();
    stroke(0);
    strokeWeight(1);
    circle(p.x, p.y, 10);
  }

  noStroke();
  fill(0);
  text(
    `Draw mode: ${
      drawClosed ? "closed" : "open"
    }   |   Space: toggle   •   R: reset   •   î=(a,b), ĵ=(c,d)`,
    10,
    height - 10
  );

  if (!dragging && activePointerId === null) {
    inA.value(nf(iHat.x, 1, 3));
    inB.value(nf(iHat.y, 1, 3));
    inC.value(nf(jHat.x, 1, 3));
    inD.value(nf(jHat.y, 1, 3));
  }
}

// === Choose event ===
function acceptEvent(e) {
  const type = e.pointerType; // 'mouse' | 'pen' | 'touch'
  if (inputMode === "pen") return type === "pen";
  if (inputMode === "mouse") return type === "mouse" || type === "touch";
  // auto:
  if (type === "pen") return true;
  if (lastPenSeen) return false;
  return true;
}

// === Pointer / S Pen ===
function onPtrDown(e) {
  if (!acceptEvent(e)) return;
  e.preventDefault();

  const rect = _renderer.canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  modeLabel.html(`Input: ${e.pointerType}`);

  if (e.pointerType === "pen") lastPenSeen = true;

  // arrow dragging
  const tipI = worldToScreen(iHat);
  const tipJ = worldToScreen(jHat);
  const rad = 12;
  if (dist(mx, my, tipI.x, tipI.y) <= rad) {
    dragging = "i";
    activePointerId = e.pointerId;
    e.target.setPointerCapture(e.pointerId);
    return;
  }
  if (dist(mx, my, tipJ.x, tipJ.y) <= rad) {
    dragging = "j";
    activePointerId = e.pointerId;
    e.target.setPointerCapture(e.pointerId);
    return;
  }

  // start drawing
  if ((e.buttons & 1) === 1) {
    activePointerId = e.pointerId;
    e.target.setPointerCapture(e.pointerId);
    startStroke(e);
  }
}

function onPtrMove(e) {
  if (!acceptEvent(e)) return;

  hoverWorld = ptrToWorld(e);

  if (activePointerId === null || e.pointerId !== activePointerId) return;

  if (dragging) {
    const pE = ptrToWorld(e);
    if (dragging === "i") iHat.set(pE.x, pE.y);
    if (dragging === "j") jHat.set(pE.x, pE.y);
    return;
  }

  if (drawingShape) {
    e.preventDefault();
    const samples = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
    const B = basisMatrix();
    const invB = invert2x2(B);
    if (!invB) return;
    for (const s of samples) {
      const pE = ptrToWorld(s);
      const pB = applyInvMat2(invB, pE);
      const last = drawingShape.path[drawingShape.path.length - 1];
      if (!last || p5.Vector.dist(last, pB) > 0.01) drawingShape.addPoint(pB);
    }
  }
}

function onPtrUp(e) {
  if (e.pointerId !== activePointerId) return;
  e.preventDefault();

  if (dragging) {
    dragging = null;
    activePointerId = null;
    return;
  }
  if (drawingShape) {
    shapes.push(drawingShape);
    drawingShape = null;
  }
  activePointerId = null;
}

function startStroke(e) {
  drawingShape = new MyShape(drawClosed);
  const B = basisMatrix();
  const invB = invert2x2(B);
  if (!invB) {
    drawingShape = null;
    return;
  }
  const pE = ptrToWorld(e);
  const pB = applyInvMat2(invB, pE);
  drawingShape.addPoint(pB);
}

function ptrToWorld(e) {
  const rect = _renderer.canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return screenToWorld(createVector(x, y));
}

// === UI input ===
function onInputsChange() {
  const a = parseFloat(inA.value());
  const b = parseFloat(inB.value());
  const c = parseFloat(inC.value());
  const d = parseFloat(inD.value());
  if (isFinite(a) && isFinite(b) && isFinite(c) && isFinite(d)) {
    iHat.set(a, b);
    jHat.set(c, d);
  }
}
function resetBasis() {
  iHat.set(1, 0);
  jHat.set(0, 1);
}

// === Keys ===
function keyPressed() {
  if (key === " ") drawClosed = !drawClosed;
  if (key === "r" || key === "R") resetBasis();
}

// === LA 2x2 ===
function basisMatrix() {
  return [
    [iHat.x, jHat.x],
    [iHat.y, jHat.y],
  ];
}
function applyMat2(B, v) {
  const x = B[0][0] * v.x + B[0][1] * v.y;
  const y = B[1][0] * v.x + B[1][1] * v.y;
  return createVector(x, y);
}
function applyInvMat2(invB, v) {
  const x = invB[0][0] * v.x + invB[0][1] * v.y;
  const y = invB[1][0] * v.x + invB[1][1] * v.y;
  return createVector(x, y);
}
function invert2x2(B) {
  const a = B[0][0],
    c = B[0][1];
  const b = B[1][0],
    d = B[1][1];
  const det = a * d - b * c;
  if (abs(det) < 1e-10) return null;
  return [
    [d / det, -c / det],
    [-b / det, a / det],
  ];
}

// === World/Screen ===
function worldToScreen(v) {
  return createVector(width / 2 + v.x * SCALE, height / 2 - v.y * SCALE);
}
function screenToWorld(p) {
  return createVector((p.x - width / 2) / SCALE, (height / 2 - p.y) / SCALE);
}

// === Visualization ===
function drawGrid() {
  push();
  stroke(220);
  strokeWeight(1);
  const x0 = width / 2,
    y0 = height / 2;
  for (let x = x0 % SCALE; x < width; x += SCALE) line(x, 0, x, height);
  for (let y = y0 % SCALE; y < height; y += SCALE) line(0, y, width, y);
  stroke(180);
  line(0, y0, width, y0);
  line(x0, 0, x0, height);
  pop();
}

function drawArrowBase(vec, col) {
  push();
  stroke(col);
  fill(col);
  strokeWeight(3);
  const a = worldToScreen(createVector(0, 0));
  const b = worldToScreen(vec);
  line(a.x, a.y, b.x, b.y);
  const dir = p5.Vector.sub(b, a);
  const ang = atan2(dir.y, dir.x);
  const arrowSize = 10;
  translate(b.x, b.y);
  rotate(ang);
  translate(-arrowSize, 0);
  triangle(0, 4, 0, -4, arrowSize, 0);
  pop();

  push();
  noFill();
  stroke(col);
  strokeWeight(1.5);
  const tip = worldToScreen(vec);
  circle(tip.x, tip.y, 12);
  pop();
}

function drawBasis() {
  const colI = color(0, 180, 0);
  const colJ = color(220, 0, 0);
  drawArrowBase(iHat, colI);
  drawArrowBase(jHat, colJ);

  const tipI = worldToScreen(iHat);
  const tipJ = worldToScreen(jHat);
  noStroke();
  fill(0);
  text(`î=(${nf(iHat.x, 1, 2)}, ${nf(iHat.y, 1, 2)})`, tipI.x + 6, tipI.y - 6);
  text(`ĵ=(${nf(jHat.x, 1, 2)}, ${nf(jHat.y, 1, 2)})`, tipJ.x + 6, tipJ.y - 6);

  noStroke();
  fill(0);
  text("a", inA.x + 20, inA.y - 4);
  text("b", inB.x + 20, inB.y - 4);
  text("c", inC.x + 20, inC.y - 4);
  text("d", inD.x + 20, inD.y - 4);
}
