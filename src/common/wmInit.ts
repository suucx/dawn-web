import { getQueryString } from '../utils'
import { useStore } from '../store'
// import http from './http'
// import { reactive } from 'vue'


export const baseState = reactive({
    barId: getQueryString('barid'),
    search:location.search,
    $gameImgUrl: '', //游戏资源目录
    $imgUrl: '',
    $ossUrl: '',
    $domain: '',
    mode: '',
})
// 
const wemewInitControl = {
    async start() {
        let res = await this.getBarInfo();
        return res
    },
    async getBarInfo() {
        if(!baseState.barId){
            alert("未获取到酒吧信息");
            return false;
        }
        const store = useStore();
        const res = await store.getUserInfo();
        console.log('res', res)
        return true
    }
}

export default wemewInitControl