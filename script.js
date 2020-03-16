window.onload = function () {
  addNavClickHandler();
  addSlider();
  addTagClickHandler();
  addImageClickHandler();
  addFormClickHandler();
  addModalClickHandler();
};

// Navigation
const addNavClickHandler = () => {
  const navigation = document.querySelector('.navigation__list');
  const navItems = navigation.querySelectorAll('.navigation__item');

  navigation.addEventListener('click', function (evt) {
    let currentItem = evt.target;
    navItems.forEach(item => {
      item.classList.remove('navigation__item--active');
    });
    currentItem.closest('.navigation__item').classList.add('navigation__item--active');
  });
}

// Slider
const addSlider = () => {
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
    if (event.target.classList.contains('phone__button--slide1-v')) {
      phoneInnerVertical.classList.toggle('visually-hidden');
    }
    if (event.target.classList.contains('phone__button--slide1-h')) {
      phoneInnerHorizontal.classList.toggle('visually-hidden');
    }
    if (event.target.classList.contains('phone__button--slide2-v')) {
      blackScreen.classList.toggle('visually-hidden');
    }
  });
}

// Portfolio
const addTagClickHandler = () => {
  const portfolio = document.querySelector('.portfolio');
  portfolio.querySelector('.portfolio__classes').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('portfolio__button')) {
      let clickedTag = evt.target;
      toggleClickedTag(clickedTag);
      renderImagesToDom();
    }
  })
}

const toggleClickedTag = (clickedTag) => {
  let tags = portfolio.querySelectorAll('.portfolio__button');
  tags.forEach(tag => {
    tag.classList.remove('portfolio__button--active');
  });
  clickedTag.classList.add('portfolio__button--active');
}

// Fisher–Yates shuffle
const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const getRandomWorkList = () => {
  const workList = Array.from(portfolio.querySelectorAll('.portfolio__item'));
  return shuffleArray(workList);
}

const renderImagesToDom = () => {
  const randomWorkList = getRandomWorkList();
  const gallery = portfolio.querySelector('.portfolio__gallery');
  gallery.innerText = '';
  randomWorkList.forEach(elem => {
    let li = document.createElement('li');
    li.append(elem);
    gallery.append(li);
  })
}

const addImageClickHandler = () => {
  portfolio.querySelector('.portfolio__gallery').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('portfolio__image')) {
      let clickedImage = evt.target;
      colorTheBorder(clickedImage);
    }
  });
}

const colorTheBorder = (clickedImage) => {
  let images = portfolio.querySelectorAll('.portfolio__image');
  images.forEach(image => {
    image.classList.remove('portfolio__image--bordered');
  });
  clickedImage.classList.add('portfolio__image--bordered');
}

// Form
const addFormClickHandler = () => {
  const form = document.querySelector('.form');
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modal-overlay');

  form.addEventListener('click', (evt) => {
    if (form.checkValidity()) {
      evt.preventDefault();
      if (evt.target.classList.contains('button')) {
        replaceTextInModal();
        form.reset();
        modal.classList.add('modal-show');
        overlay.classList.add('modal-overlay-show');
      }
    }
  });
}

const addModalClickHandler = () => {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modal-overlay');
  modal.addEventListener("click", function (evt) {
    if (evt.target.classList.contains('modal__button')) {
      evt.preventDefault();
      modal.classList.remove('modal-show');
      overlay.classList.remove('modal-overlay-show');
    }
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (modal.classList.contains("modal-show")) {
        modal.classList.remove("modal-show");
        modal.classList.remove("modal-error");
      }
      if (overlay.classList.contains("modal-overlay-show")) {
        overlay.classList.remove("modal-overlay-show");
      }
    }
  });
}

const replaceTextInModal = () => {
  let modal = document.querySelector('.modal');
  let subjectContent = document.querySelector('#subject-field').value;
  let textareaContent = document.querySelector('#textarea').value;

  if (subjectContent.length > 0) {
    modal.querySelector('.modal__subject-text').innerText = subjectContent;
  } else {
    modal.querySelector('.modal__subject').innerText = 'Without subject';
  }

  if (textareaContent.length > 0) {
    modal.querySelector('.modal__description-text').innerText = textareaContent;
  } else {
    modal.querySelector('.modal__description').innerText = 'Without description';
  }
}
