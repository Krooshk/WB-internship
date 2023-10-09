export function saveLocaleStorage(stateOftheGame) {
	localStorage.setItem('state', JSON.stringify(stateOftheGame));
}