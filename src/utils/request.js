import axios from 'axios'
import JSONbig from 'json-bigint'
import { getUser } from './storage.js'
const ajax = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      console.log('JSONbig转换出错', err)
      return data
    }
  }]
})

ajax.interceptors.request.use(function (config) {
  const userInfo = getUser()
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default ajax
