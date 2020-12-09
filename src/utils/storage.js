const KEY = 'hm-tt-pc-userinfo'
const setUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}
const getUser = () => {
  const result = JSON.parse(localStorage.getItem(KEY)) || {}
  return result
}

const delUser = () => {
  localStorage.removeItem(KEY)
}

export { setUser, getUser, delUser }
