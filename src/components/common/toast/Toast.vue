<!--  -->
<template>
  <div class="toast" v-show="isShow">
    <div class="content">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message = "请输入", duration = 800) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
  // props: {
  //   message: {
  //     type: String,
  //     default() {
  //       return "111";
  //     },
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default() {
  //       return false;
  //     },
  //   },
  // },
};
</script>

<style  scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 8px 10px;
  border-radius: 8px;
  z-index: 9;
}
</style>
