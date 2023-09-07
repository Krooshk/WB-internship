// Задача о странных числах:
//  Напишите функцию, которая принимает число и возвращает true,
//   если это число является странным, и false в противном случае. 
//   Странным числом считается число, которое равно сумме всех своих делителей, кроме самого себя.

function strange(num) {
	let sum = 0;

	for (let i = 1; i < num; i ++) {  // go from 1 to (num -1) and check is this number a divisor
		if (num % i === 0) {
			sum += i; // if this i is divisor then add value to the sum
		}
	}

	return num === sum; // return comparing the amount with the original number 

}

console.log(strange(3)) //false
console.log(strange(6)) // true
