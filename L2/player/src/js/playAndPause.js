export function playToPause(index) {
	let ele = document.querySelector('#p-img-' + index)
	ele.classList.remove("fa-play");
	ele.classList.add("fa-pause");
	ele.src = '../src/assets/img/svg/pause.svg'
}

export function pauseToPlay(index) {
	let ele = document.querySelector('#p-img-' + index)
	ele.classList.remove("fa-pause");
	ele.classList.add("fa-play");
	ele.src = '../src/assets/img/svg/play.svg'
}