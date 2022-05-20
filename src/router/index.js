import {createRouter, createWebHashHistory} from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Главная страница',
      layout: 'main',
    },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue'),
    meta: {
      title: 'Категории',
      layout: 'main',
    },
  },
  {
    path: '/detail-record',
    name: 'DetailRecord',
    component: () => import('../views/DetailRecord.vue'),
    meta: {
      title: 'Детали заказа',
      layout: 'main',
    },
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    meta: {
      title: 'История',
      layout: 'main',
    },
  },
  {
    path: '/planning',
    name: 'Planning',
    component: () => import('../views/Planning.vue'),
    meta: {
      title: 'Планирование',
      layout: 'main',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      title: 'Профиль',
      layout: 'main',
    },
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('../views/Record.vue'),
    meta: {
      title: 'Новая запись',
      layout: 'main',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Вход',
      layout: 'empty',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: 'Регистрация',
      layout: 'empty',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  to.meta.title ? (document.title = to.meta.title) : (document.title = 'Vrm')
  next()
})

export default router
