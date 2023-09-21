import {Queue} from './queue.js';

let queue = new Queue;

// localStorage.clear();
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
// localStorage.setItem('11', new Array(511998));

let global = 0;
const template = document.querySelector('#tmpl');
let widget = document.querySelector('.widget');
let inner = document.querySelector('.widget div');

let isHasPosts = localStorage.getItem('isHasPosts');
if (!isHasPosts) {
	getData(global);
} else {
	for (let key in localStorage) {
		let elem
		try {
			elem = JSON.parse(localStorage.getItem(key));
		} catch (e) {
			console.log(e);
			continue;
		}
		if (elem?.type) {
			let el = fillTemplate(elem);
			inner.append(el);
		}
	}
}






function getData(offset) {
	let script = document.createElement('script');
	script.src = `https://api.vk.com/method/wall.get?owner_id=-99353432&offset=${offset}&count=5&callback=callbackFunc&access_token=cf1e5aa8cf1e5aa8cf1e5aa8c0cc0beb02ccf1ecf1e5aa8aa14b52021fe7e2d4f77ff4a&v=5.131 HTTP/1.1`;
	document.getElementsByTagName("head")[0].appendChild(script);
}

window.callbackFunc = function callbackFunc(result) {
	sizeLocalStorage();
	global += 10;
	for (let item of result.response.items) {
		let el = fillTemplate(item);
		inner.append(el);
	}
	console.log(result);
}



// queue
function fillTemplate(item) {
	if (!localStorage.getItem(item.date)) {
		while (true) {
			try {
				localStorage.setItem(item.date, JSON.stringify(item));
				break;
			} catch (e) {
				localStorage.removeItem(queue.pop());
			}
		}
	}
	queue.push(item.date);

	localStorage.setItem('isHasPosts', true)

	let elem = document.createElement('div');
	elem.append(template.content.cloneNode(true));

	let time = elem.querySelector('.time');
	let text = elem.querySelector('.text');
	let image = elem.querySelector('.image');
	let like = elem.querySelector('.like div');
	let comment = elem.querySelector('.comment div');
	let repost = elem.querySelector('.repost div');
	let view = elem.querySelector('.view div');

	time.textContent = convertTimestamp(item.date);
	text.textContent = item.text;



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



function convertTimestamp(ms) {
	const jsFormat = new Date(ms * 1000);

	let str = jsFormat.toLocaleString('en-US', {
		day: '2-digit'
	}) + " " + jsFormat.toLocaleString('en-US', {
		month: 'short'
	}) + " At " + jsFormat.toLocaleString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});

	return str;
}


widget.addEventListener('scroll', throttle(checkPosition, 250))



function checkPosition() {
	// Нам потребуется знать высоту документа и высоту экрана:
	const height = inner.offsetHeight
	const screenHeight = widget.offsetHeight
	// console.log(height, screenHeight)
	// Они могут отличаться: если на странице много контента,
	// высота документа будет больше высоты экрана (отсюда и скролл).

	// Записываем, сколько пикселей пользователь уже проскроллил:
	const scrolled = widget.scrollTop
	// console.log(scrolled)
	// Обозначим порог, по приближении к которому
	// будем вызывать какое-то действие.
	// В нашем случае — четверть экрана до конца страницы:
	const threshold = height - screenHeight / 4

	// Отслеживаем, где находится низ экрана относительно страницы:
	const position = scrolled + screenHeight

	if (position >= threshold) {
		getData(global);
		// console.log('qwetyt');
		// Если мы пересекли полосу-порог, вызываем нужное действие.
	}
}


function throttle(callee, timeout) {
	let timer = null

	return function perform(...args) {
		if (timer) return

		timer = setTimeout(() => {
			callee(...args)

			clearTimeout(timer)
			timer = null
		}, timeout)
	}
}


function sizeLocalStorage() {
	let localStorageSize = function () {
		let _lsTotal = 0, _xLen, _x;
		for (_x in localStorage) {
			if (!localStorage.hasOwnProperty(_x)) continue;
			_xLen = ((localStorage[_x].length + _x.length) * 2);
			_lsTotal += _xLen;
		}
		return (_lsTotal / 1024).toFixed(2);
	}

	console.log(`size: ${localStorageSize()}kb`)

}



