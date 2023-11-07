const title = prompt("Как называется ваш проект?", "Название");
const screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
const screenPrice = +prompt("Сколько будет стоить данная работа?", 20000);
const rollback = 20;
const adaptive = confirm("Нужен ли адаптив на сайте?");

const service1 = prompt("Какой дополнительный тип услуги нужен?", "Анимация");
const servicePrice1 = +prompt("Сколько это будет стоить?", 5000);
const service2 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
const servicePrice2 = +prompt("Сколько это будет стоить?", 3000);

const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback/100)));

console.log("Итоговая стоимость " + servicePercentPrice);

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

console.log(screens.toLowerCase().split(', '));

console.log("Процент отката посреднику за работу " + fullPrice * (rollback/100));