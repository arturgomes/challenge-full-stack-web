import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
 
  {
    path: '/',
    alias: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListStudentView.vue')
  },
  {
    path: "/students/:id",
    name: "student-details",
    component: () => import("../views/StudentView.vue")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../views/NewStudentView.vue")
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
