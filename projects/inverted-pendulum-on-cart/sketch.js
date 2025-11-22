class Cart {
  constructor(initialX, groundY, gravity) {
    this.g = gravity;

    this.cartFriction = 0;
    this.pendulumFriction = 0;

    this.controlInput = 0;

    this.x = initialX;
    this.xVel = 0;
    this.xAcc = 0;
    this.groundY = groundY;

    this.theta = 0.2;
    this.thetaVel = 0;
    this.thetaAcc = 0;

    this.pendulumLength = 200;
    this.pendulumMass = 1;
    this.massRadius = 20;

    this.cartMass = 10;

    this.cartCenter = createVector(this.x, 0);

    this.wheelRadius = 20;
    this.wheelYOffset = -5;
    this.wheelXOffset = 45;
    this.cartHeight = 35;
  }

  update() {
    const controlInput = this.controlInput;
    const m = this.pendulumMass;
    const M = this.cartMass;
    const l = this.pendulumLength;
    const g = this.g;
    const xVel = this.xVel;
    const theta = this.theta;
    const thetaVel = this.thetaVel;
    const bx = this.cartFriction ?? 0;
    const bth = this.pendulumFriction ?? 0;

    const s = sin(theta);
    const c = cos(theta);

    const denom = M + m * s * s;

    this.xAcc =
      (controlInput - bx * xVel + m * l * s * thetaVel ** 2 - m * g * s * c) /
      denom;

    this.thetaAcc =
      ((M + m) * g * s -
        m * l * thetaVel ** 2 * s * c -
        (M + m) * this.xAcc * c -
        bth * thetaVel) /
      (l * denom);

    this.xVel += this.xAcc;
    this.x += this.xVel;

    this.thetaVel += this.thetaAcc;
    this.theta += this.thetaVel;

    this.controlInput = 0;
  }

  updateRK(dt = 1 / 60) {
    const u = this.controlInput;
    const m = this.pendulumMass;
    const M = this.cartMass;
    const l = this.pendulumLength;
    const g = this.g;
    const bx = this.cartFriction ?? 0;
    const bth = this.pendulumFriction ?? 0;

    // state = [x, xVel, theta, thetaVel]
    const deriv = (state) => {
      const x = state[0];
      const xVel = state[1];
      const th = state[2];
      const thVel = state[3];

      const s = Math.sin(th);
      const c = Math.cos(th);
      const denom = M + m * s * s;

      const xAcc =
        (u - bx * xVel + m * l * s * thVel * thVel - m * g * s * c) / denom;

      const thAcc =
        ((M + m) * g * s -
          m * l * thVel * thVel * s * c -
          (M + m) * xAcc * c -
          bth * thVel) /
        (l * denom);

      return [xVel, xAcc, thVel, thAcc];
    };

    const s0 = [this.x, this.xVel, this.theta, this.thetaVel];

    const k1 = deriv(s0);

    const s1 = [
      s0[0] + (dt / 2) * k1[0],
      s0[1] + (dt / 2) * k1[1],
      s0[2] + (dt / 2) * k1[2],
      s0[3] + (dt / 2) * k1[3],
    ];
    const k2 = deriv(s1);

    const s2 = [
      s0[0] + (dt / 2) * k2[0],
      s0[1] + (dt / 2) * k2[1],
      s0[2] + (dt / 2) * k2[2],
      s0[3] + (dt / 2) * k2[3],
    ];
    const k3 = deriv(s2);

    const s3 = [
      s0[0] + dt * k3[0],
      s0[1] + dt * k3[1],
      s0[2] + dt * k3[2],
      s0[3] + dt * k3[3],
    ];
    const k4 = deriv(s3);

    const inv6 = 1 / 6;

    this.x = s0[0] + dt * inv6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
    this.xVel = s0[1] + dt * inv6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
    this.theta = s0[2] + dt * inv6 * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);
    this.thetaVel = s0[3] + dt * inv6 * (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3]);

    // for info/debug
    // (optional) recompute accelerations at the new state:
    const sN = Math.sin(this.theta);
    const cN = Math.cos(this.theta);
    const denomN = M + m * sN * sN;
    this.xAcc =
      (u -
        bx * this.xVel +
        m * l * sN * this.thetaVel * this.thetaVel -
        m * g * sN * cN) /
      denomN;
    this.thetaAcc =
      ((M + m) * g * sN -
        m * l * this.thetaVel * this.thetaVel * sN * cN -
        (M + m) * this.xAcc * cN -
        bth * this.thetaVel) /
      (l * denomN);

    this.controlInput = 0;
  }

  applyForce(force) {
    this.controlInput += force;
  }

  show() {
    rectMode(CENTER);
    angleMode(RADIANS);
    noFill();

    this.cartCenter = createVector(
      this.x,
      this.groundY - this.wheelRadius - this.cartHeight / 2 - this.wheelYOffset
    );

    this.massPos = createVector(
      this.cartCenter.x + this.pendulumLength * sin(this.theta),
      this.cartCenter.y - this.pendulumLength * cos(this.theta)
    );

    this.lineEndPos = createVector(
      this.cartCenter.x +
        (this.pendulumLength - this.massRadius) * sin(this.theta),
      this.cartCenter.y -
        (this.pendulumLength - this.massRadius) * cos(this.theta)
    );

    line(
      this.cartCenter.x,
      this.cartCenter.y - this.cartHeight / 2,
      this.lineEndPos.x,
      this.lineEndPos.y
    );

    circle(this.massPos.x, this.massPos.y, 2 * this.massRadius);

    noFill();
    push();
    strokeWeight(10);
    point(this.cartCenter.x, this.cartCenter.y - this.cartHeight / 2);
    pop();

    rect(this.cartCenter.x, this.cartCenter.y, 100, this.cartHeight);
    circle(
      this.cartCenter.x + this.wheelXOffset,
      this.cartCenter.y + this.cartHeight / 2 + this.wheelYOffset,
      this.wheelRadius * 2
    );
    circle(
      this.cartCenter.x - this.wheelXOffset,
      this.cartCenter.y + this.cartHeight / 2 + this.wheelYOffset,
      this.wheelRadius * 2
    );
    let wheelAngle = (this.x / width) * (width / this.wheelRadius);

    let spokeCount = 8;
    for (let i = 0; i < spokeCount; i++) {
      line(
        this.cartCenter.x + this.wheelXOffset,
        this.cartCenter.y + this.cartHeight / 2 + this.wheelYOffset,
        this.cartCenter.x +
          this.wheelXOffset +
          this.wheelRadius *
            Math.cos((1 / spokeCount) * TWO_PI * i + wheelAngle),
        this.cartCenter.y +
          this.cartHeight / 2 +
          this.wheelRadius *
            Math.sin((1 / spokeCount) * TWO_PI * i + wheelAngle) +
          this.wheelYOffset
      );
      line(
        this.cartCenter.x - this.wheelXOffset,
        this.cartCenter.y + this.cartHeight / 2 + this.wheelYOffset,
        this.cartCenter.x -
          this.wheelXOffset +
          this.wheelRadius *
            Math.cos((1 / spokeCount) * TWO_PI * i + wheelAngle),
        this.cartCenter.y +
          this.cartHeight / 2 +
          this.wheelRadius *
            Math.sin((1 / spokeCount) * TWO_PI * i + wheelAngle) +
          this.wheelYOffset
      );
    }
  }

  resetCart() {
    this.x = width / 2;
    this.xVel = 0;
    this.xAcc = 0;

    this.theta = 0;
    this.thetaVel = 0;
    this.thetaAcc = 0;
    this.controlInput = 0;
  }
}

