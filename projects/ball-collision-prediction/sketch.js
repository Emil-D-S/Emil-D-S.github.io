// p5 sketch

class Ball {
  constructor(x, y, r, m = r ** 3, col = "white") {
    this.pos = createVector(x, y);
    this.mass = m;
    this.r = r;
    this.col = col;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.dynFrictionCoeff = 0.999;
    this.bounceEff = 0.9;
  }

  getEnergy() {
    return this.mass * this.vel.mag();
  }

  checkEdges() {
    this.pos.x < this.r ? (this.vel.x = abs(this.vel.x)) : null;
    this.pos.x > width - this.r ? (this.vel.x = -abs(this.vel.x)) : null;
    this.pos.y < this.r ? (this.vel.y = abs(this.vel.y)) : null;
    this.pos.y > height - this.r ? (this.vel.y = -abs(this.vel.y)) : null;
  }

  applyFriction() {
    this.vel.mult(this.dynFrictionCoeff);
  }

  checkCollisions(others) {
    for (let i = 0; i < others.length; i++) {
      if (others[i] === this) return;
      const distVec = p5.Vector.sub(others[i].pos, this.pos);
      const dist = distVec.mag();
      //console.log("check");

      if (dist < this.r + others[i].r) {
        // Simple elastic collision response
        const norm = distVec.copy().normalize();
        const relativeVel = p5.Vector.sub(this.vel, others[i].vel);
        const speed = relativeVel.dot(norm);
        if (speed < 0) return;
        const impulse = (2 * speed) / 2; // assuming equal mass
        this.vel.sub(p5.Vector.mult(norm, impulse));
        others[i].vel.add(p5.Vector.mult(norm, impulse));
        console.log("Collision detected");
      }
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  show() {
    fill(this.col);
    circle(this.pos.x, this.pos.y, this.r * 2);
  }
}

const W = 1000;
const H = 500;
const d = 22.5;
const r = d / 2;
const apex = { x: 750, y: 250 };

let balls = [];

function setup() {
  createCanvas(1000, 500); // creates canvas automatically

  // for (let i = 0; i < 100; i++) {
  //   let b = new Ball(random(width), random(height), random(100, 100));
  //   b.vel = p5.Vector.random2D().mult(random(1, 3));
  //   balls.push(b);
  // }

  let idx = 0;
  for (let row = 0; row < 5; row++) {
    const x = apex.x + row * ((d * Math.sqrt(3)) / 2);
    const count = row + 1;
    const y0 = apex.y - ((count - 1) / 2) * d;
    for (let i = 0; i < count; i++) {
      let b = new Ball(x, y0 + i * d, r);
      balls.push(b);
    }
  }

  cueBall = new Ball(200, 250, r);
  cueBall.vel.x = 10;
  balls.push(cueBall);

  // cue
  //balls.unshift({ x: 200, y: 250 });
}

function draw() {
  //fill(255);
  background(0);
  //new Text(frameRate().toFixed(2), 10, 20);

  // Text("Asfd");

  for (let b of balls) {
    b.applyFriction();
    b.update();
    b.checkCollisions(balls);
    b.checkEdges();
    b.show();
  }
}
