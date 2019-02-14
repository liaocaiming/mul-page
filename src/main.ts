import Vue from "vue";

import routes from './routes'

import VueRouter from 'vue-router';

import { setTitle } from '@shared/utils/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from);
  setTitle(to.meta.title);
  next();
})

new Vue({
   router
}).$mount('#app');