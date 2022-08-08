import Toast from './Toast'
const obj = {}

obj.install = function(Vue) {
    // 得把Toast里的组件挂载到div上 然后再toast$el 才能把toast对象赋给$tosat??

    //1.创建组件构造器
    const toastConstustor = Vue.extend(Toast)
        //2.new的方式，根据组件构造器 创建出来一个组件对象
    const toast = new toastConstustor()
        //3.将组件对象手动挂载到某一元素上
    toast.$mount(document.createElement('div'))
        //4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    // toast这个组件对象的方法和属性给到$toast这个对象
    Vue.prototype.$toast = toast
}

export default obj