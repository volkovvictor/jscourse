'use strict';

const appData = {
   rollback: 20,
   title: "",
   screens: "",
   screenPrice: 0,
   adaptive: true,
   service1: "",
   service2: "",
   fullPrice: 0,
   servicePercentPrice: 0,

   isNumber: function(num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
   },

   asking: function() {
      appData.title = prompt("Как называется ваш проект?", "Название");
      appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
      
      do {
         appData.screenPrice = prompt("Сколько будет стоить данная работа?", 20000);
      } while (!appData.isNumber(appData.screenPrice));
   
      appData.adaptive = confirm("Нужен ли адаптив на сайте?");
   },

   getAllServicePrices: function() {
      let sum = 0;
   
      for (let i = 0; i < 2; i++) {
         let servicePrice = 0;
   
         if (i === 0) appData.service1 = prompt("Какой дополнительный тип услуги нужен?", "Анимация");
         if (i === 1) appData.service2 = prompt("Какой дополнительный тип услуги нужен?", "Метрика");
   
         do {
            servicePrice = prompt("Сколько это будет стоить?", 5000);
         } while (!appData.isNumber(servicePrice));
         
         sum += +servicePrice;
      }
      return sum;
   },

   getTitle: function(str) {
      return str.trim()[0].toUpperCase() + str.trim().toLowerCase().slice(1);
   },

   getServicePercentPrices: function(price, rollback) {
      return Math.ceil(price - (price * (rollback/100)));
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
      return price + servicePrice;
   },

   logger: function(arr) {
      for (let key in arr) {
         console.log("Ключ: " + key + " - Значение: " + arr[key]);
      }
   },

   start: function() {
      appData.asking();

      appData.fullPrice = appData.getFullPrice(+appData.screenPrice, appData.getAllServicePrices());
      appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
      appData.title = appData.getTitle(appData.title);

      appData.logger(appData);
   }
}

appData.start();