import { h, render } from 'vue'
import BaseCodeComp from './baseCodeComp.vue'

type initCodeOptionsType = {
    props?: {},
    moreNode?: boolean,
    body: string | HTMLElement,
}

// 渲染 
const renderBox = (options: initCodeOptionsType, View: any = BaseCodeComp) => {
    const { 
        body = 'body',
        moreNode = false,
        props
    } = options;

    const container = document.createElement('div');
    // 创建虚拟dom
    const vnode = h(View, props);

    
    // 将虚拟dom 渲染到 container dom 上
    render(vnode, container);
    const root = (moreNode ? container : container.firstElementChild) as Element
    // 最后将 container 添加到 body 上
    let box = (typeof body === 'string') ? document.querySelector(body) : body;
    if (!box) {
        console.warn('renderView: selector is null', body)
    } else {
        box.appendChild(root)
    }
    
    return vnode.component
}


const wmCodeRender = (options: initCodeOptionsType, View?: any) => {
    return renderBox(options, View);
}

export default wmCodeRender


const CodeConfig = {
    minScale: 0.5,
    maxScale: 3,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
}

type baseStyleType = {
    width: string,
    height: string,
    padding?: string,
    left?: number|string,
    top?: number|string,
}

export const wmCodeInit = (style: baseStyleType, config = {}) => {
    
    const WechatCodeConfig = toReactive({...CodeConfig, ...config});

    const baseStyle = {
        ...style,
    }
    WechatCodeConfig.width = parseInt(baseStyle.width)

    return {
        baseStyle,
        WechatCodeConfig,
    }
}

// 保存在本地暑假
export const SaveWechatCodeConfig = (localKey: string, WechatCodeConfig: any) => {
    localStorage.setItem(localKey + 'WM_QR_data_scaleX', String(WechatCodeConfig.scaleX));
    localStorage.setItem(localKey + 'WM_QR_data_scaleY', String(WechatCodeConfig.scaleY));
    localStorage.setItem(localKey +'WM_QR_data_scale', String(WechatCodeConfig.scale));
    localStorage.setItem(localKey +'_wxLeft', String(WechatCodeConfig.left));
    localStorage.setItem(localKey +'_wxTop', String(WechatCodeConfig.top));
}

export const InitWechatCodeConfig = (localKey: string, WechatCodeConfig: any, qrPos = 1) => {
    WechatCodeConfig.scaleX = parseFloat(localStorage.getItem(localKey+'WM_QR_data_scaleX') || '1') || 1;
    WechatCodeConfig.scaleY = parseFloat(localStorage.getItem(localKey+'WM_QR_data_scaleY') || '1') || 1;
    WechatCodeConfig.scale = parseFloat(localStorage.getItem(localKey+'WM_QR_data_scale') || '1') || 1;
 
    WechatCodeConfig.left = parseFloat(localStorage.getItem(localKey+'_wxLeft') || '0') || 0;
    WechatCodeConfig.top = parseFloat(localStorage.getItem(localKey+'_wxTop') || '0') || 0;
    if (!WechatCodeConfig.left && !WechatCodeConfig.top) setQR(localKey, WechatCodeConfig, qrPos);
  
}

const setQR = (localKey: string, WechatCodeConfig: any, qrPos = 1) => {
    let left = 0,
        top = 0;
    let windowWidth = document.querySelector('.page-container')!.clientWidth;
    let width = WechatCodeConfig.width;
    switch (qrPos) {

        case 2:
            //左上角 二维码位置
            left = 30;
            top = 30;
            break;

        case 1:
            //右上角 二维码位置
            left = windowWidth - width - 30;
            top = 30;
            break;
        default:
            break;
    }
    WechatCodeConfig.left = left;
    WechatCodeConfig.top = top;
    SaveWechatCodeConfig(localKey, WechatCodeConfig);
}