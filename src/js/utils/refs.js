const bodyRef = document.querySelector('body');

const searchFormRef = document.createElement('form');
searchFormRef.classList.add('search-form');
searchFormRef.id = 'search-form';

const inputRef = document.createElement('input');
inputRef.id = 'search-input'
inputRef.type = 'text';
inputRef.name = 'query';
inputRef.autocomplete = 'off';
inputRef.placeholder = 'Что ищем ... ?';

const labelRef = document.createElement('label');
labelRef.setAttribute('for', 'search-input');

const submitBtnRef = document.createElement('button');
submitBtnRef.type = 'submit';
submitBtnRef.classList.add('submit-btn');
submitBtnRef.textContent = 'Начать поиск картинок'
searchFormRef.append(labelRef, inputRef, submitBtnRef);

bodyRef.insertAdjacentElement('afterbegin', searchFormRef);

export { searchFormRef };