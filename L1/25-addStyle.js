// Задача: Создать и добавить стиль для элемента:
//  Напишите функцию, которая создает новый элемент, 
//  добавляет его в DOM и устанавливает для него стиль с помощью CSS.


function addStyle(nameOfStyle, value) {
	const newDiv = document.createElement("div"); // создаем элемент
	newDiv.width = '50px';  // делаем элемент квадратным для наглядности
	newDiv.height = '50px';
	newDiv.style[nameOfStyle] = value; // устанавливаем стиль с помощью с CSS
	document.body.prepend(newDiv); // добавляем внутрь body в самое начало
}

addStyle('backgroundColor', 'red');  // устанавливаем красным цвет фона
