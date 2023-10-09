import { winningPattern, btnRef, restartBtn, wrapper, btnMode, modeBlock, btnGameWithFriend, btnGameWithComp, startPage, home } from './variables.js';
import { checkWin } from './checkWin.js'
import { showPlayground } from './showPlayground.js'
import { fill_O, fill_X } from './fill.js'
import { enableButtons, disableButtons, drawFunction } from './workWithButtons.js'
import { saveLocaleStorage } from './saveLocalStorage.js'

let stateOftheGame = {
	isStartPage: true,
	isOpponentComp: false,
	xTurn: true,
	count: 0,
	origBoard: Array.from(Array(9).keys()),
	isEasyMode: true,
}

const winChecker = () => {
	saveLocaleStorage(stateOftheGame);
	for (let i of winningPattern) {
		let [element1, element2, element3] = [
			btnRef[i[0]].innerText,
			btnRef[i[1]].innerText,
			btnRef[i[2]].innerText,
		];

		if (element1 != "" && (element2 != "") & (element3 != "")) {
			if (element1 == element2 && element2 == element3) {
				winFunction(i, element1);
				return true;
			}
		}
	}
	return false;
};

const winFunction = (pattern, element1) => {
	disableButtons(btnRef);
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
		showPlayground(true, stateOftheGame);
		if (stateOftheGame.isOpponentComp) {
			modeBlock.classList.add('active');
		} else {
			modeBlock.classList.remove('active');
		}
	} else {
		showPlayground(false, stateOftheGame);
	}
	let countOfElements = 0;
	stateOftheGame.origBoard.forEach((el, index) => {
		if (el === "X") {
			fill_X(btns[index], index, stateOftheGame);
			countOfElements++;
		}
		if (el === "O") {
			fill_O(btns[index], index, stateOftheGame);
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
	enableButtons(btnRef);
	saveLocaleStorage(stateOftheGame);
}

btnRef.forEach((btn) => {
	btn.addEventListener("click", () => {
		if (stateOftheGame.xTurn) {
			fill_X(btn, Number(btn.id), stateOftheGame);
		} else {
			fill_O(btn, Number(btn.id), stateOftheGame);
		}
		stateOftheGame.count += 1;
		let isWin = winChecker();
		let hasFreeSquares = stateOftheGame.count < 9;

		if (!hasFreeSquares) {
			document.body.style.pointerEvents = "auto";
			if (!isWin) {
				drawFunction(btnRef);
			}
		}

		if (hasFreeSquares && stateOftheGame.isOpponentComp && !isWin) {
			launchComputer();
		}

	});
});


restartBtn.addEventListener("click", resetToZero);

btnGameWithFriend.addEventListener("click", () => {
	showPlayground(true, stateOftheGame);
	stateOftheGame.isOpponentComp = false;
	stateOftheGame.isStartPage = false;
	saveLocaleStorage(stateOftheGame);
	resetToZero();
})

btnGameWithComp.addEventListener("click", () => {
	showPlayground(true, stateOftheGame);
	stateOftheGame.isOpponentComp = true;
	stateOftheGame.isStartPage = false;
	saveLocaleStorage(stateOftheGame);
	modeBlock.classList.add('active');
	resetToZero();
})

home.addEventListener("click", () => {
	showPlayground(false, stateOftheGame);
	stateOftheGame.isStartPage = true;
	stateOftheGame.isOpponentComp = false;
	saveLocaleStorage(stateOftheGame);
	modeBlock.classList.remove('active');
})

btnMode.addEventListener("change", (e) => {
	stateOftheGame.isEasyMode = e.target.checked;
	saveLocaleStorage(stateOftheGame);
})


function randomStepComputer(btns) {
	if (btns.length === 0) {
		return;
	}

	// console.log(minimax(origBoard, 'O'));

	if (!btnMode.checked) {
		let index = minimax(stateOftheGame.origBoard, 'O').index;
		let element = btns[index];
		fill_O(element, index, stateOftheGame);
	} else {
		btns = btns.filter((el) => el.disabled === false);
		let randomNum = Math.floor(Math.random() * btns.length);
		let element = btns[randomNum];
		fill_O(element, Number(element.id), stateOftheGame);
	}

	stateOftheGame.count += 1;
	if (stateOftheGame.count == 9) {
		document.body.style.pointerEvents = "auto";
		let isWinOnLastStep = winFunction();
		if (!isWinOnLastStep) {
			drawFunction(btnRef);
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


function minimax(newBoard, player) {

	var availSpots = emptySquares(stateOftheGame.origBoard);
	if (checkWin(newBoard, "X", winningPattern)) {
		return { score: -10 };
	} else if (checkWin(newBoard, "O", winningPattern)) {
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

function emptySquares(origBoard) {
	return origBoard.filter(s => typeof s === 'number');
}


