const accordionButtons = document.querySelectorAll('.accordion-btn');

accordionButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const item = button.closest('.parent-accordeon');
		const content = item.querySelector('.accordion__content');
		content.classList.toggle('open');
		button.querySelector('img').classList.toggle('rotate-180');
	});
});




//--------- popup ---------// 

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');


if (popupLinks.length > 0) {
	for (let i = 0; i < popupLinks.length; i++) {
		const popupLink = popupLinks[i];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('data-name');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	}
}

function popupOpen(currentPopup) {
	body.classList.add('lock');
	if (currentPopup) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		}
		let btnClose = currentPopup.querySelector('.btn-close-popup');
		btnClose.addEventListener("click", (e) => popupClose(e.target.closest('.popup')));
		currentPopup.classList.add('open');
		currentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive) {
	popupActive.classList.remove('open');
	body.classList.remove('lock');

}


// popup delivery tab

let tabs = document.querySelectorAll('.tab');
let tabItems = document.querySelectorAll('.tab-item');


tabs.forEach((tab, index, array) => tab.addEventListener("click", () => {
	if (!tab.classList.contains('active-tab')) {
		array.forEach(el => el.classList.toggle('active-tab'));
		tabItems.forEach(el => el.classList.toggle('active-tab-item'));
	}
}))


let checkboxPay = document.querySelector('#pay');
let finalButton = document.querySelector('.section-final-button button');

checkboxPay.addEventListener("change", () => {
	if (checkboxPay.checked) {
		let finalSumm = document.querySelector('.section-final-first div:last-child');
		finalButton.innerHTML = "Оплатить " + finalSumm.innerHTML;
	} else {
		finalButton.innerHTML = "Заказать";
	}
}
);


