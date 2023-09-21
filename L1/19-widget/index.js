


function getData(offset) {
	let script = document.createElement('script');
	script.src = `https://api.vk.com/method/wall.get?owner_id=-99353432&offset=${offset}&count=10&callback=callbackFunc&access_token=cf1e5aa8cf1e5aa8cf1e5aa8c0cc0beb02ccf1ecf1e5aa8aa14b52021fe7e2d4f77ff4a&v=5.131 HTTP/1.1`;
	document.getElementsByTagName("head")[0].appendChild(script);


}
getData(0);
getData(5);
let widget = document.querySelector('.widget');

function callbackFunc(result) {

	for (let item of result.response.items) {
		let el = fillTemplate(item);
		widget.append(el);
	}
	console.log(result);

}

const template = document.querySelector('#tmpl');


function fillTemplate(item) {
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
	let img = document.createElement('img');

	img.src = item.attachments[0].photo.sizes.at(-1).url;
	image.appendChild(img);

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

