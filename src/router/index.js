import {createRouter, createWebHashHistory} from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Главная страница',
      layout: 'MainLayout',
    },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue'),
    meta: {
      title: 'Категории',
      layout: 'MainLayout',
    },
  },
  {
    path: '/detail-record',
    name: 'DetailRecord',
    component: () => import('../views/DetailRecord.vue'),
    meta: {
      title: 'Детали заказа',
      layout: 'MainLayout',
    },
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    meta: {
      title: 'История',
      layout: 'MainLayout',
    },
  },
  {
    path: '/planning',
    name: 'Planning',
    component: () => import('../views/Planning.vue'),
    meta: {
      title: 'Планирование',
      layout: 'MainLayout',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      title: 'Профиль',
      layout: 'MainLayout',
    },
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('../views/Record.vue'),
    meta: {
      title: 'Новая запись',
      layout: 'MainLayout',
    },
  },
  {
    path: '/login',
    name: 'Login',
    props: true,
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Вход',
      layout: 'EmptyLayout',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: 'Регистрация',
      layout: 'EmptyLayout',
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
