// Задача: Создать и добавить элемент с использованием шаблонов: 
// Напишите функцию, которая создает новый элемент 
// с использованием шаблонов (например, с помощью тега <template>) 
// и добавляет его в DOM

function addTemplate() {
	const newTemplate = document.createElement("template"); // создаем элемент

	newTemplate.innerHTML = "<div><strong>Всем привет!</strong>Вы прочитали важное сообщение</div >"  // Добавляем содержимое

	let elem = document.createElement('div');  // Создаем элемент, который будет вставлять в DOM
	elem.append(newTemplate.content.cloneNode(true)); // Клонируем содержимое template
	document.body.prepend(elem);  // Вставляем в конец внутри тега body
}

addTemplate(); 
