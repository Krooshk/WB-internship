let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let wrapper = document.querySelector(".wrapper");
let btnMode = document.querySelector('#button-16');
let modeBlock = document.querySelector('.mode');


//Winning Pattern Array
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



let isOpponentComp = false;
let xTurn = true;
let count = 0;


const enableButtons = () => {
	btnRef.forEach((element) => {
		element.innerText = "";
		element.disabled = false;
	});
	popupRef.classList.add("hide");
};

const winFunction = (letter) => {
	resetToZero();
	popupRef.classList.remove("hide");
	if (letter == "X") {
		msgRef.innerHTML = "'X' Победил";
	} else {
		msgRef.innerHTML = "'O' Победил";
	}
};

const drawFunction = () => {
	resetToZero();
	popupRef.classList.remove("hide");
	msgRef.innerHTML = "Ничья";
};

function resetToZero() {
	document.body.style.pointerEvents = "auto";
	count = 0;
	enableButtons();
	xTurn = true;
}

newgameBtn.addEventListener("click", resetToZero);
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
				winFunction(element1);
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
		//Check for win on every click
		if ((count < 9) && isOpponentComp) {
			document.body.style.pointerEvents = "none";
			document.body.disabled = true;
			setTimeout(() => {
				if (!xTurn) {
					stepComputer();
				}
				document.body.style.pointerEvents = "auto";
			}, 700);
		}


		winChecker();
	});
});
//Enable Buttons and disable popup on page load
window.onload = enableButtons;

let btnGameWithFriend = document.querySelector('.btn-game-with-friend');
let btnGameWithComp = document.querySelector('.btn-game-with-comp');
let startPage = document.querySelector('.start-page');

btnGameWithFriend.addEventListener("click", () => {
	isOpponentComp = false;;
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


function stepComputer() {
	let btns = [...document.querySelectorAll('.button-option')];
	btns = btns.filter((el) => el.disabled === false);
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



