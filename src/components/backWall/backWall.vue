<template>
    <div id="backWall" :class="bg ? 'start' : ''">
        <div class="jiantou" @click="goBackWall">
            <img :src="$imgUrl + '/game/common/arrowL.png'" />
            <slot name="left"></slot>
        </div>

        <div>
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps<{ bg?: boolean }>()
const goBackWall = () => { 
    window.gameRank_backWallPop.init();
};
</script>
<style lang="scss" scoped>
#backWall {
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-right: 3%;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;

    &.start {
        background: rgba(0, 0, 0, 0.5);
    }

    .jiantou {
        display: flex;
        align-items: center;
        height: 60px;
        font-family: "Source Han Sans CN Regular";

        img {
            width: 7vw;
        }

        span {
            font-size: .3rem;
            color: white;
        }
    }
}
</style>
