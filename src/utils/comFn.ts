import { baseState } from '~/common/wmInit'
export function Test() {

}

/**
     * 等待指定的时间
     * @param ms
     */
export const sleep = async (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, ms)
    });
}

// 判断不为空
export function isNotEmpty(value: string | null | undefined) {
    return value !== undefined && value !== null && value !== 'undefined' && value !== 'null' && value !== ''
}
// 时间格式化
export function DateFormat(time: string | number | Date | null | undefined, cFormat: string) {
    if (isNotEmpty(time) && time.length < 10)
        return time

    if (typeof time == 'string')
        time = time.replace(/-/g, '/').replace(/T/g, ' ')

    if (arguments.length === 0)
        return null

    if (time == undefined || time == null || time == '')
        return null

    const format = cFormat || '{y}/{m}/{d} {h}:{i}:{s}'
    let date = null
    if (typeof time === 'object') {
        date = time
    }
    else {
        if ((`${time}`).length === 10 && !isNaN(Number(time)))
            time = parseInt(time) * 1000

        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    }

    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: string | any[], key: string) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10)
            value = `0${value}`

        return value || 0
    })
    return time_str
}
// 获取当前时间戳
export function getNowDateTime(str: string) {
    if (!str)
        return 0

    const str1 = str.replace(/-/g, '/')
    const tt = new Date(str1).getTime()
    return tt
}

// 合并对象
export function merge(target: { [x: string]: any }) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        const source = arguments[i] || {}
        for (const prop in source) {
            // eslint-disable-next-line
            if (source.hasOwnProperty(prop)) {
                const value = source[prop]
                if (value !== undefined)
                    target[prop] = value
            }
        }
    }
    return target
}

// 获取路径参数
export function getQueryString(name: string) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r != null)
        return decodeURIComponent(r[2])
    return null
}

export function isObj(o: any) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}
export function isArray(a: any) {
    return Object.prototype.toString.call(a).slice(8, -1) === 'Array'
}
export function isNumber(a: any) {
    return Object.prototype.toString.call(a).slice(8, -1) === 'Number'
}
export function isString(a: any) {
    return Object.prototype.toString.call(a).slice(8, -1) === 'String'
}
export function isFunction(a: any) {
    return Object.prototype.toString.call(a).slice(8, -1) === 'Function'
}
export function isNodeList(a: any) {
    return Object.prototype.toString.call(a).slice(8, -1) === 'NodeList'
}

// 检测长图还是宽图
export const CheckPictureList = (list: string | any[]) => {
    return new Promise((resolve) => {
        const arr: unknown = []
        let loadNum = 0

        if (!isNotEmpty(list)) {
            resolve(arr)
            return
        }
        if (list.length == 0) {
            resolve(arr)
            return
        }
        const len = list.length
        for (let i = 0; i < len; i++) {
            const src = list[i]
            const img = new Image()
            img.src = src
            img.onload = img.onerror = function () {
                let type = 'picH'
                if (img.naturalWidth / img.naturalHeight >= 1200 / 1000)
                    type = 'picW' // 横图

                else
                    type = 'picH' // 竖图

                loadNum++
                arr[i] = type
                if (loadNum == len)
                    resolve(arr)
            }
        }
    })
}
// 检查视频 宽高
export const CheckVideoShape = (videoUrl: string) => {
    return new Promise((resolve) => {
        const type = ''
        if (!isNotEmpty(videoUrl)) {
            resolve(type)
            return
        }

        const video = document.createElement('video')
        video.preload = 'metadata'
        video.src = videoUrl
        video.onloadedmetadata = function () {
            let type = 'picH'
            if (video.videoWidth / video.videoHeight >= 1200 / 1000)
                type = 'picW' // 横

            else
                type = 'picH' // 竖

            resolve(type)
        }
    })
}

