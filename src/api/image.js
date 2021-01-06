import ajax from '@/utils/request.js'
// 获取素材列表
export const getImages = (paramObj) => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params: paramObj
  })
}
export const switchCollect = (id, collect) => {
  return ajax({
    method: 'PUT',
    url: '/mp/v1_0/user/images/' + id,
    data: {
      collect
      // 'collect': collect
    }
  })
}
export const deleteImage = id => {
  ajax({
    method: 'delete',
    url: '/mp/v1_0/user/images/' + id
  })
}
