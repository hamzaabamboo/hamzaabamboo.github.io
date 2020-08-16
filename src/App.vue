<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";

@Options({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./styles/theme.scss";
@import "../node_modules/normalize.css/normalize.css";

* {
  font-family: sans-serif;
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
a {
  margin: 0;
}

html,
body {
  height: 100vh;
  width: 100vw;
  background-color: $royal-purple;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  border-radius: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: $columbia-blue;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $maximum-blue;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: $maximum-blue;
}
</style>
