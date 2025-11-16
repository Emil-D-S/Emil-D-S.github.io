class Cart {
  constructor(x, groundLevel) {
    this.g = 1;

    this.cartFriction = 0;
    this.pendulumFriction = 1;

    this.u = 0;

    this.pos = x;
    this.vel = 0;
    this.acc = 0;
    this.groundLevel = groundLevel;

    this.angle = 0.1;
    this.angVel = 0;
    this.angAcc = 0;

    this.length = 200;
    this.pointMass = 1;
    this.massRadius = 20;

    this.cartMass = 10;

    this.wheelRadius = 25;
    this.wheelXOffset = -5;
    this.wheelYOffset = 45;
    this.cartHeight = 35;
  }

  update() {
    const u = this.u;
    const m = this.pointMass;
    const M = this.cartMass;
    const l = this.length;
    const g = this.g;
    const xd = this.vel;
    const th = this.angle;
    const thd = this.angVel;
    const bx = this.cartFriction ?? 0; // N·s/m (cart viscous friction)
    const bth = this.pendulumFriction ?? 0; // N·m·s (joint damping)

    const s = sin(th);
    const c = cos(th);

    const denom = M + m * s * s;

    // cart acceleration x¨
    this.acc = (u - bx * xd + m * l * s * thd ** 2 - m * g * s * c) / denom;

    // angular acceleration θ¨
    this.angAcc =
      ((M + m) * g * s - m * l * thd ** 2 * s * c - u * c - bth * thd) /
      (l * denom);

    this.vel += this.acc * 0.9;
    this.pos += this.vel;

    this.angVel += this.angAcc * 0.9;
    this.angle += this.angVel;

    this.acc = 0;
    this.accVel = 0;
    this.u = 0;
  }

  applyForce(f) {
    this.u += f / this.pointMass;
  }

  show() {
    rectMode(CENTER);
    angleMode(RADIANS);
    noFill();

    let cartCenter = createVector(
      this.pos,
      this.groundLevel -
        this.wheelRadius -
        this.cartHeight / 2 -
        this.wheelXOffset
    );

    this.massPos = createVector(
      cartCenter.x + this.length * sin(this.angle),
      cartCenter.y - this.length * cos(this.angle)
    );

    this.lineEndPos = createVector(
      cartCenter.x + (this.length - this.massRadius) * sin(this.angle),
      cartCenter.y - (this.length - this.massRadius) * cos(this.angle)
    );

    line(
      cartCenter.x,
      cartCenter.y - this.cartHeight / 2,
      this.lineEndPos.x,
      this.lineEndPos.y
    );

    circle(this.massPos.x, this.massPos.y, 2 * this.massRadius);

    noFill();
    push();
    strokeWeight(10);
    point(cartCenter.x, cartCenter.y - this.cartHeight / 2);
    pop();

    rect(cartCenter.x, cartCenter.y, 100, this.cartHeight);
    circle(
      cartCenter.x + this.wheelYOffset,
      cartCenter.y + this.cartHeight / 2 + this.wheelXOffset,
      this.wheelRadius * 2
    );
    circle(
      cartCenter.x - this.wheelYOffset,
      cartCenter.y + this.cartHeight / 2 + this.wheelXOffset,
      this.wheelRadius * 2
    );
    let phi = (this.pos / width) * (width / this.wheelRadius);

    let n = 8;
    for (let i = 0; i < n; i++) {
      line(
        cartCenter.x + this.wheelYOffset,
        cartCenter.y + this.cartHeight / 2 + this.wheelXOffset,
        cartCenter.x +
          this.wheelYOffset +
          this.wheelRadius * Math.cos((1 / n) * TWO_PI * i + phi),
        cartCenter.y +
          this.cartHeight / 2 +
          this.wheelRadius * Math.sin((1 / n) * TWO_PI * i + phi) +
          this.wheelXOffset
      );
      line(
        cartCenter.x - this.wheelYOffset,
        cartCenter.y + this.cartHeight / 2 + this.wheelXOffset,
        cartCenter.x -
          this.wheelYOffset +
          this.wheelRadius * Math.cos((1 / n) * TWO_PI * i + phi),
        cartCenter.y +
          this.cartHeight / 2 +
          this.wheelRadius * Math.sin((1 / n) * TWO_PI * i + phi) +
          this.wheelXOffset
      );
    }
  }

  resetCart() {
    this.pos = width / 2;
    this.vel = 0;
    this.acc = 0;

    this.angle = 0;
    this.angVel = 0;
    this.angAcc = 0;
    this.u = 0;
  }
}

