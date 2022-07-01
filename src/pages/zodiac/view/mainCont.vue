<template>
    <div class="main-container">
        <page-head></page-head>

        <div dec="擂主容器" class="rank-cont">
            <div class="rank-cont-box">
                <div 
                    dec="当前擂主"
                    v-show="rankTopInfo.nickname" 
                    class="rank-top-info-text" 
                >
                    <span>当前擂主：</span>
                    <span class="rank-top-user-info-text">
                        <span :class="`${rankTopInfo.nickname && rankTopInfo.nickname.length > 6 ? 'hasAni': ''}`" v-html="rankTopInfoText"></span>
                    </span>
                </div>
                <div class="prize-name-text " dec="奖品名字信息" v-html="prizeNameText" :data-name="prizeNameText"></div>
                <div clas class="prize-number-box">
                    <span class="prize-number clo_text" v-html="gameGlobalState.poolPrizeCount"
                        :data-name="gameGlobalState.poolPrizeCount"></span>
                    <span class="prize-unit clo_text" v-html="gameGlobalState.poolPrizeUnit"
                        :data-name="gameGlobalState.poolPrizeUnit"></span>
                </div>
            </div>
            <div class="jackpot-box">
                <img class="jackpot-img" dec="奖品图标" :src="gameGlobalState.poolPrizeUrl">
            </div>
        </div>

        <div dec="生肖转盘容器" class="turan-table-cont">
            <turn-table></turn-table>
        </div>

        <div dec="按钮容器" class="pay-btn-cont">
            <payBtn v-for="item in payBtnList" :btnText="item.btnText" :otherText="item.otherText" :type="item.type"
                @click="handlePayClick(item.id)" />
        </div>
    </div>
</template>

<!-- 正常游戏 状态容器 -->
<script lang="ts" setup>
import { Toast } from 'vant'
import wechatPay from '~/utils/wechatPay'
import { ajax_gamePlaceOrder, ajax_getOpenInfo, gameGlobalState, nObjectType } from '../handle';
import pageHead from '../component/pageHead.vue'
import turnTable from '../component/turnTable.vue';
import payBtn from '../component/payBtn.vue'
import { sleep } from '~/utils';
import gamePop from '../component/pop';

// 当前擂主信息
const rankTopInfo = computed(() => {
    return gameGlobalState?.championList[0] || {}
})
const rankTopInfoText = computed(() => {
    if (rankTopInfo.value) {
        return `${rankTopInfo.value.nickname}（${rankTopInfo.value.score}）分`
    } else {
        return ''
    }
})

// 奖品名字信息
const prizeNameText = computed(() => {
    return `酒吧赠送${gameGlobalState.poolPrizeName}`
})
// 获取次数
const getTimes = (total:number, unit:number) => {
    return Math.floor(total/unit)
}

const payBtnList = computed(() => {
    let times6 = getTimes(gameGlobalState.freeTimes, 6);
    let times12 = getTimes(gameGlobalState.freeTimes, 12);
    return [
        {
            btnText: '一连抽',
            otherText: gameGlobalState.freeTimes ? '剩余免费'+gameGlobalState.freeTimes+'次' :gameGlobalState.singlePrice + '元',
            type: 'normal',
            id: 1,
        },
        {
            btnText: '六连抽',
            otherText: times6 ? '剩余免费'+times6+'次': gameGlobalState.sixPrice + '元',
            type: 'normal',
            id: 6,
        },
        {
            btnText: '十二连抽',
            otherText: times12  ? '剩余免费'+times12+'次': gameGlobalState.twelvePrice + '元',
            type: 'twelve',
            id: 12,
        }
    ]
})


let loopCheckTime = 1000; //轮训间隔时间
let loopCheckNum = 0; //轮训次数
let loopCheckMaxNum = 10; // 轮训最大次数
let loopCheckLoading:any;
// 点击下单
const handlePayClick = async(id: number) => {
    let loading = Toast.loading({
        duration: 0,
        message: `支付中`,
        forbidClick: true,
    });
    // 调用下单结果
    const orderRes = await ajax_gamePlaceOrder(gameGlobalState.gameId, id);
    loading.clear();

    console.log(orderRes)
    if (orderRes.isResultTrue) {
        let { treeMap, orderId } = (orderRes.resultMsg as nObjectType)
        let code = treeMap.code;
        if (code === 'wechat') {
            const wechatPayRes = await wechatPay(treeMap, orderId);

            if (wechatPayRes !== 'ok') return;
        }
        
        loopCheckNum = 0;
        loopCheckLoading = Toast.loading({
            duration: 0,
            message: `获取支付结果`,
            forbidClick: true,
        });
        // 获取支付结果
        return checkOrderState(orderId)
    }
    // 提示
    return Toast.fail(orderRes.resultMsg || '下单失败')
}

