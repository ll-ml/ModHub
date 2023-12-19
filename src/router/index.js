import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user';
import ZyytaHome from '../views/ZyytaHome.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ZyytaHome,
  },
  {
    path: '/auth',
    name: 'signin',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignIn.vue'),
    meta: {needToBeSignedOut: true}
  },
  {
    path: '/register',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')

  },
  {
    path: '/:username',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/UserPage.vue'),
    props: true,
  },
  {
    path: '/game/:gamename/mods',
    name: 'gameMods',
    component: () => import(/* webpackChunkName: "game" */ '../views/ModsByGame.vue'),
    props: true,
  },
  {
    path: '/game/:gamename/',
    name: 'game',
    component: () => import(/* webpackChunkName: "game" */ '../views/GamePage.vue'),
    props: true,
  },
  {
    path: '/mod/:gamename/:mod',
    name: 'mod',
    component: () => import(/* webpackChunkName: "game" */ '../views/ModPage.vue'),
    props: true,
  },
  {
    path: '/mod/:gamename?',
    redirect: to => {
      return { path: '/game/'+ to.params.gamename}
    },
  },
  {
    path: '/search/:searchText',
    name: 'searchResults',
    redirect: to => {
      return { path: '/search', query: { q: to.params.searchText} }
    },
    component: () => import(/* webpackChunkName: "searchResults" */ '../views/SearchPage.vue'),
    props: true,
  },
  {
    path: '/search',
    name: 'search', 
    component: () => import(/* webpackChunkName: "searchResults" */ '../views/SearchPage.vue'),
    props: true,
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import(/* webpackChunkName: "searchResults" */ '../views/UploadPage.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "searchResults" */ '../views/UserSettings.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/admin-upload',
    name: 'adminUpload',
    component: () => import(/* webpackChunkName: "searchResults" */ '../views/AdminUpload.vue'),
    meta: {requiresAuth: true}
  },
]
//proccess.env.BASE_URL
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const uStore = useUserStore();
  if(to.meta.requiresAuth && !uStore.getUser) {
    next('/')
  }else {
    next();
  }
});

export default router
