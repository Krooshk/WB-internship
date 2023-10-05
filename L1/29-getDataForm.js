// Задача: Взаимодействие с формами: Напишите функцию, которая получает данные 
// из формы на веб-странице и выполняет определенные 
// действия с этими данными, например, отправляет 
// их на сервер или отображает всплывающее окно с результатами.


// Ниже код, который я написал для задания L0, тут есть дополнительные функции, но я решил оставить, чтобы было удобно посмотреть для контекста

let PlaceAnOrderBtn = document.querySelector('.section-final-button button'); // Получаем элемент "кнопка"

PlaceAnOrderBtn.addEventListener("click", () => { // навешиваем событие
	let form = document.querySelector('form');  // находим форму, я использовал поиск по тэгу, так как у меня одна форма на страницу, в других случаях лучше по id
	(e) => e.preventDefault()  // Предотвращаем перезагрузку страницы
	let data = getFormValue(form); // функция, которая получает данные из формы на веб-странице !!! которая требовалась в задании 
	// см. ниже getFormValue
	function check(data) { // получаем мэп и валидируем каждый инпут
		let result = [...data].map(([el, value]) => checkInput(el, true)).every(el => el === true);
		// преобразуем Мэп к массиву используем мэп чтобы преобразовать элемент в булево значение 
		// также использую деструктуризацию [el, value], чтобы взять оттуда элемент(input) 
		// checkInput - функция, которая валидирует инпут, если проходит валидация, то возвращает true, иначе false
		// после прохождения map получили массив булевых значений, every возвратить true, если каждый элемент будет true
		// проще говоря если все инпуты валидны возвращаем true, если хотя бы один невалиден, то false
		return result
	}

	let resultOfCheck = check(data);

	if (resultOfCheck) {
		// Если инпуты валидны выводим через alert данные, также можем их отправить на сервер
		alert('Данные отправлены:\n' + JSON.stringify(Object.assign({}, [...data.values()]))); // [...data.values()] получаем введенные данные преобразуем к массиву
		// создаем объект Object.assign({}... , создавали объект, чтобы преобразовать в итоге в строку, чтобы можно было вывести в alert 
		// JSON.stringify передаем объект и получаем строку 
		// 
	} else {
		form.parentElement.scrollIntoView(({ block: 'nearest', behavior: 'smooth' }));
		// В случае неуспеха "скользим" к форме
	}
})


function getFormValue(form) {  // получаем элемент как аргумент функции

	// Получаем все инпуты из формы
	const
		firstName = form.querySelector('[name="firstName"]'),
		secondName = form.querySelector('[name="secondName"]'),
		mail = form.querySelector('[name="mail"]'),
		tel = form.querySelector('[name="tel"]'),
		INN = form.querySelector('[name="INN"]');

	// создаем мэп где ключом будет элемент, а значением введенные пользователем данные
	const data = new Map([
		[firstName, firstName.value],
		[secondName, secondName.value],
		[mail, mail.value],
		[tel, tel.value],
		[INN, INN.value],
	]);
	// возвращаем мэпу
	return data;
}