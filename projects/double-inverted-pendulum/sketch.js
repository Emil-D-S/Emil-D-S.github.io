class InvertedDoublePendulum {
  constructor(railY) {
    this.railY = railY;
    this.pivotOffsetY = -20;

    this.carriageMass = 1000; // M
    this.alphaPendulumMass = 1; // m1
    this.alphaPendulumLength = 100; // l1
    this.betaPendulumMass = 1; // m2
    this.betaPendulumLength = 100; // l2

    this.g = 9.81; // můžeš si doladit

    // stav
    this.x = 500;
    this.xdot = 0;
    this.xddot = 0;

    this.alpha = 0.1;
    this.alphaDot = 0;
    this.alphaDDot = 0;

    this.beta = 0;
    this.betaDot = 0;
    this.betaDDot = 0;
  }

  // numerický krok – dt v sekundách
  update(dt) {
    const M = this.carriageMass;
    const m1 = this.alphaPendulumMass;
    const m2 = this.betaPendulumMass;
    const l1 = this.alphaPendulumLength;
    const l2 = this.betaPendulumLength;
    const g = this.g;

    // pravá strana ODE: dy/dt = f(y)
    const derivs = (y) => {
      const x = y[0];
      const vx = y[1];
      const alpha = y[2];
      const dalpha = y[3];
      const beta = y[4];
      const dbeta = y[5];

      // trig
      const ca = Math.cos(alpha);
      const sa = Math.sin(alpha);

      const a2 = alpha + beta;
      const c2 = Math.cos(a2);
      const s2 = Math.sin(a2);

      const cb = Math.cos(beta);
      const sb = Math.sin(beta);

      const da = dalpha;
      const db = dbeta;

      // hmotnostní matice A(q)
      const A00 = M + m1 + m2;
      const A01 = l1 * m1 * ca + m2 * (l1 * ca + l2 * c2);
      const A02 = l2 * m2 * c2;

      const A10 = l1 * (m1 + m2) * ca + l2 * m2 * c2;
      const A11 = l1 * l1 * (m1 + m2) + 2 * l1 * l2 * m2 * cb + l2 * l2 * m2;
      const A12 = l2 * m2 * (l1 * cb + l2);

      const A20 = l2 * m2 * c2;
      const A21 = l2 * m2 * (l1 * cb + l2);
      const A22 = l2 * l2 * m2;

      // pravá strana A * ddq = rhs  (bez vnější síly do vozíku)
      const rhs0 =
        da *
          (da * l1 * m1 * sa +
            m2 * (da * l1 * sa + da * l2 * s2 + db * l2 * s2)) +
        db * l2 * m2 * (da + db) * s2;

      const rhs1 =
        (2 * da * db + db * db) * l1 * l2 * m2 * sb +
        g * l1 * (m1 + m2) * sa +
        g * l2 * m2 * s2;

      const rhs2 = l2 * m2 * (-da * da * l1 * sb + g * s2);

      // řešení 3×3 soustavy A * ddq = rhs (Gauss)
      let a00 = A00,
        a01 = A01,
        a02 = A02,
        b0 = rhs0;
      let a10 = A10,
        a11 = A11,
        a12 = A12,
        b1 = rhs1;
      let a20 = A20,
        a21 = A21,
        a22 = A22,
        b2 = rhs2;

      // eliminace prvního sloupce
      const k10 = a10 / a00;
      a10 = 0;
      a11 -= k10 * a01;
      a12 -= k10 * a02;
      b1 -= k10 * b0;

      const k20 = a20 / a00;
      a20 = 0;
      a21 -= k20 * a01;
      a22 -= k20 * a02;
      b2 -= k20 * b0;

      // eliminace druhého sloupce
      const k21 = a21 / a11;
      a21 = 0;
      a22 -= k21 * a12;
      b2 -= k21 * b1;

      // zpětný chod
      const ddbeta = b2 / a22;
      const ddalpha = (b1 - a12 * ddbeta) / a11;
      const ddx = (b0 - a01 * ddalpha - a02 * ddbeta) / a00;

      return [
        vx, // dx/dt
        ddx, // dvx/dt
        dalpha, // dalpha/dt
        ddalpha, // ddalpha/dt
        dbeta, // dbeta/dt
        ddbeta, // ddbeta/dt
      ];
    };

    // stavový vektor
    const y = [
      this.x,
      this.xdot,
      this.alpha,
      this.alphaDot,
      this.beta,
      this.betaDot,
    ];

    // RK4 integrace
    const k1 = derivs(y);
    const y2 = y.map((yi, i) => yi + 0.5 * dt * k1[i]);
    const k2 = derivs(y2);
    const y3 = y.map((yi, i) => yi + 0.5 * dt * k2[i]);
    const k3 = derivs(y3);
    const y4 = y.map((yi, i) => yi + dt * k3[i]);
    const k4 = derivs(y4);

    const yn = y.map(
      (yi, i) => yi + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])
    );

    this.x = yn[0];
    this.xdot = yn[1];

    this.alpha = yn[2];
    this.alphaDot = yn[3];

    this.beta = yn[4];
    this.betaDot = yn[5];

    const dNow = derivs(yn);
    this.xddot = dNow[1];
    this.alphaDDot = dNow[3];
    this.betaDDot = dNow[5];
  }

  show() {
    push();
    stroke(0);
    strokeWeight(1);
    triangle(
      this.x,
      this.railY + this.pivotOffsetY - 10,
      this.x + 50,
      this.railY,
      this.x - 50,
      this.railY
    );
    strokeWeight(10);
    point(this.x, this.railY + this.pivotOffsetY);
    pop();

    // první kyvadlo
    const x1 = this.x + this.alphaPendulumLength * Math.sin(this.alpha);
    const y1 = this.railY - this.alphaPendulumLength * Math.cos(this.alpha);

    line(this.x, this.railY + this.pivotOffsetY, x1, y1);
    circle(x1, y1, 20);

    // druhé kyvadlo
    const x2 = x1 + this.betaPendulumLength * Math.sin(this.alpha + this.beta);
    const y2 = y1 - this.betaPendulumLength * Math.cos(this.alpha + this.beta);

    line(x1, y1, x2, y2);
    circle(x2, y2, 20);
  }
}

const railY = 400;

let idp;

function setup() {
  createCanvas(1000, 500);

  idp = new InvertedDoublePendulum(railY);
}

function draw() {
  background(220);

  stroke(0);
  strokeWeight(1);
  line(0, railY, width, railY);

  const dt = deltaTime / 100; // p5.js – ms -> s
  idp.update(dt);
  idp.show();
}
