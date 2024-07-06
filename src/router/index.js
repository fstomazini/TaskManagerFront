import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import List from '@/components/List'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, 
    {
      path: '/login',
      name: 'login',
      component: Login
    }, 
    {
      path: '/dashboard',
      name: 'list',
      component: List,
      
    }
  ]
})






