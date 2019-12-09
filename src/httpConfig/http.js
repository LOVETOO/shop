import axios from 'axios'
import apiURL from './api.js'

// axios默认配置
axios.defaults.baseURL = apiURL  // 默认地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) { // 如果存在令牌这添加token请求头
            config.headers.Authorization = 'Bearer ' + token
        }
        return config
    },
)

// axios.interceptors.response.use(null, error => {
//     if (error.response.status && error.response.status === 401) { // 没有登录或令牌过期
//         app.$store.dispatch("logout")
//         app.$router.push("/login")
//     }
//     return Promise.reject(error)
// })


export default axios