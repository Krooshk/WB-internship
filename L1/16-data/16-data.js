// Задача на модули и использование внешних библиотек: напишите модуль,
// который экспортирует функцию для работы с датами.
// Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.

// Устанавливаем в текущую папку с помощью npm библиотеку moment

const moment = require('moment'); // Импортируем эту библиотеку

function formatDate(date, format) {  // Функция для форматирования даты
	return moment(date).format(format);
}

function addDays(date, days) {  // Получения новой даты через определнное количество дней
	return moment(date).add(days, 'days').toDate();
}

function subtractDays(date, days) {  // Получения даты, которая была за определенное количество дней до переданной даты в параметр функции
	return moment(date).subtract(days, 'days').toDate();
}

function isDateAfter(date1, date2) { // Получение булева значения ---> первая дата идет после второй 
	return moment(date1).isAfter(date2);
}

function isDateBefore(date1, date2) { // Получение булева значения ---> первая дата предшествует второй 
	return moment(date1).isBefore(date2);
}

module.exports = {  // Экспорт функции
	formatDate,
	addDays,
	subtractDays,
	isDateAfter,
	isDateBefore,
};

// console.log(formatDate(new Date(), "YYYY/MM/DD")); // текущая дата в удобном формате, например 2023/09/19
// console.log(formatDate(addDays(new Date(), 7),"YYYY/MM/DD")); // текущая дата + 7 дней в удобном формате, например 2023/09/26
// console.log(formatDate(subtractDays(new Date(1991,11,30),300),"YYYY/MM/DD")); // текущая дата - 7 дней в удобном формате, 1991/03/05
// console.log(isDateAfter(new Date(1994,11,30),new Date(1991,11,30))); // true
// console.log(isDateBefore(new Date(1994,11,30),new Date(1991,11,30))); // false