
//开发环境设置cookie
type keyObjeType = {
    [props: string]: string
}
const barKeyObj:keyObjeType = {
    'default': 'EFBC89C1FDF741C92DA890D5E0EFF46C8DF6384239C46389EBCC9A9BD97EC93598A56243F761DBFA' 
}
const userKeyObj:keyObjeType = {
    'default': 'E7F912F571D10112D59B853EA4B560F17F4154725A58CF39DDE4E642658DFB4EF58026C2E0EAE223',
    'tuzki': 'E7F912F571D10112D59B853EA4B560F17F4154725A58CF39DDE4E642658DFB4EF58026C2E0EAE223',
    'dd': '6B733A26B743D95B022ED30B2B579CCB0E5B9A7C7F02E93BE1A557A94CBB407FB3F677B12FC11E52',
    '11': 'E1C1E69FBEB240A181C0A2538111E11971B2CE1EA44929B4FFD5A9DB60D7A5AAEB796FF6514AE717',
}

function getCookies(barKey = 'default', userKey = 'default') {
    console.log(barKeyObj[barKey], userKeyObj[userKey])
    // return 'JSESSIONID=7A7009CD6E748A982705F60BC69C1C48; Hm_lvt_bbcfda495d9cf0463dc64c3b6b0c4187=1634716910; SCREENV=EEFA8141175FDB8901ECB04992AB1AA4D81305CC96E444EA28BF78DA21B0608C596E367376FA5CD5; C_USERID_NEW=E61E5487CA57DB13; admin_barbaseid=38821236A64913A245E538FEF1D411789158A32EA4BF5E38DA23B4E2F6855618BD0E110907DE5BB6; AU=4A52B01760B5DCC7BAAC1E910D7C7652F6FDEE4B0001B44E84DE03C6F7867980018A234BF3989378641FB184DB78326E; TK=7E68A6D1EB9016415DE0ACC21465CD3E15CEE9F56B8B2CACC85C3208A5FC27F657D08601405F6093; B_W_ID=F82B5FF0907BD783EBA0559CDB10A85A2B240394B1EB79C17E22FFC0A9D6C49362267C2C1BC953DA; Hm_lpvt_bbcfda495d9cf0463dc64c3b6b0c4187=1634717630'
    // return 'C_USERID_NEW=21FAFDEDE3BDA159D572A2530710294CBF3F2EF369C78842CA11FB7C560E514B82203F87AF668CAA; JSESSIONID=C8106D5DE574283ACF9603669341E5B4; T_BARBASEID=7B9C6DB3EE67AE409B07EE8A29F990B41FB20722D0D044ABDEBA4DCCF27F2C7A79BFADDF682FCD2C'

    return `T_USERID=${(userKeyObj[userKey])}; T_BARBASEID_NEW=${(barKeyObj[barKey])};`;
}

let cookies = getCookies('default', 'tuzki')


export const SetDevCookie = function () {
    let cookiesArr = cookies.split('; ')
    for (let i = 0; i < cookiesArr.length; i++) {
        document.cookie = cookiesArr[i].split('=')[0] + "=" + escape(cookiesArr[i].split('=')[1])
    }
}

const target = 'https://game.wemew.cn'
// const target = 'http://192.168.108.76:8088'
// const target = 'http://test.wemew.cn/'

export const proxyConfig = {
    '/api': {
        target: target,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': '',
        },
    },
    //获取用户数据 
    '/wxLoginUserInfo': {
        target: target,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': '',
        },
    },
    '/fcwechat': {
        target: target,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': '',
        },
    },
    '/getPkStartPageUrl': {
        target: target,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': '',
        },
    },
    '/cwechat': {
        target: target,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': '',
        },
    },
    '/upload': {
        target: target,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': '',
        },
    },
    //阿里云 
    '/ossServlet': {
        target: target,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': '',
        },
    },
    '/video-screenshot-test': {
        target: target,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': '',
        },
    },
}