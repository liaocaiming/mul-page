import Vue from "vue";

import { routes } from "@src/config/mobile";

import VueRouter from "vue-router";

import { setTitle } from "@shared/utils/index";

import Vuex from "vuex";

import state from "./mall/store/index";

Vue.use(Vuex);

Vue.use(VueRouter);

const store = new Vuex.Store(state);

const router = new VueRouter({
  mode: "history",
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
