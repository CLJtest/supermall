<!--  -->
<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" :key="item">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  // 获取顶部图片
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style  scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
