// import  randomStepComputer  from './randomStepComputer.js';
// import { minimax } from './minimax.js';
import { winningPattern } from './variables.js';

let btnRef = document.querySelectorAll(".button-option");
let restartBtn = document.getElementById("restart");
let wrapper = document.querySelector(".wrapper");
let btnMode = document.querySelector('#button-16 input');
let modeBlock = document.querySelector('.mode');
let btnGameWithFriend = document.querySelector('.btn-game-with-friend');
let btnGameWithComp = document.querySelector('.btn-game-with-comp');
let startPage = document.querySelector('.start-page');


let stateOftheGame = {
	isStartPage: true,
	isOpponentComp: false,
	xTurn: true,
	count: 0,
	origBoard: Array.from(Array(9).keys()),
	isEasyMode: true,
}


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

const drawFunction = () => {
	[...btnRef].forEach(el => el.style.backgroundColor = '#31643e80')
};

const winChecker = () => {
	saveLocaleStorage();
	for (let i of winningPattern) {
		let [element1, element2, element3] = [
			btnRef[i[0]].innerText,
			btnRef[i[1]].innerText,
			btnRef[i[2]].innerText,
		];

		if (element1 != "" && (element2 != "") & (element3 != "")) {
			if (element1 == element2 && element2 == element3) {
				// console.log(i, element1);
				winFunction(i, element1);
				return true;
			}
		}
	}
	return false;
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


if (localStorage.getItem('state')) {
	let btns = [...btnRef];
	stateOftheGame = JSON.parse(localStorage.getItem('state'));
	btnMode.checked = stateOftheGame.isEasyMode;
	console.log(stateOftheGame)
	if (!stateOftheGame.isStartPage) {
		showPlayground(true);
		if (stateOftheGame.isOpponentComp) {
			modeBlock.classList.add('active');
		} else {
			modeBlock.classList.remove('active');
		}
	} else {
		showPlayground(false);
	}
	let countOfElements = 0;
	stateOftheGame.origBoard.forEach((el, index) => {
		if (el === "X") {
			fill_X(btns[index], index);
			countOfElements++;
		}
		if (el === "O") {
			fill_O(btns[index], index);
			countOfElements++;
		}
	})
	stateOftheGame.xTurn = countOfElements % 2 === 0 ? true : false;
	winChecker();

}



function resetToZero() {
	document.body.style.pointerEvents = "auto";
	stateOftheGame.count = 0;
	stateOftheGame.origBoard = Array.from(Array(9).keys());
	stateOftheGame.xTurn = true;
	enableButtons();
	saveLocaleStorage();

}

restartBtn.addEventListener("click", resetToZero);



btnRef.forEach((btn) => {
	btn.addEventListener("click", () => {
		if (stateOftheGame.xTurn) {
			fill_X(btn, Number(btn.id));
		} else {
			fill_O(btn, Number(btn.id));
		}
		stateOftheGame.count += 1;
		// console.log(origBoard);
		let isWin = winChecker();
		let hasFreeSquares = stateOftheGame.count < 9;

		if (!hasFreeSquares) {
			document.body.style.pointerEvents = "auto";
			if (!isWin) {
				drawFunction();
			}
		}

		if (hasFreeSquares && stateOftheGame.isOpponentComp && !isWin) {
			launchComputer();
		}

	});
});




btnGameWithFriend.addEventListener("click", () => {
	showPlayground(true);
	stateOftheGame.isOpponentComp = false;
	stateOftheGame.isStartPage = false;
	saveLocaleStorage();
	resetToZero();
})

btnGameWithComp.addEventListener("click", () => {
	showPlayground(true);
	stateOftheGame.isOpponentComp = true;
	stateOftheGame.isStartPage = false;
	saveLocaleStorage();
	modeBlock.classList.add('active');
	resetToZero();
})

let home = document.querySelector('.home');
home.addEventListener("click", () => {
	showPlayground(false);
	stateOftheGame.isStartPage = true;
	stateOftheGame.isOpponentComp = false;
	saveLocaleStorage();
	modeBlock.classList.remove('active');
})
console.log(btnMode.checked);

btnMode.addEventListener("change", (e) => {
	stateOftheGame.isEasyMode = e.target.checked;
	saveLocaleStorage();
})


function randomStepComputer(btns) {
	if (btns.length === 0) {
		return;
	}

	// console.log(minimax(origBoard, 'O'));

	if (!btnMode.checked) {
		let index = minimax(stateOftheGame.origBoard, 'O').index;
		let element = btns[index];
		fill_O(element, index);
	} else {
		btns = btns.filter((el) => el.disabled === false);
		let randomNum = Math.floor(Math.random() * btns.length);
		let element = btns[randomNum];
		fill_O(element, Number(element.id));
	}

	stateOftheGame.count += 1;
	if (stateOftheGame.count == 9) {
		document.body.style.pointerEvents = "auto";
		let isWinOnLastStep = winFunction();
		if (!isWinOnLastStep) {
			drawFunction();
		}
	}
	winChecker();
}

function launchComputer() {
	document.body.style.pointerEvents = "none";
	document.body.disabled = true;
	setTimeout(() => {
		if (!stateOftheGame.xTurn) {
			let btns = [...document.querySelectorAll('.button-option')];
			randomStepComputer(btns);
		}
		document.body.style.pointerEvents = "auto";
	}, 700);
}

function fill_O(element, index) {
	stateOftheGame.origBoard[index] = "O";
	stateOftheGame.xTurn = true;
	console.log(stateOftheGame.xTurn);
	element.innerText = "O";
	element.style.color = "#2b243c";
	element.disabled = true;
}

function fill_X(element, index) {
	stateOftheGame.origBoard[index] = "X";
	stateOftheGame.xTurn = false;
	element.innerText = "X";
	element.style.color = "#BD5532";
	element.disabled = true;
}

function showPlayground(flag) {
	if (flag) {
		startPage.style.display = "none";
		wrapper.style.display = "block";
		stateOftheGame.isStartPage = false;
	} else {
		stateOftheGame.isStartPage = true;
		startPage.style.display = "flex";
		wrapper.style.display = "none";
	}
}

function minimax(newBoard, player) {

	var availSpots = emptySquares(stateOftheGame.origBoard);
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

function saveLocaleStorage() {
	localStorage.setItem('state', JSON.stringify(stateOftheGame));
}

