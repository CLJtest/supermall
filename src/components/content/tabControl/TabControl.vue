<!--  -->
<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 上面点击了item之后 要把事件传出去
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style  scoped>
.tab-control {
  display: flex;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.active {
  /* color: #ff5777; */
  color: var(--color-high-text);
}
.tab-control-item span {
  padding: 5px;
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
