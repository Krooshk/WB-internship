export function createTrackItem(index, name, duration) {
	let trackItem = document.createElement('div');
	trackItem.setAttribute("class", "playlist-track-ctn");
	trackItem.setAttribute("id", "ptc-" + index);
	trackItem.setAttribute("data-index", index);
	document.querySelector(".playlist-ctn").appendChild(trackItem);

	let playBtnItem = document.createElement('div');
	playBtnItem.setAttribute("class", "playlist-btn-play");
	playBtnItem.setAttribute("id", "pbp-" + index);
	document.querySelector("#ptc-" + index).appendChild(playBtnItem);

	let btnImg = document.createElement('img');
	btnImg.src = '../src/assets/img/svg/play.svg';
	btnImg.setAttribute("class", "fas fa-play");
	btnImg.setAttribute("height", "40");
	btnImg.setAttribute("width", "40");
	btnImg.setAttribute("id", "p-img-" + index);
	document.querySelector("#pbp-" + index).appendChild(btnImg);

	let trackInfoItem = document.createElement('div');
	trackInfoItem.setAttribute("class", "playlist-info-track");
	trackInfoItem.innerHTML = name
	document.querySelector("#ptc-" + index).appendChild(trackInfoItem);

	let trackDurationItem = document.createElement('div');
	trackDurationItem.setAttribute("class", "playlist-duration");
	trackDurationItem.innerHTML = duration
	document.querySelector("#ptc-" + index).appendChild(trackDurationItem);
}