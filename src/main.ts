import Vue from "vue";

import HelloWord from './components/HelloWord';

new Vue({
   render: r => r(HelloWord)
}).$mount('#app');