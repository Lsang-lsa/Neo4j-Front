import Vue from 'vue'
import Router from 'vue-router'
import IndexView from '@/views/IndexView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    // {
    //   path: '/demo',
    //   name: 'demo',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/DemoView.vue')
    // }
  ]
})
