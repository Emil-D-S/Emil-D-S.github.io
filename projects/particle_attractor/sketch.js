// p5 sketch

class Particle {
  constructor(pos, vel = createVector(0, 0), acc = createVector(0, 0)) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.mass = 1;

    this.path = [];
  }

  update() {
    this.path.push(this.pos.copy());
    if (this.path.length > 50) {
      this.path.shift();
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // reset acceleration
  }

  applyForce(force) {
    this.acc.add(force.div(this.mass));
  }

  applyForceOfParticles(particles) {
    for (let other of particles) {
      if (other !== this) {
        let d = p5.Vector.sub(other.pos, this.pos);
        let rSq = d.copy().magSq(); // avoid extreme forces
        rSq = max(sqrt(rSq), 0);
        d.normalize();
        let G = 10;
        let force = d.mult((G * this.mass * other.mass) / (rSq * 10));
        this.applyForce(force);
      }
    }
  }

  edgeCheck(eff = 0.95) {
    if (this.pos.x < 0) this.vel = this.vel.mult(-1 * eff, 1);
    if (this.pos.x > width) this.vel = this.vel.mult(-1 * eff, 1);
    if (this.pos.y < 0) this.vel = this.vel.mult(1, -1 * eff);
    if (this.pos.y > height) this.vel = this.vel.mult(1, -1 * eff);
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 10, 10);
    for (let i = 0; i < this.path.length - 1; i++) {
      let p1 = this.path[i];
      let p2 = this.path[i + 1];
      stroke(255, map(i, 0, this.path.length, 0, 255));
      line(p1.x, p1.y, p2.x, p2.y);
    }
  }
}

let particles = [];

let numberOfParticles = 20;

let textfield;

function setup() {
  createCanvas(1000, 600); // creates canvas automatically

  textfield = createInput();
  textfield.position(20, 600);

  for (let i = 0; i < numberOfParticles; i++) {
    let p = new Particle(
      createVector(random(width), random(height)),
      createVector(random(-1, 1), random(-1, 1))
    );
    particles.push(p);
  }
}

function draw() {
  //fill(255);
  background(0);
  //new Text(frameRate().toFixed(2), 10, 20);

  if (mouseIsPressed) {
    for (let p of particles) {
      let d = p5.Vector.sub(createVector(mouseX, mouseY), p.pos);
      let rSq = d.copy().magSq() * 10; // avoid extreme forces
      rSq = max(sqrt(rSq), 5);
      d.normalize();
      let G = 100;
      force = d.mult((G * p.mass) / rSq);
      p.applyForce(force);
    }
  }

  for (let p of particles) {
    p.applyForceOfParticles(particles);
    // p.edgeCheck();
    p.update();
    p.show();
  }
}

function mousePressed() {}
