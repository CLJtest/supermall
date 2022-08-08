import BackTop from "components/content/backTop/BackTop.vue";
// 对象 返回顶部
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            // 拿到scroll组件里的scroll属性 再去拿scroll属性里的scrollTo(0,0,500)方法 跳转到那里 最后那个是毫秒数
            // this.$refs.scroll.scroll.scrollTo(0, 0, 1000);
            // 在scroll.js里面封装
            this.$refs.scroll.scrollTo(0, 0, 500);
        },
    }
}