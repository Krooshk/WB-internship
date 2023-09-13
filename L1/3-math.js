const MathX = {

	fibonacciSeq() {
		// Число фибоначи равно сумме двух предыдущих чисел, 1 1 2 3 5 8
		let current = 1;
		let prev = 0;
		// Каждый раз мы возвращаем текущее значения и производим вычисления для последующего 

		return function () {
			const result = current; // присваиваем текущее, чтобы вернуть 
			current = prev + current; // вычисляем следующее значение 
			prev = result; // меняем предыдущее, важно оговорить что всё это работает благодаря замыканиям, так как мы возвращаем функцию
			// она уже свое отработала, но так как во внутренней функции(которую мы возвращаем) мы обращаемся к переменным current и prev 
			// то внутреняя функция имеет доступ к этим переменным и может менять значения 
			return result;
		};
	},
	
	fibonacciAll(num) {
		let fn = this.fibonacciSeq(); // в данном случае создаем независимую функцию, чтобы при каждом вызове получать следующее число Фибоначи
		let fibNum = fn();
		let res = [];

		while (fibNum <= num) {  // на предыдущем шаге вычислили число Фибоначи, проверям не больше ли оно заданного числа
			res.push(fibNum); // если нет, то добавляем в массив
			fibNum = fn(); // вычисляем следуещее число Фибоначи
		}
		return res; // Когда получили число Фибоначи больше заданного возвращаем массив
	},
	primeSeq() {
		function isPrime(i) {  //вспомогательная функция, которая проверяет является ли число простым
			for (let j = 2; j < i; j++) {
				if (i % j === 0) {
					return false;
				}
			}
			return true;
		}
		let i = 2;  //логика такая же, что мы возвращаем текущее простое число, но также вычисляем результат для последующего вызова
		return function prime() {
			const result = i; //текущее просто число
			while (true) {  // бесконечный цикл, где увеличиваем число на один и проверяем на "простоту" :D, как только узнали простое число, то выходим из цикла
				i++;
				if (isPrime(i)) {
					break;
				}
			}
			return result;
		}
	},
	primeAll(num) {
		let fn = this.primeSeq();  // Создаем независимую функцую, чтобы получать последующие простые числа, а не изначальное
		let primeNum = fn(); // вычисляем текущее простое число
		let res = [];

		while (primeNum <= num) { // проверяем не больше ли наше полученное число, чем предельное значение
			res.push(primeNum);
			primeNum = fn(); // вычисляем следующее простое число
		}
		return res;

	}


}

console.log(MathX.fibonacciAll(100));
console.log(MathX.primeAll(100));

let newPrimeSeq = MathX.primeSeq(); // нужно присвоить значение выполнения функции, чтобы получить "независимую функцию"
// Если мы просто будем вызывать MathX.primeSeq() без строчки выше, то будем получать "2", так как функция будет испольняться как бы с нуля 

console.log(newPrimeSeq());
console.log(newPrimeSeq());
console.log(newPrimeSeq());
console.log(newPrimeSeq());
console.log(newPrimeSeq());

let newFibonacciSeq= MathX.fibonacciSeq(); // см. выше объяснение для newPrimeSeq

console.log('______________');
console.log(newFibonacciSeq());
console.log(newFibonacciSeq());
console.log(newFibonacciSeq());
console.log(newFibonacciSeq());
console.log(newFibonacciSeq());







