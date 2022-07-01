// import WechatCodeHandle from './codeEr/WechatCodeHandleeHandle';
export const getBodyZoom = function () {
    var w = document.documentElement.getBoundingClientRect().width;
    var h = document.documentElement.getBoundingClientRect().height;
    var maxWidth = 1920;
    var maxHeight = 1080;
    var zoom = 1;
    if (h > w - 400) {
        zoom = w / maxWidth;
    } else {
        zoom = h / maxHeight;
        if (w / h > 3 && w / maxWidth > 2) {
            zoom += 0.1;
        }
    }
    return zoom
}
const zoom = {
    beforeMount(el: { style: { zoom: number } }) {
        el.style.zoom = getBodyZoom()
        window.addEventListener("resize", function () {
            el.style.zoom = getBodyZoom()
        }, false);
    },
}


// wheel滚轮事件
const wheel = {
    x: 1,
    y: 1,
    minScale: 0.5,
    mounted(el: HTMLElement) {
        el.addEventListener("wheel", function (e) {
            if (e.deltaY > 0) {
                wheel.x += 0.1;
                wheel.y += 0.1;

            } else {
                if (wheel.x > 0.6) {
                    wheel.x -= 0.1;
                    wheel.y -= 0.1;
                }
            }
            el.style.transform = `scale(${wheel.x, wheel.y})`
        }, false)
    },
}



//鼠标拖拽
const vWechatCodeDrag = {
    beforeMount(el, binding, vnode) {
        let oDiv = el;   //当前元素
        let disX = 0;
        let disY = 0;
        const isCopyQrCode = binding.value
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
            // SetOffset(left, top)
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



export default {
    // ...WechatCodeHandle,
    // WechatCodeScale,
    // WechatCodeDrag,
    zoom,
    wheel
}