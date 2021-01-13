import Vue from 'vue'
import VueRouter from 'vue-router'
import { getUser } from '../utils/storage'

const Login = () => import('../views/login/index.vue')
const Home = () => import('../views/home/index.vue')
const Layout = () => import('../views/layout/index.vue')
const Articles = () => import('../views/articles/index.vue')
const AddArticle = () => import('../views/articles/add.vue')
const EditArticle = () => import('../views/articles/edit.vue')
const Image = () => import('../views/image/index.vue')
const Comment = () => import('../views/comment/index.vue')
const Fans = () => import('../views/fans/index.vue')
const Setting = () => import('../views/setting/index.vue')
const NotFound = () => import('../views/page404/index.vue')

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
