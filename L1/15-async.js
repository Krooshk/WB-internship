// Задача на асинхронность: напишите асинхронную функцию, 
// которая использует ключевое слово await 
// для ожидания выполнения других асинхронных операций, 
// и возвращает результат выполнения.

async function f() {
	console.time("1");
	let promise = new Promise((resolve, _) => {
	  setTimeout(() => {
		console.timeEnd("1");
		resolve("готово!")}
		, 1000)
	});
  
	let result = await promise; // будет ждать, пока промис не выполнится (*)
	console.log(result);
	return result; // "готово!"
  }
  
f();