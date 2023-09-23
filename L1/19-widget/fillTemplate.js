import { Queue } from './queue.js';
let queue = new Queue;
const template = document.querySelector('#tmpl');

export function fillTemplate(item) {
	// Если такого элемента нет в локалсторейдж
	if (!localStorage.getItem(item.date)) {
		while (true) { // Пытаем установить его, это получится если хватит места в хранилище
			// Цикл будет работать до тех пор, пока не освободим достаточно места
			try {
				localStorage.setItem(item.date, JSON.stringify(item));
				break;
			} catch (e) {
				// Если не поулчилось установить объект в local storage, то удаляем еще один элемент
				localStorage.removeItem(queue.pop());
			}
		}
	}
	// Каждый элемент добавляем в очередь, чтобы было удобно работать в дальнейшем при переполнении localstorage
	queue.push(item.date);

	// Если мы добавили в localstorage элемент, то установим флаг true для isHasPosts;
	localStorage.setItem('isHasPosts', true)


	// Создаем элемент на основе шаблона
	let elem = document.createElement('div');
	elem.append(template.content.cloneNode(true));
	// Получаем элементы, в которые будем заносить данные от Vk
	let time = elem.querySelector('.time');
	let text = elem.querySelector('.text');
	let image = elem.querySelector('.image');
	let like = elem.querySelector('.like div');
	let comment = elem.querySelector('.comment div');
	let repost = elem.querySelector('.repost div');
	let view = elem.querySelector('.view div');
	// convertTimestamp дополнительная функция для конвертация временной метки в нормальное отображение даты
	time.textContent = convertTimestamp(item.date);
	text.textContent = item.text;

	// Тут идет ветвление в зависимости от типа вложений в посте
	switch (item.attachments[0]?.type) {
		case 'photo':
			let img = document.createElement('img');
			let urlFromVk = item.attachments[0].photo.sizes.at(-1).url;
			img.src = urlFromVk;
			image.appendChild(img);
			break;
		case 'link':
			let link = document.createElement('a');
			let urlLinkFromVk = item.attachments[0].link.url;
			link.href = urlLinkFromVk;
			link.textContent = item.attachments[0].link.title;
			image.appendChild(link);
			break;
		case 'doc':
			let doc = document.createElement('img');
			let urlDocFromVk = item.attachments[0].doc.url;
			doc.src = urlDocFromVk;
			image.appendChild(doc);
			break;
		default:
			image.textContent = ''
	}

	like.textContent = item.likes.count;
	comment.textContent = item.comments.count;
	repost.textContent = item.reposts.count;
	view.textContent = item.views.count;

	return elem;
}

// преобразование временной метки в номральную дату
function convertTimestamp(ms) {
	const jsFormat = new Date(ms * 1000); // Умножаем на 1000, так как временная метка от Php

	let str = jsFormat.toLocaleString('en-US', {
		day: '2-digit'
	}) + " " + jsFormat.toLocaleString('en-US', {
		month: 'short'
	}) + " At " + jsFormat.toLocaleString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});

	// Преобразуем к формату "12 Apr At 9:07 PM"

	return str;
}