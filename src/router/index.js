import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import Login from '../views/Login.vue'
import Restaurant from '../views/Restaurant.vue'
import RestInfo from '../views/RestInfo.vue'
import OrderDelivery from '../views/OrderDelivery.vue'
import Menu from '../views/Menu.vue'
import DishCustomize from '../views/DishCustomize.vue'
//var cors = require('cors')
//Vue.use(cors())
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/restaurant',
    name: 'Restaurant',
    component: Restaurant
  },
  {
    path: '/restinfo',
    name: 'RestInfo',
    component: RestInfo
  },
  {
    path: '/orderdelivery',
    name: 'OrderDelivery',
    component: OrderDelivery
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/dishcustomize',
    name: 'DishCustomize',
    component: DishCustomize
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