// 预加载图片。返回promise对象
// @params list Array< string >
export function loadImgs(list: string | any[], second = 90) {
    return new Promise((resolve) => {
        let loadNum = 0
        let errorNum = 0
        let loadList: any[] = []
        const loadtimeout = setTimeout(() => {
            resolve({})
        }, second * 1000)
        if (list.length == 0) {
            clearTimeout(loadtimeout)
            resolve({ loadNum, errorNum, loadList })
        }

        for (let i = 0; i < list.length; i++) {
            const img = new Image()
            img.src = list[i]
            img.onload = function () {
                loadNum++
                loadList[i] = list[i]
                if (loadNum == list.length) {
                    loadList = loadList.filter(item => isNotEmpty(item))
                    clearTimeout(loadtimeout)
                    resolve({ loadNum, errorNum, loadList })
                }
            }
            img.onerror = function () {
                loadNum++
                errorNum++
                if (loadNum == list.length) {
                    loadList = loadList.filter(item => isNotEmpty(item))
                    clearTimeout(loadtimeout)
                    resolve({ loadNum, errorNum, loadList })
                }
            }
        }
    })
}
export const loadVideos = (list: string | any[], second = 90) => {
    return new Promise((resolve) => {
        let loadNum = 0
        let errorNum = 0
        let loadList: any[] = []
        const loadtimeout = setTimeout(() => {
            resolve({})
        }, second * 1000)
        if (list.length == 0) {
            clearTimeout(loadtimeout)
            resolve({ loadNum, errorNum, loadList })
        }

        for (let i = 0; i < list.length; i++) {
            const videoele = document.createElement('video')
            videoele.addEventListener('canplaythrough', () => {
                loadNum++
                loadList[i] = list[i]
                if (loadNum == list.length) {
                    loadList = loadList.filter(item => isNotEmpty(item))
                    clearTimeout(loadtimeout)
                    resolve({ loadNum, errorNum, loadList })
                }
            })
            videoele.addEventListener('error', () => {
                loadNum++
                errorNum++
                if (loadNum == list.length) {
                    loadList = loadList.filter(item => isNotEmpty(item))
                    clearTimeout(loadtimeout)
                    resolve({ loadNum, errorNum, loadList })
                }
            })
            videoele.setAttribute('src', list[i])
            videoele.load()
        }
    })
}
// eslint-disable-next-line
const evn = import.meta.env.VITE_APP_CURRENTMODE

const picformat= ['jpg', 'jpeg', 'png', 'gif', 'svg', 'psd', 'webp', 'apng']
const videoformat = ['webm', 'mp4']


type preloadStaticOptions = {
    src: string[], // 加载资源链接 --  游戏资源目录 ${gameFolder} 后的路径,
    second?: number, //超时时间配置
    baseHead?: string, //自定义前缀
    
}

// 预加载资源 方法
export function preloadStatic(options: preloadStaticOptions) {
    const { src: list, second = 90, baseHead = baseState.$gameImgUrl } = options;
    return new Promise((resolve) => {
        let loadNum = 0
        let errorNum = 0
        
        const loadtimeout = setTimeout(() => {
            resolve({})
        }, second * 1000)

        if (list.length == 0) {
            clearTimeout(loadtimeout)
            resolve({ loadNum, errorNum })
            return
        }
        for (let i = 0; i < list.length; i++) {
            let src = list[i]
            if (!isNotEmpty(src)) {
                loadNum++
                errorNum++
                if (loadNum == list.length) {
                    clearTimeout(loadtimeout)
                    resolve({ loadNum, errorNum })
                }
                continue
            }
            const fileformat = (src.split('.').pop() || '').split('?')[0] || ''
            if (videoformat.includes(fileformat)) {
                loadVideos([baseHead + src]).then((res) => {
                    loadNum++
                    if (res.loadNum <= 0) {
                        errorNum++
                    }
                    if (loadNum == list.length) {
                        clearTimeout(loadtimeout)
                        resolve({ loadNum, errorNum })
                    }
                })
                continue
            }
            if (picformat.includes(fileformat)) {
                loadImgs([baseHead + src]).then((res) => {
                    loadNum++
                    if (res.loadNum <= 0) {
                        errorNum++
                    }
                    if (loadNum == list.length) {
                        clearTimeout(loadtimeout)
                        resolve({ loadNum, errorNum })
                    }
                })
                continue
            }
            if (evn == 'dev') { // 开发环境防止跨域
                src = src.replace('https://test.wemew.cn', '')
            }
            const xhr = new XMLHttpRequest()
            const formData = new FormData()
            xhr.open('get', src)
            xhr.responseType = 'blob'
            xhr.onload = function () {
                if (this.status == 200) {
                    loadNum++
                    if (loadNum == list.length) {
                        clearTimeout(loadtimeout)
                        resolve({ loadNum, errorNum })
                    }
                }
                else {
                    loadNum++
                    errorNum++
                    if (loadNum == list.length) {
                        clearTimeout(loadtimeout)
                        resolve({ loadNum, errorNum })
                    }
                }
            }
            xhr.onerror = function () {
                loadNum++
                errorNum++
                if (loadNum == list.length) {
                    clearTimeout(loadtimeout)
                    resolve({ loadNum, errorNum })
                }
            }
            xhr.send(formData)
        }
    })
}


