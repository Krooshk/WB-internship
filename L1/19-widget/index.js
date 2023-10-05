import { fillTemplate } from './fillTemplate.js'; // Импорт функции, которая создает элемент, наполняет его и возвращает
import { sizeLocalStorage } from './20-sizeLocalStorage.js'; // Подсчитываем размер занятого хранилища
import { throttle } from './throttle.js';
// Добавляю информации на 10мб, чтобы удобнее было отлаживать и проверять
localStorage.setItem('1', new Array(511998 + 1).join('a'));
localStorage.setItem('2', new Array(511998 + 1).join('a'));
localStorage.setItem('3', new Array(511998 + 1).join('a'));
localStorage.setItem('4', new Array(511998 + 1).join('a'));
localStorage.setItem('5', new Array(511998 + 1).join('a'));
localStorage.setItem('6', new Array(511998 + 1).join('a'));
localStorage.setItem('7', new Array(511998 + 1).join('a'));
localStorage.setItem('8', new Array(511998 + 1).join('a'));
localStorage.setItem('9', new Array(511998 + 1).join('a'));
localStorage.setItem('10', new Array(511998 + 1).join('a'));
// Если елемента в хранилище нет, то эт о первый вызов и смещение равно 0
let globalOffset = localStorage.getItem("globalOffset") || 0;
let widget = document.querySelector('.widget'); // Получаем виджет
let inner = document.querySelector('.widget div'); // //Получаем его содержание, то есть ленту

let isHasPosts = localStorage.getItem('isHasPosts'); // Флаг, для проверки нужно ли вызывать getData
if (!isHasPosts) {
	getData(globalOffset);
} else { // Если есть посты в хранилище обрабатываем их
	let posts = [];
	for (let key in localStorage) { // localstorage это хэш-таблица, данные там хранятся неупорядоченно
		let elem
		try {
			elem = JSON.parse(localStorage.getItem(key)); //Пытаемся парсить объект
			// иначе переходим на следующую итерацию
		} catch (e) {
			console.log(e);
			continue;
		}
		if (elem?.type) { //если это пост из вк, то он имеет поле type и мы добавляем его в массив
			posts.push(elem)
		}
	}
	// Когда заполнили весь массив, то надо его отсортировать, посты идут по временным метка, но есть еще закрепленные посты
	posts.sort((a, b) => {
		// Если пост закрепелнный, то ставим его в начало
		if (a?.is_pinned) {
			return -1;
		}
		if (b?.is_pinned) {
			return 1;
		}
		// Если посты обычные, то сраниваем их по верменным меткам
		return b.date - a.date;
	})
	// Проходимся по массив отсортированному и вызываем с каждым элементом fillTemplate и получаем оформленный пост
	posts.forEach(elem => {
		let el = fillTemplate(elem);
		inner.append(el); // вставляем пост в DOM
	})
}





function getData(offset) { // Метод получения данных с помощью JSONp для обхождния CORS
	let script = document.createElement('script');
	script.src = `https://api.vk.com/method/wall.get?owner_id=-99353432&offset=${offset}&count=5&callback=callbackFunc&access_token=cf1e5aa8cf1e5aa8cf1e5aa8c0cc0beb02ccf1ecf1e5aa8aa14b52021fe7e2d4f77ff4a&v=5.131 HTTP/1.1`;
	document.getElementsByTagName("head")[0].appendChild(script);
}
// callbackFunc - глобальная функция, не очень хорошо так делать, 
// но если разбивать на модули и использовать JSONp, то по-другому никак
window.callbackFunc = function callbackFunc(result) {
	sizeLocalStorage(); // при каждом вызове считаем занятый объем 
	globalOffset = Number(globalOffset) + 5; // при каждом вызове добавляем смещение
	localStorage.setItem("globalOffset", globalOffset) // меняем в хранилище значение для globalOffset
	for (let item of result.response.items) { // проходимся циклом по полученным данным
		let el = fillTemplate(item); // получаем элемент, оформленный с помощью шаблона
		inner.append(el); // Вставляем в dom
	}
}


widget.addEventListener('scroll', throttle(checkPosition, 250))
// Навешиваепм событие на скролл внутри widget, в качестве колллбека передаем функцию, обернутую в декоратор throttle


function checkPosition() {
	const height = inner.offsetHeight // высота или лучше сказать длина ленты
	const screenHeight = widget.offsetHeight // фиксированная высота widget
	const scrolled = widget.scrollTop // записываем, сколько пикселей пользователь уже проскроллил:
	const threshold = height - screenHeight / 4 // Обозначим порог, по приближении к которому, четверть экрана до конца страницы:

	// Отслеживаем, где находится низ экрана относительно страницы:
	const position = scrolled + screenHeight
	if (position >= threshold) {
		getData(globalOffset);
	}
}