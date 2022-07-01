// 十二生肖-大屏 接口

import http from "~/common/http";
import { baseState } from "~/common/wmInit"

// 游戏初始化
export const ajax_gameInitFn = async () => {
    return await http({
        type: 'get',
        url: `/cwechat/zodiac/initGame?barId=${baseState.barId}`, 
    });
}

// 下单支付接口
export const ajax_gamePlaceOrder = async(gameId: string, purchaseCount:number) => {
    return await http({
        type: 'post',
        url: `/cwechat/zodiac/placeOrder`, 
        data: {gameId: gameId, purchaseCount: purchaseCount}
    });
}

// 支付后 获取信息
export const ajax_getOpenInfo = async(gameId: string, orderId: string) => {
    return await http({
        type: 'get',
        url: `/cwechat/zodiac/getOpenInfo?gameId=${gameId}&orderId=${orderId}`, 
    });
}

// 游戏 轮询
export const ajax_gameLoopInfo = async (gameId: string, lastTs:number) => {
    return await http({
        type: 'get',
        url: `/cwechat/zodiac/loop?gameId=${gameId}`, 
    });
}

// 查询获奖信息
export const ajax_gameGetPrizeInfo = async(barId: string) => {
    return await http({
        type: 'get',
        url: `/cwechat/zodiac/prizeList?barId=${barId}`, 
    });
}

// 游戏兑奖 prizeType 1 集齐十二生肖奖品  3 奖池奖品
export const ajax_gameCashPrize = async(gameId: string, prizeType: number, recordId: string) => {
    return await http({
        type: 'post',
        url: `/cwechat/zodiac/cashPrize`, 
        data: {gameId: gameId, prizeType: prizeType, recordId: recordId}
    });
}

// 十二生肖-移动端-获取12生肖奖品信息
export const ajax_getZodiacPrize = async(gameId: string) => {
    return await http({
        type: 'get',
        url: `/cwechat/zodiac/zodiacPrize?gameId=${gameId}`, 
    })
}