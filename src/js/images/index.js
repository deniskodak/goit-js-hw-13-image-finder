import { debounce } from 'lodash.debounce';
import fetchApi from '../apiService';
import { searchFormRef } from '../utils/refs';
import imagesListTpl from '../../templates/imagesListTpl.hbs'



import * as basicLightbox from 'basiclightbox';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';

import { alert, defaultModules, notice } from '../../../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { error } from '@pnotify/core';
import pnotifyMessage from '../utils/pnotifyFn';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});


class Images {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.images = [];
    this.searchQuery = '';
    this.page = 0;
    this.check = false;

    this.height = '';
  }

  addObserver() {
    const observerOptions = {
      rootMargin: '100px',
    };
    
    const observerHandler = entries => {

      if (entries[0].isIntersecting) {
        this.page += 1;
        
        this.height = document.body.clientHeight;
        this.loadMore(this.page, this.searchQuery);
        
      }
      
      
      window.scrollTo({
        top: this.height,
        left: 0,
        behavior: 'smooth',
      });
    };

    const observer = new IntersectionObserver(observerHandler, observerOptions);
    const observerElement = document.createElement('div');
    
    this.element.insertAdjacentElement('afterend', observerElement);
    
    observer.observe(observerElement);
  }

  renderImages() {
    const imagesList = imagesListTpl(this.images);
    
    this.element.innerHTML = imagesList;
  }

  async searchImages(query, page = 1) {
    this.page = page;
    this.searchQuery = query;
    this.images = [];
    
    await this.fetchImages(this.page, this.searchQuery);
    
    if (!this.check) {
      this.init();
    }
  }

  async fetchImages(page, query = '') {
    this.searchQuery = query;

    try {
      const { hits } = await fetchApi.searchImages(query, page);
      
      this.images = [...hits];
      this.renderImages();

    } catch (error) {
      console.log(error);
    }
  }

  async loadMore(page, query = '') {
    try {
      const { hits } = await fetchApi.searchImages(query, page);
      this.element.insertAdjacentHTML('beforeend', imagesListTpl(hits));
      
    }
    catch (error) {
      console.log(error)
    }
  }

  init() {
    this.check = true;
    this.addObserver();
  }
}

const images = new Images('.gallery');

const showBigImage = (e) => {
  if (e.target.nodeName === 'IMG') {
    const src = e.target.dataset.src;
    
    const instance = basicLightbox.create(`
    <img src="${src}" width="800" height="600">`);

    instance.show();
  }
}

const searchHandler = (e) => {
  e.preventDefault();

  const { name, value } = e.target[0];

  if (name === 'query') {

    if (value.trim()== null || value.trim() == "" || value === " ") {
      return pnotifyMessage(error, 'Недопустимые символы для поиска изображеий :(');
    }
    
    return images.searchImages(value);
    
  }
}

images.element.addEventListener('click', showBigImage);

searchFormRef.addEventListener('submit', searchHandler);
