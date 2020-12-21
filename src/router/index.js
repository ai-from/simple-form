import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {title: 'Simple Form | Home'}
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import(/* webpackChunkName: "about" */ '../views/Error.vue'),
    meta: {title: 'Simple Form | Error'}
  },
  {
    path: '*',
    redirect: '/error'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
