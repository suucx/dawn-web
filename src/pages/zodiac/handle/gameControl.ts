import { sleep } from "~/utils";
import gamePop from "../component/pop";
import { ajax_gameInitFn, ajax_gameLoopInfo } from "./api";
import { nObjectType, baseUserType, zodiacScoreConfigListType } from "./types"

// 游戏全局状态
export const gameGlobalState:nObjectType = reactive({
    // 游戏场次ID
    gameId: '', 
    // 游戏状态 1 初始化，2 游戏中，3 结束
    gameState: '1', //string 
    // 游戏时长(秒)
    gameTime: 0,
    poolPrizeName: '', //奖品名称
    poolPrizeUrl: '', //奖品图片地址
    poolPrizeCount: 0, //奖池奖品数量
    poolPrizeUnit: '', //奖品单位
    championType: 1, //1 单擂主 3 多擂主
    realTimeChampion: 0, //是否实时擂主 1 是
    championList: [] as baseUserType[], //当前擂主信息 已排序
    freeTimes: 0, //免费支付次数
    singlePrice: 0, //	number	单抽价格
    sixPrice: 0, //	number	6连抽价格
    twelvePrice: 0, //	number	12连抽价格
    acquiredZodiacList: [] as number[], //已获得生肖

    zodiacScoreCfg: [] as zodiacScoreConfigListType,
    
    // 其他配置
    isShake: false, //是否抖动屏幕
    isShowChangeRankUserBg: false, //是否替换新擂主
    lastTs: null, //上次轮训时间
    gameLoopInterTime: 5000,
})

// 设置游戏状态
const setGameState = (state: nObjectType) => {
    for (const key in state) {
        if (Object.prototype.hasOwnProperty.call(gameGlobalState, key)) {
            gameGlobalState[key] = state[key]
        }
    }
    console.log('游戏状态->', gameGlobalState)
}

// 初始化游戏数据
export const gameGlobalStateInit = async () => {
    // 调用游戏初始化接口
    const res = await ajax_gameInitFn();
    console.warn('调用游戏初始化接口', res.resultMsg);
    if (res.isResultTrue){
        const state = res.resultMsg as nObjectType;
        setGameState(state)
        console.log('游戏初始化数据 gameGlobalState=>', gameGlobalState)
    }
    
    // 游戏轮训状态查询
    loopGetGameOpenInfo()
    return true
}

// -获取游戏状态
const getGameOpenInfo = async () => {
    gameGlobalState.lastTs = new Date().getTime();
    const res = await ajax_gameLoopInfo(gameGlobalState.gameId, gameGlobalState.lastTs)
    if (res.isResultTrue) {
        const state = res.resultMsg as nObjectType;
        // 第一次监听到游戏结束
        if (state.gameState === '3') {
            if (gameGlobalState.gameState !== '3') {
                gamePop({
                    type: state.winner === 1 ? 'gameGetPrize' : 'gameTip',
                    props: {
                        winner: state.winner, //number	是否获得擂主奖励 1 是
                        winnerPrize: state.winnerPrize, //	json	擂主奖励
                    }
                })
                setGameState(state)
            }
            return
        }
        setGameState(state)
    } 
    return true;
}
// 结果轮询
const loopGetGameOpenInfo = async () => {
    await getGameOpenInfo()
    await sleep(gameGlobalState.gameLoopInterTime)
    loopGetGameOpenInfo();
}