<!--  -->
<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      // 如果this.goodsItem.image为空 返回this.goodsItem.show.img

      // 应该是！ this.goodsItem.image 这里.了image找不到 那就是undefined 就去执行||后面的内容
      return this.goodsItem.image || this.goodsItem.show.img;
      // 但是如果是这个顺序的话 你一开始判断的时候 .show show都找不到 就是undefined 你还要去再用undefined去.img 这个时候就报错了 所以顺序不能换
      // return this.goodsItem.show.img || this.goodsItem.image;
    },
  },
  data() {
    return {};
  },
  methods: {
    itemClick() {
      // console.log("111");
      // 1.动态路由的方法
      this.$router.push("/detail/" + this.goodsItem.iid);
      // 2.query方法
      // this.$router.push({
      //   path:'/detail/',
      //   query:{
      //     this.goodsItem.iid
      //   }
      // })
    },
  },
};
</script>

<style  scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