// 检测支付结果
const checkOrderState = async (orderId: string) => {
    loopCheckNum++;
    if(loopCheckNum>=loopCheckMaxNum) return;
    // payState	string	支付状态 0 未支付 1 已支付 2 已退款
    const payRes = await ajax_getOpenInfo(gameGlobalState.gameId, orderId);
    console.log(orderId, payRes)
    if (payRes.isResultTrue) {
        let payState = (payRes.resultMsg as nObjectType).payState;
        if (payState === '3') {
            if (loopCheckLoading) loopCheckLoading.clear();
            Toast.success('游戏已结束，正在退款中')
            return
        }
        if (payState === '1') {
            if (loopCheckLoading) loopCheckLoading.clear();
            // 展示支付结果
            return gamePop({
                type: 'gameResult',
                props: payRes.resultMsg as nObjectType
            })
        }
    }
    await sleep(loopCheckTime)
    // 继续查询
    return loopCheckOrderState(orderId)
}
const loopCheckOrderState = (orderId:string) => {
    checkOrderState(orderId)
}

</script>

<style lang="scss" src="../component/pop/popStyle.scss">
</style>
<style lang="scss" scoped>
.main-container {
    box-sizing: border-box;
    padding-top: 200px;

    .rank-cont {
        position: relative;
        width: 100%;
        height: 210px;
        padding: 0 24px;
        box-sizing: border-box;
        background: url($imgUrl + '/game/zodiac/rank_cont_bg.png') no-repeat center/cover;

        .rank-cont-box {
            position: absolute;
            left: 0;
            height: 100%;
            width: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .rank-top-info-text {
                width: 100%;
                padding-left: 100px;
                position: relative;
                font-size: 32px;
                font-family: PangMenZhengDao;
                display: flex;

                span {
                    display: inline-block;
                    white-space: nowrap;
                    background: linear-gradient(180deg, #fef2cf 0%, #cd9850 100%);
                    background-clip: text;
                    -webkit-background-clip: text;

                    -webkit-text-fill-color: transparent;
                    color: transparent;
                    width: 140px;

                    &.rank-top-user-info-text {
                        flex: 1;
                        overflow: hidden;
                        position: relative;

                        span {
                            position: absolute;
                            width: auto;
                            left: 0;
                            display: inline-block;
                            margin-right: 200px;
                            white-space: nowrap;
                            &.hasAni {
                                animation: slideToleft 10s linear infinite;
                                
                            }
                            
                        }
                        @keyframes slideToleft {
                            to {
                                transform: translateX(-100%);
                            }
                        }
                    }
                }
            }

            .prize-name-text {
                position: relative;
                white-space: nowrap;
                color: transparent;
                font-size: 42px;
                line-height: 1.5;
                letter-spacing: 1px;

                &::before,
                &::after {
                    content: attr(data-name);
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%, 0);
                }

                &::before {
                    text-shadow: 0px 0px 10px #8E1F01, 0px 0px 20px rgba(142, 32, 1, 0.803), 0px 0px 30px rgba(142, 32, 1, 0.6), 0px 0px 40px rgba(142, 32, 1, 0.4);
                }

                &::after {
                    background: linear-gradient(180deg, #ffffff 0%, #ffb88d 100%);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
        }

        .prize-number-box {

            height: 80px;
            white-space: nowrap;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            .prize-number {
                font-family: PangMenZhengDao;
                font-size: 80px;
                color: transparent;
            }

            .prize-unit {
                height: 60px;
                line-height: 60px;
                font-family: PangMenZhengDao;
                font-size: 34px;
                color: transparent;
            }
        }


        .jackpot-box {
            position: absolute;
            right: 24px;
            bottom: 26px;
            width: 220px;
            height: 242px;
            background: url($imgUrl + '/game/zodiac/jackpot_bg.png') no-repeat center/cover;

            .jackpot-img {
                position: absolute;
                left: 27px;
                bottom: 30px;
                height: 150px;
            }
        }
    }

    .pay-btn-cont {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 40px 30px;
    }

    .turan-table-cont {
        position: absolute;
        top: 440px;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100vh - 440px - 350px);
        height: calc(100vh - 440px - 350px);
    }
}
</style>