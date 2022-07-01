<template>
    <div :class="`pay-btn-box type-${type}`">
        <span class="base-text" v-html="baseText"></span>
        <span class="btn-text" v-html="btnText"></span>
        <span class="other-text" v-html="otherText"></span>
    </div>
</template>

<!-- 支付按钮组件 -->
<script lang="ts" setup>
// 
type myPropsType = {
    baseText?: string, 
    btnText: string,
    otherText: string,
    type: string,
}
withDefaults(defineProps<myPropsType>(), {
    baseText: '购霸屏延时权益送',
    type: 'normal',
})

</script>

<style lang="scss" scoped>
.pay-btn-box {
    position: relative;
    height: 88px;
    display: flex;
    width: 100%;
    margin-bottom: 46px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url($imgUrl +'/game/zodiac/pay_btn_bg_2.png') no-repeat center/cover;
    
    .base-text,.btn-text {
        background: linear-gradient(180deg,#923f03 0%, #593311 100%);
        background-clip: text;
                -webkit-background-clip: text;

-webkit-text-fill-color: transparent;
        color: transparent;
        font-size: 30px;
        padding-top: 2px;
        padding-bottom: 2px;
    }
    

    .other-text {
        width: 100%;
        height: 40px;
        line-height: 40px;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 100%);
        color: #ffbe50;
        font-size: 30px;
        text-align: center;
    }
    
    &.type-normal {
        width: 320px;
        background: url($imgUrl +'/game/zodiac/pay_btn_bg_1.png') no-repeat center/cover;
    }

}
</style>