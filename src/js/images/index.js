import imagesListTpl from 'Templates/imagesListTpl.hbs';
import LightBox from 'Js/lightbox';

import './index.css'

class Images {
  constructor(parentElement, observerCallback) {
    this.element = parentElement;
    this.observer = false;
    this.listener = false;
    this.height = 0;
    this.observerCallback = observerCallback
  }

  addObserver() {
    if (this.observer) return;

    const observerOptions = {
      rootMargin: '100px',
    };

    const observerHandler = entries => {
      if (entries[0].isIntersecting) {
        this.height = document.body.clientHeight;
        this.observerCallback()
      }

      window.scrollTo({
        top: this.height,
        left: 0,
        behavior: 'smooth',
      });
    };

    const observer = new IntersectionObserver(observerHandler, observerOptions);
    const observerElement = document.createElement('div');
    const arrowGoUp = document.createElement('div')

    this.element?.insertAdjacentElement('afterend', observerElement);
    this.element?.insertAdjacentElement('afterend', arrowGoUp);

    observer.observe(observerElement);
    this.observer = true;
  }

  renderImages(images) {
    const imagesList = imagesListTpl(images);

    if (this.element) this.element.innerHTML = imagesList;
  }

  extendImages(images) {
    this.element?.insertAdjacentHTML('beforeend', imagesListTpl(images));
  }

  onImageClick(e) {
    if (!e.target) return;

    if (e.target.nodeName === 'IMG') {
      const src = e.target.dataset.src;
      const lb = new LightBox();
      lb.addSource(src).open();
    }
  }

  initListener() {
    if (this.listener || !this.element) return;
    this.element.addEventListener('click', this.onImageClick);
    this.listener = true;
  }

  init() {
    this.initListener();
    this.addObserver();
  }
}

export default Images;
