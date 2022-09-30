import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Karyawan.vue'

const routes = [
  {
    path: '/',
    name: 'karyawan',
    component: HomeView
  },
  {
    path: '/kendaraan',
    name: 'kendaraan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Kendaraan.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
