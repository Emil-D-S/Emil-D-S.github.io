class Trace {
  constructor(funcOrData, { strokeColor = "gray", strokeWeight = 1 } = {}) {
    this.strokeColor = strokeColor;
    this.strokeWeight = strokeWeight;
    this.setFunction(funcOrData);
  }

  setFunction(f) {
    if (typeof f === "function") {
      this.func = f;
      this.traceData = null;
    } else {
      this.traceData = f; // array or Float32Array of pixels
      this.func = null;   // will be built later by FunctionGrapher
    }
    return this;
  }
}

class FunctionGrapher {
  constructor(
    traces,
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
    this.traces = traces;
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

  setdsdsadsafFunction(f) {
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
    const originY = height / 2;
    const originX = map(0, this.startX, this.endX, 0, width);
  
    if (this.showAxes) {
      stroke(this.axesCol);
      if (originX >= 0 && originX <= width) line(originX, 0, originX, height);
      line(0, originY, width, originY);
    }
  
    this.traces.forEach(t => {
      // if this trace only has raw data, rebuild func from it
      if (!t.func && t.traceData) {
        t.func = this.buildFunctionFromTrace(t.traceData);
      }
  
      noFill();
      stroke(t.strokeColor);
      strokeWeight(t.strokeWeight);
      beginShape();
      for (let px = 0; px < width; px++) {
        const x = map(px, 0, width, this.startX, this.endX);
        const y = t.func ? t.func(x) : 0;
        vertex(px, originY - y * this.scaleY);
      }
      endShape();
    });
  }

  buildFunctionFromTrace(trace) {
    return x => {
      const px = Math.round(map(x, this.startX, this.endX, 0, width));
      const py = trace[px];
      if (Number.isNaN(py) || py === undefined) return 0;
      return (height / 2 - py) / this.scaleY;
    };
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
