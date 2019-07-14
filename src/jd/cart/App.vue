<template>
  <div>
    <div>4444</div>
    <div class="name">{{a}}</div>
  </div>
</template>

<style>
.name {
    color: red;
}
</style>

<script>

import { fetch } from '@shared/utils';

export default {
  data() {
    return {
      a: 'liaocaiming'
    };
  },
   created () {
     fetch('get', '/api/cart/product').then((json) => {
       window.console.log(json);
     });
  },
};
</script>

