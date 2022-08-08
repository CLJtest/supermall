<!--  -->
<template>
  <div class="car-list">
    <car-list-item
      v-for="(item, index) in carList"
      :key="index"
      :product="item"
    ></car-list-item>
  </div>
</template>

<script>
import CarListItem from "./CarListItem.vue";

import { mapGetters } from "vuex";

// import Scroll from "components/common/scroll/Scroll.vue";

export default {
  name: "ShopCarList",
  components: {
    // Scroll,
    CarListItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["carList"]),
  },
};
</script>

<style  scoped>
/* .car-list {
  position: relative;
  /* z-index: 9; */
/* height: calc(100% - 44px - 49px);
}  */
/* .content {
  overflow: hidden;
  height: 100%;
} */
</style>
