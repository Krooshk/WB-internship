import { createTrackItem } from '../js/createTrackItem.js';
import { getMinutes } from '../js/getMinutes.js';
import { playToPause, pauseToPlay } from '../js/playAndPause.js';
import { listAudio } from '../js/listAudio.js';
import { mix } from '../js/mix.js'

localStorage.setItem('list', JSON.stringify(listAudio));

let wavesurfer = WaveSurfer.create({
	container: "#wave",
	waveColor: "#cdedff",
	progressColor: "#1AAFFF",
	height: 48,
	scrollParent: false,
	dragToSeek: true,
});

let previousBtn = document.querySelector('.btn-previous');
previousBtn.addEventListener('click', previous);
let toggleAudioBtn = document.querySelector('.btn-toggleAudio');
toggleAudioBtn.addEventListener('click', toggleAudio);
let nextBtn = document.querySelector('.btn-next');
nextBtn.addEventListener('click', next);
let toggleMuteBtn = document.querySelector('.btn-toggleMute');
toggleMuteBtn.addEventListener('click', toggleMute);
let inputRange = document.querySelector('input[type="range"]');
let volume = inputRange.value;

let duration = document.getElementsByClassName('duration')[0];
let timer = document.getElementsByClassName('timer')[0];
let playListItems = document.querySelectorAll(".playlist-track-ctn");
let repeat = document.querySelector('.repeat');
let shuffle = document.querySelector('.shuffle');


let isShuffle = false;
let isRepeat = false;
let indexAudio = 0;
let shuffledList = {};

for (let i = 0; i < listAudio.length; i++) {
	createTrackItem(i, listAudio[i].name, listAudio[i].duration);
}

playListItems = document.querySelectorAll(".playlist-track-ctn");

function loadNewTrack(index) {
	let promise = new Promise((resolve, reject) => {
		resolve(wavesurfer.load(listAudio[index].file))
	})
	promise.then(toggleAudio);
	document.querySelector('.title').innerHTML = listAudio[index].name
	updateStylePlaylist(index, indexAudio);
	indexAudio = index;
}

function toggleAudio() {
	if (!wavesurfer.isPlaying()) {
		wavesurfer.play();
		document.querySelector('#icon-play').style.display = 'none';
		document.querySelector('#icon-pause').style.display = 'block';
		document.querySelector('#ptc-' + indexAudio).classList.add("active-track");
		playToPause(indexAudio);
	} else {
		document.querySelector('#icon-play').style.display = 'block';
		document.querySelector('#icon-pause').style.display = 'none';
		pauseToPlay(indexAudio);
		wavesurfer.pause();
	}
}

for (let i = 0; i < playListItems.length; i++) {
	playListItems[i].addEventListener("click", getClickedElement.bind(this));
}

function getClickedElement(event) {
	for (let i = 0; i < playListItems.length; i++) {
		if (playListItems[i] == event.target) {
			let clickedIndex = event.target.getAttribute("data-index");
			if (clickedIndex == indexAudio) {
				console.log('here');
				toggleAudio();
			} else {
				loadNewTrack(clickedIndex);
			}
		}
	}
}

document.querySelector('.title').innerHTML = listAudio[indexAudio].name;
wavesurfer.load(listAudio[indexAudio].file);

function updateStylePlaylist(newIndex, oldIndex) {
	pauseToPlay(oldIndex);
	document.querySelector('#ptc-' + oldIndex).classList.remove("active-track");
	playToPause(newIndex);
	document.querySelector('#ptc-' + newIndex).classList.add("active-track");
}

function toggleMute() {
	let volUp = document.querySelector('#icon-vol-up');
	let volMute = document.querySelector('#icon-vol-mute');
	if (wavesurfer.getMuted() == false) {
		mute(volUp, volMute);
		inputRange.value = 0;
	} else {
		sound(volUp, volMute);
		inputRange.value = volume;
	}
}

function mute(volUp, volMute) {
	wavesurfer.setMuted(true);
	volUp.style.display = "none"
	volMute.style.display = "block"
}

function sound(volUp, volMute) {
	wavesurfer.setMuted(false);
	wavesurfer.setVolume(volume / 20);
	volMute.style.display = "none"
	volUp.style.display = "block"
}

function next() {
	let oldIndex = indexAudio;
	if (isShuffle) {
		updateStylePlaylist(shuffledList[indexAudio].next, oldIndex)
		loadNewTrack(shuffledList[indexAudio].next);
	} else {
		if (indexAudio < listAudio.length - 1) {
			indexAudio++;
		} else {
			indexAudio = 0;
		}
		updateStylePlaylist(indexAudio, oldIndex)
		loadNewTrack(indexAudio);
	}
}

function previous() {
	let oldIndex = indexAudio;
	if (isShuffle) {
		updateStylePlaylist(shuffledList[indexAudio].prev, oldIndex)
		loadNewTrack(shuffledList[indexAudio].prev);
	} else {
		if (indexAudio > 0) {
			indexAudio--;
		} else {
			indexAudio = listAudio.length - 1;
		}
		updateStylePlaylist(indexAudio, oldIndex)
		loadNewTrack(indexAudio);
	}
}

let inputFile = document.querySelector('input[type="file"]');
inputFile.addEventListener('change', (e) => {
	let blob = window.URL || window.webkitURL;
	if (!blob) {
		console.log('Your browser does not support Blob URLs :(');
		return;
	}
	let file = e.target.files[0];
	let fileURL = blob.createObjectURL(file);
	let newSong = new Audio();
	newSong.src = fileURL;

	newSong.onloadedmetadata = function () {
		let obj = {
			name: `${file.name}`,
			file: `${fileURL}`,
		}
		listAudio.push(obj);
		shuffledList = mix(shuffledList, listAudio);
		let index = listAudio.length - 1;
		obj.duration = getMinutes(newSong.duration);
		createTrackItem(index, listAudio[index].name, listAudio[index].duration);
		playListItems = document.querySelectorAll(".playlist-track-ctn");
		playListItems[index].addEventListener("click", getClickedElement.bind(this));
	};
})

inputRange.addEventListener("change", (e) => {
	let volUp = document.querySelector('#icon-vol-up');
	let volMute = document.querySelector('#icon-vol-mute');
	volume = e.target.value;
	if (volume === '0') {
		mute(volUp, volMute);
	} else {
		wavesurfer.setVolume(volume / 20);
		sound(volUp, volMute);
	}

})

wavesurfer.on("ready", function (e) {
	duration.textContent = getMinutes(wavesurfer.getDuration());
});

wavesurfer.on("audioprocess", function (e) {
	timer.textContent = getMinutes(wavesurfer.getCurrentTime());
});

wavesurfer.on("seek", function (e) {
	timer.textContent = getMinutes(wavesurfer.getCurrentTime());
});

wavesurfer.on("finish", () => {
	if (isRepeat) {
		wavesurfer.play();
	} else {
		next();
	}
});

repeat.addEventListener('click', () => {
	let img = repeat.querySelector('img');
	isRepeat = !isRepeat;
	if (isRepeat) {
		img.src = "../src/assets/img/svg/repeat.svg";
	} else {
		img.src = "../src/assets/img/svg/repeat-unactive.svg";
	}
});

shuffle.addEventListener('click', () => {
	let img = shuffle.querySelector('img');
	isShuffle = !isShuffle;
	if (isShuffle) {
		shuffledList = mix(shuffledList, listAudio);
		img.src = "../src/assets/img/svg/shuffle.svg";
	} else {
		img.src = "../src/assets/img/svg/shuffle-unactive.svg";
	}
});