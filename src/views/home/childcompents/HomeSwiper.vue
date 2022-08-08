<!--  -->
<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.acm">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  // 父组件传banner过来
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  methods: {
    // 监听图片有没有加载完 加载完了就调用这个方法
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style  scoped>
</style>
