if (process.env.NODE_ENV !== 'production') {
    require('file-loader!../index.html')
}
import '../../src/scss/style.scss';


const buttonsBurger = document.querySelector('div[class="burger-button"]');

buttonsBurger.addEventListener('click', () => {
		buttonsBurger.classList.toggle('active');
		buttonsBurger.parentElement.classList.toggle('active');
		const items = buttonsBurger.parentElement.querySelectorAll('.menu-item');
		for (let i = 0; items[i]; i ++) {
			items[i].classList.toggle('active');
			items[i].addEventListener('click', () => {
				const closeMenu = new Event('click');
				buttonsBurger.classList.add(':hover');
				setTimeout(() => {
					buttonsBurger.dispatchEvent(closeMenu);
				}, 250);
			});
		}
	});

const menu = document.querySelector('div[class="container menu"]');
const container = document.querySelector('div[class="container"]');
const cardText = document.querySelector('div[class=card-text]');
const contContent = document.querySelector('div[class="container content"]');
const bigLogo = document.querySelector('div[class="big-logo"]');
window.addEventListener('scroll', function() {
  const coord1 = menu.getBoundingClientRect().y;
  const coords = container.getBoundingClientRect();
  let fixed = false;
  if (coord1 <= 0 && !fixed) {
    fixed = true;
  	menu.classList.add('fixed');
  	cardText.classList.add('fixed');
  	contContent.classList.add('fixed');
  	bigLogo.classList.add('fixed');
  }
  if ((coords.height >= (coords.y * -1)) && fixed) {
    fixed = false;
  	menu.classList.remove('fixed');
  	cardText.classList.remove('fixed');
  	contContent.classList.remove('fixed');
  	bigLogo.classList.remove('fixed');
  }
});


const app = require('./app.js')
 

app();




