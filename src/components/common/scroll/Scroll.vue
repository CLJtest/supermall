<!--  -->
<template>
  <!--
   ref如果是绑定在组件的，那么通过 this.$refs.refname 获取到的是一个组件对象
  ref如果是绑定在普通的元素中，那么通过this.$refs.refname 获取到的是一个元素对象
-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
      // 控制div元素可不可以店址
      click: true,
      // taps: true,
      // 会检测 scroller 内部 DOM 变化，自动调用 refresh 方法重新计算来保证滚动的正确性。它会额外增加一些性能开销，如果你能明确地知道 scroller 内部 DOM 的变化时机并手动调用 refresh 重新计算，你可以把该选项设置为 false。
      observeDOM: true,
      observeImage: true,
      probeType: this.probeType,
      // 下拉加载更多 不一定每个页面都要
      pullUpLoad: this.pullUpLoad,
    });
    // 监听滚动事件
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      // 把这个事件发出去 自定义事件scroll  谁要用这个事件就@这个事件 还要把probeType改成3
      this.$emit("scroll", position);
    });
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        console.log("上拉加载更多");
        this.$emit("pullingUp");
        // scroll.finishPullUp() ;调这个方法才能进行下一次下拉加载更多
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>


<style  scoped>
</style>
