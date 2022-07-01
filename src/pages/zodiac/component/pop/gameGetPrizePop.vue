<template>
    <div :class="popClass">
        <div class="pop-main game-get-prize-pop">
            <div class="pop-title">
                <img class="title-img" :src="getAssetUrl('pop_prize_title')">
            </div>
            <div class="pop-cont">
                <div class="prize-box">
                    <img class="prize-img" :src="winnerPrize.prizeUrl">
                    <span class="prize-name">
                        恭喜您获得擂主 <br>
                        {{prizeText}}
                    </span>
                </div>

            </div>
            <div class="pop-btn-box">
                <div class="pop-btn" @click="handleClick(winnerPrize)" data-name="立即兑换"></div>
                <div class="pop-btn text-btn" @click="handleClose" data-name="稍后兑换"></div>
            </div>
        </div>
    </div>
</template>
<!-- 游戏获取奖品弹窗 -->
<script lang="ts" setup>
import { getAssetUrl, gamePrizeItemType } from '../../handle';
type myPropsType = {
    winnerPrize: gamePrizeItemType
}

const props = defineProps<myPropsType>();
const prizeText = computed(() => {
    return props.winnerPrize.prizeName + props.winnerPrize.prizeCount + props.winnerPrize.prizeUnit
})
// const props = withDefaults(defineProps<myPropsType>(), {})

// 
const popClass = computed(() => {
    return [
        'wm-game-pop-main-wrapper show has-mask',
    ]
})


</script>
