import ajax from '@/utils/request'
export const getFans = (page, per_page) => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params: {
      page,
      per_page
    }
  })
}
// 获取粉丝列表统计数据
export const getFansStatistics = () => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/statistics/followers'
  })
}
