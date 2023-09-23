// Реализация очереди с помощью двусвязного,двустороненного списка
class LinkedListNode {
	prev = null;
	next = null;

	constructor(value, { prev, next }) {  // конструктор, который выхывается при создании объекта
		this.value = value; // присваиваем значение созданоому объекту

		if (prev != null) { // Если значение не равно нулю
			this.prev = prev; // Устанавливаем ссылку на предыдущий элемент
			prev.next = this; // Устанавливаем ссылку у предыдущего элемента на текущий
		}
		// Аналогично как с prev, тольк онаоборот
		if (next != null) {
			this.next = next;
			next.prev = this;
		}
	}
}

// Создаем класс LinkedList

class LinkedList {
	//  Указатели на первый и последний элемент(из-за этого он двухсторонний)
	first = null;
	last = null;

	//Метод для вставки слева 
	pushLeft(value) {
		// Создаем объект и присваиваем this.first
		this.first = new LinkedListNode(value, { next: this.first });

		// Если this.last == null, то в списке нет элементов и только что вставленный объект является и первым и последним
		if (this.last == null) {
			this.last = this.first;
		}
	}
	//Метод для извлечения слева 
	popLeft() {
		const head = this.first;
		//Если элементов нет, то выходим из метода
		if (head == null) {
			return;
		}
		// Первому элементу присваивается следующий элемент от изначального
		this.first = head.next;

		// Если элемент не равен нулю, то есть мы не вытащили один единственный элемент
		if (this.first != null) {
			this.first.prev = null // Удаляем ссылку на предыдущий объект, так как текущий элемент первый 
		} else {
			this.last = null; // Иначе элементов в листе нет 
		}

		return head;
	}

	// pushRight и popRight аналогично реализуются

	pushRight(value) {
		this.last = new LinkedListNode(value, { prev: this.last });

		if (this.first == null) {
			this.first = this.last;
		}
	}

	popRight() {
		const tail = this.last;

		if (tail == null) {
			return;
		}

		this.last = tail.prev;

		if (this.last != null) {
			this.last.next = null
		} else {
			this.first = null;
		}

		return tail;
	}
}

// Создаем и экспортируем класс очередь
export class Queue {
	// Приватное поле, доступное только изнутри
	#store = new LinkedList();

	// метод push на базе pushRight связного списка
	push(value) {
		this.#store.pushRight(value);
	}
	// метод pop на базе popLeft связного списка
	pop() {
		return this.#store.popLeft()?.value;
	}
}
