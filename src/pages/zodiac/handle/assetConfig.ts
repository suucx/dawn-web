import { baseState } from "~/common/wmInit";
export const assetConfig: Record<string, string> = {
    logo: 'logo.png',
    jackpot: 'jackpot.png',
    jackpot_title: 'jackpot_title.png',
    pop_title_1: 'challenge_success_title.png',
    pop_title_2: 'challenge_failed_title.png',
    pop_rule_title: 'title_rule_pop.png',
    pop_prize_title: 'title_goxi.png',
    pop_my_prize_title: 'title_my_prize.png',
   


    turn_table_bg_1: 'turntable/turn_table_bg_1.png',
    turn_table_bg_2: 'turntable/turn_table_bg_2.png',
    zodiac_icon_0: 'turntable/0.png',
    zodiac_icon_1: 'turntable/1.png',
    zodiac_icon_2: 'turntable/2.png',
    zodiac_icon_3: 'turntable/3.png',
    zodiac_icon_4: 'turntable/4.png',
    zodiac_icon_5: 'turntable/5.png',
    zodiac_icon_6: 'turntable/6.png',
    zodiac_icon_7: 'turntable/7.png',
    zodiac_icon_8: 'turntable/8.png',
    zodiac_icon_9: 'turntable/9.png',
    zodiac_icon_10: 'turntable/10.png',
    zodiac_icon_11: 'turntable/11.png',
    
}

// 获取 资源路径列表  isFulPath boolean  是否全路径
export const getAssetList = (isFullPath = false): string[] => {
    let arr: string[] = [];
    for (const key in assetConfig) {
        if (Object.prototype.hasOwnProperty.call(assetConfig, key)) {
            const path = assetConfig[key] as string;
            arr.push( (isFullPath ? baseState.$gameImgUrl + path : path) )
        }
    }
    return arr;
}

// 获取资源路径 fullPath
export const getAssetUrl = (key: string) :string => {
    let url = ''
    if (!assetConfig[key]) {
        console.warn(`资源key ${key} 为找到`)
    } else {
        url = baseState.$gameImgUrl + assetConfig[key];
    }
    return url;
}

/**
 * 获取生肖icon
 * zIndex: 生肖下标  
 * order: icon 类型   '' 无背景动物  || 0 带背景动物 ||  1 生肖文字(蓝色)  || 2 生肖文字(紫色) || 3 生肖文字(金色)
 */ 
export const getZodiacIconUrl = (zIndex: string|number = 4, order:number|string = '') => {
    return baseState.$gameImgUrl + `icons/t${order}_icon_${zIndex}.png`
}

export const getAllZodiacIconUrlList = () => {
    let arr:string[] = []
    for (let i = 0; i < 12; i++) {
        arr.push(getZodiacIconUrl(i, 3))
    }
    return arr
}

