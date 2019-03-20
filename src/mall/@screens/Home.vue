<template>
  <div>
    <div class="greeting">Hello {{name}}{{exclamationMarks}}32322</div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
    <div>{{stateCount}}</div>
    <img src="../../images/2.jpg" alt="">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {  Action, State } from 'vuex-class';

@Component
export default class Hello extends Vue {
  @Prop() private count?: number;
  @Action('add') private add!: (num: number) => void;
  @State((state) => state.count) public stateCount!:number;
  private enthusiasm = 1;
  public data() {
    return {
      name: "liaocaiming",
    };
  }
  public increment() {
    this.enthusiasm++;
    this.add(10);
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
