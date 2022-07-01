import type { App } from 'vue';
import Directives from './directive'

const install = (app:App) => {
    // 自定义指令
    // 注册全局指令
    Object.keys(Directives).forEach((key: string) => {
        app.directive(key, Directives[key]);
    })
}

export default {
    install,
}
