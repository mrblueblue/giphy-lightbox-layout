export default function debouncedRAF(fn) {
  let ticking = false;
  return function debounced(...args) {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function callbackRAF() {
      fn(...args);
      ticking = false;
    });
  };
}
