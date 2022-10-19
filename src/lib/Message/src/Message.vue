<template>
  <div class="v_message" :style="{top:top+'px'}" :class="{ }">
    <div class="v_message_body" ref="v_message_body" :class="{ [type]: type,message_open: open, message_close: close }">
      <img v-if="type && type==='success'" class="icon" src="./images/success.svg" alt="">
      <img v-if="type && type==='warning'" class="icon" src="./images/warning.svg" alt="">
      <img v-if="type && type==='error'" class="icon" src="./images/error.svg" alt="">
      <img v-if="type && type==='tips'" class="icon" src="./images/tips.svg" alt="">
      <div class="v_message_content">{{ msg }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VarMessage",
  data() {
    return {
      msg: "",
      type: "default",
      open: false,
      close: false,
      top: '0',
      style: {},
    };
  },
  beforeUnmount() {
  },
  methods: {
    init(type, msg, index) {
      this.top = 30 + (index - 1) * 50
      this.type = type;
      this.msg = msg;
      this.open = true;
      setTimeout(() => {
        this.$refs.v_message_body.addEventListener('animationend', () => {
          this.end()
        }, {
          once: true
        })
        this.close = true;
      }, 3000);
    },
    setTop(index) {
      this.top = 30 + (index - 1) * 50
    },
  },
};
</script>
<style lang="scss" >
.v_message {
  position: fixed;
  // top: -30px;
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%);
  transition: all 0.2s linear;

  .v_message_body {
    min-width: 300px;
    min-height: 40px;
    align-items: center;
    padding: 0 20px;
    border-radius: 4px;
    display: flex;

    &.message_open {
      animation: show .2s linear;
      // animation-fill-mode: forwards;
    }

    @keyframes show {
      from {
        // transform: translateX(-50%) translateY(-30px);
        opacity: 0;
      }

      to {
        // transform: translateX(-50%) translateY(10px);
        opacity: 1;
      }
    }

    &.message_close {
      animation: hide .2s linear;
      animation-fill-mode: forwards;
    }

    @keyframes hide {
      from {
        transform: translateY(0px);
        opacity: 1;
      }

      to {
        transform: translateY(-30px);
        opacity: 0;
      }
    }

    .icon {
      flex-shrink: 0;
      display: block;
      width: 20px;
      height: 20px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      margin-right: 10px;
    }

    .v_message_content {
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 600px;
      overflow: hidden;
    }



    &.success {
      background-color: $message-success-background-color;
      color: $message-success-color;
    }

    &.warning {
      background-color: $message-warning-background-color;
      color: $message-warning-color;
    }

    &.error {
      background-color: $message-error-background-color;
      color: $message-error-color;
    }

    &.tips {
      background-color: $message-tips-background-color;
      color: $message-tips-color;
    }
  }
}
</style>