// ================================= CART CLASS ======================================

let groundY = 400;

let overloaded = false;

let controlModes = { balance: 0, dampen: 1, swingUp: 2 };

let CONTROL_MODE = controlModes.balance;

let xRef;
let cart;

let gui;

let infoGui;

let guiParams = {
  enabledA: true,
  aP: 20,
  aI: 0,
  aD: 120,
  enabledP: true,
  pP: 0.0001,
  pD: 0.007,
  enabledDamping: true,
};

let infoParams = {
  angle: 0,
  angVel: 0,
  angAcc: 0,

  pos: 0,
  vel: 0,
  acc: 0,
};

let physicalParams = {
  cartFriction: 0,
  pendulumFriction: 0,
  pendulumMass: 1,
  cartMass: 10,
};

let positionControlFolder;

let resetCartBtn;

let topTheta;

function setup() {
  createCanvas(1000, 600);
  frameRate(60);

  gui = createGuiForCanvas({});
  infoGui = createGuiForCanvas({}, "left").hide();

  infoGui.add(infoParams, "angle").listen().disable().decimals(3);
  infoGui.add(infoParams, "angVel").listen().disable().decimals(3);
  infoGui.add(infoParams, "angAcc").listen().disable().decimals(3);
  infoGui.add(infoParams, "pos").listen().disable().decimals(3);
  infoGui.add(infoParams, "vel").listen().disable().decimals(3);
  infoGui.add(infoParams, "acc").listen().disable().decimals(3);

  physicalParamsFolder = gui.addFolder("Physical parameters").close();
  angleControlFolder = gui.addFolder("Regulator for pendulum angle");
  positionControlFolder = gui.addFolder("Regulator for cart position");

  physicalParamsFolder
    .add(physicalParams, "pendulumFriction")
    .name("pendulum friction")
    .min(0)
    .max(100);
  physicalParamsFolder
    .add(physicalParams, "cartFriction")
    .name("cart friction")
    .min(0)
    .max(0.1);
  physicalParamsFolder
    .add(physicalParams, "pendulumMass")
    .name("pendulum mass")
    .max(10);
  physicalParamsFolder
    .add(physicalParams, "cartMass")
    .name("cart mass")
    .max(100);

  const enabledAngleCtrl = angleControlFolder
    .add(guiParams, "enabledA")
    .name("balance");
  angleControlFolder.add(guiParams, "enabledDamping").name("damp when fallen");
  angleControlFolder
    .add(guiParams, "aP")
    .min(0)
    .max(50)
    .name("Proportional coeff.");
  angleControlFolder
    .add(guiParams, "aD")
    .min(0)
    .max(500)
    .name("Derivate coeff.");

  const enabledPositionCtrl = positionControlFolder
    .add(guiParams, "enabledP")
    .name("cart position control");
  positionControlFolder.add(guiParams, "pP").min(0).max(0.001).name("P");
  positionControlFolder.add(guiParams, "pD").min(0).max(0.02).name("D");

  enabledAngleCtrl.onChange((value) => {
    enabledPositionCtrl.enable(value);
    positionControlFolder.controllers.forEach((ctrl) => {
      if (ctrl !== enabledPositionCtrl) ctrl.enable(value);
    });
  });

  xRef = width / 2;

  resetCartBtn = createButton("RESET CART");
  resetCartBtn.size(100, 50);
  resetCartBtn.position(width / 2 - 100 / 2, groundY + 50);
  resetCartBtn.style("background-color", "#0058e6ff");
  resetCartBtn.style("color", "#ffffffff");
  resetCartBtn.style("font-style", "bold");
  resetCartBtn.style("cursor", "pointer");
  resetCartBtn.style("border-color", "#ffffff");
  resetCartBtn.style("box-shadow", "none");

  cart = new Cart(500, groundY, g); // =============================cart==================

  resetCartBtn.mousePressed(() => {
    cart.resetCart();
    CONTROL_MODE = controlModes.balance;
  });
}

