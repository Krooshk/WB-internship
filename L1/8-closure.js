// Задача о замыканиях: напишите функцию, которая будет принимать массив функций 
// и возвращать новую функцию, которая вызывает каждую функцию в этом массиве и 
// возвращает массив результатов, полученных после вызова каждой функции.

const fn1 = (x) => x + 2;
const fn2 = (x) => x * 2;
const fn3 = (x) => x ** 2;

const array = [fn1, fn2, fn3];


function magicWithArray(arr){
	return function(x){
		return arr.map((el)=> el(x));
	}
}

let func = magicWithArray(array);

console.log(func(3));