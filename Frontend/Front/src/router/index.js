import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new-user',
    name: 'NewUser',
    component: () => import('../views/NewUser.vue'), 
  },
  {
    path: '/user/logIn',
    name: 'Login',
    component: () => import('../views/Login.vue'),
/*     meta: {
      allowAnonymous: true //ruta publica
    } */
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/UserProfile.vue"),
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue'),
/*     meta: {
      allowAnonymous: false, //ruta privada
    }, */
  },
  {
    path: '/products/alquiler/',
    name: 'Renting',
    component: () => import('../views/Renting.vue'),
  },
  {
    path: '/products/cesion/',
    name: 'Cesion',
    component: () => import('../views/Cesion.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/*',
    name: 'Error',
    component: () => import( '../views/Error.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