let settingSetpoint = false;

const g = 1;

const maxControlActionForce = 100;

const sliderPinHeadSize = 10;

function draw() {
  background("#0058e6ff");

  cart.cartFriction = physicalParams.cartFriction;
  cart.pendulumFriction = physicalParams.pendulumFriction;
  cart.cartMass = physicalParams.cartMass;
  cart.pendulumMass = physicalParams.pendulumMass;

  let groundThickness = 40;

  stroke("#ffffff");
  strokeWeight(1);

  line(0, groundY, width, groundY);
  for (let i = -50; i < 100; i++) {
    line(i * 10, groundY + groundThickness, groundThickness + i * 10, groundY);
  }
  line(0, groundY + groundThickness, width, groundY + groundThickness);
  fill("#0058e6ff");
  rectMode(CORNERS);
  rect(0, groundY + 10, width, groundY + 30);
  //line(xRef, groundY + 20, xRef, groundY - 20);
  drawArrow(createVector(xRef, groundY + 20), createVector(0, -35), "white");
  fill(255);
  circle(xRef, groundY + 20, sliderPinHeadSize);

  textSize(17);
  push();
  noStroke();
  fill("#ffffff");
  text(
    `> use slider under the cart to set setpoint
> apply force to the cart by clicking next to it
> try changing physical parameters
> try changing the coefficients
> toggle whole or just positional regulation
> toggle damping/control when pendulum falls
    `,
    300,
    30
  );
  text(
    "Pendulum angle: " +
      (wrapToMinusPiToPi(cart.theta) * (180 / PI)).toFixed(2) +
      "°",
    15,
    30
  );
  text(
    "Pendulum ang. vel: " +
      (wrapToMinusPiToPi(cart.thetaVel) * (180 / PI)).toFixed(2) +
      "° / frame",
    15,
    60
  );
  text("Cart position: " + cart.x.toFixed(2), 15, 90);
  text("Cart velocity: " + cart.xVel.toFixed(2), 15, 120);
  stroke("#ff0000");
  CONTROL_MODE == controlModes.dampen
    ? text("Pendulum fell, reset the cart", 15, 180 + 30)
    : () => {};
  pop();

  const normalizedTheta = wrapToMinusPiToPi(cart.theta);
  const thetaDown = wrapToMinusPiToPi(cart.theta + PI);

  let maxAngleBeforeOverload = atan(
    maxControlActionForce / ((cart.pendulumMass + cart.cartMass) * g)
  );

  if (
    CONTROL_MODE == controlModes.balance &&
    abs(normalizedTheta) > maxAngleBeforeOverload
  ) {
    CONTROL_MODE = controlModes.dampen;
  }

  if (settingSetpoint) {
    xRef = mouseX;
  }

  const cartPositionError = xRef - cart.x;
  const cartVelocityError = cart.xVel;

  let thetaRef =
    guiParams.pP * cartPositionError - guiParams.pD * cartVelocityError;
  if (!guiParams.enabledP) thetaRef = 0;

  const maxTheta = (15 * Math.PI) / 180;
  thetaRef = Math.max(-maxTheta, Math.min(maxTheta, thetaRef));

  const angleError = normalizedTheta - thetaRef;
  const angleVelError = cart.thetaVel;

  let gravityCompensation =
    (cart.pendulumMass + cart.cartMass) *
    g *
    tan(wrapToMinusPiToPi(cart.theta));

  let balanceU = guiParams.aP * angleError + guiParams.aD * angleVelError;
  balanceU += gravityCompensation;
  if (!guiParams.enabledA || CONTROL_MODE == controlModes.dampen) balanceU = 0;

  balanceU = constrain(balanceU, -maxControlActionForce, maxControlActionForce);

  let thetaDownRef = atan(cartPositionError * 0.001 - cartVelocityError * 0.05);

  // let dampenU = -thetaDown * 5 - cart.thetaVel *(
  let dampenU = -(thetaDown - thetaDownRef) * 5 - cart.thetaVel * 50;
  if (abs(thetaDown) >= PI / 2) dampenU = 0;
  if (!guiParams.enabledDamping) dampenU = 0;

  let finalControlAction = 0;

  switch (CONTROL_MODE) {
    case controlModes.balance:
      finalControlAction = balanceU;
      break;
    case controlModes.dampen:
      finalControlAction = dampenU;
      break;
  }

  cart.applyForce(finalControlAction);
  const dt = min(deltaTime / 1000, 0.03);
  const dtFrames = deltaTime / (1000 / 60);
  // console.log(dtFrames);
  cart.updateRK(min(dtFrames, 2));
  strokeWeight(1.5);
  cart.show();

  drawArrow(
    cart.cartCenter,
    createVector(finalControlAction * 10, 0),
    "#e89b00ff"
  );

  push();
  noStroke();
  textStyle("bold");
  fill("#e89b00ff");
  text("Control force: " + finalControlAction.toFixed(2), 15, 150);
  textStyle("normal");

  fill("#ffffff");
  text(
    "Max angle: " + (maxAngleBeforeOverload * (180 / PI)).toFixed(2),
    15,
    180
  );
  pop();

  infoParams.angle = cart.theta;
  infoParams.angVel = cart.thetaVel;
  infoParams.angAcc = cart.thetaAcc;
  infoParams.pos = cart.x;
  infoParams.vel = cart.xVel;
  infoParams.acc = cart.xAcc;

  if (mouseY > 300 && mouseY < groundY && !settingSetpoint) {
    let mouseForce = mouseX > cart.x ? 3 : -3;
    drawArrow(
      createVector(cart.x, groundY - cart.wheelRadius - cart.cartHeight / 2),
      createVector(mouseForce * 30, 0),
      "#ff000050",
      20
    );
    if (mouseIsPressed) {
      cart.applyForce(mouseForce);

      drawArrow(
        createVector(cart.x, groundY - cart.wheelRadius - cart.cartHeight / 2),
        createVector(mouseForce * 30, 0),
        "#ff0000",
        20
      );
    }
    mouseY > cart.x
      ? (document.documentElement.style.cursor = "pointer")
      : (document.documentElement.style.cursor = "pointer");
  } else if (mouseY > groundY + 10 && mouseY < groundY + 30) {
    if (abs(mouseX - xRef) < sliderPinHeadSize) {
      document.documentElement.style.cursor = "grab";
    } else {
      document.documentElement.style.cursor = "pointer";
    }
  } else {
    document.documentElement.style.cursor = "auto";
  }
}

function mousePressed() {
  mouseY > groundY + 10 && mouseY < groundY + 30
    ? (settingSetpoint = true)
    : (settingSetpoint = false);
}

function mouseReleased() {
  settingSetpoint = false;
}

function drawArrow(base, vec, myColor, arrowSize = 7) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  const len = vec.mag();
  const head = min(arrowSize, len * 0.8);
  translate(len - head, 0);
  triangle(0, head / 2, 0, -head / 2, head, 0);
  pop();
}

// function drawArrow(base, vec, myColor, arrowSize = 70) {
//   push();
//   stroke(myColor);
//   strokeWeight(3);
//   fill(myColor);
//   translate(base.x, base.y);
//   line(0, 0, vec.x, vec.y);
//   rotate(vec.heading());
//   translate(vec.mag() - arrowSize, 0);
//   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
//   pop();
// }

function resetCart() {}

const wrapToMinusPiToPi = (value) =>
  value - 2 * Math.PI * Math.floor((value + Math.PI) / (2 * Math.PI));
