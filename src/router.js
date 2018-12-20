import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home/Home'
import Task from '@/views/Tasks/views/Task/Task'
import User from '@/views/Users/views/User/User'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/tasks/:task',
      name: 'Task',
      component: Task
    },
    {
      path: '/users/:user',
      name: 'User',
      component: User
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
