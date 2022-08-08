<!--  -->
<template>
  <div class="car">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ carLength }})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <shop-car-list></shop-car-list>
    </scroll>
    <car-botton-bar></car-botton-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll.vue";

import ShopCarList from "./childcompents/ShopCarList";
import CarBottonBar from "./childcompents/CarBottonBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "Shopcart",
  data() {
    return {};
  },
  components: {
    NavBar,
    Scroll,
    CarBottonBar,

    ShopCarList,
  },
  computed: {
    // carLenght() {
    //   return this.$store.state.carList.length;
    // },
    // 要改名字的话写对象 否则写数组
    ...mapGetters(["carLength"]),
  },
  activated() {
    // console.log("active");
    this.$refs.scroll.scroll.refresh();
  },
};
</script>

<style  scoped>
.car {
  position: relative;
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>
