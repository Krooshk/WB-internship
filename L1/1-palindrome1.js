
const testCase = "аргентина манит негра ";

function isPalindrome(str) {
	let newString = str.split('').filter(el => el !== ' ').join('');  // удаляем пробелы
	return newString === newString.split('').reverse().join(''); // разворачиваем строку и сравниваем с оригинальной
}

console.log(isPalindrome(testCase));


function isPalindrome2(str) {
	let newString = str.split('').filter(el => el !== ' ').join(''); // удаляем пробел, как и в первой реализации 
	let j = newString.length - 1;
	for (let i = 0; i < Math.floor(newString / 2); i++) {  // делаем сравнения в два раза меньше
		if (newString[i] !== newString[j]) {
			return false;
		}
		j--;
	}
	return true;
}

console.log(isPalindrome2(testCase));

