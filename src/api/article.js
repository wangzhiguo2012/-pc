import ajax from '../utils/request'
export const getArticles = (queryObj) => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: queryObj
  })
}
// 获取文章频道
export const getArticleChannels = () => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
// 删除文章
export const deleteArticle = articleId => {
  return ajax({
    method: 'DELETE',
    url: '/mp/v1_0/articles/' + articleId
  })
}
export const addArticle = (isDraft, article) => {
  return ajax({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft: isDraft
    },
    data: article
  })
}
