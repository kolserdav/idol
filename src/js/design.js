import Images from '../config/carousel';

function $(){}

	// Управляет работой меню
export function Menu() {
	// Нажатие кнопки
	const buttonsBurger = document.querySelector('div[class="burger-button"]');
	buttonsBurger.addEventListener('click', () => {
		buttonsBurger.classList.toggle('active');
		buttonsBurger.parentElement.classList.toggle('active');
		const items = buttonsBurger.parentElement.querySelectorAll('.menu-item');
		for (let i = 0; items[i]; i++) {
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
	// Отслеживание прокрутки
	const menu = document.querySelector('div[class="container menu"]');
	const container = document.querySelector('div[class="container"]');
	const cardText = document.querySelector('div[class=card-text]');
	const contContent = document.querySelector('div[class="container content"]');
	const bigLogo = document.querySelector('div[class="big-logo"]');
	let fixed = false;
	window.addEventListener('scroll', function () {
		const coord1 = menu.getBoundingClientRect().y;
		const coords = container.getBoundingClientRect();
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
}

// Вывод изображений блока works
export function Carousel() {

	$.clicks = {};

	const getActualImage = (id) => {
		let image;
		if ($.clicks[id] === undefined) {
			$.clicks[id] = 1;
			image = Images[id][0];
		}
		else {
			image = Images[id][$.clicks[id]];
			$.clicks[id] = (Images[id][$.clicks[id] + 1])? $.clicks[id] + 1 : 0;
		}
		return image;
	};

	const getImageSize = (parent, image, big = false) => {
		const size = {};
		let coeff = image.width / image.height;
		if (parent.width >= image.width && parent.height >= image.height) {
			size.width = image.width;
			size.height = image.height;
		}
		else if (parent.width > image.width && parent.height < image.height) {
			size.height = parent.height;
			size.width = parent.height * coeff;
		}
		else if (parent.width < image.width && parent.height > image.height) {
			size.width = parent.width;
			size.height = parent.width / coeff;
		}
		else if (parent.width < image.width && parent.height < image.height) {
			const diffWidth = image.width - parent.width;
			const diffHeight = image.height - parent.height;
			if (diffWidth >= diffHeight) {
				size.width = parent.width;
				size.height = parent.width / coeff;
			}
			else {
				// Под наши фотки здесь срабатывает в основном
				const sh = (big)? parent.height / 5.0 : 0;
				size.height = parent.height + sh;
				size.width = size.height * coeff;
			}
		}
		return size;
	};

	const showImage = async (id) => {

		const divCarousel = document.querySelector('div[class="carousel"]');
		let image;
		const images = [];
		const preloadBlock = document.querySelector('div[class="preload-one-image"]');
		const big = window.innerWidth > 620;
		const imagesCount = (big)? 1 : 0;
		for (let i = 0; i <= imagesCount; i ++) {
			if (big) $.clicks[id] = i;
			const img = getActualImage(id);
			if (divCarousel.firstElementChild) {
				await new Promise(resolve => {
					divCarousel.firstElementChild.classList.add('hide');
					if (big && divCarousel.firstElementChild.nextSibling) {
						divCarousel.firstElementChild.nextSibling.classList.add('hide');
						//divCarousel.firstElementChild.nextSibling.nextSibling.classList.add('hide');
					}
					setTimeout(() => {
						resolve(true);
					}, 700);
				});
			}
			image = document.createElement('img');
			image.src = img.src;
			image.title = img.title;
			image.alt = img.alt;
			image.setAttribute('class', `work-image`);
			let parentWidth = parseInt(divCarousel.clientWidth);
			let parentHeight = parseInt(divCarousel.clientHeight);
			parentWidth = (big)? parentWidth / 3 : parentWidth; 
			parentHeight = (big)? parentHeight / 1.5 : parentHeight;
			const size = getImageSize({ width: parentWidth, height: parentHeight },
				{ width: img.width, height: img.height }, big);
			image.width = size.width;
			image.height = size.height;
			divCarousel.innerHTML = '';
			preloadBlock.appendChild(image);
			images.push(image);
			// Прослушиватель масштабирования для отладки TODO закоментировать на деплое
			if (!$.resizeListener) {
				$.resizeListener = true;
				window.addEventListener('resize', () => {
					const container = document.querySelector('div[class="container"]');
					console.log('width', container.clientWidth)
					console.log('height', container.clientHeight)
					showImage(id);
				});
			}
		}
		// По загрузке стартового изображения определяется подгрузка остальных картинок
		image.onload = () => {
			// Вставляет первое изображение карусели
			preloadBlock.innerHTML = '';
			divCarousel.appendChild(images[0]);
			const imageP = divCarousel.firstElementChild;
			imageP.classList.add('show');
			if (big) {
				divCarousel.appendChild(images[1]);
				//divCarousel.appendChild(images[2]);
				const secondP = imageP.nextSibling;
				secondP.classList.add('show');
				//secondP.nextSibling.classList.add('show');
			}
			// Подгружает все изображения для карусели
			if (!$.imagesOnload) {
				$.imagesOnload = true;
				const preloadBlock = document.querySelector('div[class="preload-all-images"]');
				for (let prop in Images) {
					for (let i = 0; Images[prop][i]; i++) {
						const image = document.createElement('img');
						const img = Images[prop][i];
						image.src = img.src;
						image.width = img.width;
						image.height = img.height;
						preloadBlock.appendChild(image);
					}
				}
			}
		};
	};

	showImage(1);

	const buttonsParent = document.querySelectorAll('div[class="jobs-item"]');
	for (let i = 0; buttonsParent[i]; i ++) {
		const h2 = buttonsParent[i].querySelector('h2');
		h2.addEventListener('click', async (event) => {
			const element = event.target;
			const id = element.getAttribute('id');
			showImage(id);
		});
	}
}
