let plot;
let n = 10;

function f(x) {
  let y = Math.sign(sin(x));
  return y;
}

let trace; // pole o délce width s y v pixelech (nebo NaN)
let lastPt = null; // poslední zaznamenaný bod {x,y}

let harmonicSlider;

function isInsideCanvas(mx, my) {
  return mx >= 0 && mx < width && my >= 0 && my < height;
}



function setup() {
  createCanvas(1000, 600);
  pixelDensity(1);
  trace = new Float32Array(width).fill(NaN);

  harmonicSlider = createSlider(0, 100, 1);
  harmonicSlider.position(15, height);

  let origoFuncTrace = new Trace(f, {
    strokeWeight: 1,
    strokeColor: "red"
  })

  let dftFuncTrace = new Trace(() => {
    return 0;
  }, {
    strokeWeight: 1,
    strokeColor: "yellow"
  })

  plot = new FunctionGrapher([origoFuncTrace, dftFuncTrace], {
    startX: 0,
    endX: TWO_PI,
    scaleY: 200,
    showAxes: true,
    axesCol: "gray",
    strokeWeight: 1,
    showMarks: false,
    strokeCol: "red",
  });

  /*plotDFT = new FunctionGrapher(
    () => {
      return 0;
    },
    {
      startX: 0,
      endX: TWO_PI,
      scaleY: 200,
      showAxes: false,  

      strokeWeight: 1,

      strokeCol: "yellow",
    }
  );*/
}

function draw() {
  background(20);
  plot.draw();
  //plotDFT.draw();

  fill(255);
  noStroke();

  textAlign(LEFT);
  textSize(30);
  text("Draw a function", 20, 40);

  textAlign(LEFT);
  textSize(15);
  text("number of harmonics: " + harmonicSlider.value(), 15, height - 10);
}

// lepší než testovat v draw(): reaguj přímo na drag
function mousePressed() {
  if (!isInsideCanvas(mouseX, mouseY)) return;

  lastPt = {
    x: constrain(mouseX, 0, width - 1),
    y: constrain(mouseY, 0, height - 1),
  };
  trace[Math.round(lastPt.x)] = lastPt.y;
}

function mouseDragged() {
  if (!isInsideCanvas(mouseX, mouseY)) return;
  const x2 = constrain(mouseX, 0, width - 1);
  const y2 = constrain(mouseY, 0, height - 1);
  if (!lastPt) {
    lastPt = { x: x2, y: y2 };
  }

  const x1 = Math.round(lastPt.x);
  const y1 = lastPt.y;
  const xEnd = Math.round(x2);
  const dx = xEnd - x1;

  if (dx === 0) {
    trace[xEnd] = y2;
  } else {
    const step = dx > 0 ? 1 : -1;
    for (let xi = x1; xi !== xEnd + step; xi += step) {
      const t = (xi - x1) / dx; // 0..1
      const yi = y1 + t * (y2 - y1); // lineární interpolace
      if (xi >= 0 && xi < width) trace[xi] = yi; // ulož pixel
    }
  }

  lastPt = { x: x2, y: y2 };
}

function mouseReleased() {
  lastPt = null;

  // Pokud tvůj FunctionGrapher umí převzít „trace“ přímo v pixelech:
  if (typeof plot.setFunction === "function") {
    plot.setFunction(trace);
  }
  //console.log(trace);
  let z = dftFromPoints(plot.scaleTraceToFunction(trace));

  plot.traces[0].setFunction(trace); 

  plot.traces[1].func = (x) => {
      let F = z.A0;
      const K = Math.min(harmonicSlider.value(), z.amps.length - 1);
      for (let k = 1; k <= K; k++) {
        F += z.amps[k] * Math.cos(k * x + z.phases[k]);
      }
      return F;
    }

  // plotDFT.setFunction((x) => {
  //   let F = z.A0;
  //   const K = Math.min(harmonicSlider.value(), z.amps.length - 1);
  //   for (let k = 1; k <= K; k++) {
  //     F += z.amps[k] * Math.cos(k * x + z.phases[k]);
  //   }
  //   return F;
  // });
  //console.log(z);
}
