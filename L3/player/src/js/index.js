let wavesurfer = WaveSurfer.create({
	container: "#wave",
	waveColor: "#cdedff",
	progressColor: "#1AAFFF",
	height: 48,
	scrollParent: false
});



function createTrackItem(index, name, duration) {
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

let listAudio = [
	{
		name: "Aqua Caelestis",
		file: "../src/assets/audio/AquaCaelestis.mp3",
		duration: "00:15"
	},
	{
		name: "Ennio Morricone",
		file: "../src/assets/audio/EnnioMorricone.mp3",
		duration: "00:15"
	},
	{
		name: "River Flows In You",
		file: "../src/assets/audio/RiverFlowsInYou.mp3",
		duration: "00:15"
	},
	{
		name: "SummerWind",
		file: "../src/assets/audio/SummerWind.mp3",
		duration: "00:15"
	},
	{
		name: "Bonus Track",
		file: "../src/assets/audio/Smeshariki.mp3",
		duration: "00:15"
	}

]

for (let i = 0; i < listAudio.length; i++) {
	createTrackItem(i, listAudio[i].name, listAudio[i].duration);
}
// let currentAudio = document.getElementById("myAudio");

let indexAudio = 0;

function loadNewTrack(index) {
	let promise = new Promise((resolve, reject) => {
		resolve(wavesurfer.load(listAudio[index].file))
	})
	promise.then(toggleAudio);
	document.querySelector('.title').innerHTML = listAudio[index].name
	// toggleAudio();
	updateStylePlaylist(index, indexAudio);
	indexAudio = index;
}

console.log(wavesurfer.isPlaying());

function toggleAudio() {
	console.log('here');
	// console.log(wavesurfer);
	// console.log(!wavesurfer.isPlaying());
	if (!wavesurfer.isPlaying()) {
		console.log('here1');
		wavesurfer.play();
		// wavesurfer.playPause();
		document.querySelector('#icon-play').style.display = 'none';
		document.querySelector('#icon-pause').style.display = 'block';
		document.querySelector('#ptc-' + indexAudio).classList.add("active-track");
		playToPause(indexAudio);
	} else {
		// console.log('here1');
		document.querySelector('#icon-play').style.display = 'block';
		document.querySelector('#icon-pause').style.display = 'none';
		pauseToPlay(indexAudio);
		wavesurfer.pause();
	}
}

let playListItems = document.querySelectorAll(".playlist-track-ctn");

for (let i = 0; i < playListItems.length; i++) {
	playListItems[i].addEventListener("click", getClickedElement.bind(this));
}

function getClickedElement(event) {
	for (let i = 0; i < playListItems.length; i++) {
		if (playListItems[i] == event.target) {
			let clickedIndex = event.target.getAttribute("data-index")
			// console.log(clickedIndex);
			if (clickedIndex == indexAudio) { // alert('Same audio');
				toggleAudio()
			} else {
				loadNewTrack(clickedIndex);
			}
		}
	}
}

// document.querySelector('#source-audio').src = listAudio[indexAudio].file
document.querySelector('.title').innerHTML = listAudio[indexAudio].name;
wavesurfer.load(listAudio[indexAudio].file);
// wavesurfer.load(listAudio[indexAudio].file);
// let currentAudio = document.getElementById("myAudio");
// currentAudio.load()



function updateStylePlaylist(newIndex, oldIndex) {
	pauseToPlay(oldIndex);
	document.querySelector('#ptc-' + oldIndex).classList.remove("active-track");
	playToPause(newIndex);
	document.querySelector('#ptc-' + newIndex).classList.add("active-track");
}


function playToPause(index) {
	let ele = document.querySelector('#p-img-' + index)
	ele.classList.remove("fa-play");
	ele.classList.add("fa-pause");
	ele.src = '../src/assets/img/svg/pause.svg'
	// wavesurfer.playPause();
}

function pauseToPlay(index) {
	let ele = document.querySelector('#p-img-' + index)
	ele.classList.remove("fa-pause");
	ele.classList.add("fa-play");
	ele.src = '../src/assets/img/svg/play.svg'
	// wavesurfer.playPause();
}


function toggleMute() {
	// var btnMute = document.querySelector('#toggleMute');
	console.log(wavesurfer.getMuted);
	var volUp = document.querySelector('#icon-vol-up');
	var volMute = document.querySelector('#icon-vol-mute');
	if (wavesurfer.getMuted() == false) {
		wavesurfer.setMuted(true);
		volUp.style.display = "none"
		volMute.style.display = "block"
	} else {
		wavesurfer.setMuted(false);
		volMute.style.display = "none"
		volUp.style.display = "block"
	}
}

function next() {
	if (indexAudio < listAudio.length - 1) {
		let oldIndex = indexAudio
		indexAudio++;
		updateStylePlaylist(indexAudio, oldIndex)
		loadNewTrack(indexAudio);
	}
}

function previous() {
	if (indexAudio > 0) {
		let oldIndex = indexAudio
		indexAudio--;
		updateStylePlaylist(indexAudio, oldIndex)
		loadNewTrack(indexAudio);
	}
}


let input = document.querySelector('input');

input.addEventListener('change', (e) => {
	var blob = window.URL || window.webkitURL;
	if (!blob) {
		console.log('Your browser does not support Blob URLs :(');
		return;
	}
	// console.log(e.target);
	// console.log(e.target.files[0]);
	let file = e.target.files[0];
	let fileURL = blob.createObjectURL(file);
	console.log(fileURL);
	let obj = {
		name: `${file.name}`,
		file: `${fileURL}`,
		duration: "00:50",
	}
	listAudio.push(obj);
	let index = listAudio.length - 1;

	createTrackItem(index, listAudio[index].name, listAudio[index].duration);
	playListItems = document.querySelectorAll(".playlist-track-ctn");
	playListItems[index].addEventListener("click", getClickedElement.bind(this));
})