// 加载资源
export function loadStatic(list, second: number) {
    return new Promise((resolve) => {
        let loadNum = 0
        let errorNum = 0
        const loadtimeout = setTimeout(() => {
            resolve({})
        }, second * 1000)
        if (!isNotEmpty(list)) {
            clearTimeout(loadtimeout)
            resolve({})
            return
        }
        if (list.length == 0) {
            clearTimeout(loadtimeout)
            resolve({ loadNum, errorNum })
            return
        }
        for (let i = 0; i < list.length; i++) {
            let src = list[i]
            if (!isNotEmpty(src)) {
                loadNum++
                errorNum++
                if (loadNum == list.length) {
                    clearTimeout(loadtimeout)
                    resolve({ loadNum, errorNum })
                }
                continue
            }
            const fileformat = (src.split('.').pop() || '').split('?')[0] || ''
            if (videoformat.includes(fileformat)) {
                loadVideos([src]).then((res) => {
                    loadNum++
                    if (res.loadNum <= 0) {
                        errorNum++
                    }
                    if (loadNum == list.length) {
                        clearTimeout(loadtimeout)
                        resolve({ loadNum, errorNum })
                    }
                })
                continue
            }
            if (picformat.includes(fileformat)) {
                loadImgs([src]).then((res) => {
                    loadNum++
                    if (res.loadNum <= 0) {
                        errorNum++
                    }
                    if (loadNum == list.length) {
                        clearTimeout(loadtimeout)
                        resolve({ loadNum, errorNum })
                    }
                })
                continue
            }
            if (evn == 'dev') { // 开发环境防止跨域
                src = src.replace('https://test.wemew.cn', '')
            }
            const xhr = new XMLHttpRequest()
            const formData = new FormData()
            xhr.open('get', src)
            xhr.responseType = 'blob'
            xhr.onload = function () {
                if (this.status == 200) {
                    loadNum++
                    if (loadNum == list.length) {
                        clearTimeout(loadtimeout)
                        resolve({ loadNum, errorNum })
                    }
                }
                else {
                    loadNum++
                    errorNum++
                    if (loadNum == list.length) {
                        clearTimeout(loadtimeout)
                        resolve({ loadNum, errorNum })
                    }
                }
            }
            xhr.onerror = function () {
                loadNum++
                errorNum++
                if (loadNum == list.length) {
                    clearTimeout(loadtimeout)
                    resolve({ loadNum, errorNum })
                }
            }
            xhr.send(formData)
        }
    })
}
// 加载video元素。播放流畅
export const LoadVideoElement = (list: string | any[], second = 90) => {
    return new Promise((resolve) => {
        let loadNum = 0
        let errorNum = 0
        const loadtimeout = setTimeout(() => {
            resolve({})
        }, second * 1000)
        if (!isNotEmpty(list)) {
            clearTimeout(loadtimeout)
            resolve({})
            return
        }
        if (list.length == 0) {
            clearTimeout(loadtimeout)
            resolve({ loadNum, errorNum })
            return
        }
        for (let i = 0, len = list.length; i < len; i++) {
            const videoele = list[i]
            if (!isNotEmpty(videoele)) {
                loadNum++
                errorNum++
                if (loadNum == list.length) {
                    clearTimeout(loadtimeout)
                    resolve({ loadNum, errorNum })
                }
                continue
            }
            videoele.addEventListener('canplaythrough', () => {
                loadNum++
                if (loadNum == list.length) {
                    clearTimeout(loadtimeout)
                    resolve({ loadNum, errorNum })
                }
            })
            videoele.addEventListener('error', () => {
                loadNum++
                errorNum++
                if (loadNum == list.length) {
                    clearTimeout(loadtimeout)
                    resolve({ loadNum, errorNum })
                }
            })
            videoele.load()
        }
    })
}
export function loadStaticByMap(map: { size: number; forEach: (arg0: (i: any) => void) => void }) {
    return new Promise((resolve) => {
        let loadNum = 0
        let errorNum = 0
        if (!map.size) {
            resolve()
            return
        }

        map.forEach((i: string | URL) => {
            i = i || ''
            if (evn == 'dev') { // 开发环境防止跨域
                i = i.replace('https://test.wemew.cn', '')
            }
            const xhr = new XMLHttpRequest()
            const formData = new FormData()
            xhr.open('get', i)
            xhr.responseType = 'blob'
            xhr.onload = function () {
                if (this.status == 200) {
                    loadNum++
                    if (loadNum == map.size)
                        resolve({ loadNum, errorNum })
                }
                else {
                    loadNum++
                    errorNum++
                    if (loadNum == map.size)
                        resolve({ loadNum, errorNum })
                }
            }
            xhr.onerror = function () {
                loadNum++
                errorNum++
                if (loadNum == map.size)
                    resolve({ loadNum, errorNum })
            }
            xhr.send(formData)
        })
    })
}

// 十位数补零
export function addZero(x: number) {
    return x > 9 ? x : `0${x}`
}

// 获取随机数
export function random(Min: number, Max: number) {
    const Range = Max - Min
    const Rand = Math.random()
    return (Min + Math.round(Rand * Range))
}

