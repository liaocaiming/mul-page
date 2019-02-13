import Vue from "vue";

import { helpers } from '@shared/lib/index';

import HelloWord from './components/HelloWord';

console.log(helpers.dyadicArray([], 1), 122);

new Vue({
   render: r => r(HelloWord)
}).$mount('#app');