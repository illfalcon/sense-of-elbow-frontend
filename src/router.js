import Vue from 'vue'
import Router from 'vue-router'
import Events from './components/Events.vue'
import Landings from './components/Landings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'events',
      component: Events
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    },
    {
      path: '/landings',
      name: 'landings',
      component: Landings
    }
  ]
})
