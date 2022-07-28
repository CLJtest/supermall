import { request } from "./request";

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
// 把home.vue里的request请求中的type和page穿过来 拼接到url后面 再拼接到request.js文件里的baseURL里 再return回去
export function getHomeGoods(type, page) {
    return request({
        url: "/home/data",
        params: {
            type,
            page
        }
    })
}