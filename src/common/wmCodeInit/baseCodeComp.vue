<template>
    <div 
        class="wm-code-box" 
        :style="compuStyle" 
        v-WechatCodeDrag
        v-WechatCodeScale
        title="按住左键可拖动，滚轮可以放大缩小"
    >
        <!-- -->
        <img dec="二维码背景" class="wm-code-bg-img" :src="bgUrl">
        <img dec="二维码" class="wm-code-img" :src="codeUrl">

        <div class="wm-code-handle-box">
            <div class="WM_QR_hide" title="隐藏" @click="handleEvent('changeCodeStatus', false)"></div>
            <div class="WM_QR_scaleY WM_QR_scale">
                <div 
                    class="WM_QR_scale_btn scaleY_btn" 
                    @click="handleEvent('scaleY', true)"
                >
                    +
                </div>
                <div 
                    class="WM_QR_scale_btn scaleY_btn" 
                    @click="handleEvent('scaleY', false)"
                >
                    -
                </div>
            </div>
            <div class="WM_QR_scaleX WM_QR_scale">
                <div 
                    class="WM_QR_scale_btn scaleX_btn" 
                    @click="handleEvent('scaleX', true)"
                >
                    +
                </div>
                <div 
                    class="WM_QR_scale_btn scaleX_btn" 
                    @click="handleEvent('scaleX', false)"
                >
                    -
                </div>
            </div>
        </div>
    </div>
</template>
<!-- 常规二维码组件 -->
<script lang="ts" setup>
import { baseState } from '../wmInit';
import { wmCodeInit, SaveWechatCodeConfig, InitWechatCodeConfig } from './index'
type attrType = 'scale' | 'scaleX' | 'scaleY' | 'left' | 'top'

type codePropsType = {
    localKey?: string, //二维码样式-- 存localStorage key
    bgUrl?: string,
    codeUrl: string,
    defaultStyle: {},
    config?: {}
    qrPos?: number, //默认二维码位置 1 右边  2 左边
}

const props = withDefaults(defineProps<codePropsType>() , {
    bgUrl: baseState.$imgUrl + '/game/duiduipengNew/erBg.png',
    localKey: 'wemew_Code_',
    qrPos: 1
})


const { baseStyle, WechatCodeConfig } = wmCodeInit(props.defaultStyle, props.localKey)

const compuStyle = computed(() => {
    const { scale, scaleX, scaleY, left, top } = WechatCodeConfig;
    return {
        ...baseStyle,
        left: `${left}px`,
        top: `${top}px`,
        transform: `scale(${scale}) scaleY(${scaleY}) scaleX(${scaleX})`,
    }
})

// 缩放按钮点击事件
const handleEvent = (attr: attrType, bool: boolean) => {
    SetScale(attr, bool)
}

onMounted(() => {
    InitWechatCodeConfig(props.localKey, WechatCodeConfig, props.qrPos);
})

// 设置二维码大小
const SetScale = (attr: attrType, bool: boolean) =>  {
    if (bool) {
        WechatCodeConfig[attr] += 0.05;
        WechatCodeConfig[attr] = Math.min(WechatCodeConfig.maxScale, WechatCodeConfig[attr])
    } else {
        WechatCodeConfig[attr] -= 0.05;
        WechatCodeConfig[attr] = Math.max(WechatCodeConfig.minScale, WechatCodeConfig[attr]);
    }
    SaveWechatCodeConfig(props.localKey, WechatCodeConfig)
}
// 设置二维码位置
const SetOffset = (left, top) => {
    WechatCodeConfig.left = left;
    WechatCodeConfig.top = top;
    SaveWechatCodeConfig(props.localKey, WechatCodeConfig);
}

