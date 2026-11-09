const canvas = document.getElementById("background-canvas");

if (!(canvas instanceof HTMLCanvasElement)) {
  console.error("Missing #background-canvas");
} else {
  const context = canvas.getContext("2d");

  if (!context) {
    console.error("Could not create a 2D context for #background-canvas");
  } else {
    const blobs = [
      { x: 0.2, y: 0.25, phase: 0, color: "rgba(70, 90, 255, 0.35)" },
      { x: 0.8, y: 0.35, phase: 2, color: "rgba(0, 190, 170, 0.28)" },
      { x: 0.5, y: 0.8, phase: 4, color: "rgba(190, 70, 220, 0.25)" },
    ];

    let width = 0;
    let height = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;

    function resizeCanvas() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function draw(timestamp) {
      const time = timestamp / 1000;
      context.clearRect(0, 0, width, height);

      blobs.forEach((blob) => {
        const x =
          width * (blob.x + Math.sin(time + blob.phase) * 0.08) +
          (pointerX - 0.5) * width * 0.12;
        const y =
          height * (blob.y + Math.cos(time * 2 + blob.phase) * 0.08) +
          (pointerY - 0.5) * height * 0.12;
        const radius = Math.max(width, height) * 0.3;
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);

        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      });

      window.requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", (event) => {
      pointerX = event.clientX / window.innerWidth;
      pointerY = event.clientY / window.innerHeight;
    });

    resizeCanvas();
    window.requestAnimationFrame(draw);
  }
}
