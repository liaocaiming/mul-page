import Vue from "vue";

import { routes } from "@src/config/mobile";

import VueRouter from 'vue-router';

import { setTitle } from '@shared/utils/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  setTitle(to.meta.title);
  next();
})

new Vue({
   router
}).$mount('#app');