// 获取当前日期是今年第几周
export const getYearWeek = function getYearWeek(t: string | number | Date) {
    const a = new Date(t).getFullYear()
    const b = new Date(t).getMonth() + 1
    const c = new Date(t).getDate()
    const date1 = new Date(a, parseInt(b) - 1, c)
    const date2 = new Date(a, 0, 1)
    const d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000)
    return Math.ceil((d + (date2.getDay() + 1 - 1)) / 7)
}
export const getUrlHead = function (href?: string) {
    href = href || window.location.href
    let head = href.includes('https://') ? 'https://' : 'http://'
    const _href = href.replace('http://', '').replace('https://', '')
    if (_href.split('/').length > 0) {
        const s = _href.split('/')[0]
        head += s.split(':')[0]
        return head
    }
    return ''
}
// 获取文件预览路径
export const getFileURL = function (file: Blob | MediaSource) {
    let url = null
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file)
    }
    else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
    }
    else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
    }
    return url
}

export const Base64ToFile = function (dataurl: string, filename: string) { // 将base64转换为文件
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--)
        u8arr[n] = bstr.charCodeAt(n)

    return new File([u8arr], filename, { type: mime })
}

export const EmojiReg = /(\uD83C[\uDF00-\uDFFF])|(\uD83D[\uDC00-\uDE4F])|(\uD83D[\uDE80-\uDEFF])/g

export const utf16toEntities = (str: string) => {
    const patt = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g // 检测utf16字符正则
    str = str.replace(patt, (char: string) => {
        let H, L, code
        if (char.length === 2) {
            H = char.charCodeAt(0) // 取出高位
            L = char.charCodeAt(1) // 取出低位
            code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00 // 转换算法
            return `&#${code};`
        }
        else {
            return char
        }
    })
    return str
}
export const uncodeUtf16 = (str: string) => {
    // eslint-disable-next-line
    let reg = /\&#.*?;/g;
    const result = str.replace(reg, (char: { length: number; match: (arg0: RegExp) => string }) => {
        let H, L, code
        if (char.length == 9) {
            code = parseInt(char.match(/[0-9]+/g))
            H = Math.floor((code - 0x10000) / 0x400) + 0xD800
            L = ((code - 0x10000) % 0x400) + 0xDC00
            return unescape(`%u${H.toString(16)}%u${L.toString(16)}`)
        }
        else {
            return char
        }
    })
    return result
}

export const ParseEmoji = function (str: any) {
    return uncodeUtf16(utf16toEntities(str))
}

export const GetThrottle = function () {
    return function (func: { apply: (arg0: any, arg1: IArguments) => void }, delay: number) {
        let prev = new Date()
        return function () {
            const context = this
            const args = arguments
            const now = new Date()
            if (now - prev >= delay) {
                func.apply(context, args)
                prev = now
            }
        }
    }
}

