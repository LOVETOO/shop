import axios from 'axios'
import apiURL from './api.js'

// axios默认配置
axios.defaults.baseURL = apiURL  // 默认地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default axios