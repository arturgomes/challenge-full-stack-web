import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
 
  {
    path: '/',
    alias: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "ListStudentView" */ '../views/ListStudentView.vue')
  },
  {
    path: "/students/:ra",
    name: "student-details",
    component: () => import(/* webpackChunkName: "StudentView" */ "../views/StudentView.vue")
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
