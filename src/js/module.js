// Обновляет браузер при изменении HTML при разработке
if (process.env.NODE_ENV !== 'production') {
    require('file-loader!../index.html');
}
import App from './app';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

const container = document.querySelector('div[class="container"]');
const containerHeight = container.clientHeight;

const windowWidth = window.innerWidth;
const appHeight = () => {
	console.log('width', container.clientWidth)
	console.log('height', container.clientHeight)
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    document.documentElement.style.height = window.innerHeight;
}
//document.addEventListener('resize', appHeight)
appHeight()
console.log(document.documentElement.clientHeight)

const windowHeight = window.innerHeight;
const containerWidth = container.clientWidth;
const sectionMission = document.querySelector('#mission');
const sectionWork = document.querySelector('#work');
const sectionTeam = document.querySelector('#team');
const sectionContacts = document.querySelector('#contacts');
const menuItems = document.querySelectorAll('.menu-item');


window.onscroll = () => {
	const missionY = sectionMission.getBoundingClientRect().y;
	const workY = sectionWork.getBoundingClientRect().y;
	const teamY = sectionTeam.getBoundingClientRect().y;
	const contactsY = sectionContacts.getBoundingClientRect().y;
	const windowTop = window.scrollY;
	const windowBottom = windowTop + windowHeight
	let exclude;
	let menuHeight = 123;
	if (windowWidth <= 1400) menuHeight = 80;
	if (windowWidth <= 960) menuHeight = 40;
	if (missionY - menuHeight <= 0 && workY - menuHeight > 0 && teamY - menuHeight > 0 && contactsY - menuHeight > 0) {
		exclude = 0;
	}
	else if (workY - menuHeight <= 0 && missionY - menuHeight < 0 && teamY - menuHeight > 0 && contactsY - menuHeight > 0) {
		exclude = 1;
	}
	else if (teamY - menuHeight <= 0 && missionY - menuHeight < 0 && workY - menuHeight < 0 && contactsY - menuHeight > 0) {
		exclude = 2;
	}
	else if (contactsY - menuHeight <= 0 && missionY - menuHeight < 0 && workY - menuHeight < 0 && teamY - menuHeight < 0) {
		exclude = 3;
	}
	else exclude = 100;
	if (exclude !== undefined) {
		if (exclude !== 100) menuItems[exclude].classList.add('menu-active');
		for (let index = 0; menuItems[index]; index ++) {
			if (index !== exclude) {
				menuItems[index].classList.remove('menu-active');
			}
		}
	}
}


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






