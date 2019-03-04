import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import InfoShow from './views/InfoShow'
import FoundList from './views/FoundList'


Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', 
      redirect: '/login' 
    },
    {
      path: '/index',
      component: () => import('./views/index.vue')
    },
    {
      path: '/register',
      component: () => import('./views/register.vue'),
      children:[
          { path: '', component: home },
          { path: '/home', name: 'home', component: home },
          { path: '/infoshow', name: 'infoshow', component: InfoShow },
          { path: '/foundlist', name: 'foundlist', component: FoundList }
        ]
    },
    {
      path: '/notfind',
      component: () => import('./views/404.vue')
    },
    {
      path: '/login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/InfoShow',
      component: () => import('./views/InfoShow.vue')
    },
    {
      path: '/FoundList',
      component: () => import('./views/FoundList.vue')
    }
  ]
})


// 添加路由守卫
// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.eleToken ? true : false;
//   if (to.path == "/login" || to.path == "/register") {
//     next();
//   } else {
//     isLogin ? next() : next("/login");
//   }
// })

export default router;
