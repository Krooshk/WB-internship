export const enableButtons = (btns) => {
	[...btns].forEach((element) => {
		element.innerText = "";
		element.disabled = false;
		element.style.backgroundColor = "white";
	});
};

export const disableButtons = (btns) => {
	[...btns].forEach((element) => {
		element.disabled = true;
	});
};

export const drawFunction = (btns) => {
	[...btns].forEach(el => el.style.backgroundColor = '#31643e80')
};