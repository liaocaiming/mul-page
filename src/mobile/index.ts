import Vue from "vue";

import { routes } from "./config";

import VueRouter from "vue-router";


import Vuex from "vuex";

import state from "./store/index";

import { setTitle } from '@shared/utils/index';

Vue.use(Vuex);

Vue.use(VueRouter);

const store = new Vuex.Store(state);

const router = new VueRouter({
  mode: 'hash',
  routes
});

router.beforeEach((to, from, next) => {
  setTitle(to.meta.title);
  next();
});

new Vue({
  store,
  router
}).$mount("#app");
