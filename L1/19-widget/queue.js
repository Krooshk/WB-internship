
class LinkedListNode {
	prev = null;
	next = null;

	constructor(value, {prev,next}) {
		this.value = value;

		if (prev != null) {
			this.prev = prev;
			prev.next = this;
		}
		if (next != null) {
			this.next = next;
			next.prev = this;
		}
	}
}

class LinkedList {

	first = null;
	last = null;

	pushLeft(value) {
		this.first = new LinkedListNode(value, {next: this.first});

		if (this.last == null){
			this.last = this.first;
		}
	}

	popLeft() {
		const head = this.first;

		if (head == null) {
			return;
		}

		this.first = head.next;

		if (this.first != null) {
			this.first.prev = null
		} else {
			this.last = null;
		}

		return head;
	}

	pushRight(value) {
		this.last = new LinkedListNode(value, {prev: this.last});

		if (this.first == null){
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


export class Queue {
	#store = new LinkedList();

	push(value) {
		this.#store.pushRight(value);
	}

	pop() {
		return this.#store.popLeft()?.value;
	}
}
