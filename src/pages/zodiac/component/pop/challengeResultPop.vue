<template>
    <div :class="popClass">
        <div class="pop-main game-result-pop">
            <div class="pop-title">
                <template v-if="success === 1">
                    <img class="title-img" :src="getAssetUrl('pop_title_1')">
                </template>
                <template v-else>
                    <img class="title-img failed" :src="getAssetUrl('pop_title_2')">
                </template>
            </div>
            <div class="pop-cont">
                <div class="zodiac-icon-list">
                    <template v-for="(k, i) in maxScore.pointList">
                        <img class="zodiac-icon" :src="getZodiacIconUrl(k, i+1)">
                    </template>
                </div>

                <div class="max-score-box">
                    <img class="max-score-zodiac-icon" :src="getZodiacIconUrl(maxScore.maxScoreZodiac, 0)">
                    <span class="max-score-text" :data-name="maxScore.score + '分'" v-html="maxScore.score + '分'"></span>
                </div>
                

                <div class="score-list-box-cont">
                    <div class="score-list-box" v-if="scoreList.length > 1">
                        <div 
                            v-for="item in scoreList"
                            class="score-item-box" 
                        >
                            <img class="score-zodiac-icon" :src="getZodiacIconUrl(item.maxScoreZodiac, 0)">
                            <span class="score-text" :data-name="item.score + '分'" v-html="item.score + '分'"></span>
                        </div>
                    </div>
                </div>

            </div>
            <div :class="`pop-btn-box ${scoreList.length > 1 ? 'has-more':''}`">
                <div class="pop-btn" @click="handleClick" data-name="再来一发"></div>
            </div>
        </div>
    </div>
</template>
<!-- 游戏奖品弹窗 -->
<script lang="ts" setup>
import { getAssetUrl, getZodiacIconUrl } from '../../handle'
type scoreItem = {
    score: number,
    maxScoreZodiac: number,
}

type myPropsType = {
   success: number,
   maxScore: scoreItem & {pointList: number[]},
   scoreList: scoreItem[]

}
defineProps<myPropsType>()

// 
const popClass = computed(() => {
    return [
        'wm-game-pop-main-wrapper show has-mask',
    ]
})
</script>
