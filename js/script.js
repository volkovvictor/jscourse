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

      screens.forEach(item => {
         const select = item.querySelector('select');
         const input = item.querySelector('input');

         select.addEventListener('change', () => {
            this.checkAllItems();
         });

         input.addEventListener('input', () => {
            this.checkAllItems();
         });

         if (select.value === "" || !appData.isNumber(input.value)) disabled = true;
      });

      this.disabled(disabled);
   },

   addTitle: function() {
      document.title = title.textContent;
   },

   addScreens: function () {
      screens = document.querySelectorAll('.screen');

      screens.forEach((item, index) => {
         const select = item.querySelector('select');
         const input = item.querySelector('input');
         const selectName = select.options[select.selectedIndex].textContent;

         this.screens.push({
            id: index, 
            name: selectName, 
            count: +input.value,
            price: +select.value * +input.value
         });


        // appData.disabledButton(disabled);
      });
   },

   addServices: function() {
      percentItems.forEach(item => {
         const checkbox = item.querySelector('input[type=checkbox]');
         const label = item.querySelector('label');
         const input = item.querySelector('input[type=text]');

         if (checkbox.checked) this.servicesPercent[label.textContent] = +input.value;
      });

      numberItems.forEach(item => {
         const checkbox = item.querySelector('input[type=checkbox]');
         const label = item.querySelector('label');
         const input = item.querySelector('input[type=text]');

         if (checkbox.checked) this.servicesNumber[label.textContent] = +input.value;
      });
   },

   addRollback: function(e) {
      rollbackValue.textContent = e.target.value + '%';
      
      this.rollback = +rollbackValue.textContent.replace('%', '');

      if (this.fullPrice !== 0) {
         this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback/100)));
         totalCountRollback.value = this.servicePercentPrice;
      }
   },

   addScreenBlock: function() {
      const screenClone = screens[0].cloneNode(true);
      screenClone.querySelector('input').value = "";

      screens[screens.length - 1].after(screenClone);

      this.checkAllItems();
   },

   addPrices: function() {
      this.screenPrice = this.screens.reduce((value, item) => {
         return value + item.price;
      }, this.screenPrice);

      this.screensCount = this.screens.reduce((value, item) => {
         return value + item.count;
      }, this.screensCount);

      for (let key in this.servicesNumber) {
         this.numberServicePrices += +this.servicesNumber[key];
      }

      for (let key in this.servicesPercent) {
         this.percentServicePrices += this.screenPrice * (this.servicesPercent[key]/100);
      }

      this.fullPrice = this.screenPrice + this.percentServicePrices + this.numberServicePrices;
      this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback/100)));
   },

   showResult: function() {
      total.value = this.screenPrice;
      totalCount.value = this.screensCount;
      totalCountOther.value = this.percentServicePrices + this.numberServicePrices;
      totalFullCount.value = this.fullPrice;
      totalCountRollback.value = this.servicePercentPrice;
   },

   clear: function() {
      this.screens = [];
      this.screenPrice = 0;
      this.screensCount = 0;
      this.servicesPercent = {};
      this.servicesNumber = {};
      this.percentServicePrices = 0;
      this.numberServicePrices = 0;
      this.fullPrice = 0;
   },

   logger: function(arr) {
      for (let key in arr) {
         let value = typeof arr[key] === "object" ? JSON.stringify(arr[key]) : arr[key];
         console.log("Ключ: " + key + " - Значение: " + value);
      }
   },

   start: function() {
      this.clear();

      this.addScreens();
      this.addServices();
      this.addPrices();
      this.showResult();

      console.log(this)
   },

   init: function() {
      this.checkAllItems();
      this.addTitle();
      startBtn.addEventListener('click', this.start.bind(appData));
      screenBtn.addEventListener('click', this.addScreenBlock.bind(appData));
      rollbackRange.addEventListener('input', this.addRollback.bind(appData));
   }
}

appData.init();