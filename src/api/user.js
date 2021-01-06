// 用户登录
import ajax from '../utils/request.js'
import { getUser } from '../utils/storage.js'

export const userLogin = (mobile, code) => {
  return ajax({
    method: 'POST',
    url: 'mp/v1_0/authorizations',
    data: {
      mobile: '13911111111',
      code: '246810'
    }
  })
}
// 获取用户登录信息
export const userGetProfile = () => {
  // 请求接口
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/user/profile'

  })
}
