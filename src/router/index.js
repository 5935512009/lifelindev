import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import weare from '../views/weare.vue'
import services from '../views/services.vue'
import contact from '../views/contact.vue'
import loginpage from '../views/loginpage.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/weare',
    name: 'weare',
    component: weare
  },
  {
    path:'/services',
    name: 'services',
    component: services
  }
  ,
  {
    path:'/contact',
    name: 'contact',
    component: contact
  }
  ,
  {
    path:'/loginpage',
    name: 'loginpage',
    component: loginpage
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
