<template>
    <div class="turn-table-box">
        <template v-for="(,i) in 12">
            <img class="zodiac-icon-img" v-show="isHasZodiac(i)" :src="getAssetUrl('zodiac_icon_' + i)">
        </template>

        <div class="turan-table-info-box">
            <div class="collect-text" data-name="已集齐">已集齐</div>
            <div class="collect-text" :data-name="collectText" v-html="collectText"></div>
            <div class="handle-btn" data-name="查看奖品" @click="handleClick"></div>
        </div>
    </div>
</template>

<!-- 转盘组件 -->
<script lang="ts" setup>
import { Toast } from 'vant';
import { getAssetUrl, gameGlobalState, ajax_getZodiacPrize, nObjectType } from '../handle';
import gamePop from './pop';

const isHasZodiac = computed(() => {
    return (i: number) => gameGlobalState.acquiredZodiacList.includes(i)
})

// 已集齐 多少 种生肖
const collectText = computed(() => gameGlobalState.acquiredZodiacList.length + '种生肖');

// 点击获取 集齐十二生肖奖励信息
const handleClick = async() => {
    const loading = Toast.loading({
        duration: 0,
        message: `加载中`,
        forbidClick: true,
    });
    const res = await ajax_getZodiacPrize(gameGlobalState.gameId);
    loading.clear()
    console.log('res=>', res)
    if (res.isResultTrue){
        gamePop({
            type: 'gamePrize',
            props: res.resultMsg as nObjectType
        })
    } 
}

</script>

<style lang="scss" scoped>
.turn-table-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    min-width: 480px;
    min-height: 480px;
    box-sizing: border-box;
    background: url($imgUrl + '/game/zodiac/turntable/turn_table_bg_1.png') no-repeat center/cover;

   
    &::before {
        content: '';
        z-index: 2;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: url($imgUrl + '/game/zodiac/turntable/turn_table_bg_2.png') no-repeat center/cover;
    }


    .zodiac-icon-img {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }


    .turan-table-info-box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 220px;
        height: 220px;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .collect-text {
            width: 100%;
            height: 50px;
            position: relative;
            text-align: center;
            font-size: 42px;
            box-sizing: border-box;
            font-family: PangMenZhengDao;
            color: #fef2cf;
            // background: linear-gradient(to bottom, #fef2cf 0%, #ffb858 100%);
            // background-clip: text;
            // -webkit-background-clip: text;

            // -webkit-text-fill-color: transparent;
            // color: transparent;
           
        }

        .handle-btn {
            position: relative;
            width: 224px;
            height: 81px;
            margin-top: 10px;
            background: url($imgUrl + '/game/zodiac/btn_bg.png') no-repeat center/cover;
            font-size: 48px;
            transform: scale(.9);

            &::before {
                content: attr(data-name);
                position: absolute;
                left: 50%;
                top: 42%;
                transform: translate(-50%, -50%);
                background: linear-gradient(180deg, #fef2cf 0%, #f7ca8c 100%);
                background-clip: text;
                -webkit-background-clip: text;

                -webkit-text-fill-color: transparent;
                color: transparent;
                white-space: nowrap;
                font-family: PangMenZhengDao;
            }
        }
    }

}
</style>