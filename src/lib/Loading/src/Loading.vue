<template>
  <div class="v_loading">
    <div class="v_loading_cover" v-if="mask"></div>
    <div class="v_loading_body">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
      <div v-if="text" class="v_loading_text">{{ text }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VarLoading",
  data() {
    return {
      isGlobal: false,
      text: "loading",
      mask: false
    };
  },
  methods: {
    init(options,) {
      this.text = options.text || '';
      this.mask = options.mask
    },
  },
};
</script>
<style lang="scss" >
.v_loading {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  .v_loading_cover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-color: $loading-background-color;
  }

  .circular {
    height: 50px;
    width: 50px;
    animation: loading-rotate 2s linear infinite;

    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: $loading-border-color;
      stroke-linecap: round;
    }
  }

  .v_loading_text {
    color: $loading-text-color;
  }

  @keyframes loading-rotate {
    100% {
      transform: rotate(1turn);
    }
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }

    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }
}
</style>
