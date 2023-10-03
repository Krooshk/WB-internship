

//Global variables and Constants
const gCanvas = document.querySelector('#meme');
const gCtx = gCanvas.getContext('2d');
var gIsMouseDown = false;
var gFeelsLikeADrag = false;
var gAsyncCheat = undefined;
var gElImg
//------------------------------------------------------------//
function renderMeme(meme = getMeme()) {
	let form = document.querySelector('#uploadFile_Loader');
	form.style.display = 'none';
	let mem = document.querySelector('#meme');
	mem.style.display = 'block';

	gCanvas.width = gElImg.width;
	gCanvas.height = gElImg.height;
	gCtx.drawImage(gElImg, 0, 0, gCanvas.width, gCanvas.height);
	meme.texts.forEach((text, idx) => {
		calculatBoundriesRect(text);
		drawText(text, idx === meme.currLineIdx);
	});
	if (meme.currLineIdx >= 0) renderTxtInput()
}
function calculatBoundriesRect(text) {
	text.width = gCtx.measureText(text.txt).width * 1.02;
	text.height = gCtx.measureText(text.txt).actualBoundingBoxAscent * 1.2;
	text.yStart = text.pos.y - text.height / 1.1;
	switch (text.align) {
		case 'right':
			text.xStart = text.pos.x - (text.width);
			break;

		case 'left':
			text.xStart = text.pos.x;
			break;

		case 'center':
			text.xStart = text.pos.x - (text.width / 2);
			break;
	}
}


function drawText(text, isFocused) {
	let { txt, size, align, fill, stroke, font, pos } = text;
	// gCtx.lineWidth = '2'
	gCtx.font = `${size}px ${font}`;
	gCtx.textAlign = align;
	calculatBoundriesRect(text);
	if (isFocused) drawFocus(text);
	gCtx.strokeStyle = stroke;
	gCtx.fillStyle = fill;
	gCtx.fillText(txt, pos.x, pos.y)
	gCtx.strokeText(txt, pos.x, pos.y)
}

function onTextAlignChange(align) {
	// var elList = document.querySelector('.text-align');
	// elList.classList.remove(`align-${gEditorSettings.align}`);//TODO:Function
	// elList.classList.add(`align-${alignClass}`); 
	setAlign(align);
	renderMeme();
}

function getCanvas() {
	return gCanvas;
}

function onTextChange(txt) {
	changeTxt(txt);
	renderMeme();
}

function onFocusPrevTxt() {
	focusPrevTxt();
	renderTxtInput();
	renderMeme();
}

function onFocusNextTxt() {
	focusNextTxt();
	renderTxtInput();
	renderMeme();
}

function changeInputValue(elInput, value) {
	elInput.value = value;
}

function renderTxtInput() {
	let meme = getMeme();
	let elInput = document.querySelector('.control input[type="text"]')
	if (meme.texts.length === 0) changeInputValue(elInput, '');
	else changeInputValue(elInput, meme.texts[meme.currLineIdx].txt);
	elInput.style.fontFamily = getEditorAttr('font');
}

function onRemoveLayer() {
	removeLayer();
	renderMeme();
	renderTxtInput()
}

function onAddText() {
	addText('');
	renderMeme();
	renderTxtInput();
}

function onFontChange(font) {
	setFont(font);
	renderMeme();
}
function drawRect({ xStart, yStart, width, height }) {
	gCtx.beginPath();
	gCtx.strokeStyle = 'black';
	gCtx.rect(xStart, yStart, width, height);
	gCtx.stroke();
	gCtx.fillStyle = 'rgba(9,9,9,0.5)';
	gCtx.fillRect(xStart, yStart, width, height);
	gCtx.closePath();
}
function drawFocus(text) {
	drawRect(text);
}

function mouseIsDown(ev) {
	gIsMouseDown = true;
	considerTextAlign(ev.offsetX, ev.offsetY);
	setTimeout(() => {
		if (gIsMouseDown) gFeelsLikeADrag = true;
	}, 200);
	renderMeme();
}
function mouseIsUp() {
	gIsMouseDown = false;
	gFeelsLikeADrag = false;
	// clearInterval(gIntervalDrag);
}
function drag(ev) {
	if (gIsMouseDown && gFeelsLikeADrag) {
		relocateText(ev.offsetX, ev.offsetY);
		renderMeme();

	}
}

function onSetFill(value) {
	setFill(value);
	renderMeme();
}

function onSetStroke(value) {
	setStroke(value);
	renderMeme();
}
function onSetSize(el) {
	setSize(el.value);
	renderMeme();
}
function renderSize() {
	document.querySelector('[name="font-size"]').value = getEditorAttr['size']
}
function toggleNav() {
	document.querySelector('nav-list').style.display = 'block'
}

function onSave(destination, type, el) {
	removeFocus();
	renderMeme();
	const meme = {};
	meme.dataURL = gCanvas.toDataURL(`image/${type}`);

	switch (destination) {
		case 'download':
			el.href = meme.dataURL;
			break;
		case 'localStorage':
		default:
			addToSavedMemes(meme);
			break;
	}
}

function setElImg(elImg) {
	gElImg = elImg;
}