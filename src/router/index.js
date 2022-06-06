import {createRouter, createWebHistory} from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'Home',
    translate: 'Главная',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Главная страница',
      layout: 'MainLayout',
    },
  },
  {
    path: '/categories',
    name: 'Categories',
    translate: 'Категории',
    component: () => import('../views/Categories.vue'),
    meta: {
      title: 'Категории',
      layout: 'MainLayout',
    },
  },
  {
    path: '/detail-record',
    name: 'DetailRecord',
    translate: 'Детали заказа',
    component: () => import('../views/DetailRecord.vue'),
    meta: {
      title: 'Детали заказа',
      layout: 'MainLayout',
    },
  },
  {
    path: '/history',
    name: 'History',
    translate: 'История',
    component: () => import('../views/History.vue'),
    meta: {
      title: 'История',
      layout: 'MainLayout',
    },
  },
  {
    path: '/planning',
    name: 'Planning',
    translate: 'Планирование',
    component: () => import('../views/Planning.vue'),
    meta: {
      title: 'Планирование',
      layout: 'MainLayout',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    translate: 'Профиль',
    component: () => import('../views/Profile.vue'),
    meta: {
      title: 'Профиль',
      layout: 'MainLayout',
    },
  },
  {
    path: '/record',
    name: 'Record',
    translate: 'Новая запись',
    component: () => import('../views/Record.vue'),
    meta: {
      title: 'Новая запись',
      layout: 'MainLayout',
    },
  },
  {
    path: '/login',
    name: 'Login',
    translate: 'Войти',
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
    translate: 'Регистрация',
    component: () => import('../views/Register.vue'),
    meta: {
      title: 'Регистрация',
      layout: 'EmptyLayout',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/404.vue'),
    meta: {
      title: 'Страница не найдена',
      layout: 'MainLayout',
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  to.meta.title ? (document.title = to.meta.title) : (document.title = 'Vrm')
  next()
})

export default router
