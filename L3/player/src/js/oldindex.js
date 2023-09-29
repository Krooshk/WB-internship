

let wavesurfer = WaveSurfer.create({
    container: "#wave",
    waveColor: "#cdedff",
    progressColor: "#1AAFFF",
    height: 48,
    scrollParent: false
});

// //load audio file



// //load audio duration on load
// wavesurfer.on("ready", function (e) {
//     duration.textContent = timeCalculator(wavesurfer.getDuration());
// });

// //get updated current time on play
// wavesurfer.on("audioprocess", function (e) {
//     current.textContent = timeCalculator(wavesurfer.getCurrentTime());
// });

// //change play button to pause on plying
// wavesurfer.on("play", function (e) {
//     playPause.classList.remove("fi-rr-play");
//     playPause.classList.add("fi-rr-pause");
// });

// //change pause button to play on pause
// wavesurfer.on("pause", function (e) {
//     playPause.classList.add("fi-rr-play");
//     playPause.classList.remove("fi-rr-pause");
// });

// //update current time on seek
// wavesurfer.on("seek", function (e) {
//     current.textContent = timeCalculator(wavesurfer.getCurrentTime());
// });


function createTrackItem(index, name, duration) {
	var trackItem = document.createElement('div');
	trackItem.setAttribute("class", "playlist-track-ctn");
	trackItem.setAttribute("id", "ptc-" + index);
	trackItem.setAttribute("data-index", index);
	document.querySelector(".playlist-ctn").appendChild(trackItem);

	var playBtnItem = document.createElement('div');
	playBtnItem.setAttribute("class", "playlist-btn-play");
	playBtnItem.setAttribute("id", "pbp-" + index);
	document.querySelector("#ptc-" + index).appendChild(playBtnItem);

	var btnImg = document.createElement('i');
	btnImg.setAttribute("class", "fas fa-play");
	btnImg.setAttribute("height", "40");
	btnImg.setAttribute("width", "40");
	btnImg.setAttribute("id", "p-img-" + index);
	document.querySelector("#pbp-" + index).appendChild(btnImg);

	var trackInfoItem = document.createElement('div');
	trackInfoItem.setAttribute("class", "playlist-info-track");
	trackInfoItem.innerHTML = name
	document.querySelector("#ptc-" + index).appendChild(trackInfoItem);

	var trackDurationItem = document.createElement('div');
	trackDurationItem.setAttribute("class", "playlist-duration");
	trackDurationItem.innerHTML = duration
	document.querySelector("#ptc-" + index).appendChild(trackDurationItem);
}


// test MP3 files from : https://file-examples.com/index.php/sample-audio-files/sample-mp3-download/
var listAudio = [
	{
		name: "Aqua Caelestis",
		file: "../src/assets/sounds/AquaCaelestis.mp3",
		duration: "0:15"
	},
	{
		name: "Ennio Morricone",
		file: "../src/assets/sounds/EnnioMorricone.mp3",
		duration: "00:15"
	},
	{
		name: "River Flows In You",
		file: "../src/assets/sounds/RiverFlowsInYou.mp3",
		duration: "00:15"
	},
	{
		name: "SummerWind",
		file: "../src/assets/sounds/SummerWind.mp3",
		duration: "00:15"
	}
]

for (var i = 0; i < listAudio.length; i++) {
	createTrackItem(i, listAudio[i].name, listAudio[i].duration);
}
var indexAudio = 0;

function loadNewTrack(index) {
	var player = document.querySelector('#source-audio')
	player.src = listAudio[index].file;
	wavesurfer.load(listAudio[indexAudio].file);
	document.querySelector('.title').innerHTML = listAudio[index].name
	this.currentAudio = document.getElementById("myAudio");
	currentAudio.load()
	toggleAudio()
	updateStylePlaylist(indexAudio)
	this.indexAudio = index;
	
}

var playListItems = document.querySelectorAll(".playlist-track-ctn");

for (let i = 0; i < playListItems.length; i++) {
	playListItems[i].addEventListener("click", getClickedElement.bind(this));
}

function getClickedElement(event) {
	for (let i = 0; i < playListItems.length; i++) {
		if (playListItems[i] == event.target) {
			var clickedIndex = event.target.getAttribute("data-index")
			if (clickedIndex == this.indexAudio) { // alert('Same audio');
				this.toggleAudio()
			} else {
				loadNewTrack(clickedIndex);
			}
		}
	}
}

document.querySelector('#source-audio').src = listAudio[indexAudio].file
document.querySelector('.title').innerHTML = listAudio[indexAudio].name

