// import { winningPattern } from './variables.js';

// export
 function minimax(newBoard, player, level = 0) {

	if (level === 0){
		
	}

	var availSpots = emptySquares(origBoard);
	
	console.log(availSpots);
	if (checkWin(newBoard, "X")) {
		return {score: -10};
	} else if (checkWin(newBoard, "O")) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
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

	if(player === "O") {
		let bestScore = -10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		let bestScore = 10000;
		for(let i = 0; i < moves.length; i++) {
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
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}


function emptySquares(origBoard) {
	return origBoard.filter(s => typeof s == undefined);
}

