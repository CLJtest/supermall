<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- <div>
        {{ $store.state.carList }}
      </div> -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shops="shops"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @datailImageLoad="detailImageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="param"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCar="addToCar"></detail-bottom-bar>
    <!-- 返回顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <tocast :message="message" :is-show="isShow"></tocast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

// import Toast from "components/common/toast/Toast.vue";

import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { backTopMixin } from "common/mixin";
import { mapActions } from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      // 空对象
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      product: {},
      // message: "",
      // isShow: false,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    // Toast,

    Scroll,
    GoodsList,
  },
  mixins: [backTopMixin],
  // 当创建这个组件是就把这个iid记下来
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;
    // 另一种方法query
    // this.iid = this.$route.query.iid

    // 根据iid请求详细数据
    this.getDetail(this.iid);
    // 请求推荐数据
    this.getRecommend();
    // 当组件created完的时候 就会有这个函数 这个时候debounce就会开始执行第一次距离计算  当传过来一张图片时 detailImageLoad()函数里的this.getThemeTopYs()就会被调用一次 防抖里面就会再次开始执行 当防抖里面的延时还没有结束 又来了一张图片 detailImageLoad()又调用一次 防抖就会传入新的func定义getThemeTopYs函数 这个时候timer不是空的 就会清除掉上次执行一般的操作 继续一次新的请求
    // this.getThemeTopYs这就是一个防抖函数 当下面
    this.getThemeTopYs = this.debounce(() => {
      // push到themeTopYs这个数组中去
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop || "");
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 300);
    // console.log(this.getThemeTopYs);
    // 这里的this.getThemeTopYs就是这个防抖函数 相当于获取到一个新照片 防抖函数就会重新计算一次
    // ƒ (...args) {
    //     if (timer) {
    //       clearTimeout(timer);
    //     }

    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   }
  },
  methods: {
    ...mapActions(["addCar"]),
    // 防抖动函数
    debounce(func, delay) {
      // func就是要做防抖动效果的函数 delay是延时时间  刚进来这个函数的时候timer赋初值null return一个函数 第一次
      // timer是空 所以执行下面的setTimeout函数 setTimeout函数中有一个延时时间 而延时时间还没过的时候 第二张图片已经过来了 这个时候会再调用一次这个函数 的if timer 这个时候timer里面是有数据在等待处理的 那就clearTimeout掉 直到执行到了最后一次 延时时间过了 就执行func.apply
      let timer = null;
      return function (...args) {
        if (timer) {
          // console.log(timer);
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    // 这里要有一个图片加载完后再渲染的方法
    detailImageLoad() {
      // console.log("---");
      // 这个问题其实btscroll2已经解决了 加上overImg = ture就可以了
      // this.$refs.scroll.scroll.refresh();
      // 因为没加载一张图片 这里就会执行一次 所以可以做个防抖 防抖就是在一定时间内等一下 看看是否有相同操作 有的话 先不执行 等全部图片请求完了 再执行一次就可以了

      // 但是这个时候图片还没过来 要把函数写在detailImageLoad方法里面 等待照片都请求过来了 在调用 但是这里有多少图片就会调用多少次 太频繁了 用防抖
      // push到themeTopYs这个数组中去
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
      // 在这里调用这个函数 这个函数就会等图片加载完了再执行 但是图片很多 要执行很多次 就去防抖那里
      this.getThemeTopYs();
      // console.log(this.getThemTopYs);这个函数调用有几张图片就会调用几次 但是前几次调用的都是underfind 因为里面做了防抖
    },
    // 点击标题 跳转到指定位置
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 100);
    },
    // 联动效果
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;
      // console.log(positionY);
      // 滚动数值与主题中的值进行比较
      // [0, 5735, 6496, 6805]
      // positionY在0-5735之间 index=0
      // positionY在5735-6496之间 index=1
      // positionY在6796-6805之间 index=2
      // positionY大于等于6805 index=3

      // 普通做法
      // let length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex != i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTopYs[i]))
      //   ) {
      //     this.currentIndex = i;
      //     console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }

      // hack做法 在数组后面多加一个值
      let length = this.themeTopYs.length;
      // 因为数组多了一个最大值 所以length-1
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 2.判断BackUp是否显示
      this.isShowBackTop = position.y < -1000;
    },
    // 购物车
    addToCar() {
      // 1.获取
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 2将商品添加到购物车里
      // 传到mutation里
      // this.$store.commit("addCar", product);
      // 传到vuex action里面
      // this.$store.dispatch("addCar", product);

      // 用映射的方法把actions中的addCar这个方法映射到这个组件来import
      // this.addCar(product).then((res) => {
      //   console.log(res);
      //   this.isShow = true;
      //   this.message = res;
      //   setTimeout(() => {
      //     this.isShow = false;
      //     this.message = "";
      //   }, 500);
      // });

      // 用自定义插件来渲染toast
      this.addCar(product).then((res) => {
        this.$toast.show(res, 800);
      });
    },

    // 网络请求的相关方法
    getDetail(iid) {
      getDetail(iid).then((res) => {
        // 1.获取数据
        console.log(res);
        // 2.获取顶部图片轮播数据
        this.topImages = res.result.itemInfo.topImages;
        // 3.获取商品详情信息
        this.goods = new Goods(
          res.result.itemInfo,
          res.result.columns,
          res.result.shopInfo.services
        );
        // 4.获取店铺信息
        this.shops = new Shop(res.result.shopInfo);
        // 5.获取商品详细信息
        this.detailInfo = res.result.detailInfo;
        // 6.获取商品参数信息
        this.paramInfo = new GoodsParam(
          res.result.itemParams.info,
          res.result.itemParams.rule
        );
        //7.取出评论的信息
        if (res.result.rate.cRate !== 0) {
          this.commentInfo = res.result.rate.list[0];
        }

        // nextTick这个函数要求传一个回调函数 是把组件渲染完了 再来回调一次这个函数 但是还是不想 因为图片还没获取过来 所以得去上面的detailImageLoad方法那里
        // setTimeout(() => {
        //   // 这里不能用定时器 要把这个放到等待图片加载完在执行 并且防抖？？？？很乱 不想做 视频P206
        //   this.$nextTick(() => {
        //     // push到themeTopYs这个数组中去
        //     this.themeTopYs.push(0);
        //     this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //     console.log(this.themeTopYs);
        //   });
        // }, 0);
      });
    },
    getRecommend() {
      getRecommend().then((res) => {
        // console.log(res);
        this.recommends = res.data.list;
        // console.log(res.data.list);
      });
    },
  },
};
</script>

<style  scoped>
#detail {
  /* 因为tabbar脱离了标准流 会浮在上面 所以要给详情页加相对定位 z-index */
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
  background-color: #fff;
  overflow: hidden;
}
.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 9;
}
</style>
