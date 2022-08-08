import { ADD_COUNTER, ADD_TO_CAR } from './mutation-types'

export default {
    // playload是新添加的商品 不论是哪个id 都会添加到同一个数组中 这个时候要对比id 不同的id添加的count归为一组
    addCar(context, playload) {
        // state.carList.push(playload)

        // 方法一
        // let oldProdct = null
        //     // 首先点击一下购物车 先循环carList里面的数组 拿出每一个元素的iid与刚点击添加进来的iid进行对比 如果有相同的商品 就直接把遍历到的这个item给oldProduct 然后id判断oldProdcut有没有值 有的话就把这个oldProduct+1 没有的话 就把新加进来的playload的count+1
        // for (let item of this.context.state.carList) {
        //     if (item.iid === playload.iid) {
        //         oldProdct = item
        //     }
        // }

        // 方法二
        // let product = this.state.carList.find(function(item){
        //     item.iid = playload.iid
        // })
        return new Promise((resolve, reject) => {
            let oldProduct = context.state.carList.find(item =>
                item.iid === playload.iid
            )

            if (oldProduct) {
                // 这里做了第一件事     去muntatain那里做
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前商品数量+1')
            } else {
                // 这里做了第二件事
                playload.count = 1
                    // state.carList.push(playload)
                context.commit(ADD_TO_CAR, playload)
                resolve('添加新的商品')
            }
        })
    }
}