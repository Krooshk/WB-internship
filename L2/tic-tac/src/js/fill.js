export function fill_O(element, index, stateOftheGame) {
	stateOftheGame.origBoard[index] = "O";
	stateOftheGame.xTurn = true;
	element.innerText = "O";
	element.style.color = "#2b243c";
	element.disabled = true;
}

export function fill_X(element, index, stateOftheGame) {
	stateOftheGame.origBoard[index] = "X";
	stateOftheGame.xTurn = false;
	element.innerText = "X";
	element.style.color = "#BD5532";
	element.disabled = true;
}