// ================================= CART CLASS ======================================

groundLevel = 500;

let pendulumFell = false;

let xRef;
let car;

let gui;

let infoGui;

let guiParams = {
  enabledA: true,
  aP: 20,
  aI: 0,
  aD: 100,
  enabledP: true,
  pP: 0.0001,
  pD: 0.007,
};

let infoParams = {
  angle: 0,
  angVel: 0,
  angAcc: 0,

  pos: 0,
  vel: 0,
  acc: 0,
};

let positionControlFolder;

let refPosSlider;

let resetCartBtn;

function setup() {
  createCanvas(1000, 600);
  frameRate(60); // Match capture framerate

  gui = createGuiForCanvas({});
  infoGui = createGuiForCanvas({}, "left").hide();

  infoGui.add(infoParams, "angle").listen().disable().decimals(3);
  infoGui.add(infoParams, "angVel").listen().disable().decimals(3);
  infoGui.add(infoParams, "angAcc").listen().disable().decimals(3);
  infoGui.add(infoParams, "pos").listen().disable().decimals(3);
  infoGui.add(infoParams, "vel").listen().disable().decimals(3);
  infoGui.add(infoParams, "acc").listen().disable().decimals(3);

  angleControlFolder = gui.addFolder("Regulator for balancing pendulum");
  positionControlFolder = gui.addFolder("Regulator for cart position");

  const enabledACtrl = angleControlFolder
    .add(guiParams, "enabledA")
    .name("enabled");
  angleControlFolder.add(guiParams, "aP").min(0).name("Proportional coeff.");
  angleControlFolder.add(guiParams, "aD").min(0).name("Derivate coeff.");

  const enabledPCtrl = positionControlFolder
    .add(guiParams, "enabledP")
    .name("enabled");
  positionControlFolder.add(guiParams, "pP").min(0).name("P");
  positionControlFolder.add(guiParams, "pD").min(0).name("D");

  enabledACtrl.onChange((value) => {
    enabledPCtrl.enable(value);
    positionControlFolder.controllers.forEach((ctrl) => {
      if (ctrl !== enabledPCtrl) ctrl.enable(value);
    });
  });

  xRef = width / 2;

  //   refPosSlider = createSlider(10, width - 8, width / 2);
  //   refPosSlider.size(width - 2);
  //   refPosSlider.position(0, groundLevel + 10);

  //   refPosSlider.style("height", "12px"); // thickness
  //   refPosSlider.style("background", "#333333"); // whole track color
  //   refPosSlider.style("border-radius", "6px");
  //   refPosSlider.style("outline", "none");

  resetCartBtn = createButton("RESET CART");
  resetCartBtn.size(100, 50);
  resetCartBtn.position(width / 2 - 100 / 2, groundLevel + 40);
  resetCartBtn.style("background-color", "#0058e6ff");
  resetCartBtn.style("color", "#ffffffff");
  resetCartBtn.style("font-style", "bold");
  resetCartBtn.style("cursor", "pointer");
  resetCartBtn.style("border-color", "#ffffff");
  resetCartBtn.style("box-shadow", "none");

  car = new Cart(500, groundLevel);

  resetCartBtn.mousePressed(() => car.resetCart());
}

let settingSP = false;

