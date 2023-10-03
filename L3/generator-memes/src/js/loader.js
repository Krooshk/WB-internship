const dropFileZone = document.querySelector(".upload-zone_dragover")
const statusText = document.getElementById("uploadForm_Status")
const sizeText = document.getElementById("uploadForm_Size")
const uploadInput = document.querySelector(".form-upload__input")

let setStatus = (text) => {
	statusText.textContent = text
}

const uploadUrl = "/unicorns";

["dragover", "drop"].forEach(function (event) {
	document.addEventListener(event, function (evt) {
		evt.preventDefault()
		return false
	})
})

dropFileZone.addEventListener("dragenter", function () {
	dropFileZone.classList.add("_active")
})

dropFileZone.addEventListener("dragleave", function () {
	dropFileZone.classList.remove("_active")
})

dropFileZone.addEventListener("drop", function () {
	dropFileZone.classList.remove("_active")
	const file = event.dataTransfer?.files[0]
	if (!file) {
		return
	}

	if (file.type.startsWith("image/")) {
		uploadInput.files = event.dataTransfer.files;
		openEditor(file);
	} else {
		setStatus("Можно загружать только изображения")
		return false
	}
})

uploadInput.addEventListener("change", (event) => {
	const file = uploadInput.files?.[0]
	console.log('file', file);
	if (file && file.type.startsWith("image/")) {
		openEditor(file);
	} else {
		setStatus("Можно загружать только изображения")
		return false
	}
})

function openEditor(file) {
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function () {
		let img = new Image();
		let setSrc = new Promise((resolve, reject) => {
			img.src = reader.result;
			resolve(img);
		})
		setSrc
			.then((img) => {
				let canvas = getCanvas();
				canvas.width = img.width;
				canvas.style.minWidth = `${img.width}px`;
				canvas.height = img.height;
				canvas.style.minHeight = `${img.height}px`;
				document.querySelector('.editor').style.display = 'flex';
				setElImg(img);
				createMeme();
				renderMeme();
				renderTxtInput();

			})
		// console.log(img.width);

		return reader;
	};

	reader.onerror = function () {
		console.log(reader.error);
	};
}