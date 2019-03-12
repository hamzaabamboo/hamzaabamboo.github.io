<template>
  <div class="home">
    <div class="main">
      <h1>Coming Soon...</h1>
      <h3>at</h3>
      <h2>
        <a href="https://hamzaabamboo.github.io">hamzaabamboo.github.io</a>
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped >
.home {
  ::before {
    background-image: url("../assets/bg/1.jpg");
    opacity: 0.3;
    content: "";
    z-index: -9;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: block;
    position: absolute;
    background-size: cover;
    background-position: center top;
  }
}
.main {
  h1 {
    font-size: 6em;
    margin: 10px;
  }
  h2 {
    font-size: 2em;
    font-weight: 800;
  }
  h3 {
    font-size: 2em;
  }
  a {
    color: black;
    text-decoration: grey;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

