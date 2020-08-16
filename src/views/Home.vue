<template>
  <div class="main">
    <nav class="clear">
      <h4>hamzaabamboo.github.io</h4>
    </nav>
    <div class="home">
      <Hero :observer="observer"></Hero>
      <div class="section">
        <h1>Hi</h1>
        <p>Test</p>
      </div>
      <div class="section">
        <h1>Hi</h1>
        <p>Test</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Hero from "@/components/Hero.vue";
// @ is an alias to /src
export default {
  name: "Home",
  components: { Hero },
  data(): { observer: IntersectionObserver | null } {
    return {
      observer: null,
    };
  },
  methods: {},
};
</script>

<style lang="scss">
@import "../styles/theme.scss";

$nav-height: 48px;

.home {
  scroll-snap-type: y mandatory;
  height: calc(100vh);
  overflow-y: auto;
}

.main {
  height: 100%;
  width: 100%;
}

nav {
  position: fixed;
  height: $nav-height;
  background-color: red;
  top: 0;
  z-index: 99;
  display: flex;
  justify-items: center;
  align-items: center;
  width: 100%;

  h4 {
    padding: 20px;
    font-size: 1em;
    color: black;
  }
}

.clear {
  background-color: transparent;

  h4 {
    color: white;
  }
}

.section {
  padding-top: $nav-height;
  scroll-snap-align: start;
  width: 100vw;
  height: calc(100vh);
  // background: $gradient-right;
}

.left,
.right {
  flex-grow: 0;
  overflow: hidden;
}
</style>
