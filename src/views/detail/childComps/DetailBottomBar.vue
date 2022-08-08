<!--  -->
<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <div class="icon service"></div>
        <span class="text">客服</span>
      </div>
      <div>
        <div class="icon shop"></div>
        <span class="text">店铺</span>
      </div>
      <div>
        <div class="icon select"></div>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="car" @click="addToCar">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  data() {
    return {};
  },
  methods: {
    addToCar() {
      this.$emit("addCar");
    },
  },
};
</script>

<style  scoped>
.bottom-bar {
  height: 49px;
  background-color: #fff;
  /* position: fixed; */
  position: relative;
  bottom: 0;
  z-index: 9;
  display: flex;
  text-align: center;
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item > div {
  flex: 1;
}
.bar-left .text {
  font-size: 13px;
}
.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 5px auto 3px;
  /* 可以设置的属性分别是：background-color, background-position, background-size, background-repeat, background-origin, background-clip, background-attachment,和background-image。如果上述值缺少一个，这不要紧，也是可以的。
语法：background: bg-color bg-image-position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit; */
  /* 第一个0是背景颜色0 第二个0是背景位置起始位置是0  100%是bg-size大小是100%*/
  background: url(~assets/img/detail/detail_bottom.png) 0 0/100%;
}
.bar-left .service {
  background-position: 0 -53px;
}
.bar-left .shop {
  background-position: 0 -98px;
}
.bar-right {
  font-size: 14px;
  line-height: 49px;
}
.bar-right .car {
  background-color: #ffe817;
  color: #333;
}
.bar-right .buy {
  color: #fff;
  background-color: #f69;
}
</style>
