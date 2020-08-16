<template>
  <intersect
    @enter="visible = true"
    @leave="visible = false"
    :threshold="[0.1, 0.1]"
  >
    <div class="section hero">
      <div class="cool-square left" v-bind:class="{ visible }">
        <div class="text">
          <h1>Ham's Github Project Collection</h1>
          <h2>Coming Soon</h2>
          <p>
            I'm still procrastinating, but this is something that may look cool
          </p>
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
</template>

<script>
import Intersect from "vue-intersect";
export default {
  name: "Hero",
  props: ["observer"],
  components: { Intersect },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onElementObserved(entries) {
      console.log(entries);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/theme.scss";

.hero {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}
.text {
  h1 {
    margin-bottom: 8px;
  }
  h2 {
    margin-bottom: 4px;
  }
}
.visible {
  animation: 1s ease 0s 1 slideInLeft;
  .text {
    animation: 1s ease 1s 1 fadeIn;
    animation-fill-mode: both;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px black;
  padding: 24px;
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