export const FixedMoney = function (money: number, offset = 2) {
    const offsetunit = Math.pow(10, offset)
    return ((money * offsetunit) / offsetunit).toFixed(offset)
}
export const FormatMoney = function (money: string | number) {
    if (money >= 100000)
        money = `${(money * 1000 / 10000000).toFixed(0)}w`

    else
        money = money.toFixed(0)

    return money
}
// 等级图标与名字
export const get_grade_style = function (data: any) {
    const grade_style = {}
    grade_style.newG = '青铜1级'
    grade_style.imgUrl = '/grade/border_qt.png'
    grade_style.fColor = 'qt_color'
    grade_style.fBg = 'qt_bg'
    grade_style.gradeIcon = '/grade/grade_tagbg1.png'
    grade_style.bigborder = '/grade/border_qt_big.png'
    switch (data) {
        case 1:
            grade_style.newG = '青铜1级'
            grade_style.imgUrl = '/grade/border_qt.png'
            grade_style.fColor = 'qt_color'
            grade_style.fBg = 'qt_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg1.png'
            grade_style.bigborder = '/grade/border_qt_big.png'
            break
        case 2:
            grade_style.newG = '青铜2级'
            grade_style.imgUrl = '/grade/border_qt.png'
            grade_style.fColor = 'qt_color'
            grade_style.fBg = 'qt_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg2.png'
            grade_style.bigborder = '/grade/border_qt_big.png'
            break
        case 3:
            grade_style.newG = '青铜3级'
            grade_style.imgUrl = '/grade/border_qt.png'
            grade_style.fColor = 'qt_color'
            grade_style.fBg = 'qt_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg3.png'
            grade_style.bigborder = '/grade/border_qt_big.png'
            break
        case 4:
            grade_style.newG = '白银1级'
            grade_style.imgUrl = '/grade/border_by.png'
            grade_style.fColor = 'by_color'
            grade_style.fBg = 'by_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg4.png'
            grade_style.bigborder = '/grade/border_by_big.png'
            break
        case 5:
            grade_style.newG = '白银2级'
            grade_style.imgUrl = '/grade/border_by.png'
            grade_style.fColor = 'by_color'
            grade_style.fBg = 'by_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg5.png'
            grade_style.bigborder = '/grade/border_by_big.png'
            break
        case 6:
            grade_style.newG = '白银3级'
            grade_style.imgUrl = '/grade/border_by.png'
            grade_style.fColor = 'by_color'
            grade_style.fBg = 'by_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg6.png'
            grade_style.bigborder = '/grade/border_by_big.png'
            break
        case 7:
            grade_style.newG = '黄金1级'
            grade_style.imgUrl = '/grade/border_hj.png'
            grade_style.fColor = 'hj_color'
            grade_style.fBg = 'hj_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg7.png'
            grade_style.bigborder = '/grade/border_hj_big.png'
            break
        case 8:
            grade_style.newG = '黄金2级'
            grade_style.imgUrl = '/grade/border_hj.png'
            grade_style.fColor = 'hj_color'
            grade_style.fBg = 'hj_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg8.png'
            grade_style.bigborder = '/grade/border_hj_big.png'
            break
        case 9:
            grade_style.newG = '黄金3级'
            grade_style.imgUrl = '/grade/border_hj.png'
            grade_style.fColor = 'hj_color'
            grade_style.fBg = 'hj_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg9.png'
            grade_style.bigborder = '/grade/border_hj_big.png'
            break
        case 10:
            grade_style.newG = '铂金1级'
            grade_style.imgUrl = '/grade/border_bj.png'
            grade_style.fColor = 'bj_color'
            grade_style.fBg = 'bj_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg10.png'
            grade_style.bigborder = '/grade/border_bj_big.png'
            break
        case 11:
            grade_style.newG = '铂金2级'
            grade_style.imgUrl = '/grade/border_bj.png'
            grade_style.fColor = 'bj_color'
            grade_style.fBg = 'bj_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg11.png'
            grade_style.bigborder = '/grade/border_bj_big.png'
            break
        case 12:
            grade_style.newG = '铂金3级'
            grade_style.imgUrl = '/grade/border_bj.png'
            grade_style.fColor = 'bj_color'
            grade_style.fBg = 'bj_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg12.png'
            grade_style.bigborder = '/grade/border_bj_big.png'
            break
        case 13:
            grade_style.newG = '钻石1级'
            grade_style.imgUrl = '/grade/border_zs.png'
            grade_style.fColor = 'zs_color'
            grade_style.fBg = 'zs_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg13.png'
            grade_style.bigborder = '/grade/border_zs_big.png'
            break
        case 14:
            grade_style.newG = '钻石2级'
            grade_style.imgUrl = '/grade/border_zs.png'
            grade_style.fColor = 'zs_color'
            grade_style.fBg = 'zs_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg14.png'
            grade_style.bigborder = '/grade/border_zs_big.png'
            break
        case 15:
            grade_style.newG = '钻石3级'
            grade_style.imgUrl = '/grade/border_zs.png'
            grade_style.fColor = 'zs_color'
            grade_style.fBg = 'zs_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg15.png'
            grade_style.bigborder = '/grade/border_zs_big.png'
            break
        case 16:
            grade_style.newG = '大师1级'
            grade_style.imgUrl = '/grade/border_ds.png'
            grade_style.fColor = 'ds_color'
            grade_style.fBg = 'ds_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg16.png'
            grade_style.bigborder = '/grade/border_ds_big.png'
            grade_style.scope = 170000
            break
        case 17:
            grade_style.newG = '大师2级'
            grade_style.imgUrl = '/grade/border_ds.png'
            grade_style.fColor = 'ds_color'
            grade_style.fBg = 'ds_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg17.png'
            grade_style.bigborder = '/grade/border_ds_big.png'
            grade_style.scope = 250000
            break
        case 18:
            grade_style.newG = '大师3级'
            grade_style.imgUrl = '/grade/border_ds.png'
            grade_style.fColor = 'ds_color'
            grade_style.fBg = 'ds_bg'
            grade_style.gradeIcon = '/grade/grade_tagbg18.png'
            grade_style.bigborder = '/grade/border_ds_big.png'
            grade_style.scope = 340000
            break
    }
    return grade_style
}
export const get_grade_new = function (level: number) {
    let gradeStr = '1'
    if (level > 10 && level <= 12)
        gradeStr = '11'

    else if (level > 12 && level <= 14)
        gradeStr = '13'

    else if (level > 14 && level <= 17)
        gradeStr = '15'

    else if (level > 17 && level <= 19)
        gradeStr = '18'

    else if (level > 19 && level <= 21)
        gradeStr = '20'

    else if (level > 21 && level <= 23)
        gradeStr = '22'

    else if (level > 23 && level <= 25)
        gradeStr = '24'

    else if (level > 25 && level <= 27)
        gradeStr = '26'

    else if (level >= 28)
        gradeStr = '28'

    return gradeStr
}
export const exposeProAndRso = function () {
    let resolve = null
    const myPromise = new Promise((rso) => {
        resolve = rso
    })
    return {
        myPromise,
        resolve,
    }
}

