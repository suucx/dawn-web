<template>
    <back-wall>
        <template #left>
            <span class="ball-wall-text">返回</span>
        </template>
        <template #right>
            <div class="ball-wall-text" @touchend="showGameRules">游戏规则</div>
            <div class="my-gift-btn" @touchend="handleClick"></div>
        </template>
    </back-wall>
</template>

<script lang="ts" setup>
import { Toast } from 'vant';
import backWall from '~/components/backWall/backWall.vue';
import { ajax_gameGetPrizeInfo } from '../handle';
import gamePop from './pop';
import { useStore } from '~/store';


const handleClick = async () => {
    const loading = Toast.loading({
        duration: 0,
        message: `加载中`,
        forbidClick: true,
    });
    const store = useStore();
    const res = await ajax_gameGetPrizeInfo(store.barId);
    console.log('res',  res)
    loading.clear()
    if (res.isResultTrue) {
        gamePop({
            type: 'gameMyPrize',
            props: {
                prizeList: res.resultMsg
            }
        })
    }
}

const showGameRules = () => {
    gamePop({
        type: 'gameRule'
    })
}
</script>

<style lang="scss" scoped>
.my-gift-btn {
    position: absolute;
    right: 0;
    top: 80px;
    width: 150px;
    height: 90px;
    background: url($imgUrl + '/game/zodiac/my_gift.png') no-repeat center/cover;
}
</style>