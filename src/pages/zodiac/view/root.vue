<template>
    <div class="main-container gamebg">
        <initialCont v-if="gameGlobalState.gameState === '1'"/>
        <mainCont v-else />
    </div>
</template>
<script setup lang="ts">
import initialCont from "./initialCont.vue";
import mainCont from './mainCont.vue'
import { gameGlobalState } from "../handle";


</script>

<style lang="scss" scoped>
.gamebg {
    width: 100%;
    height: 100%;
    color: #fff;
    background: url($imgUrl+"/game/zodiac/bg.png") no-repeat;
    background-size: 100% 100%;

    .ballwallText {
        font-size: 30px;
    }
}
</style>
