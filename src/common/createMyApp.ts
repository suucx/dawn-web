import type { ComponentPublicInstance } from 'vue'
import { createApp } from 'vue'
import projectInit from './projectInit'
import { isNotEmpty } from '~/utils'

type typeParams = Record<string, any>
const createMyApp = (view: Element, props: typeParams | null | undefined) => {
    const app = createApp(view, props)
    app.use(projectInit)
    return app
}

export const renderView = (options: {
    view: any
    body?: 'body' | undefined | string
    provide?: {} | typeParams | undefined
    props?: {} | undefined
    moreNode?: false | undefined
    methods?: {} | undefined
}) => {
    const {
        view,
        body = 'body',
        provide = {} as typeParams,
        props = {},
        moreNode = false,
        methods = {},
    } = options
    view.methods = methods
    const app = createMyApp(view, props)
    for (const key in provide)
        app.provide(key, provide[key])

    const div = document.createElement('div')
    const instance = app.mount(div)

    const root = (moreNode ? div : div.firstElementChild) as Element

    if (typeof body === 'string') {
        if (!isNotEmpty(document.querySelector(body))) {
            console.warn('renderView: selector is null', body)
            return {}
        }
        document.querySelector(body)?.appendChild(root)
    }
    else {
        (body as Element).appendChild(root)
    }
    return {
        app,
        instance,
        view: root,
    }
}

export const destroyView = (options: typeParams) => {
    const { app, view } = options
    if (isNotEmpty(app)) {
        app.unmount()
        if (isNotEmpty(view) && view.parentNode)
            view.parentNode.removeChild(view)
    }
}

export type CompT = ComponentPublicInstance<{ close: Function; startAnimation: Function; endAnimation: Function }>

export const handleView = (options: typeParams, View: any): CompT => {
    const { app, view, instance } = renderView({
        view: View,
        body: options.body || options.box || '#app',
        props: options.props,
        methods: {
            close() {
                destroyView({ app, view })
            },
            ...options.methods
        },
    })

    return (app?._instance?.proxy || instance) as CompT
}

export default createMyApp
