import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import chart from '@/components/chart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      // name: 'OXNET',
      component: HelloWorld
    }
  ]
})
