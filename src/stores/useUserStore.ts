import { defineStore } from 'pinia'
import {
  login as loginApi,
  logout as logoutApi,
  getAuthToken,
} from '@/api/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getAuthToken() as string | null,
    email: null as string | null,
  }),
  actions: {
    async login(email: string, password: string) {
      const data = await loginApi(email, password)
      if (data.accessToken) {
        this.token = data.accessToken
        this.email = email
        localStorage.setItem('userEmail', email) // Сохраняем email в localStorage
      }
    },
    async logout() {
      await logoutApi()
      this.token = null
      this.email = null
      localStorage.removeItem('userEmail')
    },
  },
  getters: {
    isAuthenticated: state => !!state.token, // Проверка на наличие токена
  },
})
