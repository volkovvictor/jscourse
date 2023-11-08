'use strict';

const title = prompt("Как называется ваш проект?", "Название");
const screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
const screenPrice = +prompt("Сколько будет стоить данная работа?", 20000);
const rollback = 20;
const adaptive = confirm("Нужен ли адаптив на сайте?");

const service1 = prompt("Какой дополнительный тип услуги нужен?", "Анимация");
const servicePrice1 = +prompt("Сколько это будет стоить?", 5000);
const service2 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
const servicePrice2 = +prompt("Сколько это будет стоить?", 3000);

let fullPrice = 0;
let servicePercentPrice = 0;

const getRollbackMessage = function(price) {
   if (price >= 30000) {
      return "Даем скидку в 10%";
   }
   if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
   }
   if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
   }
   if (price < 0) {
      return "Что то пошло не так";
   }
}

const getAllServicePrices = function(price1, price2) {
   return price1 + price2;
}

const getTitle = function(str) {
   return str.trim()[0].toUpperCase() + str.trim().toLowerCase().slice(1);
}

const getServicePercentPrices = function(price, rollback) {
   return Math.ceil(price - (price * (rollback/100)));
}

function getFullPrice(price, servicePrice) {
   return price + servicePrice;
}

fullPrice = getFullPrice(screenPrice, getAllServicePrices(servicePrice1, servicePrice2));
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

console.log(getRollbackMessage(fullPrice));

console.log("Итоговая стоимость " + servicePercentPrice);

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.toLowerCase().split(', '));