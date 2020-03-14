const slider = document.querySelector('.slider');
const slider1 = slider.querySelector('.slider__image--1');
const slider2 = slider.querySelector('.slider__image--2');

const arrowLeft = slider.querySelector('.arrow--left');
const arrowRight = slider.querySelector('.arrow--right');

const phoneInnerVertical = slider.querySelector('.phone__inner--vertical');
const phoneInnerHorizontal = slider.querySelector('.phone__inner--horizontal');
const blackScreen = slider.querySelector('.phone__inner--black');

slider.addEventListener('click', function (evt) {
  if (evt.target === arrowLeft) {
    slider.classList.toggle('slider--1');
    slider.classList.toggle('slider--2');

    slider1.classList.toggle('visually-hidden');
    slider2.classList.toggle('visually-hidden');
  }

  if (evt.target === arrowRight) {
    slider.classList.toggle('slider--1');
    slider.classList.toggle('slider--2');

    slider1.classList.toggle('visually-hidden');
    slider2.classList.toggle('visually-hidden');
  }

  if (event.target.closest('.phone--vertical')) {
    phoneInnerVertical.classList.toggle('visually-hidden');
  }

  if (event.target.closest('.phone--horizontal')) {
    phoneInnerHorizontal.classList.toggle('visually-hidden');
  }

  if (event.target.closest('.phone--big')) {
    blackScreen.classList.toggle('visually-hidden');
  }
});
