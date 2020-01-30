// Обновляет браузер при изменении HTML при разработке
if (process.env.NODE_ENV !== 'production') {
    require('file-loader!../index.html');
}


import 'babel-polyfill';
import '../../src/scss/style.scss';
import { Carousel, Menu } from './design'



Carousel();

Menu();






