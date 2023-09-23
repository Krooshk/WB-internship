
export function sizeLocalStorage() {
	let localStorageSize = function () {
		let _lsTotal = 0, _xLen, _x;
		for (_x in localStorage) { //проходимся ключам,которые содержатся в local storage
			if (!localStorage.hasOwnProperty(_x)) continue; //Если это не принадлежит localStorage, а найдено в цепочке прототипов, то переходим на следующую итерацию
			_xLen = ((localStorage[_x].length + _x.length) * 2); // вычисляем длину ---> длина ключа + длина содержимого, умножаем на два, так как UTF-16 
			_lsTotal += _xLen; // суммируем 
		}
		return (_lsTotal / 1024).toFixed(2); // делим на 1024, чтобы получить значение в кб, оставляем только 2 знака после запятой
	}

	console.log(`size: ${localStorageSize()}kb / 10240kb`)
}