export const reloadPicAnimation = function () {
    const element = event.target
    if (element.isload)
        return

    // console.log('reloadPicAnimation')
    element.style.visibility = 'hidden'
    const src = element.src
    element.src = ''
    element.isload = true
    element.style.visibility = 'visible'
    element.src = src
}
export const reloadPicAnimationNotSetVis = function () {
    const element = event.target
    // console.log(element)
    if (element.isload)
        return

    console.log('reloadPicAnimation')
    const src = element.src
    element.src = ''
    element.isload = true
    element.src = src
}
export const playVideoElement = function (element: any, fromstart = false) {
    if (isNodeList(element) || isArray(element)) {
        element.forEach((item: { currentTime: number; play: () => void }) => {
            if (isNotEmpty(item)) {
                if (fromstart)
                    item.currentTime = 0

                item.play()
            }
        })
    }
    else {
        if (isNotEmpty(element)) {
            if (fromstart)
                element.currentTime = 0

            element.play()
        }
    }
}
export const pauseVideoElement = function (element: { forEach: (arg0: (item: any) => void) => void; pause: () => void }) {
    if (isNodeList(element) || isArray(element)) {
        element.forEach((item: { pause: () => void }) => {
            if (isNotEmpty(item))
                item.pause()
        })
    }
    else {
        if (isNotEmpty(element))
            element.pause()
    }
}
// 检测浏览器
export const checkBower = function () {
    const browser = {
        opera: 0,
        ie: 0,
        chrome: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        name: 0,
        version: 0,
    }
    const n = navigator.userAgent
    const b = browser
    if (window.opera) {
        b.version = window.opera.version()
        b.opera = parseFloat(b.version)
        b.name = 'oprea'
    }
    else if (/AppleWebKit\/(\S+)/.test(n)) {
        if (/Chrome\/(\S+)/.test(n)) {
            b.version = RegExp.$1
            b.chrome = parseFloat(b.version)
            b.name = 'chrome'
        }
        else if (/Version\/(\S+)/.test(n)) {
            b.version = RegExp.$1
            b.safari = parseFloat(b.version)
            b.name = 'safari'
        }
    }
    else if (/KHTML\/(\S+)/.test(n) || /Konqueror\/([^;]+)/.test(n)) {
        b.version = RegExp.$1
        b.konq = parseFloat(b.version)
        b.name = 'konq'
    }
    else if (/Firefox\/(\S+)/.test(n)) {
        b.version = RegExp.$1
        b.firefox = parseFloat(b.version)
        b.name = 'firefox'
    }
    else if (/MSIE ([^;]+)/.test(n)) {
        b.version = RegExp.$1
        b.ie = parseFloat(b.version)
        b.name = 'ie'
    }
    return browser
}

export const setRootSrc = function (root: { isload: boolean; src: any; style: { opacity: number } }, src: any) {
    if (!isNotEmpty(root) || !isNotEmpty(src))
        return

    root.isload = false
    root.src = src
    root.style.opacity = 1
}

export const setRootSrcEmpty = function (root: { isload: boolean; src: string; style: { opacity: number } }) {
    if (!isNotEmpty(root))
        return

    root.isload = false
    root.src = ''
    root.style.opacity = 0
}
export const setRootSrcNotSetLoad = function (root: { src: any; style: { opacity: number } }, src: any) {
    if (!isNotEmpty(root))
        return

    root.src = src
    root.style.opacity = 1
}

export const setRootSrcEmptyNotSetLoad = function (root: { src: string; style: { opacity: number } }) {
    if (!isNotEmpty(root))
        return

    root.src = ''
    root.style.opacity = 0
}

