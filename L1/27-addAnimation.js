// Задача: Добавить анимацию для элемента: Напишите функцию, которая 
// добавляет анимацию для элемента на веб-странице, например,
// плавное изменение его положения или размера.


function animation(elem){
	elem.style.transform = "translate(100px,100px)scale(1.1)"; // Перемещение вправо вниз на 100px, масштабирование на 10%
	elem.style.transition = "1.5s"; // длительность перехода 1,5 секунды
}

animation(document.querySelector('div'))  // Применяем это к первому div'у