function draw() {
  background("#0058e6ff");

  //#region drawBackground

  let groundThickness = 101;

  stroke("#ffffff");
  strokeWeight(1);

  line(0, groundLevel, width, groundLevel);
  for (let i = -50; i < 100; i++) {
    line(
      i * 10,
      groundLevel + groundThickness,
      groundThickness + i * 10,
      groundLevel
    );
  }
  line(0, groundLevel + groundThickness, width, groundLevel + groundThickness);
  fill("#0058e6ff");
  rectMode(CORNERS);
  rect(0, groundLevel + 10, width, groundLevel + 30);
  line(xRef, groundLevel + 20, xRef, groundLevel - 20);
  fill(255);
  circle(xRef, groundLevel + 20, 10);

  push();
  noStroke();
  fill("#ffffff");
  text(
    "> use slider under the cart to set setpoint \n> apply force to the cart by clicking next to it \n> try (slightly) changing the coefficients\n> disable whole or just positional regulation",
    300,
    30
  );
  text(
    "Pendulum angle: " +
      (toMinusPiToPi(car.angle) * (180 / PI)).toFixed(2) +
      "°",
    15,
    30
  );
  text(
    "Pendulum ang. vel: " +
      (toMinusPiToPi(car.angVel) * (180 / PI)).toFixed(2) +
      "°",
    15,
    60
  );
  text("Cart position: " + car.pos.toFixed(2), 15, 90);
  text("Cart velocity: " + car.vel.toFixed(2), 15, 120);
  stroke("#ff0000");
  pendulumFell ? text("Pendulum fell", 15, 180) : () => {};
  pop();
  //   text("Cart acc: " + car.acc.toFixed(2), 15, 180);
  textSize(17);

  //#endregion

  abs(toMinusPiToPi(car.angle)) > HALF_PI
    ? (pendulumFell = true)
    : (pendulumFell = false);

  if (settingSP) {
    xRef = mouseX;
  }

  //   xRef = refPosSlider.value();

  // ----- OUTER LOOP: position PD → angleRef -----

  const epos = xRef - car.pos;

  const evel = car.vel;

  let angleRef = guiParams.pP * epos - guiParams.pD * evel;
  if (!guiParams.enabledP) angleRef = 0;

  const maxAngle = (15 * Math.PI) / 180;
  angleRef = Math.max(-maxAngle, Math.min(maxAngle, angleRef));

  // ----- INNER LOOP: angle PD → force (KEEP SAME SIGN PATTERN AS BEFORE) -----

  const angle = toMinusPiToPi(car.angle);
  const angVel = car.angVel;

  const ea = angle - angleRef;
  const ed = angVel;

  let u = guiParams.aP * ea + guiParams.aD * ed;
  if (!guiParams.enabledA || pendulumFell) u = 0;

  car.applyForce(u);

  car.update();
  strokeWeight(1.5);
  car.show();

  infoParams.angle = car.angle;
  infoParams.angVel = car.angVel;
  infoParams.angAcc = car.angAcc;
  infoParams.pos = car.pos;
  infoParams.vel = car.vel;
  infoParams.acc = car.acc;

  if (mouseY > 300 && mouseY < groundLevel && !settingSP) {
    let f = mouseX > car.pos ? 3 : -3;
    drawArrow(
      createVector(car.pos, groundLevel - car.wheelRadius - car.cartHeight / 2),
      createVector(f * 30, 0),
      "#ff000050",
      20
    );
    if (mouseIsPressed) {
      car.applyForce(f);

      drawArrow(
        createVector(
          car.pos,
          groundLevel - car.wheelRadius - car.cartHeight / 2
        ),
        createVector(f * 30, 0),
        "#ff0000",
        20
      );
    }
    mouseY > car.pos
      ? (document.documentElement.style.cursor = "pointer")
      : (document.documentElement.style.cursor = "pointer");
  } else if (mouseY > groundLevel + 10 && mouseY < groundLevel + 30) {
    document.documentElement.style.cursor = "pointer";
  } else {
    document.documentElement.style.cursor = "auto";
  }
}

function mousePressed() {
  mouseY > groundLevel + 10 && mouseY < groundLevel + 30
    ? (settingSP = true)
    : (settingSP = false);
}

function mouseReleased() {
  settingSP = false;
}

function drawArrow(base, vec, myColor, arrowSize = 7) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function resetCart() {
  car;
}

const toMinusPiToPi = (x) =>
  x - 2 * Math.PI * Math.floor((x + Math.PI) / (2 * Math.PI));
