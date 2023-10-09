import {startPage, wrapper} from './variables.js';
export function showPlayground(flag, stateOftheGame) {
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