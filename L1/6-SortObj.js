// Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }.
//  Напишите код, который сортирует этот массив по возрастанию возраста, 
//  а при равных возрастах сортирует по алфавиту по полю name.

console.log(sortObj([
	{ name: 'Mike', age: 65 },
	{ name: 'John', age: 55 },
	{ name: 'Ann', age: 15 },
	{ name: 'Vad', age: 30 },
	{ name: 'Ivan', age: 30 },
	{ name: 'Ann', age: 30 },
	{ name: 'Alena', age: 30 },
	{ name: 'Anton', age: 30 },
	{ name: 'Boris', age: 30 },]))

	// I use standard method of Array - sort, key moment in this method is using comparator
	// comparator is callback, which must return one of three possible value (Positive, Negative numbers or zero)
	// Zero if a case equivalent
	//  Positive number if first number bigger than second number, in this case we have to make twist 
	//  Negative number if first number smaller than second number, in this case we do nothing


	function sortObj(arr){
		return arr.sort((a,b) => {
			if (a.age === b.age){
				if (a.name === b.name){
					return 0
				} 
				if (a.name > b.name) {
					return 1
				} else { return -1}
			} else {
				return a.age - b.age
			}
		})
	}

	