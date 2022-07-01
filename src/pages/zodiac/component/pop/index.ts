import { handleView } from "~/common/createMyApp";

import gamePrizePopView from './gamePrizePop.vue'
import gameGetPrizePopView from './gameGetPrizePop.vue'
import gameResultPopView from './challengeResultPop.vue'
import gameMyPrizePopView from './gameMyPrize.vue'
import gameRulePopView from './gameRulePop.vue'
import gameTipPopView from './gameTipPop.vue'


import { ajax_gameCashPrize, gameGlobalState, gamePopOptionsType, gamePrizeItemType } from "../../handle";
import { Toast } from "vant";
import { sleep } from "~/utils";
// 十二生肖弹窗 方法
const gamePop = (options: gamePopOptionsType) => {
    switch (options.type) {
        case 'gameTip': //游戏未获奖提示弹窗
            gameTipPop()
            break;
        case 'gameRule': //游戏奖品--特殊
            gameRulePop()
            break;
        case 'gameMyPrize': //游戏奖品--特殊
            gameMyPrizePop(options)
            break;
        case 'gamePrize': //游戏奖品--集齐十二生肖 --
            gamePrizePop(options)
            break;
        case 'gameGetPrize': //游戏奖品--刚获得
            gameGetPrizePop(options)
            break;
        case 'gameResult': //挑战结果- 抽取结果展示弹窗
            gameResultPop(options)
            break;
    
        default:
            break;
    }
}




// 游戏规则弹窗
const gameRulePop = () => {
    const instance = handleView({}, gameRulePopView)

    return instance
}

// 游戏未获奖提示弹窗
const gameTipPop = () => {
    const instance = handleView({
        methods: {
            handleClose() {
                window.location.reload();
            }
        }
    }, gameTipPopView)

    return instance
}


// 我的奖品
const gameMyPrizePop = (options: gamePopOptionsType) => {
    console.log('我的奖品', options)
    const instance = handleView({
        props: options.props || {}
    }, gameMyPrizePopView)

    return instance
}

// 游戏获得奖品弹窗
const gameGetPrizePop = (options: gamePopOptionsType) => {
    const instance = handleView({
        props: options.props || {},
        methods: {
            async handleClick(item: gamePrizeItemType) {
                const loading = Toast.loading({
                    duration: 0,
                    message: `兑换中`,
                    forbidClick: true,
                });
                const res = await ajax_gameCashPrize(item.gameId, item.prizeType, item.recordId!)
                loading.clear()
            
                if (res.isResultTrue) {
                    Toast.success(res.resultMsg || '兑换成功')
                    
                    await sleep(1000);
                    window.location.reload();
                } else {
                    Toast.fail(res.resultMsg || '兑换失败')
                }
            },
            handleClose() {
                window.location.reload();
            }
        }
    }, gameGetPrizePopView)

    return instance
}
// 十二生肖的奖品
const gamePrizePop = (options: gamePopOptionsType) => {
    const instance = handleView({
        props: options.props || {},
        methods: {
            async handleClick(availableCash: number, recordId: string) {
                if (availableCash === 1) {
                    const loading = Toast.loading({
                        duration: 0,
                        message: `加载中`,
                        forbidClick: true,
                    });
                    const res = await ajax_gameCashPrize(gameGlobalState.gameId, 1, recordId)
                    loading.clear()
                    if (res.isResultTrue) {
                        Toast.success(res.resultMsg || '兑换成功')
                    } else {
                        Toast.fail(res.resultMsg)
                    }
                }

                instance.close()
            }
        }
    }, gamePrizePopView)

    return instance
}

// 挑战结果弹窗
const gameResultPop = (options: gamePopOptionsType) => {
    const instance = handleView({
        props: options.props,
        methods: {
            handleClick() {
                // 再来一次 关闭弹窗 拉起支付

                instance.close()
                
            }
        }
    }, gameResultPopView)
}



// 我的奖品弹窗


// 默认导出游戏弹窗 的 公共方法
export default gamePop;