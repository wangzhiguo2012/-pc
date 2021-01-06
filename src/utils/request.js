import axios from 'axios'
import JSONbig from 'json-bigint'
import { getUser } from './storage.js'
const instance = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/',
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch {
      return data
    }
  }]
})

instance.interceptors.request.use(function (config) {
  const userInfo = getUser()
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default instance
