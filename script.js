const slider = document.querySelector('.slider');
const slider1 = document.querySelector('.slider__image--1');
const slider2 = document.querySelector('.slider__image--2');

const arrowLeft = document.querySelector('.arrow--left');
const arrowRight = document.querySelector('.arrow--right');

const phoneInnerVertical = document.querySelector('.phone__inner--vertical');
const phoneInnerHorizontal = document.querySelector('.phone__inner--horizontal');

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
});
