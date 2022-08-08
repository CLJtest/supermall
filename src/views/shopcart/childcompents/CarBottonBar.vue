<!--  -->
<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <!-- is-checked这个属性是从checkbutton里来的 -->
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="goCount">去计算：{{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";

export default {
  name: "CarBottonBar",
  components: {
    CheckButton,
  },
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    checkClick() {
      console.log("11");
      if (this.isSelectAll) {
        //全部选中
        // forEach遍历每一个
        this.$store.state.carList.forEach((item) => (item.checked = false));
      } else this.$store.state.carList.forEach((item) => (item.checked = true));
    },
    goCount() {
      // 刚开始没有商品的时候 或者没有选择一个的时候 会弹窗
      if (this.checkLength == 0) {
        this.$toast.show("请选择购买的商品", 800);
      }
      // if (!this.$store.state.carList.find((item) => item.checked)) {
      //   this.$toast.show("请选择购买的商品", 800);
      // }
    },
  },
  computed: {
    // 1.reduce和迭代方法（map、fliter、forEach）一样，会遍历数组；reduce()方法会遍历数组中的每一个元素，每遍历一次就会执行一次回调函数。当遍历完之后会将最后的结果返回出去。
    // 2.reduce( )方法有两个参数，第一个参数是累加函数，第二个是函数的previousValue的初始值。
    totalPrice() {
      // 应当与for循环 item是carlist里面的每个对象 找出每个对象里面的item checked 选中的就是true 就继续下一步render计算
      const number = this.$store.state.carList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          // console.log(preValue);
          // console.log(parseFloat((0.119 * 100).toFixed(10)));
          return preValue + item.price * item.count;
          // 0表示初始化值 从0开始计算
        }, 0);
      return parseFloat(number).toFixed(2);
    },
    checkLength() {
      return this.$store.state.carList
        .filter((item) => item.checked)
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    isSelectAll() {
      // 方法1 使用filter
      // if(this.$$store.state.carList.length === 0) return false
      // return !this.$store.state.carList.filter(
      //   (item) =>
      //     // 遍历没有选中的 有的话就是true 然后再！true 就是false
      //     !item.checked
      // ).length;

      // 方法二 高阶函数
      // !item.checked这里找出有没有没有选中的 有的话就是true 但是要不显示全选就要取反 那就是！true
      return this.$store.state.carList.length === 0
        ? false
        : !this.$store.state.carList.find((item) => !item.checked);

      // 方法三 普通函数
      // if (this.$store.state.carList.length === 0) return false;
      // for (let item of this.$store.state.carList) {
      //   if (!item.checked) {
      //     return false;
      //   }
      // }
      // return true;
    },
  },
};
</script>

<style  scoped>
.bottom-bar {
  height: 40px;
  /* background-color: red; */
  line-height: 40px;
  display: flex;
}
.check-content {
  display: flex;
  /* 图片可以下来  align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。*/
  align-items: center;
  margin-left: 10px;
  /* padding-top: 10px; */
  width: 60px;
}
.check-button {
  height: 20px;
  width: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  flex: 1;
  margin-left: 20px;
}
.calculate {
  background-color: rgb(232, 104, 12);
  width: 100px;
  color: #fff;
  text-align: center;
}
.checked {
  background-color: red;
  border-color: red;
}
</style>
