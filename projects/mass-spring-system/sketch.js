class Node {
  constructor(x, y, mass = 1) {
    this.pos = { x, y };
    this.vel = { x: 0, y: 0 };
    this.force = { x: 0, y: 0 };
    this.mass = mass;
    this.invMass = mass > 0 ? 1 / mass : 0; // 0 => fixed (pinned)
  }

  addForce(fx, fy) {
    this.force.x += fx;
    this.force.y += fy;
  }

  integrate(dt) {
    if (this.invMass === 0) {
      // pinned: keep it stable
      this.force.x = this.force.y = 0;
      this.vel.x = this.vel.y = 0;
      return;
    }

    // semi-implicit Euler
    this.vel.x += this.force.x * this.invMass * dt;
    this.vel.y += this.force.y * this.invMass * dt;

    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;

    this.force.x = this.force.y = 0;
  }
}

class Spring {
  constructor(a, b, restLength, k = 250, damping = 6) {
    this.a = a;
    this.b = b;
    this.rest = restLength;
    this.k = k;
    this.damping = damping;
  }

  apply() {
    const ax = this.a.pos.x,
      ay = this.a.pos.y;
    const bx = this.b.pos.x,
      by = this.b.pos.y;

    let dx = bx - ax,
      dy = by - ay;
    const dist = Math.hypot(dx, dy) || 1e-9;
    const nx = dx / dist,
      ny = dy / dist;

    // Hooke
    const ext = dist - this.rest;
    let fx = this.k * ext * nx;
    let fy = this.k * ext * ny;

    // damping along the spring axis
    const rvx = this.b.vel.x - this.a.vel.x;
    const rvy = this.b.vel.y - this.a.vel.y;
    const rel = rvx * nx + rvy * ny;

    fx += this.damping * rel * nx;
    fy += this.damping * rel * ny;

    this.a.addForce(fx, fy);
    this.b.addForce(-fx, -fy);
  }
}

class SoftBody {
  constructor(nodes, links) {
    this.nodes = nodes;
    this.links = links;
  }
  step(dt) {
    for (const l of this.links) l.apply();
    for (const n of this.nodes) n.integrate(dt);
  }
}

class World {
  constructor() {
    this.bodies = [];
    this.gravity = { x: 0, y: 800 };
    this.linearDamping = 0.995; // small global damping
  }

  step(dt) {
    // clamp dt so tab-switch doesn’t explode the sim
    dt = Math.min(dt, 1 / 30);

    for (const body of this.bodies) {
      // global forces
      for (const n of body.nodes) {
        if (n.invMass !== 0) {
          n.addForce(this.gravity.x * n.mass, this.gravity.y * n.mass);

          // mild air damping (force-space or vel-space; here vel-space)
          n.vel.x *= this.linearDamping;
          n.vel.y *= this.linearDamping;
        }
      }

      body.step(dt);
    }
  }
}

class RendererP5 {
  drawNode(n) {
    push();
    fill("#c9271f");
    stroke("#c9271f");
    strokeWeight(1);
    circle(n.pos.x, n.pos.y, 5);
    pop();
  }

  drawSpring(s) {
    push();
    stroke(150);
    strokeWeight(1);
    line(s.a.pos.x, s.a.pos.y, s.b.pos.x, s.b.pos.y);
    pop();
  }

  drawBody(b) {
    stroke(20);
    strokeWeight(1);

    for (const s of b.links) this.drawSpring(s);

    noStroke();
    fill(20);
    for (const n of b.nodes) this.drawNode(n);
  }
}

let world;
let softBody;
let renderer;

let kk = 1;

function setup() {
  createCanvas(600, 600);
  world = new World();
  renderer = new RendererP5();

  // cloth settings
  const cols = 20;
  const rows = 10;
  const spacing = 20;
  const startX = width / 2 - (cols - 1) * spacing * 0.5;
  const startY = 60;

  const nodes = [];
  const links = [];

  // create nodes
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = startX + i * spacing;
      const y = startY + j * spacing;
      const mass = j === 0 ? 0 : 1; // top row pinned
      nodes.push(new Node(x, y, mass));
    }
  }

  const idx = (i, j) => j * cols + i;

  // create springs
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      // structural
      if (i < cols - 1) {
        links.push(
          new Spring(
            nodes[idx(i, j)],
            nodes[idx(i + 1, j)],
            spacing,
            300 * kk,
            7
          )
        );
      }
      if (j < rows - 1) {
        links.push(
          new Spring(
            nodes[idx(i, j)],
            nodes[idx(i, j + 1)],
            spacing,
            300 * kk,
            7
          )
        );
      }

      // shear (two diagonals)
      if (i < cols - 1 && j < rows - 1) {
        links.push(
          new Spring(
            nodes[idx(i, j)],
            nodes[idx(i + 1, j + 1)],
            spacing * Math.SQRT2,
            220 * kk,
            6
          )
        );
      }
      if (i > 0 && j < rows - 1) {
        links.push(
          new Spring(
            nodes[idx(i, j)],
            nodes[idx(i - 1, j + 1)],
            spacing * Math.SQRT2,
            220 * kk,
            6
          )
        );
      }
    }
  }

  softBody = new SoftBody(nodes, links);
  world.bodies.push(softBody);
}

function draw() {
  background("#ede7d9");

  const dt = deltaTime / 1000;
  world.step(dt);

  renderer.drawBody(softBody);

  if (mouseIsPressed) {
    const m = { x: mouseX, y: mouseY };

    for (let i = softBody.links.length - 1; i >= 0; i--) {
      const s = softBody.links[i];
      const d = distToSegment(m, s.a.pos, s.b.pos);

      if (d < 6) {
        // cut radius
        softBody.links.splice(i, 1);
      }
    }
  }
}

function distToSegment(p, a, b) {
  const vx = b.x - a.x;
  const vy = b.y - a.y;

  const wx = p.x - a.x;
  const wy = p.y - a.y;

  const c1 = vx * wx + vy * wy;
  if (c1 <= 0) return Math.hypot(wx, wy);

  const c2 = vx * vx + vy * vy;
  if (c2 <= c1) return Math.hypot(p.x - b.x, p.y - b.y);

  const t = c1 / c2;
  const px = a.x + t * vx;
  const py = a.y + t * vy;

  return Math.hypot(p.x - px, p.y - py);
}
