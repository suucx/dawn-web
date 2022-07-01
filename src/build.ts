import { Component, createApp } from 'vue';
import projectInit from './common/projectInit'
import { getQueryString } from './utils'
import { baseState } from './common/wmInit'

import { createPinia } from 'pinia'
import '~/utils/rem'


const mode = import.meta.env.MODE
baseState.mode = (mode).split('-')[0];
const isCDN = getQueryString('isCDN');

interface ItemType {
    'title': string,
    'imgFolder': string
}
interface ItemList {
    [prop: string]: ItemType
}

const itemList: ItemList = {
  
    "zodiac": {
        "title": "十二生肖",
        "imgFolder": 'zodiac' // 对应svn上的文件夹名称，跟url中的地址拼接
    },
    "heartRunInto": {
        "title": "心电对对碰",
        "imgFolder": 'duiduipengNew'
    },
    "onePiece": {
        "title": "海贼王",
        "imgFolder": 'onePiece' // 对应svn上的文件夹名称，跟url中的地址拼接
    },
  
}

// 获取 当前游戏的 组件配置 -- component -> 
const getCompItem = (key:string):ItemType => {
    const item = itemList[key];
    return item;
}


if (location.href.indexOf('game.wemew.com') >= 0) {
    // 正式服
    baseState.$imgUrl = 'https://oss.wemew.com/wemew/wechat/appstatic'
    baseState.$domain = 'https://www.wemew.com/wemew/wechat'
    baseState.$ossUrl = 'https://oss.wemew.com/wemew/wechat/appstatic'
    if (isCDN == '1') {
        // 不走cnd
        baseState.$imgUrl = 'https://nocdn-oss.wemew.com/wemew/wechat/appstatic'
        baseState.$ossUrl = 'https://nocdn-oss.wemew.com/wemew/wechat/appstatic'
    }
    else {
        baseState.$imgUrl = 'https://oss.wemew.com/wemew/wechat/appstatic'
        baseState.$ossUrl = 'https://oss.wemew.com/wemew/wechat/appstatic'
    }

    (window as any).imgUrl = baseState.$imgUrl;
}else{
    // "开发环境"
    baseState.$imgUrl = 'https://test.wemew.cn/wemew/wechat/appstatic'
    baseState.$domain = 'https://test.wemew.cn/wemew/wechat'
    baseState.$ossUrl = 'https://test.wemew.cn/wemew/wechat/appstatic'
}

export let Init = async (App: Component) => {
   
    let MODE = baseState.mode;
    const gameItem = getCompItem(MODE)

    //定位到具体游戏文件夹的图片 （gameImgUrl+'test.png'）
    document.title = gameItem.title;
    baseState.$gameImgUrl = baseState.$imgUrl+`/game/${gameItem.imgFolder}/`

    const app = createApp(App);

    app.config.globalProperties.$gameImgUrl = baseState.$gameImgUrl;
    app.config.globalProperties.$imgUrl = baseState.$imgUrl;
    app.config.globalProperties.$ossUrl = baseState.$ossUrl;
    app.config.globalProperties.$domain = baseState.$domain;

    app.use(createPinia()).use(projectInit).mount('#app');
}



