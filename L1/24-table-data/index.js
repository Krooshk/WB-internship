const tbody = document.querySelector('tbody'); // Получаем элемент tbody
const table = document.querySelector('table'); // Получаем элемент table
const elementPerPage = 50; // Устанавливаем количество элементов на страницу
const nextBtn = document.querySelector('.right');  // Получаем элемент "кнопка" вперед 
const prevBtn = document.querySelector('.left'); // Получаем элемент "кнопка" назад 
const input = document.querySelector('input');   // Получаем элемент инпут
let currentPage = 1; // Устанавливаем текущую страницу
let pages;  // Создаем переменную, чтобы вычислить кол-во страниц
let data;  // Тут будем хранить данные полученные из запрсоа


// Пробегаем циклом и добавляем 50 строк, которые содержат по 8 колонок, и везде заполняем поле "-"
for (let i = 0; i < elementPerPage; i++) {
	let row = document.createElement('tr');
	row.innerHTML = '<td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>';
	tbody.append(row);
}

// Получаем массив этих элементов, чтобы затем заполнять их
const arrayOfRows = [...tbody.children];

// Fetch возвращает промис, обрабатываем его с помощью then
// Первый коллбэк сработает в случае fullfilled, второй в случае rejected
// Следовательно слудующие обработчики сработают, когда мы успешно получим данные
// В случае успеха преобразуем файлы в JSOn, затем присваиваем их data, вычисляем число страниц
// Затем вызываем функцию fill, котоаря наполняет таблицу

let dataFromFilltext = fetch("http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true");
dataFromFilltext.then(value => value.json(), () => alert('Ошибка запроса'))
	.then(value => {
		data = value;
		pages = value.length / elementPerPage;
	})
	.then(() => fill(data));


// Получаем массив элементов-заголовков, № туда не входит
const heading = [...document.querySelectorAll('th.column')];

// Навешиваем событие на элементы-заголовки и при клике вызываем функцию sortColumn
heading.forEach(el => {
	el.addEventListener("click", sortColumn)
})

// Эту Мапу я создал чтобы можно было сортировать по возрастанию и по убыванию, первый клик сделает по возрастанию, второй по убыванию
// Поля создал для каждого имени колонки, чтобы клики были независимы
let signOfColumn = new Map([['fname', 1], ['lname', 1], ['tel', 1], ['address', 1], ['city', 1], ['state', 1], ['zip', 1]]);

// Данная функция устанавливает значение - общее число страниц
function setLastPage() {
	let lastPage = document.querySelector('.lastPage');
	lastPage.textContent = `/ ${pages}`;
}

function sortColumn(e) {
	let nameOfColumn = e.target.classList[0];
	// Получаем имя первого класса у заголовка по которому нажали, имена класса я назвал, также как названы поля у JSOn файлов
	//  Создаем промис, так как может потребоваться время для сортировки
	let sortingData = new Promise((resolve) => {
		let sign = signOfColumn.get(nameOfColumn); // Получаем знак, чтобы отсортировать либо по возрастаннию, либо по убыванию
		signOfColumn.set(nameOfColumn, sign * (-1)); // Меня знак в Мапе для следующего нажатия
		resolve(data.sort((a, b) => { // Вызываем resolve, он вернет массив отсортированный обернутый в промис
			//Сравниваем лексиграфически все колонки, это допустимо даже для zip так как у них одинаковое количество символов
			// Также домножаем возвращаемое значение на sign, чтобы обеспечить требуемую сортировку
			if (a[nameOfColumn] > b[nameOfColumn]) {
				return sign * 1;
			}
			if (a[nameOfColumn] < b[nameOfColumn]) {
				return sign * (-1);
			} else {
				return 0;
			}
		}))
	})
	// Подписываемся на промис, так как метод сорт мутирет изначальный массив, то может передать функции fill, переменнную data
	sortingData.then(() => fill(data))
}


function fill(data) {
	let startPosition = elementPerPage * (currentPage - 1); // Вычисляем стартовую позицию в зависимости от страницы
	let currentPosition = startPosition; // Текущей позиции присваиваем startPosition
	for (let i = 0; i < elementPerPage; i++) { // Проходимся по циклу 50 раз
		let fileds = [...arrayOfRows[i].children]; // Получаем массив с полями одной строки
		let iterator = fileds[Symbol.iterator](); // Тут я решил использовать итератор, так как в полях json объекта нет номера
		// А с итератором заполнить все поля в данном случае удобнее
		iterator.next().value.textContent = currentPosition + 1; // Заполняем первую колонку строки
		for (let key in data[currentPosition]) { // Проходимся по всем значениям объекта, и с помощью итератор получаем следующие колонки
			iterator.next().value.textContent = data[currentPosition][key]; // Заполняем колонки данными
		}
		currentPosition++; // Увеличиваем номер строки
	}
}

// Эта функция просто добавляет класс со стилем, если мы достигли граничных страниц
function addStyleToArrowButton() {
	switch (currentPage) {
		case 1:
			prevBtn.classList.add('isEdge');
			break;
		case pages:
			nextBtn.classList.add('isEdge');
			break;
		default: {
			nextBtn.classList.remove('isEdge');
			prevBtn.classList.remove('isEdge');
		}
	}
}

// nextBtn и prevBtn навешиваем событие, обязательно проверяем не находимся ли на границе, 
// при переключении страницы заполняем таблицу данными
nextBtn.addEventListener("click", () => {
	if (currentPage < pages) {
		currentPage++;
		fill(data);
		input.value = currentPage;
	}
	addStyleToArrowButton();
})

prevBtn.addEventListener("click", () => {
	if (currentPage > 1) {
		currentPage--
		fill(data);
		input.value = currentPage;
	}
	addStyleToArrowButton();
})


// Также есть возможность ввести произвольный номер страницы
// Если он не выходит за границы, то переключаемся в ином случае оставляем текущее значение в value input'а
input.addEventListener("change", (e) => {
	let value = e.target.value;
	if (value > 0 && value <= pages) {
		currentPage = value;
		addStyleToArrowButton();
		fill(data, currentPage);
	} else {
		e.target.value = currentPage;
	}

})