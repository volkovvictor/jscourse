'use strict';

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const screenBtn = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const rollbackRange = document.querySelector('.rollback input[type=range]');
const rollbackValue = document.querySelector('.rollback .range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalFullCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

console.log(title);
console.log(startBtn);
console.log(resetBtn);
console.log(screenBtn);
console.log(percentItems);
console.log(numberItems);
console.log(rollbackRange);
console.log(rollbackValue);

console.log(total);
console.log(totalCount);
console.log(totalCountOther);
console.log(totalFullCount);
console.log(totalCountRollback);

console.log(screens);

const appData = {
   rollback: 20,
   title: "",
   screens: [],
   screenPrice: 0,
   adaptive: true,
   services: {},
   allServicePrices: 0,
   fullPrice: 0,
   servicePercentPrice: 0,

   isNumber: function(num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
   },

   asking: function() {
      do {
         appData.title = prompt("Как называется ваш проект?", "Название");
      } while (!isNaN(appData.title));

      for (let i = 0; i < 2; i++) {
         let name = "";
         let screenPrice = 0;

         do {
            name = prompt("Какие типы экранов нужно разработать?", "Простые");
         } while (!isNaN(name));
   
         do {
            screenPrice = prompt("Сколько будет стоить данная работа?", 20000);
         } while (!appData.isNumber(screenPrice));

         appData.screens.push({id: i, name: name, price: +screenPrice});
      }

      for (let i = 0; i < 2; i++) {
         let name = "";
         let servicePrice = 0;
   
         do {
            name = prompt("Какой дополнительный тип услуги нужен?", "Анимация");
         } while (!isNaN(name));

         do {
            servicePrice = prompt("Сколько это будет стоить?", 5000);
         } while (!appData.isNumber(servicePrice));

         appData.services[i + ': ' + name] = +servicePrice;
      }
   
      appData.adaptive = confirm("Нужен ли адаптив на сайте?");
   },

   addPrices: function() {
      appData.screenPrice = appData.screens.reduce(function(value, item) {
         return value + item.price;
      }, appData.screenPrice);

      for (let key in appData.services) {
         appData.allServicePrices += +appData.services[key];
      }
   },

   getTitle: function(str) {
      appData.title = str.trim()[0].toUpperCase() + str.trim().toLowerCase().slice(1);
   },

   getServicePercentPrices: function(price, rollback) {
      appData.servicePercentPrice = Math.ceil(price - (price * (rollback/100)));
   },

   getRollbackMessage: function(price) {
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
   },

   getFullPrice: function(price, servicePrice) {
      appData.fullPrice = price + servicePrice;
   },

   logger: function(arr) {
      for (let key in arr) {
         let value = typeof arr[key] === "object" ? JSON.stringify(arr[key]) : arr[key];
         console.log("Ключ: " + key + " - Значение: " + value);
      }
   },

   start: function() {
      appData.asking();
      appData.addPrices();
      appData.getFullPrice(+appData.screenPrice, appData.allServicePrices);
      appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
      appData.getTitle(appData.title);
      appData.logger(appData);
   }
}

//appData.start();