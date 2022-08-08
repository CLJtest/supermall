import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () =>
    import ('../views/home/home')
const Category = () =>
    import ('../views/category/category')
const Shopcart = () =>
    import ('../views/shopcart/shopcart')
const Profile = () =>
    import ('../views/profile/profile')
const Detail = () =>
    import ('../views/detail/Detail')
    //安装插件 
Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/home'
    }, {
        path: '/home',
        component: Home
    }, {
        path: '/category',
        component: Category
    }, {
        path: '/shopcart',
        component: Shopcart
    }, {
        path: '/profile',
        component: Profile
    }, {
        //1. 动态路由
        path: '/detail/:iid',
        component: Detail
            // 2.query配置 goodsListIitem里面配置
            // path: '/detail',
            // component: Detail
    }]
    // 创建路由对象
const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router