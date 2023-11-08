'use strict';

const rollback = 20;

let title = "";
let screens = "";
let screenPrice = 0;
let adaptive = true;

let service1 = "";
let service2 = "";

let fullPrice = 0;
let servicePercentPrice = 0;

const isNumber = function(num) {
   return !isNaN(parseFloat(num)) && isFinite(num);
}

const asking = function() {
   title = prompt("Как называется ваш проект?", "Название");
   screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
   
   do {
      screenPrice = prompt("Сколько будет стоить данная работа?", 20000);
   } while (!isNumber(screenPrice));

   adaptive = confirm("Нужен ли адаптив на сайте?");
}

const getAllServicePrices = function() {
   let sum = 0;

   for (let i = 0; i < 2; i++) {
      if (i === 0) service1 = prompt("Какой дополнительный тип услуги нужен?", "Анимация");
      if (i === 1) service2 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");

      sum += +prompt("Сколько это будет стоить?", 5000);
   }

   return sum;
}

const getTitle = function(str) {
   return str.trim()[0].toUpperCase() + str.trim().toLowerCase().slice(1);
}

const getServicePercentPrices = function(price, rollback) {
   return Math.ceil(price - (price * (rollback/100)));
}

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

function getFullPrice(price, servicePrice) {
   return price + servicePrice;
}

asking();

fullPrice = getFullPrice(+screenPrice, getAllServicePrices());
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

console.log(getRollbackMessage(fullPrice));

console.log("Итоговая стоимость " + servicePercentPrice);

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.toLowerCase().split(', '));