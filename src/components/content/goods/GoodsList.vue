<!--  -->
<template>
  <div class="goods">
    <!-- 根据goods这个数据来决定遍历多少个小的item 放到这里 -->
    <goods-list-item v-for="item in goods" :key="item.acm" :goods-item="item" />
    <!-- {{ goods }} -->
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style  scoped>
.goods {
  /* 所有都在一行显示 */
  display: flex;
  /* 根据宽度占行 */
  flex-wrap: wrap;
  /* 居中 */
  justify-content: space-around;
  padding: 2px;
}
</style>
