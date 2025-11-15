setJSXBoxSize({
  width: 700, // or '80vw' / 'min(90vw, 900px)'
  height: 700,
  boxBg: "#FFFFFF", // container color (optional)
});

// JSXGraph demo sketch
// Creates an interactive quadratic y = a x^2 + b x + c with tangent at a draggable point.
(() => {
  const board = JXG.JSXGraph.initBoard("box", {
    boundingbox: [-6, 6, 6, -6],
    axis: true,
    grid: true,
    keepaspectratio: false,
    showFullscreen: true,
  });

  // sliders for coefficients
  const a = board.create(
    "slider",
    [
      [-5.5, 5.2],
      [-2.5, 5.2],
      [-1, 1, 3],
    ],
    { name: "a" }
  );
  const b = board.create(
    "slider",
    [
      [-5.5, 4.6],
      [-2.5, 4.6],
      [-3, 0, 3],
    ],
    { name: "b" }
  );
  const c = board.create(
    "slider",
    [
      [-5.5, 4.0],
      [-2.5, 4.0],
      [-3, 0, 3],
    ],
    { name: "c" }
  );

  // function graph
  const f = (x) => a.Value() * x * x + b.Value() * x + c.Value();
  const curve = board.create("functiongraph", [f, -10, 10], { strokeWidth: 2 });

  // draggable point on curve at x0
  const x0 = board.create(
    "slider",
    [
      [2.0, 5.2],
      [5.0, 5.2],
      [-5, 0, 5],
    ],
    { name: "x₀" }
  );
  const P = board.create(
    "glider",
    [() => x0.Value(), () => f(x0.Value()), curve],
    { name: "P", size: 3 }
  );

  // tangent line at P
  const df = (x) => 2 * a.Value() * x + b.Value();
  const tan = board.create(
    "line",
    [() => P.X(), () => P.Y(), () => P.X() + 1, () => P.Y() + df(P.X())],
    { straightFirst: true, straightLast: true, strokeDashArray: 2, name: "t" }
  );

  // derivative slope display
  board.create("text", [-6, -5.5, () => `f'(x₀) = ${df(P.X()).toFixed(3)}`], {
    anchorX: "left",
    anchorY: "bottom",
  });
})();
