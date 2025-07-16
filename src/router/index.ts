import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Root from '../views/Root.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: Root,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Profile.vue')
      },
      {
        path: '/playlist',
        name: 'playlist',
        component: () => import('../views/PlayList.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
