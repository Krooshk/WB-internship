// import  randomStepComputer  from './randomStepComputer.js';
// import { minimax } from './minimax.js';
import { winningPattern } from './variables.js';

let btnRef = document.querySelectorAll(".button-option");
let restartBtn = document.getElementById("restart");
let wrapper = document.querySelector(".wrapper");
let btnMode = document.querySelector('#button-16 input');
let modeBlock = document.querySelector('.mode');


let isOpponentComp = false;
let xTurn = true;
let count = 0;
let origBoard = Array.from(Array(9).keys());;

const enableButtons = () => {
	btnRef.forEach((element) => {
		element.innerText = "";
		element.disabled = false;
		element.style.backgroundColor = "white";
	});
};

const disableButtons = () => {
	btnRef.forEach((element) => {
		element.disabled = true;
	});
};

const winFunction = (pattern, element1) => {
	disableButtons();
	let btns = [...btnRef].filter((el, index) => {
		if (pattern.includes(index)) {
			return el;
		}
	})
	let color = element1 === "X" ? "#bd553280" : "#363b4480";
	btns.forEach(el => el.style.backgroundColor = color);

};

const drawFunction = () => {
	[...btnRef].forEach(el => el.style.backgroundColor = '#31643e80')
};

function resetToZero() {
	document.body.style.pointerEvents = "auto";
	count = 0;
	origBoard = Array.from(Array(9).keys());;
	enableButtons();
	xTurn = true;
}

restartBtn.addEventListener("click", resetToZero);

const winChecker = () => {

	for (let i of winningPattern) {
		let [element1, element2, element3] = [
			btnRef[i[0]].innerText,
			btnRef[i[1]].innerText,
			btnRef[i[2]].innerText,
		];

		if (element1 != "" && (element2 != "") & (element3 != "")) {
			if (element1 == element2 && element2 == element3) {
				console.log(i, element1);
				winFunction(i, element1);
				return true;
			}
		}
	}
	return false;
};

btnRef.forEach((element) => {
	element.addEventListener("click", () => {
		if (xTurn) {
			origBoard[Number(element.id)] = "X";
			xTurn = false;
			//Display X
			element.innerText = "X";
			element.style.color = "#BD5532";
			element.disabled = true;
		} else {
			origBoard[Number(element.id)] = "O";
			xTurn = true;
			element.innerText = "O";
			element.style.color = "#2b243c";
			element.disabled = true;
		}
		console.log(origBoard);

		let isWin = winChecker();

		count += 1;
		if (count == 9) {
			document.body.style.pointerEvents = "auto";
			if (!isWin) {
				drawFunction();
			}
		}

		if ((count < 9) && isOpponentComp && !isWin) {
			document.body.style.pointerEvents = "none";
			document.body.disabled = true;
			setTimeout(() => {
				if (!xTurn) {
					let btns = [...document.querySelectorAll('.button-option')];
					randomStepComputer(btns);
				}
				document.body.style.pointerEvents = "auto";
			}, 700);
		}

	});
});


window.onload = enableButtons;

let btnGameWithFriend = document.querySelector('.btn-game-with-friend');
let btnGameWithComp = document.querySelector('.btn-game-with-comp');
let startPage = document.querySelector('.start-page');

btnGameWithFriend.addEventListener("click", () => {
	isOpponentComp = false;
	startPage.style.display = "none";
	wrapper.style.display = "block";
	resetToZero();
})

btnGameWithComp.addEventListener("click", () => {
	isOpponentComp = true;
	startPage.style.display = "none";
	wrapper.style.display = "block";
	modeBlock.classList.add('active');
	resetToZero();
})

let home = document.querySelector('.home');
home.addEventListener("click", () => {
	startPage.style.display = "flex";
	wrapper.style.display = "none";
	modeBlock.classList.remove('active');
})


function randomStepComputer(btns) {
	if (btns.length === 0) {
		return;
	}

	// console.log(minimax(origBoard, 'O'));

	if (!btnMode.checked) {
		let index = minimax(origBoard, 'O').index;
		origBoard[index] = "O";
		console.log(index);
		let element = btns[index];
		xTurn = true;
		element.innerText = "O";
		element.style.color = "#2b243c";
		element.disabled = true;

	} else {
		btns = btns.filter((el) => el.disabled === false);
		let randomNum = Math.floor(Math.random() * btns.length);
		let element = btns[randomNum];
		origBoard[Number(element.id)] = "O";
		xTurn = true;
		element.innerText = "O";
		element.style.color = "#2b243c";
		element.disabled = true;
	}

	count += 1;
	if (count == 9) {
		document.body.style.pointerEvents = "auto";
		let isWinOnLastStep = winFunction();
		if (!isWinOnLastStep) {
			drawFunction();
		}
	}
	winChecker();
}



function minimax(newBoard, player) {

	var availSpots = emptySquares(origBoard);
	if (checkWin(newBoard, "X")) {
		return { score: -10 };
	} else if (checkWin(newBoard, "O")) {
		return { score: 10 };
	} else if (availSpots.length === 0) {
		return { score: 0 };
	}

	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == "O") {
			var result = minimax(newBoard, "X");
			move.score = result.score;
		} else {
			var result = minimax(newBoard, "O");
			move.score = result.score;
		}
		newBoard[availSpots[i]] = move.index;
		moves.push(move);
	}

	let bestMove;

	if (player === "O") {
		let bestScore = -10000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		let bestScore = 10000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];

}


function checkWin(board, player) {

	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);

	let gameWon = null;

	for (let [index, win] of winningPattern.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = { index: index, player: player };
			break;
		}
	}
	return gameWon;
}


function emptySquares(origBoard) {
	return origBoard.filter(s => typeof s === 'number');
}


