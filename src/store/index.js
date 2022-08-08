import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 1.安装插件
Vue.use(Vuex)
const state = {
        carList: []
    }
    // 2..创建时store对象
const store = new Vuex.Store({
        state,
        // mutation唯一的目的就是修改state中的状态
        // mutation中的方法尽可能完成的事件比较单一一点 
        mutations,
        actions,
        getters
    })
    // 3.挂载vue实例上
export default store