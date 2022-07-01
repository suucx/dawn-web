import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import qs from 'qs'
import { SetDevCookie } from '../../vite.dev.config'

if (import.meta.env.DEV) {
    SetDevCookie()
}


type myAxiosResponse<T> = {
    isResultTrue: boolean,
    resultMsg: string | Record<string, any>
} & AxiosResponse<T, T>

// 创建axios实例
export const http = axios.create({
    withCredentials: true, // send cookies when cross-domain requests
    // timeout: 10000, // request timeout //请求超时时间
})

// axios请求拦截器
http.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})
// axios响应拦截器
http.interceptors.response.use(function (response) {

    try {
        response.data.resultMsg = JSON.parse(response.data.resultMsg)
    } catch (error) {
        // console.log('error=>\n', error);
    }
    if (typeof response.data == 'object') {
        response.data.isResultTrue = response.data.isResultTrue || response.data.resultTrue || false
    }
    return response.data;
}, (error) => {
    return Promise.reject(error);
});


//get
function get(url: string): Promise<myAxiosResponse<any>> {
    let config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'appliction/x-www-form-urlencoded'
        }
    };
    return http.get(url, config)
}
//post json
function post(url: string, data?: any, config?: AxiosRequestConfig): Promise<myAxiosResponse<any>> {
    return http.post(url, data, config)
}
//post QueryString
function postQS(url: string, data?: any): Promise<myAxiosResponse<any>> {
    let params = qs.stringify(data, { arrayFormat: 'indices' })
    return http.post(url, params)
}
//post FormData
function postForm(url: string, data?: any): Promise<myAxiosResponse<any>> {
    let config = { headers: { 'Content-Type': 'appliction/x-www-form-urlencoded' } };
    let params = new FormData();
    for (let i in data) {
        //数组
        if (Array.isArray(data[i])) {
            for (let j in data[i]) {
                params.append(`${i}[]`, data[i][j])
            }
        } else {
            params.append(i, data[i])
        }
    }
    return http.post(url, params, config)
}

interface paramsType {
    type: string,
    url: string,
    data?: any,
    config?: any
}

type httpFunctionInstance = (params: paramsType) => Promise<myAxiosResponse<any>> & httpObjectType 
type httpObjectType = {
    get: Function,
    post: Function,
    postQS: Function,
    postForm: Function
}




let $http:httpFunctionInstance = function (params: paramsType): Promise<myAxiosResponse<any>> {
    let { type = '', url, data, config } = params;
    type = type.toLowerCase()
    if (type == 'get' && url !== '') {
        return get(url)
    }
    if (type == 'post' && url !== '') {
        return post(url, data, config)
    }
    if (type == 'postqs' && url !== '') {
        return postQS(url, data)
    }
    if (type == 'postform' && url !== '') {
        return postForm(url, data)
    }
    return http(params)
}

$http.get = get
$http.post = post
$http.postQS = postQS
$http.postForm = postForm

export default $http;