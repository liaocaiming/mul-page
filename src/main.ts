import Vue from "vue";

import HelloWord from './components/HelloWord';

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <div>Hello {{name}}!</div>
        Name: <input v-model="name" type="text">
        <div><hello-word name="LIAOCA"></hello-word></div>
    </div>`,
    data: {
        name: "World"
    },
    components: {
        HelloWord
    }
});