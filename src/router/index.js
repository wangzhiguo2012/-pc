import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Layout from '../views/layout/index.vue'
import { getUser } from '../utils/storage'
import Articles from '../views/articles/index.vue'
import AddArticle from '../views/articles/add.vue'
import NotFound from '../views/page404/index.vue'
import EditArticle from '../views/articles/edit.vue'
import Image from '../views/image/index.vue'
import Home from '@/views/home/index.vue'
import Comment from '@/views/comment/index.vue'
import Fans from '@/views/fans/index.vue'
import Setting from '@/views/setting/index.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: '/articles', component: Articles },
      { path: '/addArticle', component: AddArticle },
      { path: '/editArticle/:id', component: EditArticle },
      { path: '/image', component: Image },
      { path: '/comment', component: Comment },
      { path: '/fans', component: Fans },
      { path: '/setting', component: Setting }
    ]
  },
  { path: '*', component: NotFound }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // console.log('路由导航守卫', to, from, next)
  if (to.path === '/') {
    const userInfo = getUser()
    if (userInfo && userInfo.token) {
      // 有就放行，
      next()
    } else {
      next('/login')
    }
  } else {
    // 如果不是去主页，直接放行
    next()
  }
})
export default router
