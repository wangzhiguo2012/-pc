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
// 修改用户信息
// 直接传入一个对象data:{name,email,info}
export const modUserProfile = data => {
  return ajax({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
export const modUserImage = (formData) => {
  return ajax({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data: formData
  })
}