export const LoadFont = function (params: any[]) {
    const styledom = document.createElement('style')
    const dom = document.createElement('div')
    dom.style.width = '0px'
    dom.style.height = '0px'
    dom.style.fontSize = '0px'
    let innerstr = ''
    if (isArray(params)) {
        for (let i = 0; i < params.length; i++) {
            const item = params[i]
            // if (item.isNotPreLoad){
            //     continue
            // }
            innerstr += `@font-face{font-family:${item.name};src:url(${item.url});}`
            const spandom = document.createElement('span')
            spandom.style['font-family'] = item.name
            spandom.innerText = item.name
            dom.appendChild(spandom)
        }
    }
    else {
        innerstr = `@font-face{font-family:${params.name};src:url(${params.url});}`
        const spandom = document.createElement('span')
        spandom.style['font-family'] = params.name
        spandom.innerText = params.name
        dom.appendChild(spandom)
    }
    styledom.innerText = innerstr
    document.getElementsByTagName('head')[0].appendChild(styledom)
    document.getElementsByTagName('body')[0].appendChild(dom)

    return new Promise((resolve) => {
        if (isArray(params)) {
            const loadNum = params.length
            let readynum = 0
            for (let i = 0; i < params.length; i++) {
                const item = params[i]

                const fontface = new FontFace(item.name, `url(${item.url}`)
                document.fonts.add(fontface)
                if (item.isNotPreLoad) {
                    readynum++
                    if (loadNum == readynum)
                        resolve()

                    continue
                }
                fontface.load()
                fontface.loaded.then(() => {
                    readynum++
                    if (loadNum == readynum)
                        resolve()
                }).catch(() => {
                    readynum++
                    if (loadNum == readynum)
                        resolve()
                })
            }
        }
        else {
            const fontface = new FontFace(params.name, `url(${params.url}`)
            document.fonts.add(fontface)
            fontface.load()
            fontface.loaded.then(() => {
                resolve()
            }).catch(() => {
                resolve()
            })
        }
    })
}

// 获取vip icon
export const getVipIcon = function (vipLevel: any) {
    // console.log(vipLevel)
    let vipName = '白金VIP'
    let vipIcon = '/grade/tag_VIP11.png'
    switch (vipLevel) {
        case 13:
            vipName = '黑钻喵皇'
            vipIcon = '/grade/tag_VIP13.png'
            break
    }
    return {
        vipName,
        vipIcon,
    }
}
// 获取vip icon,vip排名前三替换
export const getVipIconNew = function (data: { vipRank: number; vipLevel: number }) {
    // console.log(vipLevel)
    let vipName = ''
    let vipIcon = ''
    if (data.vipRank > 0 && data.vipRank < 4) {
        const vipRank = data.vipRank
        switch (vipRank) {
            case 1:
                vipName = 'VIP首富'
                break
            case 2:
                vipName = 'VIP榜二富豪'
                break
            case 3:
                vipName = 'VIP榜三富豪'
                break
        }
        vipIcon = `/vipRank/tag_vip_${vipRank}.png?v=1`
    }
    else if (data.vipLevel > 0) {
        const vipLevel = data.vipLevel
        vipName = '白金VIP'
        vipIcon = '/grade/tag_VIP11.png'
        switch (vipLevel) {
            case 13:
                vipName = '黑钻喵皇'
                vipIcon = '/grade/tag_VIP13.png'
                break
        }
    }
    return {
        vipName,
        vipIcon,
    }
}

export const getPrettyNumberLableBg = () => {
    return '/wmPrettyNumber/lh_bg5.png'
}
export const create3DPeople = function (dt: { standRole: { suit: any; sex: number } }) {
    const suit = dt.standRole.suit
    if (typeof suit == 'undefined')
        return

    // var html = '';
    // var newClass = dt.standRole.sex == 0 ? '' : 'nanclass';
    this.words = dt.standRole.sex == 0 ? this.nvwords : this.nanwords
    console.log(typeof suit != 'undefined')
    let name
    if (typeof suit != 'undefined') {
        if (typeof suit.name == 'undefined')
            name = 'base'

        else
            name = suit.name
    }
    else {
        name = 'base'
    }
    return `/new3d/viewPeople/${dt.standRole.sex}_${name}.png?r=1`
}


export const listenImgAninmationEnd = function () {
    const e = window.event.target
    e.src = e.dataset.src
    e.style.visibility = 'visible';
}
export const listenImgAninmationEndNotSetVis = function () {
    const e = window.event.target
    e.src = e.dataset.src
}
export const listenImgAninmationReloadpic = function () {
    const e = window.event.target
    // e.style.visibility = 'hidden'
    // e.src = ''
    e.style.visibility = 'visible'
    // e.isload = false
    e.src = e.dataset.src;
    
}

export const listenImgAninmationEndAndSetStyle = () => {
    const e: (EventTarget | null | undefined) = window?.event?.target;
    if (e) {
        (e as any).src = (e as HTMLElement).dataset.src;
        (e as HTMLElement).style.visibility = 'visible';
        (e as HTMLElement).style.left = "33vw";
    }

}


export const uuid = () => {
    const s = []
    const hexDigits = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 10; i++)
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)

    const uuid = s.join('')
    return uuid
}
export const useEventByKey = (fn: any) => {
    const eventkey = uuid() + new Date().getTime()
    window.handleEvent[eventkey] = fn
    return eventkey
}

export const getWindowWidth = function () {
    return (window.innerWidth) * (window.devicePixelRatio || 1)
}