// 自定义指令
//大屏二维码鼠标滚动缩放
const WechatCodeMouseWheel = (e: any, localKey: string) => {
    var e = e || window.event;
    if (e.wheelDelta) {
        if (e.wheelDelta > 0) {     //当鼠标滚轮向上滚动时
            console.log("鼠标滚轮向上滚动");
            SetScale('scale', true)
        }
        if (e.wheelDelta < 0) {     //当鼠标滚轮向下滚动时
            console.log("鼠标滚轮向下滚动");
            SetScale('scale', false)
        }
    } else if (e.detail) {
        if (e.detail < 0) {   //当鼠标滚轮向上滚动时
            console.log("鼠标滚轮向上滚动");
            SetScale('scale', true)
        }
        if (e.detail > 0) {   //当鼠标滚轮向下滚动时
            console.log("鼠标滚轮向下滚动");
            SetScale('scale', false)
        }
    }
}

// 鼠标滚动缩放
const vWechatCodeScale = {
    beforeMount(el: Element, binding: { value: string; }) {
        // console.log('binding', binding);
        
        el.addEventListener('mousewheel', ()=>{
            WechatCodeMouseWheel('', binding.value)
        }, {passive: false});
    },
}

// 鼠标拖拽
const vWechatCodeDrag = {
    beforeMount(el, binding) {
        let oDiv = el;   //当前元素
        let disX = 0;
        let disY = 0;
        //鼠标按下
        const MouseDown = (e) => {
            disX = e.clientX - oDiv.offsetLeft;
            disY = e.clientY - oDiv.offsetTop;
            // console.log('e.clientX :>> ', e.clientX);
            // console.log('oDiv.offsetLeft :>> ', oDiv.offsetLeft)
            // console.log('鼠标按下', {x: disX, y: disY});
            document.body.addEventListener('mousemove', MouseMove);
            e.preventDefault();
        }

        //鼠标移动
        const MouseMove = (e) => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            // console.log('当前位置', {x: left, y: top})
            oDiv.style.left = left + 'px';
            oDiv.style.top = top + 'px';
            SetOffset(left, top)
            e.preventDefault();
        }
        //鼠标弹起
        const MouseUp = () => {
            document.body.removeEventListener('mousemove', MouseMove);
        }

        oDiv.addEventListener('mousedown', MouseDown);
        oDiv.addEventListener('mouseup', MouseUp);
    },
}


</script>

<style lang="scss" scoped>
.wm-code-box {
    position: absolute;
    right: 30px;
    top: 30px;
    width: 280px;
    height: 280px;
    box-sizing: border-box;
    z-index: 2;
    cursor: nesw-resize;

    .wm-code-bg-img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }

    .wm-code-img {
        position: relative;
        z-index: 2;
        width: 100%;
    }

    

    .WM_QR_hide {
        position: absolute;
        right: 10px;
        top: 0px;
        width: 40px;
        height: 40px;
        z-index: 2;
        cursor: pointer;

        &::before {
            content: '';
            width: 30px;
            height: 3px;
            background-color: #ff4b69;
            display: inline-block;
            margin-top: 10px;
        }
    }

    .WM_QR_scale {
        display: none;
        position: absolute;
        z-index: 2;
    }
    &:hover .WM_QR_scale{
        display: block;
    }
    .WM_QR_scale_btn {
        user-select: none;
        font-size: 50px;
        color: #fff;
        font-weight: bold;
        font-style: normal;
        text-align: center;
        display: block;
        cursor: pointer;
        background: #ff4b69;
        &.scaleY_btn {
            width: 40px;
            height: 70px;
            line-height: 60px;
        }
        &.scaleX_btn {
            width: 70px;
            height: 40px;
            line-height: 30px;
            display: inline-block;
        }
    }
    .WM_QR_scaleY {
        right: -40px;
        top: 50%;
        width: 40px;
        transform: translate(0,-50%);
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 2px;
            background-color: #fff;
        }
    }
    .WM_QR_scaleX {
        bottom: -40px;
        left: 50%;
        height: 40px;
        transform: translate(-50%,0);
        &::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            width: 2px;
            height: 100%;
            background-color: #fff;
        }
    }
}
</style>