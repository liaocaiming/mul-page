<template>
  <div>
    <div class="greeting">Hello {{name}}{{exclamationMarks}} <span class="name">woca</span></div>
    <div>cart</div>
    <div>{{age}}</div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
    <img src="../../images/2.jpg" alt="">
    <div>goTocart</div>
  </div>
</template>
<style lang='less' scoped>
  .greeting {
    color: red;
    .name {
      color: blue;
    }
  }
</style>

<script lang="ts">

let page = 1;

import Vue from 'vue';

import Component from 'vue-class-component';

import {  Action, State } from 'vuex-class';
window.console.log(1111);
@Component({
  props: {
    age: {
      type: Number,
      default: 11
    }
  }
})

export default class Hello extends Vue {
  @Action('add') private add!: (num: number) => void;
  public name?: string = '廖才明';
  private enthusiasm = 1;
  // public data() {
  //   return {
  //     name: "liaocaiming"
  //   };
  // }
  public increment() {
    this.enthusiasm++;
    page++;
  }
  public decrement() {
    if (this.enthusiasm > 1) {
      this.enthusiasm--;
    }
  }

  get exclamationMarks(): string {
    return Array(this.enthusiasm + 1).join("!");
  }
}
</script>
