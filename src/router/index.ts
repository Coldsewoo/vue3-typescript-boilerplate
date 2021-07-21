import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import defaultLayout from '/Layouts/defaultLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: defaultLayout,
    children: [],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
