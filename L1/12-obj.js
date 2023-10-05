// Задача на работу с объектами: создайте объект, представляющий собой книгу.
//  Объект должен иметь свойства, такие как: название книги,
//  автор и год издания. Напишите методы для получения и изменения значений свойств книги.

// Создаем объект и соответсвующие поля, а также доабвляем два метода
//  один будет получать свойство и по нему возвращать значение, а другой метод будет изменять его 

// Через свойства-аксессоры не получится сделать универсально, так как придется для каждого поля создавать аксессор
// то есть в даннном случае три get и три set 

let book = {
	name : "Martin Iden",
	author: "Jack London",
	year: 1909,

	getProperty(property){
		return this[property];
	},
	changePropert(property, value){
		this[property] = value;
	}
}


console.log(book.getProperty("name"));
console.log(book.getProperty("author"));
console.log(book.getProperty("year"));

book.changePropert("name", "One Flew Over the Cuckoo's Nest");
book.changePropert("author", "Ken Kizi");
book.changePropert("year", 1962);

console.log(book.getProperty("name"));
console.log(book.getProperty("author"));
console.log(book.getProperty("year"));

