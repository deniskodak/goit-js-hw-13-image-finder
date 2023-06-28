import 'Styles/style.css';
import Render from 'Js/index.js';

const parentFormElement = document.querySelector('.form-wrapper')
const parentImageElement = document.querySelector('.gallery')

const render = new Render(parentImageElement, parentFormElement)

render.init()