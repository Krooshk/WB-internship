// Абстрактный класс, класс у которого есть поля, но методы в них не определены
class Shape {
	constructor() {
		if (this.constructor === Shape) { // Еще видел вариант new.target === Shape
			throw new Error('Нельзя создать экземпляр абстрактного класса Shape');
		}
	}

	// Метод для расчета площади 
	calculateArea() {
		throw new Error('Метод calculateArea() должен быть реализован в подклассах');
	}

	// Метод для расчета периметра 
	calculatePerimeter() {
		throw new Error('Метод calculatePerimeter() должен быть реализован в подклассах');
	}
}

// Подкласс Rectangle (прямоугольник)
class Rectangle extends Shape {
	constructor(width, height) {
		super();
		this.width = width;
		this.height = height;
	}

	// Реализация метода для расчета площади
	calculateArea() {
		return this.width * this.height;
	}

	// Реализация метода для расчета периметра
	calculatePerimeter() {
		return 2 * (this.width + this.height);
	}
}

// Подкласс Circle (круг)
class Circle extends Shape {
	constructor(radius) {
		super();
		this.radius = radius;
	}

	// Реализация метода для расчета площади
	calculateArea() {
		return Math.floor(Math.PI * (this.radius ** 2));
	}

	// Реализация метода для расчета периметра 
	calculatePerimeter() {
		return Math.floor(2 * Math.PI * this.radius);
	}
}

// Подкласс Triangle (треугольник)
class Triangle extends Shape {
	constructor(side1, side2, side3) {
		super();
		this.side1 = side1;
		this.side2 = side2;
		this.side3 = side3;
	}

	// Реализация метода для расчета площади
	calculateArea() {
		// Используем формулу Герона для треугольника
		const s = (this.side1 + this.side2 + this.side3) / 2; // Полупериметр
		return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
	}

	// Реализация метода для расчета периметра
	calculatePerimeter() {
		return this.side1 + this.side2 + this.side3;
	}
}

// const qwer = new Shape(5, 10); // Error('Нельзя создать экземпляр абстрактного класса Shape');

const rectangle = new Rectangle(5, 10);
console.log('Прямоугольник - Площадь:', rectangle.calculateArea());
console.log('Прямоугольник - Периметр:', rectangle.calculatePerimeter());

const circle = new Circle(7);
console.log('Круг - Площадь:', circle.calculateArea());
console.log('Круг - Периметр:', circle.calculatePerimeter());

const triangle = new Triangle(3, 4, 5);
console.log('Треугольник - Площадь:', triangle.calculateArea());
console.log('Треугольник - Периметр:', triangle.calculatePerimeter());