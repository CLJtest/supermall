<!--  -->
<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button
        :is-checked="product.checked"
        @click.native="checkClick"
      ></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>

      <div class="item-bottom">
        <div class="item-price left">￥{{ product.price }}</div>
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";

export default {
  name: "CarListItem",
  components: {
    CheckButton,
  },
  data() {
    return {};
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 选中与不选中一定要在对象模型里面进行修改 mutation里面
    checkClick() {
      this.product.checked = !this.product.checked;
    },
  },
};
</script>

<style  scoped>
#shop-item {
  width: 100%;
  display: flex;
  padding: 5px;
  font-size: 0;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 20px;
  display: flex;
  /* 居中排列 */
  justify-content: center;
  /* align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。 */
  align-items: center;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  /* 子绝父相 */
  position: relative;
  font-size: 17px;
  color: #666;
  padding: 5px 10px;
  overflow: hidden;
}
.item-desc {
  font-size: 14px;
  /* color: #666; */
  margin-top: 15px;
}
.item-title,
.item-desc {
  /* 禁止文本自动换行 */
  white-space: nowrap;
  /* clip:当前对象内文本溢出时不显示省略标记(...),而是将溢出部分裁剪。
ellipsis:当对象内文本一处时显示省略标记(...)。 */
  text-overflow: ellipsis;
  /* 显示省略号一定要搭配溢出隐藏 */
  overflow: hidden;
}
.item-bottom {
  margin-top: 10px;
  /* 子绝父相 */
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.item-bottom .item-price {
  color: orangered;
}
</style>
