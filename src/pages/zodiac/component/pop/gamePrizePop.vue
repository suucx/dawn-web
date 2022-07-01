<template>
    <div :class="popClass" @click="close">
        <div class="pop-main game-prize-pop">
            <div class="pop-title">
                <div class="title-text">十二生肖大奖</div>
                <div class="sub-title-text">仅剩{{left}}个名额</div>
            </div>
            <div class="pop-cont">
                <div class="prize-box">
                    <div class="prize-img-box">
                        <img class="prize-img" :src="prizeUrl">
                    </div>
                    <span class="prize-name">{{prizeName}}</span>
                </div>
            </div>
            <div class="pop-btn-box">
                <div :class="`pop-btn ${ availableCash === 1 ? '':'disabled'}`" @click.stop="handleClick(availableCash, recordId)" :data-name="btnText"></div>
            </div>
        </div>
    </div>
</template>
<!-- 游戏奖品弹窗 -->
<script lang="ts" setup>
type myPropsType = {
    recordId?: string,
    availableCash: number, //	是否可兑换 1 是 2已兑换
    prizeName: string, //	奖品名称
    prizeUrl: string, //奖品图片
    prizeCount: number, //奖池
    left: number, //剩余名额
}

const props = withDefaults(defineProps<myPropsType>(), {
    left: 0,
    recordId: ''
})

// 
const popClass = computed(() => {
    return [
        'wm-game-pop-main-wrapper show has-mask',
    ]
})

// 兑换按钮文案
const btnText = computed(() => {
    let text = '立即兑换'
    if (props.availableCash === 2) {
        text = '已兑换'
    } else {
        if (props.left === 0) {
            text = '已抢光'
        }
    }

    return text
})

</script>
