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

const appData = {
   rollback: 0,
   title: "",
   screens: [],
   screenPrice: 0,
   screensCount: 0,
   adaptive: true,
   servicesPercent: {},
   servicesNumber: {},
   percentServicePrices: 0,
   numberServicePrices: 0,
   fullPrice: 0,
   servicePercentPrice: 0,

   isNumber: function(num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
   },

   disabled: function(value) {
      startBtn.disabled = value;

      if (value === true) startBtn.style.opacity = '0.5';
      else startBtn.style.opacity = '1';
   },

   checkAllItems: function() {
      screens = document.querySelectorAll('.screen');

      let disabled = false;

      screens.forEach(function(item) {
         const select = item.querySelector('select');
         const input = item.querySelector('input');

         select.addEventListener('change', function() {
            appData.checkAllItems();
         });

         input.addEventListener('input', function() {
            appData.checkAllItems();
         });

         if (select.value === "" || !appData.isNumber(input.value)) disabled = true;
      });

      appData.disabled(disabled);
   },

   addTitle: function() {
      document.title = title.textContent;
   },

   addScreens: function () {
      screens = document.querySelectorAll('.screen');

      screens.forEach(function(item, index) {
         const select = item.querySelector('select');
         const input = item.querySelector('input');
         const selectName = select.options[select.selectedIndex].textContent;

         appData.screens.push({
            id: index, 
            name: selectName, 
            count: +input.value,
            price: +select.value * +input.value
         });


        // appData.disabledButton(disabled);
      });
   },

   addServices: function() {
      percentItems.forEach(function(item) {
         const checkbox = item.querySelector('input[type=checkbox]');
         const label = item.querySelector('label');
         const input = item.querySelector('input[type=text]');

         if (checkbox.checked) appData.servicesPercent[label.textContent] = +input.value;
      });

      numberItems.forEach(function(item) {
         const checkbox = item.querySelector('input[type=checkbox]');
         const label = item.querySelector('label');
         const input = item.querySelector('input[type=text]');

         if (checkbox.checked) appData.servicesNumber[label.textContent] = +input.value;
      });
   },

   addRollback: function() {
      appData.rollback = +rollbackValue.textContent.replace('%', '');
   },

   addScreenBlock: function() {
      const screenClone = screens[0].cloneNode(true);
      screenClone.querySelector('input').value = "";

      screens[screens.length - 1].after(screenClone);

      appData.checkAllItems();
   },

   changeValue: function(e) {
      rollbackValue.textContent = e.target.value + '%';
   },

   addPrices: function() {
      appData.screenPrice = appData.screens.reduce(function(value, item) {
         return value + item.price;
      }, appData.screenPrice);

      appData.screensCount = appData.screens.reduce(function(value, item) {
         return value + item.count;
      }, appData.screensCount);

      for (let key in appData.servicesNumber) {
         appData.numberServicePrices += +appData.servicesNumber[key];
      }

      for (let key in appData.servicesPercent) {
         appData.percentServicePrices += appData.screenPrice * (appData.servicesPercent[key]/100);
      }

      appData.fullPrice = appData.screenPrice + appData.percentServicePrices + appData.numberServicePrices;
      appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)));
   },

   showResult: function() {
      total.value = appData.screenPrice;
      totalCount.value = appData.screensCount;
      totalCountOther.value = appData.percentServicePrices + appData.numberServicePrices;
      totalFullCount.value = appData.fullPrice;
      totalCountRollback.value = appData.servicePercentPrice;
   },

   clear: function() {
      appData.screens = [];
      appData.screenPrice = 0;
      appData.screensCount = 0;
      appData.servicesPercent = {};
      appData.servicesNumber = {};
      appData.percentServicePrices = 0;
      appData.numberServicePrices = 0;
      appData.fullPrice = 0;
      //appData.servicePercentPrice = 0;
   },

   logger: function(arr) {
      for (let key in arr) {
         let value = typeof arr[key] === "object" ? JSON.stringify(arr[key]) : arr[key];
         console.log("Ключ: " + key + " - Значение: " + value);
      }
   },

   start: function() {
      appData.addScreens();
      appData.addServices();
      appData.addRollback();
      appData.addPrices();
      appData.showResult();
      appData.clear();

      console.log(appData);
   },

   init: function() {
      appData.checkAllItems();
      appData.addTitle();
      startBtn.addEventListener('click', appData.start);
      screenBtn.addEventListener('click', appData.addScreenBlock);
      rollbackRange.addEventListener('input', appData.changeValue);
   }
}

appData.init();