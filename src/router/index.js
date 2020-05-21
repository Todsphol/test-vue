import Vue from 'vue'
import VueRouter from 'vue-router'
import Note from '../components/Note.vue';
import Edit from '../components/Edit.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Note',
    component: Note
  },
  {
      path: '/edit/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/add',
    name: 'Edit',
    component: Edit
}
]

const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
  routes
})

export default router