export const resolvePlayVideo = function (videoroot: { currentTime: number; play: () => Promise<any> }, fromstart: any) {
    return new Promise((resolve) => {
        if (!isNotEmpty(videoroot))
            resolve()

        if (fromstart)
            videoroot.currentTime = 0.01

        videoroot.play().then(() => {
            resolve(true)
        }).catch(() => {
            resolve(false)
        })
    })
}

export const getPicListConfig = function (list: string | any[]) {
    return new Promise((resolve) => {
        if (list.length == 0) {
            resolve([])
            return
        }
        let loadNum = 0
        let configlist: unknown = []
        for (let i = 0; i < list.length; i++) {
            const img = new Image()
            img.src = list[i]
            img.onload = function () {
                loadNum++
                const e = event.target
                if (e.naturalWidth / e.naturalHeight > 1) {
                    configlist[i] = {
                        isV: false,
                        url: list[i],
                    }
                }
                else {
                    configlist[i] = {
                        isV: true,
                        url: list[i],
                    }
                }

                if (loadNum == list.length) {
                    configlist = configlist.filter((item) => {
                        return isNotEmpty(item)
                    })
                    resolve(configlist)
                }
            }
            img.onerror = function () {
                loadNum++
                if (loadNum == list.length) {
                    configlist = configlist.filter((item) => {
                        return isNotEmpty(item)
                    })
                    resolve(configlist)
                }
            }
        }
    })
}
export const isHiBar = (data: string) => {
    const barType = ['派对场', '嗨吧', '演艺会所', '秀场']
    if (barType.includes(data))
        return true

    else
        return false
}
export const getPicList = (one: { picUrl: string }) => {
    return isNotEmpty(one.picUrl) && one.picUrl.length > 0 ? one.picUrl.split(',') : []
}

export const isPhone = (str: string) => {
    return /(?:0|86|\+86)?1[3-9]\d{9}/.test(str)
}

export const clogWm = (str = '') => {
    console.warn(`　 
                    ＿＿
        　　　　　／＞　　フ
        　　　　　|   _   _ l
        　 　　　／  ミ＿xノ
        　　 　 /　　　 　 |
        　　　 /　 ヽ　　 ﾉ
        　 　 │　　|　|　|
        　／￣|　　 |　|　|
        　| (￣ヽ＿_ヽ_)__)  ${str}
        　＼二つ`,
    )
}

export const getChild = (parentNode: any, indexs = []) => {
    let currentNode = parentNode
    for (let i = 0, len = indexs.length; i < len; i++) {
        if (currentNode.children[indexs[i]])
            currentNode = currentNode.children[indexs[i]]

        else
            break
    }
    return currentNode
}

export const getWindowVersion = function () {
    const sUserAgent = navigator.userAgent
    const isWin7 = (sUserAgent.includes('Windows NT 6.1') || sUserAgent.includes('Windows 7')) && !sUserAgent.includes('Win64')
    return isWin7
}

export const getChromeVersion = () => {
    // navigator.userAgent.split('Chrome/')[1].split(' ')[0]
    if (!isNotEmpty(navigator.userAgent))
        return ''

    const version = (navigator.userAgent.split('Chrome/')[1] || '').split(' ')[0] || ''
    return version
}

/**
 * @param startTimeStamp 开始时间
 * @param someTimes 比较时常，单位s
 * 根据时间戳获取时间差,然后判断是否超出时间返回boolean
 */
export const getTimeDiff = (startTimeStamp:number, someTimes:number) => {
    let endTimeStamp = new Date().getTime();
    const stamp = (endTimeStamp - startTimeStamp) / 1000;
    if (stamp < someTimes) {
        return false
    } else {
        return true;
    }
}

type preloadImageParams = {
    src: string[],
    add?: Function,
    complete?: Function,
    [props: string]: any
}


//预加载
export const preloadImage = function (data: preloadImageParams) { // 预加载图片
    data.complete = data.complete || function () { };
    data.add = data.add || function () { };
    if (!data.src || data.src.length == 0) {
        return data.complete();
    }
 
    const $imgUrl = baseState.$gameImgUrl
    const src = data.src;
    const len = src.length; // 数组总共长度
    let fail = 0; // 失败张数
    let index = 0;
    for (let x = 0; x < len; x++) {
        const img = new Image();
        img.onload = img.onerror = function (e) {
            if (e.type != 'load') { fail++; }
            index++;
            data.add!(len);
            if (index == len) { data.complete!(fail); }
        }
        img.src = $imgUrl + src[x];
    }

}





export const Notification = (e: HTMLElement) => {
    let css = window.getComputedStyle(e);
    e.style.left = css.width;
    e.style.transform = `translateY(-${5} px)`;
    e.style.transition = `transform 15s linear`
}

