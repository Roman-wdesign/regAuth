import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import NotesView from '@/views/NotesView.vue'
import { isAuthenticated } from '@/api/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/notes',
    name: 'notes',
    component: NotesView,
    meta: { requiresAuth: true }, // защищённый маршрут
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Навигационный guard для защиты маршрута
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth) {
    // Проверяем, авторизован ли пользователь
    if (token) {
      const authStatus = await isAuthenticated()
      if (authStatus) {
        next() // Разрешить доступ, если авторизован
      } else {
        localStorage.removeItem('token') // Удаляем невалидный токен
        next({ name: 'login' }) // Перенаправление на страницу входа
      }
    } else {
      next({ name: 'login' }) // Перенаправление на страницу входа, если токена нет
    }
  } else {
    next() // Переход разрешён, если маршрут не требует авторизации
  }
})

export default router
