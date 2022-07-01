(function (n) {
    const e = n.document;
    const t = e.documentElement;
    const i = 750;
    const h = 730;
    const d = i / 100;
    const g = h / 50;
    const o = "orientationchange" in n ? "orientationchange" : "resize";
    const gameList = ['Zodiac', "OnePiece"];//需要高度也适配的游戏列表
    let last: number;
    const a = function () {
        const now = new Date().getTime();
        if (!!last && (now - last < 300)) { return; }
        let n = t.clientWidth || 320;
        let m = t.clientHeight || 730;
        n > 720 && (n = 720);
        m > 1460 && (m = 1460);
        let _y = m / g,_x=  n / d;
        if(gameList.includes(import.meta.env.MODE)){
            t.style.fontSize = (_y>_x?_x:_y) + "px"
        }else{
            t.style.fontSize = _x + "px"
        }
        last = now;
    };
    if (e.addEventListener) {
        n.addEventListener(o, a, false)
        e.addEventListener("DOMContentLoaded", a, false)
    }
})(window);
