import formTpl from 'Templates/form.hbs';
import { createErrorNotification } from 'Js/notification';
import './index.css';

class Form {
  constructor(parentElement) {
    this.parent = parentElement;
    this.search = '';
    this.listener = false;
  }

  renderForm() {
    const form = formTpl();
    console.log(this.parent, form);
    if (this.parent) this.parent.innerHTML = form;
  }

  updateSearch(e) {
    e.preventDefault();
    if (!e.target) return;

    const { value } = e.target[0];

    if (!value.trim()) {
      createErrorNotification('Search field is empty');
      return;
    }

    this.search = value;
    return true;
  }

  resetSearch() {
    this.search = '';
  }

  initListener(cb) {
    if (this.listener) return;

    const formRef = document.querySelector('#form');
    formRef.addEventListener('submit', e => {
      const isSuccess = this.updateSearch(e);
      isSuccess && cb();
    });

    this.listener = true;
  }
}

export default Form;
