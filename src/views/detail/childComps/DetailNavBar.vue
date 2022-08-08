<!--  -->
<template>
  <div>
    <nav-bar>
      <div slot="left">
        <img
          src="~assets/img/common/back.svg"
          alt=""
          class="back"
          @click="backClick"
        />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="item"
          class="title-item"
          :class="{ active: currentIndex === index }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      // 把这个点击事件发射出去
      this.$emit("titleClick", index);
    },
    backClick() {
      // 返回上一个页面
      this.$router.back();
    },
  },
};
</script>

<style  scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.back {
  margin-top: 10px;
}
.active {
  color: var(--color-high-text);
}
</style>
