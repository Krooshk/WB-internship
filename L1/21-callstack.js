// chrome, edge, opera --> max 11

function findMaxCallStackSize() {
	try {
		// рекурсивная функция, которая вызывает саму себя до переполнения стека вызовов
		function recurse() {
			recurse();
		}

		recurse(); // начинаем рекурсивные вызовы
	} catch (e) {
		// обрабатываем переполнение стека вызовов
		console.error(`Максимальный размер стека вызовов: ${e.stack.split('\n').length}`);
	}
}

findMaxCallStackSize();