var currentAudio = document.getElementById("myAudio");

currentAudio.load()
wavesurfer.load(listAudio[indexAudio].file);

currentAudio.onloadedmetadata = function () {
	document.getElementsByClassName('duration')[0].innerHTML = this.getMinutes(this.currentAudio.duration)
}.bind(this);

var interval1;

function toggleAudio() {

	if (this.currentAudio.paused) {
		document.querySelector('#icon-play').style.display = 'none';
		document.querySelector('#icon-pause').style.display = 'block';
		document.querySelector('#ptc-' + this.indexAudio).classList.add("active-track");
		// this.playToPause(this.indexAudio)
		wavesurfer.playPause();
		// this.currentAudio.play();
	} else {
		document.querySelector('#icon-play').style.display = 'block';
		document.querySelector('#icon-pause').style.display = 'none';
		// this.pauseToPlay(this.indexAudio)
		wavesurfer.playPause();
		// this.currentAudio.pause();
	}
}

function pauseAudio() {
	this.currentAudio.pause();
	clearInterval(interval1);
}

var timer = document.getElementsByClassName('timer')[0]

var barProgress = document.getElementById("myBar");


var width = 0;

function onTimeUpdate() {
	var t = this.currentAudio.currentTime
	timer.innerHTML = this.getMinutes(t);
	this.setBarProgress();
	if (this.currentAudio.ended) {
		document.querySelector('#icon-play').style.display = 'block';
		document.querySelector('#icon-pause').style.display = 'none';
		// this.pauseToPlay(this.indexAudio)
		if (this.indexAudio < listAudio.length - 1) {
			var index = parseInt(this.indexAudio) + 1
			this.loadNewTrack(index)
		}
	}
}


function setBarProgress() {
	// var progress = (this.currentAudio.currentTime / this.currentAudio.duration) * 100;
	// document.getElementById("myBar").style.width = progress + "%";
}


function getMinutes(t) {
	var min = parseInt(parseInt(t) / 60);
	var sec = parseInt(t % 60);
	if (sec < 10) {
		sec = "0" + sec
	}
	if (min < 10) {
		min = "0" + min
	}
	return min + ":" + sec
}

var progressbar = document.querySelector('#myProgress')
progressbar.addEventListener("click", seek.bind(this));


function seek(event) {
	var percent = event.offsetX / progressbar.offsetWidth;
	this.currentAudio.currentTime = percent * this.currentAudio.duration;
	barProgress.style.width = percent * 100 + "%";
}


function next() {
	if (indexAudio < listAudio.length - 1) {
		var oldIndex = this.indexAudio
		indexAudio++;
		updateStylePlaylist(oldIndex, this.indexAudio)
		loadNewTrack(this.indexAudio);
	}
}

function previous() {
	if (indexAudio > 0) {
		var oldIndex = this.indexAudio
		indexAudio--;
		updateStylePlaylist(oldIndex, this.indexAudio)
		loadNewTrack(this.indexAudio);
	}
}

function updateStylePlaylist(oldIndex, newIndex) {
	document.querySelector('#ptc-' + oldIndex).classList.remove("active-track");
	document.querySelector('#ptc-' + newIndex).classList.add("active-track");
}

// function playToPause(index) {
// 	var ele = document.querySelector('#p-img-' + index)
// 	ele.classList.remove("fa-play");
// 	ele.classList.add("fa-pause");
// 	wavesurfer.playPause();
// }

// function pauseToPlay(index) {
// 	var ele = document.querySelector('#p-img-' + index)
// 	ele.classList.remove("fa-pause");
// 	ele.classList.add("fa-play");
// 	wavesurfer.playPause();
// }

wavesurfer.on("play", function (e) {
	let ele = document.querySelector('#p-img-' + indexAudio)
	ele.classList.remove("fa-play");
	ele.classList.add("fa-pause");
});

// //change pause button to play on pause
wavesurfer.on("pause", function (e) {
    let ele = document.querySelector('#p-img-' + indexAudio)
	ele.classList.remove("fa-pause");
	ele.classList.add("fa-play");
});


function toggleMute() {
	var btnMute = document.querySelector('#toggleMute');
	var volUp = document.querySelector('#icon-vol-up');
	var volMute = document.querySelector('#icon-vol-mute');
	if (this.currentAudio.muted == false) {
		this.currentAudio.muted = true
		volUp.style.display = "none"
		volMute.style.display = "block"
	} else {
		this.currentAudio.muted = false
		volMute.style.display = "none"
		volUp.style.display = "block"
	}
}