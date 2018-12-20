import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home/Home')
    },
    {
      path: '/tasks/:task',
      name: 'Task',
      component: () => import('@/views/Tasks/views/Task/Task')
    },
    {
      path: '/users/:user',
      name: 'User',
      component: () => import('@/views/Users/views/User/User')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
