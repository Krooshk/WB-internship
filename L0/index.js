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



// Задача: Взаимодействие с формами: Напишите функцию, которая получает данные 
// из формы на веб-странице и выполняет определенные 
// действия с этими данными, например, отправляет 
// их на сервер или отображает всплывающее окно с результатами.


let PlaceAnOrderBtn = document.querySelector('.section-final-button button');




PlaceAnOrderBtn.addEventListener("click", () => {
	let form = document.querySelector('form');
	(e) => e.preventDefault()
	let data = getFormValue(form);

	function check(data) {
		let result = [...data].map(([el, value]) => checkInput(el, true)).every(el => el === true);
		return result
	}

	let resultOfCheck = check(data);

	if (resultOfCheck) {
		alert('Данные отправлены:\n' + JSON.stringify(Object.assign({}, [...data.values()])));
	} else {
		form.parentElement.scrollIntoView(({ block: 'nearest', behavior: 'smooth' }));
	}


})


function getFormValue(form) {
	const
		firstName = form.querySelector('[name="firstName"]'),
		secondName = form.querySelector('[name="secondName"]'),
		mail = form.querySelector('[name="mail"]'),
		tel = form.querySelector('[name="tel"]'),
		INN = form.querySelector('[name="INN"]');

	const data = new Map([
		[firstName, firstName.value],
		[secondName, secondName.value],
		[mail, mail.value],
		[tel, tel.value],
		[INN, INN.value],
	]);
	return data;
}

const allRegex = {
	firstName: /^(?:[a-zA-Z]+|[а-яА-Я]+)$/,
	secondName: /^(?:[a-zA-Z]+|[а-яА-Я]+)$/,
	mail: /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
	tel: /^\+\d+ \d{3} \d{3} \d{2} \d{2}$/,
	INN: /\d{14}/,
}

let inputsFromForm = document.querySelectorAll('#form-info-recipient input');

inputsFromForm.forEach((el) => {
	el.addEventListener("change", (e) => {
		checkInput(e.target);
	})
})

inputsFromForm.forEach((el) => {
	el.addEventListener("input", (e) => {
		console.log(e.target.name);
		if (mistake.has(e.target.name)) {
			checkInput(e.target)
		}
	})
})

let mistake = new Set();

function checkInput(el, clickOnOrder = null) {
	let value = el.value;
	let name = el.name;
	let title = el.parentNode.querySelector('.input-up-title');
	let hint = el.parentNode.querySelector('.input-up-hint');


	if (value.length > 0) {
		title.classList.add('input-up-title-hasLetters');
	} else {
		title.classList.remove('input-up-title-hasLetters');
	}


	if ((!Boolean(value.match(allRegex[name]))) && (clickOnOrder || (value != ""))) {
		el.style.color = "#F55123";
		el.style.borderBottom = "1px solid #F55123";
		mistake.add(name);
		hint.classList.add('input-up-hint-active');
		return false;
	} else {
		el.style.color = "#9797AF";
		mistake.delete(name);
		el.style.borderBottom = "1px solid rgba(0, 0, 0, 0.20)";
		hint.classList.remove('input-up-hint-active');
		return true;
	}

}












