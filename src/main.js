import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
// vue是一个构造器，他有一个原型对象prototype
// vue.prototype.$eventBus给vue的原型对象补充了一个名为$eventBus的属性
// 属性名是$eventBus,值是一个全新的实例，用它充当事件对象
// 如果给prototype上添加属性，则所有的实例都拥有$eventBus这个属性
// 也就是所有的组件(组件也是vue的实例)中都可以访问this.$eventBus!
Vue.prototype.$eventBus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
