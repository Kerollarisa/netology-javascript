function applyStyle(el) {
  const color = el.dataset.color;
  if (color) {
    el.style.color = color;
  } else {
    el.style.color = '';
  }
  const speed = parseInt(el.dataset.speed, 10);
  return speed && !isNaN(speed) ? speed : 1000;
}

const rotators = document.querySelectorAll('.rotator');

rotators.forEach(rotator => {
  const cases = rotator.querySelectorAll('.rotator__case');
  if (cases.length === 0) return;

  let currentIndex = 0;
  cases.forEach((el, idx) => {
    if (el.classList.contains('rotator__case_active')) {
      currentIndex = idx;
    }
  });
  if (!cases[currentIndex].classList.contains('rotator__case_active')) {
    cases[currentIndex].classList.add('rotator__case_active');
  }

  function rotate() {
    cases[currentIndex].classList.remove('rotator__case_active');
    currentIndex = (currentIndex + 1) % cases.length;
    cases[currentIndex].classList.add('rotator__case_active');

    const delay = applyStyle(cases[currentIndex]);
    setTimeout(rotate, delay);
  }

  const initialDelay = applyStyle(cases[currentIndex]);
  setTimeout(rotate, initialDelay);
});
