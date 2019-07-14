
import Vue from 'vue';

import App from './App.vue';

new Vue({
   render: (CreateElement: any) => CreateElement(App)
  }).$mount("#app");