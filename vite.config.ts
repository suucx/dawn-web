/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Legacy from '@vitejs/plugin-legacy'
import rollupcopy from 'rollup-plugin-copy' //复制文件插件
import AutoImport from 'unplugin-auto-import/vite'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'
import { useOutConfig } from './vite.build.config';
import { proxyConfig } from './vite.dev.config'
import del from 'rollup-plugin-delete'

//测试服
const target = 'https://game.wemew.cn'

export default (config: any) => {
    // 打包配置项
    const buildConfig = useOutConfig(config);
    // 插件配置
    const plugins = [
        Vue({
            reactivityTransform: true,
        }),
        Legacy({
            targets: ['ie >= 9', 'chrome >= 52'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            polyfills: ['es.promise', 'es.promise.finally', 'es/map', 'es/set'],
            modernPolyfills: ['es.promise.finally'],
        }),
        AutoImport({
            imports: [
                'vue',
                'vue/macros',
                'vue-router',
                '@vueuse/core',
            ],
            dts: true,
        }),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz'
        }),
        createHtmlPlugin({
            minify: true,
            entry: '/'+buildConfig.input, //src/main.ts 指定入口
            // template: 'public/index.html', //指定html 文件
            // inject: {
            //     data: {
            //         title: 'index',
            //         injectScript: `<script src="${buildConfig.input}"></script`
            //     }
            // }
        })
    ];
    if (config.command == 'build') {
        plugins.push(
            rollupcopy({
                targets: buildConfig.targets,
                hook: 'writeBundle'
            }),
            del({
                targets: `./build/${config.mode}/index.html`,
                hook: 'closeBundle'
            }),
        )
    }

    return defineConfig({
        base: config.command == 'build' ? buildConfig.base : './',
        // base: buildConfig.base,
        resolve: {
            alias: {
                '~/': `${path.resolve(__dirname, 'src')}/`,
                '@': path.resolve(__dirname, 'src'),
            },
        },
        plugins: plugins,
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "./src/styles/_variable${buildConfig.env === 'prod' ? '' : 'test'}.scss";`,
                },
            },
        },
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    pure_funcs: buildConfig.env === 'prod' ? ['console.log'] : []
                }
            },
            outDir: buildConfig.dist,
            sourcemap: buildConfig.env != 'prod',
            rollupOptions: {
                external: buildConfig.input,
            }
        },
        server: {
            host: '0.0.0.0',
            open: true,
            port: 8100,
            proxy: proxyConfig,
        },
    })
}
