// shiftScroll.global.js
(function () {
  function enableShiftScrollGlobal(opts) {
    const {
      canvas,
      object,
      orbitControls = null,
      axis = "y",
      sensitivity = 0.005,
      min = -Infinity,
      max = Infinity,
      preventPageScroll = true,
    } = opts || {};
    if (!canvas) throw new Error("enableShiftScrollGlobal: canvas required");
    if (!object) throw new Error("enableShiftScrollGlobal: object required");

    let shiftDown = false;
    let pointerOver = false;

    const onKeyDown = (e) => {
      if (e.key === "Shift") {
        shiftDown = true;
        if (orbitControls) {
          orbitControls.enableZoom = false;
          orbitControls.update(); // immediately apply change
        }
      }
    };

    const onKeyUp = (e) => {
      if (e.key === "Shift") {
        shiftDown = false;
        if (orbitControls) {
          orbitControls.enableZoom = true;
          orbitControls.update(); // immediately apply change
        }
      }
    };

    const onBlur = () => {
      shiftDown = false;
      if (orbitControls) {
        orbitControls.enableZoom = true;
        orbitControls.update();
      }
    };

    const onEnter = () => (pointerOver = true);
    const onLeave = () => (pointerOver = false);

    const onWheel = (e) => {
      if (!e.shiftKey && !shiftDown) return;
      if (!pointerOver) return;

      if (preventPageScroll) {
        e.preventDefault();
        e.stopPropagation();
      }

      let factor = sensitivity;
      if (e.deltaMode === 1) factor *= 16;
      if (e.deltaMode === 2) factor *= 400;
      const delta = -e.deltaY * factor;

      if (axis === "x")
        object.position.x = Math.max(
          min,
          Math.min(max, object.position.x + delta)
        );
      else if (axis === "z")
        object.position.z = Math.max(
          min,
          Math.min(max, object.position.z + delta)
        );
      else
        object.position.y = Math.max(
          min,
          Math.min(max, object.position.y + delta)
        );
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return {
      dispose() {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
        window.removeEventListener("blur", onBlur);
        canvas.removeEventListener("mouseenter", onEnter);
        canvas.removeEventListener("mouseleave", onLeave);
        canvas.removeEventListener("wheel", onWheel, { passive: false });
      },
    };
  }

  // expose globally with a friendly name
  window.enableShiftScroll = enableShiftScrollGlobal;
})();
