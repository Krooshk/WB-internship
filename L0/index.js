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
	setTimeout(() => {
		body.classList.remove('lock');
	}, 250);

	setDefaultCard()
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
	INN: /^\d{14}$/,
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





// Change payment-way

let currentCard = "mir";

const cards = {
	"mir": "1234 56•• •••• 1234",
	"visa": "0123 45•• •••• 4123",
	"master": "9012 34•• •••• 3412",
	"maestro": "8901 23•• •••• 2341",
}


let paymentPlace = [
	{
		img: document.querySelector('.section-final-seven-card img'),
		card: document.querySelector('.section-final-seven-card').nextElementSibling,
	},
	{
		img: document.querySelector('.payment-way-second div:first-child img'),
		card: document.querySelector('.payment-way-second div:nth-child(2)'),
	}]



let inputPopups = [...document.querySelectorAll('#popup-pay input')];
let btnPopup = document.querySelector('#popup-pay button');

setDefaultCard();
function setDefaultCard() {
	inputPopups.forEach(el => el.checked = false);
	let choosenInput = inputPopups.find(el => el.id === currentCard);
	choosenInput.checked = true;
}

btnPopup.addEventListener('click', changeCard)

function changeCard() {
	let typeCard = inputPopups.find(el => (el.checked === true));
	currentCard = typeCard.id;
	paymentPlace.forEach(el => {
		el.card.textContent = cards[currentCard];
		el.img.src = `src/images/cards/${currentCard}.svg`;
	})
}

// __________


// Change delivery-way

const METHODS = {
	point: "Пункт выдачи",
	courier: "Курьер",
}


let currentDeliveryWay = {
	method: METHODS.point,
	address: "г. Бишкек, улица Ахматбека Суюмбаева, 12/1",
	infoPoint: "4.99"
}

let final = {
	type: document.querySelector('.section-final-type-delivery'),
	address: document.querySelector('.section-final-adress'),
}

let deliveryWay = {
	type: document.querySelector('.delivery-way-table-4x2 h4'),
	address: document.querySelector('.delivery-way-adress'),
	mark: document.querySelector('.delivery-way-mark'),
}

let buttonPopupDelivery = document.querySelector('#popup-delivery button');
let pointDetails = document.querySelector('.delivery-way-point');


buttonPopupDelivery.addEventListener("click", (e) => {
	let currentTab = document.querySelector('.active-tab');


	if (currentTab.getAttribute("data-delivery") === "tab-point") {
		let choosenAddresses = [...document.querySelectorAll('#popup-delivery li input.point')];
		let choosenAddress = choosenAddresses.find(address => address.checked === true);
		currentDeliveryWay.method = METHODS.point;
		currentDeliveryWay.address = choosenAddress.nextElementSibling.querySelector('.adress-and-point div:first-child').textContent;
		// adress-and-point

	} else {
		let choosenAddresses = [...document.querySelectorAll('#popup-delivery li input.courier')];
		let choosenAddress = choosenAddresses.find(address => address.checked === true);
		currentDeliveryWay.address = choosenAddress.nextElementSibling.children[0].textContent;
		currentDeliveryWay.method = METHODS.courier;
	}
	console.log(pointDetails);
	setAddress();
})

setAddress();

function setAddress() {
	if (currentDeliveryWay.method === METHODS.point) {
		final.type.textContent = "Доставка в пункт выдачи";
		final.address.textContent = currentDeliveryWay.address;
		deliveryWay.type.textContent = METHODS.point;
		deliveryWay.address.textContent = currentDeliveryWay.address;
		deliveryWay.mark.textContent = currentDeliveryWay.infoPoint;
		pointDetails.style.opacity = 1;
	} else {
		final.type.textContent = "Доставка курьером";
		final.address.textContent = currentDeliveryWay.address;
		deliveryWay.type.textContent = "Курьером";
		deliveryWay.address.textContent = currentDeliveryWay.address;
		pointDetails.style.opacity = 0;
	}
}




// __________




// Delete elements

let delIconsGoodsOnHands = document.querySelectorAll('.shopping-cart .deleteIcon');
let delIconsGoodsMissing = document.querySelectorAll('.missing-goods .deleteIcon');

delIconsGoodsOnHands.forEach(icon => {
	icon.addEventListener("click", () => {
		icon.closest('li.shopping-cart-product').remove();
	})
})
delIconsGoodsMissing.forEach(icon => {
	icon.addEventListener("click", () => {
		icon.closest('li.missing-goods-product').remove();
	})
})


let delIconsDeliveryPoint = document.querySelectorAll('#popup-delivery img[alt="bin"]');
delIconsDeliveryPoint.forEach(icon => {
	icon.addEventListener("click", () => {
		icon.closest('li').remove();
	})
})

delIconsDeliveryPoint.forEach(icon => {
	icon.addEventListener("mouseover", () => {
		icon.width = 20;
		icon.height = 20;
		icon.src = "src/images/binOrange.svg";
	})
})

delIconsDeliveryPoint.forEach(icon => {
	icon.addEventListener("mouseout", () => {
		icon.src = "src/images/bin.svg";
	})
})




















