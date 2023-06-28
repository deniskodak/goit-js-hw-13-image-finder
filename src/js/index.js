import Api from './api';
import Form from './form';
import Images from './images';

class Render {
  constructor(parentImageElement, parentFormElement) {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.form = new Form(parentFormElement);
    this.images = new Images(parentImageElement, this.handleLoadMore);
    this.api = new Api();
  }

  async handleSubmit() {
    this.api.page = 1;
    this.api.query = this.form.search;
    this.images.init();
    this.updateImages();
    this.updateForm();
  }

  async handleLoadMore() {
    this.api.page += 1;
    this.updateImages(true);
  }

  async updateForm() {
    this.form.resetSearch();
  }

  async updateImages(extendImages) {
    const images = (await this.api.fetch()) || [];
    extendImages
      ? this.images.extendImages(images)
      : this.images.renderImages(images);
  }

  init() {
    this.form.renderForm();
    this.form.initListener(this.handleSubmit);
  }
}

export default Render;
