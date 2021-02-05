import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import weare from '../views/weare.vue'
import services from '../views/services.vue'
import contact from '../views/contact.vue'
import loginpage from '../views/loginpage.vue'
import menu_Scheduler from '../views/menu_Scheduler.vue'
import menu_Profile from '../views/menu_Profile.vue'
import manu_contacts from '../views/manu_contacts.vue'
import menu_meeting from '../views/menu_meeting.vue'
import Register from '../views/Register.vue'
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
  ,
  { // ใหม่ Register 2/2/2021 
    path:'/Register',
    name: 'Register',
    component: Register
  }
  ,
  {
    path:'/menu_Scheduler',
    name: 'menu_Scheduler',
    component: menu_Scheduler
  }
  ,
  {
    path:'/menu_Profile',
    name: 'menu_Profile',
    component: menu_Profile
  }
  ,
  {
    path:'/manu_contacts',
    name: 'manu_contacts',
    component: manu_contacts
  }
  ,
  {
    path:'/menu_meeting',
    name: 'menu_meeting',
    component: menu_meeting
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
