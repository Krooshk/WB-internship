

function stringify(obj) {  //функция принимает два аргумента, первый - JSON объекта,
    function _stringify(obj) { // Это внутренняя рекурсивная функция, она принимает два аргумента 1 - текущий объект, 2 - уровень глубины

        if (typeof obj === 'object' && obj !== null) {
			// Проверяем является ли элемент объектом и не равен ли null
            if (Array.isArray(obj)) {
				//  Проверка на то, является ли объект массивом 
                const items = obj.map(item => _stringify(item)); // используем метод `map` чтобы пройти по каждому элементу функцией  _stringify
		//  Также сохраняем результат в items
                return `[${items.join(',')}]`; 
		//  возвращаем строку, которая представляет массив, со всеми элементами массива, разделенными запятыми
            } else { // В противном случае мы обрабатываем его как объект
                const items = []; //создаем пустой массив, в котором мы будем хранить пары ключ-значение объекта
                for (const key in obj) {   // начинаем перебирать ключи объекта `obj` с помощью цикла 
                    if (Object.hasOwnProperty.call(obj, key)) { // Проверяем, что данное свойство принадлежит текущему объекту,
						//  а не другому, на который может ссылаться объект по цепочке прототипов 
                        const keyStr = typeof key === 'string' ? `"${key}"` : key; // Тернарный оператор: если ключ строка --> оборачиваем в двойные кавычки, 
						// если нет, то оставляем без изменений
                        const valueStr = _stringify(obj[key]); //вызываем stringify` для значения, 
						// связанного с текущим ключом `key`
                        items.push(`${keyStr}:${valueStr}`); //  добавляем строку в массив, представляющую текущую пару ключ-значение объекта.
                    }
                }
                return `{${items.join(',')}}`; // возвращаем строку, которая представляет объект, со всеми парами ключ-значение, 
				// разделенными запятыми 
            }
			// Выше был рассмотрен рекурсивный случай, а это базовый (когда элемент не является объектом)
        } else if (typeof obj === 'string') { // Если примитив строка, то возвращаем ее, обернув в двойные кавычки
            return `"${obj}"`;
        } else { // Если не строка, то возвращаем строковое представление примитива 
            return String(obj);
        }
    }

    return _stringify(obj); // вызываем _stringify для переданного объекта `obj`
}

// Пример использования:
const data = {
    name: 'Johny',
    age: 30,
    city: {
		name: 'Moscow',
		age: 870,
		country: {
			name: 'Russia',
			age: 2500,
			planet: 'Earth'
		}
	}
};

const json_string = stringify(data);

console.log(json_string);

console.log(JSON.stringify(data));

console.log(JSON.stringify(data) === json_string);







