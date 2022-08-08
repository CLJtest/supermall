import { request } from "./request";

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommend() {
    return request({
        url: '/recommend'
    })
}

export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowPrice
    }
}
export class Shop {
    constructor(shopInfo) {
        this.name = shopInfo.name
        this.goods = shopInfo.cGoods
        this.sells = shopInfo.cSells
        this.fans = shopInfo.cFans
        this.logo = shopInfo.shopLogo
        this.score = shopInfo.score
    }
}

export class GoodsParam {
    constructor(info, rule) {
        this.image = info.images ? info.images[0] : ''
        this.infos = info.set
        this.sizes = rule.tables
    }
}




// ES6构造函数
// class person{
// // 如果要传数据过来 要在这里构造函数
// constructor (name,age){
//   this.name = name
//   this.age = age
// }
// }

// // 这个p就有name和age属性了
// const p = new person('why',age)