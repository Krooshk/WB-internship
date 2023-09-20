
var script = document.createElement('script');
script.src = "https://api.vk.com/method/wall.get?owner_id=-99353432&offset=0&count=10&callback=callbackFunc&access_token=cf1e5aa8cf1e5aa8cf1e5aa8c0cc0beb02ccf1ecf1e5aa8aa14b52021fe7e2d4f77ff4a&v=5.131 HTTP/1.1";
document.getElementsByTagName("head")[0].appendChild(script);

let widget = document.querySelector('.widget');

async function callbackFunc(result) {

	for (let item of result.response.items) {
		let el = document.createElement('p')
		el.textContent = item.text;
		widget.append(el);
	}
	console.log(result);

}

