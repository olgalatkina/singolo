window.onload = function () {
  addNavHandler();
  addScrollHandler();
  addHamburgerHandler();
  addSlider();
  addToggleScreenPhone();
  addTagClickHandler();
  addImageClickHandler();
  addFormClickHandler();
  addModalClickHandler();
  window.location.href = '#home';
};

// Navigation
const addNavHandler = () => {
  const navigation = document.querySelector('.navigation__list');
  const navLink = navigation.querySelectorAll('.navigation__item a');

  navigation.addEventListener('click', (evt) => {
    if(evt.target.closest('a')) {
      navLink.forEach(element => {
        element.classList.remove('navigation__item--active')
      });
      evt.target.classList.add('navigation__item--active');
    }
  });
}

const addScrollHandler = () => {
  document.addEventListener('scroll', onScroll);
}

const onScroll = (evt) => {
  const currentPosition = window.scrollY;
  const sections = document.querySelectorAll('.body>*[id]');
  const navItems = document.querySelectorAll('.navigation__item');
  const clientWidth = document.documentElement.clientWidth;
  let headerHeight;
  clientWidth <= 767 ? headerHeight = 71 : headerHeight = 95;

  sections.forEach((elem) => {
    if (elem.offsetTop - headerHeight <= currentPosition &&
       (elem.offsetTop + elem.offsetHeight) > currentPosition) {
      navItems.forEach(item => {
        item.classList.remove('navigation__item--active');

        if (elem.getAttribute('id') === item.textContent) {
          item.classList.add('navigation__item--active');
        }
      });
    }
  })
}

const addHamburgerHandler = () => {
  const headerWrapper = document.querySelector('.header__wrapper');
  const hamburger = headerWrapper.querySelector('.hamburger');
  const navigation = headerWrapper.querySelector('.navigation');
  const navList = headerWrapper.querySelector('.navigation__list');
  const overlayMobile = document.querySelector('.overlay-mobile');
  const body = document.querySelector('.body');

  hamburger.addEventListener('click', function () {
    headerWrapper.classList.toggle('header__wrapper--modal');
    hamburger.classList.toggle('hamburger--modal');
    navigation.classList.toggle('navigation--modal');
    overlayMobile.classList.toggle('overlay-mobile--active');
    body.classList.toggle('scroll-hidden');
  });

  navList.addEventListener('click', function () {
    headerWrapper.classList.remove('header__wrapper--modal');
    hamburger.classList.remove('hamburger--modal');
    navigation.classList.remove('navigation--modal');
    overlayMobile.classList.remove('overlay-mobile--active');
    body.classList.toggle('scroll-hidden');
  })
}

// Slider
const addSlider = () => {
  let phones = document.querySelectorAll('.slider__image');
  let currentSlide = 0;
  let isEnabled = true;
  let slider = document.querySelector("body > .slider");

  function changeCurrentSlide (n) {
    currentSlide = ( n + phones.length ) % phones.length;
  }

  function hideSlide(direction) {
    isEnabled = false;
    phones[currentSlide].classList.add(direction);
    phones[currentSlide].addEventListener('animationend', function() {
      this.classList.remove('activated', direction);
    })
  }

  function showSlide(direction) {
    phones[currentSlide].classList.add('next', direction);
    phones[currentSlide].addEventListener('animationend', function() {
      this.classList.remove('next', direction);
      this.classList.add('activated');
      isEnabled = true;
    })

    if (currentSlide === 1) {
      slider.classList.remove('slider--1');
      slider.classList.add('slider--2');
    } else {
      slider.classList.remove('slider--2');
      slider.classList.add('slider--1');
    }
  }

  function previousSlide (n) {
    hideSlide('to-right');
    changeCurrentSlide(n-1);
    showSlide('from-left');
  }

  function nextSlide (n) {
    hideSlide('to-left');
    changeCurrentSlide(n+1);
    showSlide('from-right');
  }

  document.querySelector('.slider__buttons .arrow--left').addEventListener('click', function() {
    if (isEnabled) {
        previousSlide(currentSlide);
    }
  })

  document.querySelector('.slider__buttons .arrow--right').addEventListener('click', function() {
    if (isEnabled) {
        nextSlide(currentSlide);
    }
  })
}

const addToggleScreenPhone = () => {
  const phoneButtons = document.querySelectorAll('.phone__button');

  phoneButtons.forEach((btn) => btn.addEventListener('click', function (event) {
      const verticalPhone = document.querySelector('.phone--vertical');
      const horizontalPhone = document.querySelector('.phone--horizontal');
      const verticalBlackScreen = document.querySelector('.phone__inner--vertical');
      const horizontalBlackScreen = document.querySelector('.phone__inner--horizontal');

     if (verticalPhone.contains(btn)) {
       verticalBlackScreen.hidden = !verticalBlackScreen.hidden;
     }
     if (horizontalPhone.contains(btn)) {
       horizontalBlackScreen.hidden = !horizontalBlackScreen.hidden;
     }
  }))
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
  let randomWorkList = getRandomWorkList();
  if (document.documentElement.clientWidth <= 767) {
    randomWorkList = randomWorkList.slice(0, 8);
  }
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
        modal.classList.add('modal-show');
        overlay.classList.add('modal-overlay-show');
      }
    }
  });
}

const addModalClickHandler = () => {
  const form = document.querySelector('.form');
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modal-overlay');
  modal.addEventListener("click", function (evt) {
    if (evt.target.classList.contains('modal__button')) {
      evt.preventDefault();
      form.reset();
      modal.classList.remove('modal-show');
      overlay.classList.remove('modal-overlay-show');
    }
  });

  window.addEventListener("keydown", function (evt) {
    const form = document.querySelector('.form');
    if (evt.keyCode === 27) {
      evt.preventDefault();
      form.reset();
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
  let subjectContent = document.querySelector('#subject-field').value.toString();
  let textareaContent = document.querySelector('#textarea').value.toString();

  if (subjectContent.length > 0) {
    modal.querySelector('.modal__subject-text').innerText = subjectContent;
  } else {
    modal.querySelector('.modal__subject').innerText = 'No subject';
  }

  if (textareaContent.length > 0) {
    modal.querySelector('.modal__description-text').innerText = textareaContent;
  } else {
    modal.querySelector('.modal__description').innerText = 'No description';
  }
}
