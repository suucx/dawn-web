// import { getQueryString } from './utils'
import { ref } from 'vue'
type dType = string | number | Date 
export const percent = ref(0)

const loadingControl = {
    max: 0,
    startTime: 0,
    bgDom: '.wemewLoading-bg',
    nowInDateBetwen: function nowInDateBetwen(d1: dType, d2: dType) {
        var dateBegin = new Date(d1);
        var dateEnd = new Date(d2);
        var dateNow = new Date();
        var beginDiff = dateNow.getTime() - dateBegin.getTime();
        var beginDayDiff = Math.floor(beginDiff / (24 * 3600 * 1000));
        var endDiff = dateEnd.getTime() - dateNow.getTime();
        var endDayDiff = Math.floor(endDiff / (24 * 3600 * 1000));
        if (endDayDiff < 0) {
            //已过期
            return false;
        }
        if (beginDayDiff < 0) {
            //没到开始时间
            return false;
        }
        return true;
    },
    init: function() {
        this.startTime = new Date().getTime()
        var loadingImgDom:HTMLElement = document.querySelector(this.bgDom)!;
        loadingImgDom.style.visibility = 'visible'
        this.start()
    },
    start: function() {
        requestAnimationFrame(function() {
            percent.value = percent.value > 100 ? 100 : percent.value;
            document.getElementById('wemewLoading-text')!.innerHTML = percent.value + '%'
            document.getElementById('wemewLoading-bar-inner')!.style.width = percent.value + '%'
            // return
            if (percent.value >= 100) {
                document.getElementById('wemewLoading')!.parentNode!.removeChild(document.getElementById('wemewLoading')!);
                return;
            }
            if (percent.value < 100) {
                if (percent.value < loadingControl.max)
                    percent.value += 3;
            }
            loadingControl.start()
        });
    },
    add: function(val: string | number) {
        loadingControl.max += parseInt(String(val));
        loadingControl.max = Math.min(loadingControl.max, 100)
    },
}

loadingControl.init()
export default loadingControl;
