
function walk(node) {   // получаем узел
	console.log(node.tagName);   // выводим его название 
	let children = node.children; // children в данном случае лучше, потому что будем получать элементы, а childNode включает также текстовые узлы
	if (children) { // Если есть детки, то продолжаем 
		let iterChildren = [...children]; // Children отдает массивоподобный объект, у которого нет метода forEach, сделаем его массивом
		iterChildren.forEach(child => {  // проходим по каждому объекту и вызываем функция, тут у нас рекурсия 
			walk(child);
		});
	}
}

walk(document.body);
