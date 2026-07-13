document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;

  // Detect Chrome
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

globalThis.whatever = 1.0;

  if (isChrome) {
    console.log("CHRTOME DETECTED",{isChrome});
    let velocity = 0;
    let raf = null;

    globalThis.scrollFactor = 2; // base speed
    // onde you're happy with the scrollFasctor you can changeit back to:
    // const scrollFactor = blabla;
    const friction = 0.85;    // momentum decay
    const minVelocity = 2;     // ensure instant pickup

    function step() {
      if (Math.abs(velocity) > 0.5) {
        carousel.scrollLeft += velocity;
        velocity *= friction;
        raf = requestAnimationFrame(step);
      } else {
        raf = null;
      }
    }

    carousel.addEventListener('wheel', (e) => {
      // Only handle vertical wheel for horizontal scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();

        const delta = e.deltaY * scrollFactor;
        // Ensure instant movement
        // velocity = (Math.abs(delta) > minVelocity ? delta : Math.sign(delta) * minVelocity);

        // console.log({velocity, delta});
        velocity = delta;
        if (!raf) 
        carousel.scrollBy({ left: delta, behavior: 'instant' });
      }
    }, { passive: false });

    // Optional: arrow keys
    window.addEventListener('keydown', (e) => {
      const stepSize = 150;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        velocity += stepSize;
        if (!raf) step();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        velocity -= stepSize;
        if (!raf) step();
      }
    });

  } else {
    console.log("SAFARI AND OTHERS DETECTED",{isChrome});
    // Safari & others: native smooth scroll
    carousel.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        const scrollSpeed = 2; // adjust if needed
        carousel.scrollBy({ left: e.deltaY * scrollSpeed, behavior: 'smooth' });
      }
    }, { passive: false });

    window.addEventListener('keydown', (e) => {
      const stepSize = 150;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        carousel.scrollBy({ left: stepSize, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        carousel.scrollBy({ left: -stepSize, behavior: 'smooth' });
      }
    });
  }
});
