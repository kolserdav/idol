// Обновляет браузер при изменении HTML при разработке
if (process.env.NODE_ENV !== 'production') {
    require('file-loader!../index.html');
}
const container = document.querySelector('div[class="container"]');
const containerHeight = container.clientHeight;
const windowHeight = window.innerHeight;
const containerWidth = container.clientWidth;
const windowWidth = window.innerWidth;
const appHeight = () => {
	console.log(container.clientWidth)

    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    document.documentElement.style.height = window.innerHeight;
}
window.addEventListener('resize', appHeight)
appHeight()
console.log(document.documentElement.clientHeight)




console.log('window width', window.innerWidth)
console.log('window height', window.innerHeight)
console.log('document width', document.documentElement.clientWidth)
console.log('document height', document.documentElement.clientHeight)
console.log('contaiher height', document.querySelector('div[class="container"]').clientHeight);
console.log(navigator.appName)
console.log(navigator.platform)
console.log(navigator.appCodeName)
import 'babel-polyfill';
import '../../src/scss/style.scss';
import { Carousel, Menu } from './design'

Carousel();

Menu();






