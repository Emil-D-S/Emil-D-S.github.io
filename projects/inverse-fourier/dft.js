console.log("loaded");

// points: Array of p5.Vector with .x (time) and .y (value)
// opts.period  : optional known period T (seconds or same units as x)
// opts.tol     : spacing tolerance (default 1e-6 * median(dx))
// Returns: { Re, Im, freqs, A0, amps, phases, fs, dx, N }
function dftFromPoints(points, opts = {}) {
  if (!points || points.length === 0) throw new Error("Empty points");
  const tolOpt = opts.tol;

  // 1) Sort by x (in case input isn't ordered)
  const pts = points.slice().sort((a, b) => a.x - b.x);
  const N = pts.length;

  // 2) Extract y and estimate spacing
  const y = new Float64Array(N);
  for (let i = 0; i < N; i++) y[i] = pts[i].y;

  // spacing
  const dxs = [];
  for (let i = 1; i < N; i++) dxs.push(pts[i].x - pts[i - 1].x);
  // median dx
  dxs.sort((a, b) => a - b);
  const dx = dxs[Math.floor(dxs.length / 2)];
  const tol = tolOpt ?? Math.max(1e-12, Math.abs(dx) * 1e-6);

  // sanity: near-uniform spacing
  for (let i = 0; i < dxs.length; i++) {
    if (Math.abs(dxs[i] - dx) > tol) {
      throw new Error(
        "DFT assumes uniform sampling: non-uniform spacing detected."
      );
    }
  }

  // sampling rate
  const fs = 1 / dx;

  // 3) DFT O(N^2)
  const Re = new Float64Array(N);
  const Im = new Float64Array(N);
  const TWO_PI_N = (2 * Math.PI) / N;

  for (let k = 0; k < N; k++) {
    let sr = 0,
      si = 0;
    for (let n = 0; n < N; n++) {
      const ang = TWO_PI_N * k * n; // uses sample index n (uniform)
      const c = Math.cos(ang),
        s = -Math.sin(ang); // e^{-j*ang}
      sr += y[n] * c;
      si += y[n] * s;
    }
    Re[k] = sr;
    Im[k] = si;
  }

  // 4) Frequencies for bins (Hz or 1/units-of-x)
  // If you know exact period T, you may prefer f_k = k/T.
  const freqs = new Float64Array(N);
  for (let k = 0; k < N; k++) freqs[k] = (k * fs) / N;

  // 5) DC offset and one-sided amps/phases
  const half = Math.floor(N / 2);
  const amps = new Float64Array(half + 1);
  const phases = new Float64Array(half + 1);

  const A0 = Re[0] / N; // mean (initial offset)
  const mag0 = Math.hypot(Re[0], Im[0]);
  amps[0] = mag0 / N;
  phases[0] = 0;

  for (let k = 1; k <= half; k++) {
    const mag = Math.hypot(Re[k], Im[k]);
    const ph = Math.atan2(Im[k], Re[k]);
    if (k === half && N % 2 === 0) {
      // Nyquist (even N) — no doubling
      amps[k] = mag / N;
    } else {
      // interior bins doubled for one-sided cosine series
      amps[k] = (2 * mag) / N;
    }
    phases[k] = ph;
  }

  return { Re, Im, freqs, A0, amps, phases, fs, dx, N };
}

// Optional: reconstruct from one-sided amps/phases (cosine series)
// Returns array length N matching original sample grid.
function reconstructFromHarmonics(N, A0, amps, phases, K) {
  if (K == null) K = amps.length - 1; // use up to Nyquist bin
  const xrec = new Float64Array(N);
  for (let n = 0; n < N; n++) {
    let v = A0;
    for (let k = 1; k <= K; k++) {
      v += 0.5 * amps[k] * Math.cos((2 * Math.PI * k * n) / N + phases[k]);
    }
    xrec[n] = v;
  }
  return xrec;
}
