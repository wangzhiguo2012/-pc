// 用户登录
import ajax from '../utils/request.js'
import { getUser } from '../utils/storage.js'

export const userLogin = (mobile, code) => {
  return ajax({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: {
      mobile: mobile,
      code: code
    }
  })
}
// 获取用户登录信息
export const userGetProfile = () => {
  const userInfo = getUser()
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  // 请求接口
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}
