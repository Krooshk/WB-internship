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
		finalButton.innerHTML = "Оплатить " + finalSumm.textContent;
	} else {
		finalButton.innerHTML = "Заказать";
	}
}
);



// Move to the form

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
	firstName: /^(?:[a-zA-Z]+|[а-яА-ЯЁё]+)$/,
	secondName: /^(?:[a-zA-Z]+|[а-яА-ЯЁё]+)$/,
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
		if (name === "INN") {
			hint.textContent = "Проверьте ИНН";
			hint.style.color = "#F55123";
		}
		el.style.color = "#F55123";
		el.style.borderBottom = "1px solid #F55123";
		mistake.add(name);
		hint.classList.add('input-up-hint-active');
		return false;
	} else {
		if (name === "INN") {
			hint.textContent = "Для таможенного оформления";
			hint.style.color = "#000";
		}
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
		let good = icon.closest('li.shopping-cart-product');
		arrayGoods.delete(good);
		countAmount();

	})
})
delIconsGoodsMissing.forEach(icon => {
	icon.addEventListener("click", () => {
		icon.closest('li.missing-goods-product').remove();
		changeCountInMssingAccordeon();
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


// Work with final amount

var arrayGoods = new Map();

let finalAmount = document.querySelector('.final-amount');
let numberOfProducts = document.querySelector('.number-of-products');
let fullAmount = document.querySelector('.full-amount');
let discount = document.querySelector('.discount');


function changeValuesInFinalSection() {
	let final = {
		countAllofGoods: 0,
		discountpriceAll: 0,
		fullpriceAll: 0,
	}

	for (let [el, good] of arrayGoods) {
		if (good.isChoosen) {
			final.countAllofGoods += good.count;
			final.discountpriceAll += good.count * good.discountprice;
			final.fullpriceAll += good.count * good.fullprice;
		}
	}
	finalAmount.textContent = formatString(String(Math.floor(final.discountpriceAll)));
	numberOfProducts.textContent = toCaseCount(Math.floor(final.countAllofGoods), ['товар', 'товара', 'товаров']);
	fullAmount.textContent = formatString(String(Math.floor(final.fullpriceAll))) + " сом";
	discount.textContent = "- " + formatString(String(Math.floor(final.fullpriceAll - final.discountpriceAll))) + " сом";
}

[finalAmount, numberOfProducts, discount, fullAmount].forEach(el => el.textContent = "0");



function countNumberOfGoodsAndCost() {
	let countInaccordeon = document.querySelector('.number-of-products-and-cost span:first-child');
	let priceInaccordeon = document.querySelector('.number-of-products-and-cost span:last-child');
	let final = {
		count: 0,
		price: 0,
	}

	for (let [el, good] of arrayGoods) {
		final.count += good.count;
		final.price += good.count * good.discountprice;
	}

	countInaccordeon.textContent = toCaseCount(Number(final.count), ['товар', 'товара', 'товаров']);
	priceInaccordeon.textContent = formatString(String(Math.floor(final.price))) + " cом";

}

function countAmount() {
	let goodsInCart = [...document.querySelectorAll('.shopping-cart ul>li.shopping-cart-product')];
	goodsInCart.forEach(good => {
		countForOneProduct(good);
	})
	goodsInCart.forEach(good => {
		let obj = {
			name: good.getAttribute("data-name"),
			isChoosen: good.querySelector('.custom-checkbox').checked,
			fullprice: Number(good.getAttribute('fullprice')),
			discountprice: Number(good.getAttribute('discountprice')),
			left: Number(good.getAttribute('left')),
			count: Number(good.querySelector('.counter input').value),
			limit: good.getAttribute('limit'),
		}
		arrayGoods.set(good, obj)
	})
	changeValuesInFinalSection();
	countNumberOfGoodsAndCost();
	changeCountInIconCart();
	changeDeliveryWayIcons();
	highlightSigns();
}
countAmount();

let shoppingCheckbox = document.querySelectorAll(".shopping-cart-first input");
let inputOfGoods = document.querySelectorAll(".shopping-cart ul>li.shopping-cart-product .counter input");
let chooseAll = document.querySelector('.on-hand-goods input');

let counterMinus = document.querySelectorAll('.counter div:first-child');
let counterPlus = document.querySelectorAll('.counter div:last-child');

counterMinus.forEach((el) => {
	el.addEventListener("click", () => {
		let good = el.closest('li.shopping-cart-product');
		let input = el.nextElementSibling.querySelector('input');
		if (input.value > 1) {
			input.value = input.value - 1;
			countAmount();
		}
	})
})

counterPlus.forEach((el) => {
	el.addEventListener("click", () => {
		let good = el.closest('li.shopping-cart-product');
		let left = arrayGoods.get(good).left;
		let input = el.previousElementSibling.querySelector('input');
		if (left > input.value) {
			input.value = Number(input.value) + 1;
			countAmount();
		}
	})
})



chooseAll.addEventListener("click", (e) => {
	let state = e.target.checked;
	shoppingCheckbox.forEach(el => {
		el.checked = state;
	});
	countAmount();
})

shoppingCheckbox.forEach(el => {
	el.addEventListener("change", () => {
		let stateOfarray = [...shoppingCheckbox].map(el => el.checked).every(state => state === true);
		chooseAll.checked = stateOfarray;
		countAmount();
	})
})

inputOfGoods.forEach(el => {
	el.addEventListener("input", countAmount);
})



function countForOneProduct(product) {
	let discount = product.querySelector('.shopping-cart-five div:first-child span');
	let startCost = product.querySelector('.shopping-cart-five div:last-child del');
	discount.textContent = formatString(String(Math.floor(product.getAttribute("discountprice") * product.querySelector(".counter input").value)));
	startCost.textContent = formatString(String(Math.floor(product.getAttribute("fullprice") * product.querySelector(".counter input").value))) + " сом";
}



let accordeonButton = document.querySelector('.on-hand-goods button');

accordeonButton.addEventListener("click", changeTextAccordeon);

function changeTextAccordeon() {
	let selectAll = document.querySelector(".select-all");
	let numberOfProductsAndCost = document.querySelector(".number-of-products-and-cost");
	if (accordeonButton.querySelector("img").classList.contains("rotate-180")) {
		selectAll.style.display = "none";
		numberOfProductsAndCost.style.display = "block";
	} else {
		selectAll.style.display = "block";
		numberOfProductsAndCost.style.display = "none";
	}
}

// Shopping-cart count 



function changeCountInIconCart() {
	let amount = document.querySelector('#amount');
	let amountMobile = document.querySelector('#amount-mobile');
	let length = [...document.querySelectorAll(".shopping-cart-product")].length;
	if (length > 0) {
		amount.textContent = length;
		amountMobile.textContent = length;
	} else {
		amount.style.display = "none";
		amountMobile.style.display = "none";
	}
}

// Missing goods count 


function changeCountInMssingAccordeon() {
	let count = document.querySelector(".count-missing-goods");
	let length = [...document.querySelectorAll(".missing-goods-product")].length;
	count.textContent = toCaseCount(length, ['товар', 'товара', 'товаров']);
}

function toCaseCount(num, arrayOfWords) {
	let cases = [2, 0, 1, 1, 1, 2];
	return num + " " + arrayOfWords[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[Math.min(num % 10, 5)]];
}

function formatString(str) {
	let arrayOfPart = [];
	for (let i = 3; i < str.length; i += 3) {
		arrayOfPart.unshift(str.substr(-i, 3));
	}
	arrayOfPart.unshift(str.substr(0, str.length - arrayOfPart.length * 3));
	return arrayOfPart.join(' ');
}



// DELIVERY WAY 



function changeDeliveryWayIcons() {
	let images = [...document.querySelectorAll(".product-item")];
	let arrayForDelete = [];
	let isTaken = false;


	for (let image of images) {
		let name = image.getAttribute("data-name");
		let product = document.querySelector(`li.shopping-cart-product[data-name="${name}"]`);
		if (!product) {
			arrayForDelete.push(image);
			continue;
		}
		let obj = arrayGoods.get(product);
		if (!obj.limit) {
			let numberOfGoods = obj.count;
			image.nextElementSibling.textContent = obj.count;
			image.nextElementSibling.style.opacity = numberOfGoods > 1 ? 1 : 0;
		} else {
			choosenNum(image, obj);
		}



	}
	function choosenNum(image, obj) {
		if (!isTaken) {
			image.nextElementSibling.textContent = (Number(obj.limit) > Number(obj.count)) ? obj.count : obj.limit;
			isTaken = true;
			return;
		}
		let diff = Number(obj.count) - Number(obj.limit);
		if (diff < 1) {
			image.parentElement.remove();
		} else {
			image.nextElementSibling.style.opacity = diff > 1 ? 1 : 0;
			image.nextElementSibling.textContent = Number(obj.count) - Number(obj.limit);
		}
	}
	arrayForDelete.forEach(el => el.parentElement.remove());
	deleteRow();
}



function deleteRow() {
	let rows = document.querySelectorAll(".delivery-way-day");

	rows.forEach(row => {
		if (!row.querySelector('img')) {
			let elem1 = row.parentElement;
			let elem2 = elem1.previousElementSibling;
			elem1.remove();
			elem2.remove();
		}
	})
}


// Highlight signs

function highlightSigns() {
	let products = document.querySelectorAll('li.shopping-cart-product')
	console.log(products);
	products.forEach(product => {
		let count = arrayGoods.get(product).count;
		let left = arrayGoods.get(product).left;
		let minus = product.querySelector(".counter div:first-child img");
		let plus = product.querySelector(".counter div:last-child img");
		if (count === 1) {
			minus.src = "src/images/counter/minusdim.svg";
		} else {
			minus.src = "src/images/counter/minus.svg";
		}

		if (left && left === count) {
			plus.src = "src/images/counter/plusdim.svg";
		} else {
			plus.src = "src/images/counter/plus.svg";
		}
	})
}




























