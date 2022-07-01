export interface useBuildConfigType {
    targets: Array<{ src: string, dest: string, rename?: string }>,
    dist: string,
    base: string,
    input: string,
    env: string
}

// 不同运行环境-- 打包&配置
export const useOutConfig = (config: { mode: string }): useBuildConfigType => {
    const outConfig: useBuildConfigType = {
        targets: [],
        dist: `./build/${config.mode}`, //build 后文件地址
        base: `/games/mobile/${config.mode}/`, //打包后资源相对目录
        input: `src/pages/${config.mode}/main.ts`, //项目入口文件
        env: config.mode.match(/prod$/i) ? "prod" : "", //是否是 生产环境
    }
    const targets = [
        {
            src: `./build/${config.mode}/index.html`,
            dest: `./build/${config.mode}`,
            rename: `${config.mode}.html` 
        }
    ]
    outConfig.targets.push(...targets)

    return outConfig
}