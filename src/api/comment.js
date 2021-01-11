// 评论模块
import ajax from '@/utils/request'
/**
 * 获取用于评论管理的数据
 * page 否页数，默认是1
 * per_page 否每页数量默认每页10条
 * response_type 否 返回数据的字段，不传返回用于内容管理的字段
 * 传comment 返回用于评论管理的字段
 * 传statistic返回用于图文数据的字段
 */
export const getComments = (page, per_page) => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: {
      page,
      per_page,
      response_type: 'comment'
    }
  })
}
export const modCommentStatus = (id, allow_comment) => {
  return ajax({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: id
    },
    data: {
      allow_comment
    }
  })
}
