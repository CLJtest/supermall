<!--  -->
<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childcompents/HomeSwiper.vue";
import RecommendView from "./childcompents/RecommendView.vue";

import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
  },
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
    };
  },
  // 生命周期函数 创建这个组件时调用
  created() {
    // 调用这个函数
    getHomeMultidata().then((res) => {
      // 拿到这个函数里的data数据 执行完这个方法后数据就没了 所以要保存到data里面 就不会被销毁
      console.log(res);
      // 数据保存下来
      // this.result = res;
      this.banners = res.data.banner;
      this.recommends = res.data.recommend;
    });
  },
};
</script>

<style  scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
}
</style>
