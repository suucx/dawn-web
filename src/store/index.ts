import { defineStore } from "pinia";
import { getQueryString, getUrlHead } from "../utils";
import $http from '../common/http'
/**
 * 三种传参方式
 * @param id - id of the store (must be unique)
 * @param options - options to define the store
 * 
 * @param options - options to define the store
 * 
 * @param id - id of the store (must be unique)
 * @param storeSetup - function that defines the store
 * @param options  - extra options 可不传
 */

export type baseState = {
    barId: string;
    barBase: IObj;
    user: IObj;
}
export type typeParams = {
    [propsName: string]: any
}
export type IObj = {
    id: string;
} & typeParams
//base Store
export const useStore = defineStore({
    id: 'base',
    state: ():baseState => {
        return {
            barId: getQueryString('tcbid') || getQueryString('barid') || getQueryString('barId') || '',
            barBase: {
                id: getQueryString('tcbid') || getQueryString('barid') || getQueryString('barId') || ''
            },
            user: {
                id: ''
            },
        }
    },
    getters: {
        barId(state) {
            return state.barBase.id
        },
        //余额
        cash(state) {
            return state.user.cash
        },
        //喵币
        wmCoin(state) {
            return state.user.redbag
        },
        //免费打赏次数
        dsFree(state) {
            return state.user.free
        }
    },
    actions: {
        //获取用户信息
        async getUserInfo() {
            const res = await $http({
                type: 'postForm',
                url: '/wxLoginUserInfo?r=' + Math.random(),
                data: {barId: this.barId}
            })
            // console.log('获取用户信息', res)
            //获取用户数据失败
            if (!res.isResultTrue) {
                localStorage.clear();
                const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                try {
                    if (keys) {
                        for (let i = keys.length; i--;) {
                            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
                            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
                            document.cookie = keys[i] + '=0;path=/;domain=wemew.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
                        }
                    }
                } catch (error) {
                    console.log('error=>\n', error);
                }

                return window.location.href = getUrlHead() + '/userWeiXinAuthLogin';
                // return window.location.href = getUrlHead() + '/fcWechatLoginAuth';
                // return window.location.href = getUrlHead() + '/pkAuthLoginRequest?source=' + feichaoCode(window.location.href);
            } 
            //设置基本信息
            let resObj: typeParams = {}
            try {
                if (typeof res.resultMsg === 'string') {
                    resObj = JSON.parse(res.resultMsg)
                } else {
                    resObj = res.resultMsg
                }
            } catch (error) {
                console.log('error', error)
            }
            console.log('设置基本信息', resObj)
            if (resObj.barbase && resObj.user) {
                this.barBase = resObj.barbase
                this.user = resObj.user
            }
            return true
        },
    
        //设置 用户信息 余额 喵币等
        setMyInfo(myInfo: typeParams) {
            this.user = Object.assign({ ...this.user }, { ...myInfo })
            // this.user.cash = myInfo.cash; //余额
            // this.user.redbag = myInfo.redbag; //喵币
            // this.user.free = myInfo.free; // 免费次数
        },
    }
})
