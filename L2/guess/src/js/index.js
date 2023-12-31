let leftEdgeValue, rightEdgeValue, secretNumber;


let range = document.querySelector('.range');
let startBtn = document.querySelector('.start');
let sentBtn = document.querySelector('.sent');
let leftEdge = document.querySelector('.left-edge');
let rightEdge = document.querySelector('.right-edge');
let leftEdgeDisplay = document.querySelector('.current-left-edge');
let rightEdgeDisplay = document.querySelector('.current-right-edge');
let fieldForAnswers = document.querySelector('.field-for-answers');
let count = document.querySelector('.count');
let restart = document.querySelector('.restart');

let countAttempt = 0;
let parity = "";

let firstHint = document.querySelector('.first-hint');
let secondHint = document.querySelector('.second-hint');

function startTheGame() {
	if ((Number(leftEdge.value) >= 1) && (Number(rightEdge.value) <= 1000) && (Number(leftEdge.value) < Number(rightEdge.value))) {
		leftEdgeValue = Number(leftEdge.value);
		rightEdgeValue = Number(rightEdge.value);
		leftEdgeDisplay.textContent = 'Левая граница -' + leftEdgeValue;
		rightEdgeDisplay.textContent = 'Правая граница -' + rightEdgeValue;
		range.classList.add('unactive');
		secretNumber = Math.floor(Math.random() * (rightEdgeValue - leftEdgeValue + 1)) + leftEdgeValue;
		parity = (secretNumber % 2) === 0 ? "четное" : "нечетное";

	} else {
		alert('Проверьте значения (Возможный диапазон: 1 - 1000)');
	}
}

function checkAnswer() {
	countAttempt++;
	count.textContent = countAttempt;
	checkEveryThirdAttempt();
	let num = fieldForAnswers.value;
	if ((num < leftEdgeValue) || (num > rightEdgeValue)) {
		firstHint.textContent = 'Посмотрите на диапазон';
		return;
	}
	if (num > secretNumber) {
		firstHint.textContent = 'Число меньше';
		return;
	}
	if (num < secretNumber) {
		firstHint.textContent = 'Число больше';
		return;
	}
	firstHint.textContent = 'Вы угадали';
}

function checkEveryThirdAttempt() {
	if ((countAttempt > 0) && ((countAttempt % 3) === 0)) {
		secondHint.textContent = `Число ${parity}`;
	} else {
		secondHint.textContent = '';
	}

}

function restartFn() {
	range.classList.remove('unactive');
	countAttempt = 0;
	leftEdgeValue = null;
	rightEdgeValue = null;
	secretNumber = null;
	parity = "";
	let inputs = [...document.querySelectorAll('input')];
	inputs.forEach(input => input.value = "");
	count.textContent = 0;
	leftEdgeDisplay.textContent = "";
	rightEdgeDisplay.textContent = "";
}

startBtn.addEventListener('click', startTheGame);
sentBtn.addEventListener('click', checkAnswer);
restart.addEventListener('click', restartFn);

