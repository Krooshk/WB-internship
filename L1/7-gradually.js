// Задача о коллекции функций: у вас есть массив функций, 
// напишите код, который вызовет каждую функцию в этом массиве и выведет их порядковый номер. 
// Однако, вызов каждой функции должен происходить только после вызова предыдущей функции.
// Другими словами, нужно выполнить следующие шаги:
// Вызвать первую функцию из массива.
// После завершения работы первой функции вызвать вторую функцию.
// После завершения работы второй функции вызвать третью функцию.
// И так далее, пока все функции в массиве не будут вызваны по порядку


fn1 = () => console.log('aaaaa');
fn2 = () => console.log('bbbbb');
fn3 = () => console.log('ccccc');
fn4 = () => console.log('ddddd');


let array = [fn1, fn2, fn3, fn4];

// Будто какой-то подвох в задаче
// Мое решение - проходимся циклом по массиву, внутри итерации вызываем функцию, 
// а затем выводим в консоль порядковый номер


function grad(arr){
	for (let i = 0; i < arr.length; i ++){
		arr[i]();
		console.log(i);
	}
}

grad(array);