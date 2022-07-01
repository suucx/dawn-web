<template>
    <div class="main-container">
        <page-head></page-head>
        <img class="logo-img" :src="getAssetUrl('logo')">

        <div class="jackpot-box">
            <img class="jackpot-title" :src="getAssetUrl('jackpot_title')">
            <img class="jackpot-bg" :src="getAssetUrl('jackpot')">
        </div>

        <div class="initial-text" v-html="initialText"></div>
    </div>
</template>

<!-- 初始状态 状态容器 -->
<script lang="ts" setup>
import { getAssetUrl } from '../handle';
import pageHead from '../component/pageHead.vue'

const initialText = '游戏即将开始...'
</script>

<style lang="scss" scoped>
.main-container {
    box-sizing: border-box;
    padding-top: 20%;

    .logo-img {
        width: 100%;
        z-index: 2;
        position: relative;
    }

    .jackpot-box {
        position: absolute;
        left: 0; 
        bottom: 0;
        width: 100%;

        .jackpot-bg {
            margin: 0 auto;
            display: block;
            width: 80%;
            max-width: 540px;
            // height: 970px;
        }
        .jackpot-title {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translate(-50%, -20%);
            height: 80px;
        }
    }

    .initial-text {
        position: absolute;
        left: 0;
        bottom: 70px;
        width: 100%;
        text-align: center;
        background: linear-gradient(180deg,#fef2cf 0%, #a67635 100%);
        background-clip: text;
                -webkit-background-clip: text;

-webkit-text-fill-color: transparent;
        color: transparent;
        font-size: 52px;
        font-family: PangMenZhengDao;
    }
}
</style>