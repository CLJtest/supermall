import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/index'
Vue.config.productionTip = false

// 安装toast对象 一旦vue.use 就会调用toast对象的install
Vue.use(toast)

// 解决移动端300ms延迟问题 先npm install安装 导入 然后attach
FastClick.attach(document.body)

// 图片懒加载   图片引用src要改成v-lazy
Vue.use(VueLazyLoad)



new Vue({
    render: h => h(App),
    router,
    store,
    toast
}).$mount('#app')