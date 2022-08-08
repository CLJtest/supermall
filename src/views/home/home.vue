<!--  -->
<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 这里是障眼法 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>

      <!-- <goods-list :goods="goods[currentType].list" /> -->
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- 要监听一个组件的原生事件时 必须加上.native 原生的 @click.native='' 才能进行监听-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childcompents/HomeSwiper.vue";
import RecommendView from "./childcompents/RecommendView.vue";
import FeatureView from "./childcompents/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
// 写在混入里了
// import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [backTopMixin],
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 默认是一个pop
      currentType: "pop",
      // 写在混入里了
      // isShowBackTop: false,
      tabOffsetTop: 0,
      // 默认情况下不需要吸顶
      isFixed: false,
      // 离开时的位置
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  //离开时会销毁 得在路由那里加上keep-alive
  destroyed() {
    console.log("home destory");
  },
  //回来时跳转的位置
  activated() {
    // 回来时最后进行一次refresh()
    this.$refs.scroll.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  // 离开时记录位置
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  // 生命周期函数 创建这个组件时调用
  created() {
    // 调用这个函数
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //获取tabControl组件的offsetTop
    // 所有组件都有个$el属性：用于获取组件中的元素  在这里获取 很多图片没有加载完 距离是错误的
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 写在混入里了
    // backClick() {
    //   // 拿到scroll组件里的scroll属性 再去拿scroll属性里的scrollTo(0,0,500)方法 跳转到那里 最后那个是毫秒数
    //   // this.$refs.scroll.scroll.scrollTo(0, 0, 1000);
    //   // 在scroll.js里面封装
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },
    contentScroll(position) {
      // 1.判断BackUp是否显示
      this.isShowBackTop = position.y < -1000;
      // console.log(position);

      // 2.决定tabControl是否吸顶 监听轮播图片的获取
      this.isFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // this.$refs.pull.
      // return this.getHomeGoods("pop");
      this.getHomeGoods(this.currentType);
      // 调这个方法才能进行下一次下拉加载更多
      this.$refs.scroll.finishPullUp();

      // 会有一个bug 就是scroll内部会自己算出可滚动区域是多少 但是因为我们滚动区域传入的是一个个的goodsitem 而里面有图片和标题 图片加载是异步操作，有时候请求数据比较慢了 scroll高度却已经算好了 就会导致图片出来后高度撑开饿了 下面的内容显示不出来 这个时候需要我们监听图片加载完 给他refresh()这个方法刷新 让scroll重新计算高度
    },
    swiperImageLoad() {
      // console.log("222");
      // console.log(this.$refs.tabControl2.$el.offsetTop);
      // 组件里拿offsetTop属性要$el
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    // 调用这个函数
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // 拿到这个函数里的data数据 执行完这个方法后数据就没了 所以要保存到data里面 就不会被销毁
        console.log(res);
        // 数据保存下来
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // push(...num) 将数组一次加到一个新数组
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // console.log(res.data.list);
      });
    },
  },
};
</script>

<style  scoped>
/* 这个scoped表示这个页面的css样式只在这个作用域生效 */
#home {
  /* padding-top: 44px; */
  /* height: 3000px; */
  /* vh是视口高度 页面的高度 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /* 这里之所以用fixed是因为一开始用原生js滚动导航会跟着一起滚动 现在用了scroll滚动 这个位置就不需要让他脱标了 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* 设置吸顶  设置了bscroll之后这个吸顶已经不起效果了*/
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  /* height: 300px;*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* 在tab-control组件上绑定:class="{ fixed: isFixed }" 行不通 */
/* .fixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 44px;
  background: white;
} */

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
