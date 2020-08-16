<template>
  <div class="main">
    <nav class="clear">
      <h4>hamzaabamboo.github.io</h4>
    </nav>
    <div class="home">
      <intersect @enter="onPageEnter" @leave="onPageLeft">
        <div class="section hero">
          <div class="cool-square left">
            <div class="text">
              <h1>Ham's Github Collection</h1>
              <p>Test</p>
            </div>
          </div>
          <div
            class="right bg"
            style="background-image: url('https://bestdori.com/assets/en/characters/resourceset/res001023_rip/card_after_training.png')"
          >
            <div class=""></div>
          </div>
        </div>
      </intersect>

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
import Intersect from "vue-intersect";
// @ is an alias to /src
export default {
  name: "Home",
  components: { Intersect },
  methods: {
    onPageEnter(stuff: any) {
      console.log(stuff);
    },
    onPageLeft(stuff: any) {
      console.log(stuff);
    },
  },
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

.left,
.right {
  width: 50%;
  flex-grow: 0;
  overflow: hidden;
}

.cool-square {
  position: absolute;
  clip-path: polygon(0 0, 100% 0%, 90% 100%, 0% 100%);
  background-color: $accent;
  width: 60vw;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 2;
  animation: 2s ease 0s 1 slideInLeft;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px black;
  .text {
    animation: 2s ease 1s 1 fadeIn;
    animation-fill-mode: both;
  }
}
.bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 60vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.main {
  height: 100%;
  width: 100%;
}

.hero {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
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

@keyframes slideInLeft {
  0% {
    transform: translateX(-20%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  0% {
    color: transparent;
  }
  100% {
    color: white;
  }
}
</style>
