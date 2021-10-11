import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import addClass from '../views/addClass.vue'
import editClass from '../views/editClass.vue'
import myClass from '../views/myClass.vue'
import attendance from '../views/Attendance.vue'
import attendanceList from '../views/attendanceList.vue'
import exportList from '../views/export.vue'
import setting from '../views/setting.vue'
import backup from '../views/backup.vue'
import education from '../views/education.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-class',
    name: 'addClass',
    component: addClass
  },
  {
    path: '/edit-class',
    name: 'editClass',
    component: editClass
  },
  {
    path: '/class',
    name: 'myClass',
    component: myClass
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: attendance
  },
  {
    path: '/attendance-list',
    name: 'attendanceList',
    component: attendanceList
  },
  {
    path: '/export-list',
    name: 'exportList',
    component: exportList
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting
  },
  {
    path: '/backup',
    name: 'backup',
    component: backup
  },
  {
    path: '/education',
    name: 'education',
    component: education
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
