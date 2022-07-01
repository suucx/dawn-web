<template>
    <div id="wemew-app" :style="`opacity:${percent >= 100 ? 1 : 0};`">
        <Root v-show="percent >= 100" />
    </div>
</template>

<script lang="ts" setup>
// loading Control
import loadingControl, { percent } from '~/common/wmLoading'
import wemewInitControl from '~/common/wmInit'
import { preloadStatic, clogWm } from "~/utils/comFn";
import { getAssetList, gameGlobalStateInit } from './handle/index'
import Root from './view/root.vue'
import VConsole from 'vconsole'
onMounted(async() => {
    new VConsole()
    
    // 开始有进度调加载
    clogWm('十二生肖开始')
    loadingControl.add(21);
    // 获取用户授权
    await wemewInitControl.start();
    loadingControl.add(21); //用户数据获取完成

    // 预加载 静态资源
    await preloadStatic({
        src: getAssetList(), //获取所有需要加载的资源
    })
    // loadingControl.add(41);
    
    // 获取游戏初始化状态
    await gameGlobalStateInit();
    loadingControl.add(60);
})

watch(() => percent.value, (newValue) => {
    if (newValue >= 100) {
        // console.log('finish')
    }
})
</script>
