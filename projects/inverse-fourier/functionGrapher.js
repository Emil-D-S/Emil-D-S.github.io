class FunctionGrapher {
  constructor(
    func,
    {
      startX = 0,
      endX = TWO_PI,
      scaleY = 200,
      showAxes = true,
      showMarks = true,
      strokeCol = 0,
      strokeWeight = 1,
      axesCol = 200,
    } = {}
  ) {
    this.func = func;
    this.startX = startX;
    this.endX = endX;
    this.scaleY = scaleY;
    this.showAxes = showAxes;
    this.showMarks = showMarks;
    this.strokeCol = strokeCol;
    this.strokeWeight = strokeWeight;
    this.axesCol = axesCol;
    this.path = [];
  }

  setFunction(f) {
    // Accept either a function or a "trace" (array). If trace is passed, build a function from it.
    if (typeof f === "function") {
      this.func = f;
    } else {
      this.setFunctionFromTrace(f);
    }
    return this;
  }
  setDomain(a, b) {
    this.startX = a;
    this.endX = b;
    return this;
  }
  setScaleY(s) {
    this.scaleY = s;
    return this;
  }
  setShowAxes(v) {
    this.showAxes = v;
    return this;
  }

  draw() {
    const { startX, endX, scaleY } = this;
    const originX = map(0, startX, endX, 0, width);
    const originY = height / 2;

    // axes
    if (this.showAxes) {
      stroke(this.axesCol);
      if (originX >= 0 && originX <= width) line(originX, 0, originX, height);
      line(0, originY, width, originY);
    }

    if (this.showMarks) {
      for (let i = -5; i <= 5; i++) {
        //this.drawMark(10, 10);
      }
    }

    // graph
    noFill();
    stroke(this.strokeCol);
    strokeWeight(this.strokeWeight);
    beginShape();
    for (let px = 0; px <= width; px++) {
      const x = map(px, 0, width, startX, endX);
      const y = typeof this.func === "function" ? this.func(x) : 0;
      const py = originY - y * scaleY;
      vertex(px, py);
    }
    endShape();
  }

  drawMark(p, length) {
    line(p.x, -length / 2, p.x, length / 2);
    line(-length / 2, p.y, length / 2, p.x);
  }

  setFunctionFromTrace(trace) {
    // trace can be:
    // 1) an array indexed by canvas px: trace[px] = canvasY
    // 2) an array of points in function-space: [{x, y}, ...] where x is in [startX,endX] and y is function y
    if (!trace) {
      this.func = () => 0;
      return;
    }

    // Case 2: array of {x,y} in function coordinates
    if (
      Array.isArray(trace) &&
      trace.length > 0 &&
      typeof trace[0] === "object" &&
      trace[0] !== null &&
      "x" in trace[0]
    ) {
      // create a function that finds nearest sample in trace (trace is sorted by x ideally)
      this.func = (x) => {
        // binary search would be better, but linear search is fine for small arrays
        let best = null;
        let bestDist = Infinity;
        for (let i = 0; i < trace.length; i++) {
          const d = Math.abs(trace[i].x - x);
          if (d < bestDist) {
            bestDist = d;
            best = trace[i];
          }
        }
        return best ? best.y : 0;
      };
      return;
    }

    // Case 1: trace indexed by canvas px -> map x to px and read canvas y
    this.func = (x) => {
      const px = Math.round(map(x, this.startX, this.endX, 0, width));
      if (px < 0 || px >= width) return 0;

      const py = trace[px];
      if (py === undefined) return 0;
      const y = (height / 2 - py) / this.scaleY;
      return y;
    };
  }

  scaleTraceToFunction(trace) {
    let scaledTrace = [];
    for (let i = 0; i < trace.length; i++) {
      scaledTrace[i] = this.canvasToFunction(i, trace[i]);
    }
    return scaledTrace;
  }

  functionToCanvas(x, y) {
    const px = (x - this.startX) * (width / (this.endX - this.startX));
    const py = height / 2 - y * this.scaleY;
    return createVector(px, py);
  }

  canvasToFunction(px, py) {
    const x = this.startX + px * ((this.endX - this.startX) / width);
    const y = (height / 2 - py) / this.scaleY;
    return createVector(x, y);
  }

  addPointFromMouse() {
    let funcMouse = this.canvasToFunction(mouseX, mouseY);
    this.path.push({ x: funcMouse.x, y: funcMouse.y });
  }

  clearPath() {
    this.path = [];
  }
}
