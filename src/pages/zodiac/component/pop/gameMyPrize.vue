<template>
    <div class="wm-game-pop-main-wrapper show has-mask">
        <div class="pop-main game-my-prize-pop">
            <div class="pop-title">
                <img class="title-img" :src="getAssetUrl('pop_my_prize_title')">
            </div>
            <div class="pop-cont">
                <div class="prize-box" v-for="(item, i) in prizeInfoList">
                    <div class="prize-img-box">
                        <img class="prize-img" :src="item.prizeUrl">
                    </div>
                    <div class="prize-info">
                        <span class="prize-origin pop-text" v-html="item.prizeType === 1 ? '十二生肖' : '擂主奖池'"></span>
                        <span class="prize-name pop-text" v-html="getPrizeNameInfoText(item)"></span>
                        <span class="prize-time" v-html="DateFormat(item.gameTime, '{y}:{m}:{d}')"></span>
                    </div>
                    <template v-if="item.cashState === 1">
                        <span class="handle-btn" @click="handleClick(item)">兑换</span>

                    </template>
                    <template v-else>
                        <span class="handle-btn disabled">已兑换</span>
                    </template>
                </div>

            </div>
            <div class="pop-btn-box">
                <div class="pop-btn" @click="close" data-name="确定"></div>
            </div>
        </div>
    </div>
</template>

<!-- 我的奖品弹窗 -->
<script lang="ts" setup>
import { Toast } from 'vant';
import { DateFormat } from '~/utils';
import { getAssetUrl, gamePrizeItemType, ajax_gameCashPrize } from '../../handle';

type myPropsType = {
    prizeList: gamePrizeItemType[]
}
const props = defineProps<myPropsType>();

const prizeInfoList = toReactive(props.prizeList);



// 展示的奖品信息 Str
const getPrizeNameInfoText = (item: gamePrizeItemType) => {
    return item.prizeName + item.prizeCount + (item.prizeUnit || '');
}

const handleClick = async (item: gamePrizeItemType) => {
    const loading = Toast.loading({
        duration: 0,
        message: `兑换中`,
        forbidClick: true,
    });
    const res = await ajax_gameCashPrize(item.gameId, item.prizeType, item.recordId!)
    loading.clear()

    if (res.isResultTrue) {
        Toast.success(res.resultMsg || '兑换成功')
        item.cashState = 2;
    } else {
        Toast.fail(res.resultMsg || '兑换失败')
    }


}

</script>

<style lang="scss" scoped>
</style>