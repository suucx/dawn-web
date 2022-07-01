<template>
    <div class="wm-game-pop-main-wrapper show has-mask">
        <div class="pop-main game-rule-pop">
            <div class="pop-title">
                <img class="title-img" :src="getAssetUrl('pop_rule_title')">
            </div>
            <div class="pop-cont">
                <div class="pop-text pop-title-text">每次转动转盘，抽取三色生肖各一个， <br>三色相加积分高的获胜</div>
                <div class="pop-text pop-sub-title">蓝色生肖积分</div>

                <div class="pop-zodiac-score-config-box">
                    <div class="zodiac-score-item" v-for="item in gameGlobalState.zodiacScoreCfg">
                        <span>{{zodiacNameConfig[item.zodiac]}}</span>
                        <span>{{item.score}}</span>
                    </div>
                </div>
                
                <div class="pop-text pop-sub-title">以下颜色生肖积分翻倍</div>
                <div class="pop-title-text sub">
                    <span class="pop-text">紫色生肖 X1.5倍</span>
                    <span class="pop-text">金色生肖 X2倍</span>
                </div> 

                <div class="pop-text pop-sub-title">抽到相同生肖增加积分</div>
                <div class="pop-title-text sub">
                    <span class="pop-text">两个相同 +666</span>
                    <span class="pop-text">三个相同 +999</span>
                </div>    
            </div>
            <div class="pop-btn-box">
                <div class="pop-btn" @click="close" data-name="确定"></div>
            </div>
        </div>
    </div>
</template>
<!-- 游戏规则弹窗 -->
<script lang="ts" setup>
import { getAssetUrl, gameGlobalState } from '../../handle';
const zodiacNameConfig = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
</script>
