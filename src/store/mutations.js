import { ADD_COUNTER, ADD_TO_CAR } from './mutation-types'

export default {
    [ADD_COUNTER](state, playload) {
        playload.count++
    },
    [ADD_TO_CAR](state, playload) {
        // 选中与不选中一定要在对象模型里面进行修改
        playload.checked = true
        state.carList.push(playload)

    }
}