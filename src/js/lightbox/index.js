import "fslightbox";

class LightBox {
  constructor() {
    this.lightBox = new window.FsLightbox();
  }

  addSource(sources) {
    this.lightBox.props.sources = [sources];
    return this;
  }

  open() {
    this.lightBox.open();
    return this;
  }

  close() {
    this.lightBox.close();
    return this;
  }
}

export default LightBox;
