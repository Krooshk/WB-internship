// import  randomStepComputer  from './randomStepComputer.js';


let btnRef = document.querySelectorAll(".button-option");
let restartBtn = document.getElementById("restart");
let wrapper = document.querySelector(".wrapper");
let btnMode = document.querySelector('#button-16');
let modeBlock = document.querySelector('.mode');

let isOpponentComp = false;
let xTurn = true;
let count = 0;


let winningPattern = [
	[0, 1, 2],
	[0, 3, 6],
	[2, 5, 8],
	[6, 7, 8],
	[3, 4, 5],
	[1, 4, 7],
	[0, 4, 8],
	[2, 4, 6],
];


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
			xTurn = false;
			//Display X
			element.innerText = "X";
			element.style.color = "#BD5532";
			element.disabled = true;
		} else {
			xTurn = true;
			//Display Y
			element.innerText = "O";
			element.style.color = "#2b243c";
			element.disabled = true;
		}
		//Increment count on each click

		count += 1;
		if (count == 9) {
			document.body.style.pointerEvents = "auto";
			let isWinOnLastStep = winChecker();
			if (!isWinOnLastStep) {
				drawFunction();
			}
		}
		winChecker();
		//Check for win on every click
		if ((count < 9) && isOpponentComp) {
			document.body.style.pointerEvents = "none";
			document.body.disabled = true;
			setTimeout(() => {
				if (!xTurn) {
					let btns = [...document.querySelectorAll('.button-option')];
					randomStepComputer(btns, xTurn, count, winChecker, winFunction, drawFunction);
				}
				document.body.style.pointerEvents = "auto";
			}, 700);
		}

	});
});
//Enable Buttons and disable popup on page load
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
	btns = btns.filter((el) => el.disabled === false);
	if (btns.length === 0) {
		return;
	}
	let randomNum = Math.floor(Math.random() * btns.length);
	let element = btns[randomNum];

	xTurn = true;
	element.innerText = "O";
	element.style.color = "#2b243c";
	element.disabled = true;

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



