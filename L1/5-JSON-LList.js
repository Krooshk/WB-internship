// [{
// 	"title": "The Alchemist",
// 	"author": "Paulo Coelho",
// 	"publication year": 1988,
// 	"genre": "Spiritual Literature",
// 	"publisher": "Rio de Janeiro"
// },
// {
// 	"title": "Harry Potter and the Prisoner of Azkaban",
// 	"author": "J.K. Rowling",
// 	"publication year": 1999,
// 	"genre": "Fantasy",
// 	"publisher": "London"
// },
// {
// 	"title": "The Shadow of the Wind",
// 	"author": "Carlos Ruiz Zafón",
// 	"publication year": 2001,
// 	"genre": "Mystery",
// 	"publisher": "Barcelona"
// },
// {
// 	"title": "Anna Karenina",
// 	"author": "Leo Tolstoy",
// 	"publication year": 1877,
// 	"genre": "Novel",
// 	"publisher": "Moscow"
// },
// {
// 	"title": "The Little Prince",
// 	"author": "Antoine de Saint-Exupéry",
// 	"publication year": 1943,
// 	"genre": "Philosophical Prose",
// 	"publisher": "New York"
// }]

let booksJSON = [
	{
		"title": "War and Peace",
		"author": "Leo Tolstoy",
		"publication year": 1869,
		"genre": "Novel",
		"publisher": "Moscow"
	},
	{
		"title": "1984",
		"author": "George Orwell",
		"publication year": 1949,
		"genre": "Science Fiction",
		"publisher": "London"
	},
	{
		"title": "The Master and Margarita",
		"author": "Mikhail Bulgakov",
		"publication year": 1967,
		"genre": "Fantasy",
		"publisher": "Moscow"
	},
	{
		"title": "Harry Potter and the Philosopher's Stone",
		"author": "J.K. Rowling",
		"publication year": 1997,
		"genre": "Fantasy",
		"publisher": "London"
	},
	{
		"title": "Crime and Punishment",
		"author": "Fyodor Dostoevsky",
		"publication year": 1866,
		"genre": "Novel",
		"publisher": "Saint Petersburg"
	}
]

// A singly linked list is a list that has a pointer to the next node
// For first i create class Node, where constructor get two 
// Пока на русском, потом может переведу
// Сначала создаю класс узла, где конструктор принимает непосредственно само значение(объект) и ссылку на следующий элемент, если она есть
// Если нет ссылки то значение остается null

class Node {
	next = null;

	constructor(value, next) {
		this.value = value;

		if (this.next != null) {
			this.next = next;
		}
	}
}

// Создаем класс LinkedList и описываем методы внутри
// Вставка -> создаем узел с помощью класса Node, задаем значение next, если связный список пустой то будет null,
// если не пустой то ссылка будет на левый элемент, так как он первый 
// В конце меняем значение первого элемента на вновь добавленный Node

class LinkedList {
	first = null;

	isEmty() {
		return first === null;
	}

	isertFirst(value, next) {
		let node = new Node(value, next);
		node.next = this.first;
		this.first = node;
	}

	//  Меняем элемент first, присваиваем значение следующего элемента, на который ссылается first
	//  Так как этот элемент нигде не используется и ни что на него не ссылается, то по идее сборщик мусора удалит его из памяти

	deleteFirst() {
		let temp = first;
		first = first.next;
		return temp;
	}

	// Проходим по цепочке пока не доходим до значения next последнего элемента, которое равно null
	// На каждой итерации изменяем current на следующий

	displayList() {
		let current = this.first;
		while (current !== null) {
			console.log(current);
			current = current.next;
		}
	}

}

// Получчаем JSON, создаем экземпляр связного списка, методом foreach проходим по объектам и каждый элемент добавляем в связный список
// После прохождения цикла возвращаем связный список.

function convertJSONtoLinkedList(arr) {
	let linkedList = new LinkedList();
	arr.forEach((el) => linkedList.isertFirst(el));
	return linkedList;
}





convertJSONtoLinkedList(booksJSON).displayList();