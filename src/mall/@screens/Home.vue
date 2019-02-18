<template>
  <div>
    <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
    <img src="../../images/2.jpg" alt="">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Hello extends Vue {
  enthusiasm = 1;
  public data() {
    return {
      name: "liaocaiming"
    };
  }
  public increment() {
    this.enthusiasm++;
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
